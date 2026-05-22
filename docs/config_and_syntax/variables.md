---
sidebar_position: 2.5
---

# Variables

Now that you feel sufficiently greeted by your bar, you may realize that showing data like the time and date might be even more useful than having a button that greets you.

To implement dynamic content in your widgets, you make use of _variables_.

## Nbcl variables

In Nbcl, all variables are dynamically typed bindings to values. You can define variables using `let` or `const` keyword, pass them as function parameters.

**Basic variables (`let` and `const`)**

```js
let foo = "value"
const bar = "value"
```

This is the simplest type of variable. These variables exist only during evaluation and changes to it does not effect the rendered widgets, if you need a dynamic variable that if updated, updates the widget, you can use built in `Poll` and `Listen` components  to register dynamic values which we will talk about in the following section.


## Dynamic global variables

Just having nbcl variables that wont update is pretty limiting. So, ewwii has two built in components to register dynamic variables (which is also known as a signal) that can change according to the command. These variables are global, which means that it is available in all modules.

**Polling variables (`Poll`)**

```js
Poll "var_name" {
  initial = "initial value"
  interval = "2s"
  cmd = "date +%H:%M:%S"
}
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

**Listening variables (`Listen`)**

```js
Listen "foo" {
  initial = "whatever"
  cmd = "tail -F /tmp/some_file"
}
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

**Using these variables**

Since these are global variables, they can be used everywhere in the configuration using the `global` function. Their values can also be mutated temporarily for a property if you pair it with the `mutate` function.

```nbcl
Poll "time" {
  initial = "initial value"
  interval = "2s"
  cmd = "date +%H:%M:%S"
}

Window "1" {
  CustomWidget {}
}

component CustomWidget (any: props) {
  Box {
    Label {
      # Just use the value directly
      text = global("time")
    }
    Label {
      # {self} is how you access the value of a global variable.
      text = global("time").mutate("Time: {self}")
    }
  }
}
```
