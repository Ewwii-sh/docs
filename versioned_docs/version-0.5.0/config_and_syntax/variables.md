---
sidebar_position: 2.5
---

# Variables

Now that you feel sufficiently greeted by your bar, you may realize that showing data like the time and date might be even more useful than having a button that greets you.

To implement dynamic content in your widgets, you make use of _variables_.

## Rhai variables

In Rhai, all variables are dynamically typed bindings to values. You can define variables using let, pass them as function parameters.

**Basic variables (`let`)**

```js
let foo = "value";
```

This is the simplest type of variable.
Basic variables don't ever change automatically, if you need a dynamic variable, you can use built in functions like `poll()`, `listen()`, or maybe even the advanced `localsignal()` to register dynamic values which we will talk about in the following section.

However, these variables are **local** and are only available in the scope they are defined in.

```js
let foo = "example";

tree([
  defwindow("1", #{}, wont_work()),      // wont work
  defwindow("2", #{}, will_work(foo)),   // will work
  defwindow("3", #{}, will_also_work())  // will work
])

// Here we have 2 variables named:
// - "time" (registered dynamically by poll) 
// - "foo" (static rhai variable)

// here is an example of something that wont
fn wont_work() {
  return box(#{}, [ label(#{ text: foo }) ]);
}

// here is an example of something that will work
fn will_work(foo) { // foo is passed from `tree([])`
  return box(#{}, [ label(#{ text: foo }) ]);
}

fn will_also_work() {
  // This works because foo is redeclared in this scope.
  let foo = "example2";
  return box(#{}, [ label(#{ text: foo }) ]);
}
```


## Dynamic global variables

Just having rhai variables that wont update is pretty limiting. So, ewwii has two built in functions to register dynamic variables (which is also known as a signal) that can change according to the command. These variables are global, which means that it is available in all modules.

**Polling variables (`poll`)**

```js
tree([
  poll("var_name", #{
      // It is recommended to have initial property passed.
      // If not provided, it will default to no value which may cause problems when used.
      // You can pass something like "" if you want no initial value.
      initial: "inital value",
      interval: "2s",
      cmd: "date +%H:%M:%S", // command to execute
  });
])
```

A polling variable is a variable which runs a provided shell-script repeatedly, in a given interval.

This may be the most commonly used type of variable.
They are useful to access any quickly retrieved value repeatedly,
and thus are the perfect choice for showing your time, date, as well as other bits of information such as pending package updates, weather, and battery level.

<!-- You can also specify an initial-value. This should prevent ewwii from waiting for the result of a given command during startup, thus
making the startup time faster. -->

To externally update a polling variable, `ewwii update` can be used like with basic variables to assign a value. [Learn more about ewwii update](../commands/update.md).

:::tip
When a graph widget is driven by a polling variable, set `skip_unchanged` to false to ensure continuous updates.
:::

**Listening variables (`listen`)**

```js
tree([
  listen("foo", #{
    initial: "whatever",
    cmd: "tail -F /tmp/some_file",
  });
])
```

Listening variables might be the most confusing of the bunch.
A listening variable runs a script once, and reads its output continously.
Whenever the script outputs a new line, the value will be updated to that new line.
In the example given above, the value of `foo` will start out as `"whatever"`, and will change whenever a new line is appended to `/tmp/some_file`.

These are particularly useful when you want to apply changes instantaneously when an operation happens if you have a script
that can monitor some value on its own. Volume, brightness, workspaces that get added/removed at runtime,
monitoring currently focused desktop/tag, etc. are the most common usecases of this type of variable.
These are particularly efficient and should be preffered if possible.

For example, the command `xprop -spy -root _NET_CURRENT_DESKTOP` writes the currently focused desktop whenever it changes.
Another example usecase is monitoring the currently playing song with playerctl: `playerctl --follow metadata --format {{title}}`.

<!--
**Built-in "magic" variables**

In addition to defining your own variables, ewwii provides some values for you to use out of the box.
These include values such as your CPU and RAM usage.
These mostly contain their data as JSON, which you can then get using the [json access syntax](expression_language.md).
All available magic variables are listed [here](magic-vars.md). -->

:::warning
Dynamic variables created by `poll` or `listen` handlers
should always be defined inside an `tree([])` block.
If `poll` or `listen` is defined outside the `tree([])` block, then they simply will be ignored.
:::

**Passing these variables**

Since these are global variables, they can be used everywhere in the configuration.

```js
tree([
  poll("time", #{
    initial: "inital value",
    interval: "2s",
    cmd: "date +%H:%M:%S",
  }),

  defwindow("1", #{}, widget())
])

fn widget() {
  return box(#{}, [ label(#{ text: time }) ]);
}
```

## Advanced: Mutations to Global Variables

In some cases, you may need to mutate the global variables in rhai itself to utilize some of its features. For this reason the `bound` function exists. Here is how to use it:

```js
tree([
  poll("returned_example", #{
    initial: "inital value",
    interval: "2s",
    // returns "Hello"
    cmd: "./external_script.sh",
  }),

  defwindow("1", #{}, widget())
])

fn widget() {
  let addition = ", World;

  // signature of bound: `bound(array, closure)`
  let mutated_value = bound([returned_example, addition], |vars| {
    // what each value corresponds to in vars
    // - vars[0] is first variable
    // - vars[1] is second variable
    // - vars[2] is third variable
    // and so on...

    let returned_example = vars[0];
    let addition = vars[1];

    return returned_example + addition
  });
  
  return box(#{}, [ 
    label(#{ text: "mutated value: " + mutated_value }) 
  ]);
}
```

