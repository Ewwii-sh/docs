---
sidebar_position: 2.5
---

# Data Sources

Now that you feel sufficiently greeted by your bar, you may realize that showing data like the time and date might be even more useful than having a button that greets you.

To implement dynamic content in your widgets, you make use of _variables_.

## Nbcl Variables

In Nbcl, all variables are dynamically typed bindings to values. You can define variables using `let` or `const` keyword, pass them as function parameters.

**Basic variables (`let` and `const`)**

```js
let foo = "value"
const bar = "value"
```

This is the simplest type of variable. These variables exist only during evaluation and changes to it does not effect the rendered widgets, if you need a dynamic variable that if updated, updates the widget, you can use built in `Poll` and `Listen` components  to register dynamic values which we will talk about in the following section.


## Dynamic Global Signals

Just having nbcl variables that wont update is pretty limiting. So, ewwii has two built in components to register dynamic signals that can change according to the command. These variables are global, which means that it is available in all modules.

**Polling Signal (`Poll`)**

```js
Poll "var_name" {
  initial = "initial value"
  interval = "2s"
  cmd = "date +%H:%M:%S"
}
```

A polling signal is a signal which runs a provided shell-script repeatedly, in a given interval.

This may be the most commonly used type of signal.
They are useful to access any quickly retrieved value repeatedly,
and thus are the perfect choice for showing your time, date, as well as other bits of information such as pending package updates, weather, and battery level.

<!-- You can also specify an initial-value. This should prevent ewwii from waiting for the result of a given command during startup, thus
making the startup time faster. -->

To externally update a polling signal, `ewwii update` can be used like with basic variables to assign a value. [Learn more about ewwii update](../commands/update.md).

:::tip
When a graph widget is driven by a polling signal, set `skip_unchanged` to false to ensure continuous updates.
:::

**Listening Signal (`Listen`)**

```js
Listen "foo" {
  initial = "whatever"
  cmd = "tail -F /tmp/some_file"
}
```

Listening signals might be the most confusing of the bunch.
A listening signal runs a script once, and reads its output continously.
Whenever the script outputs a new line, the value will be updated to that new line.
In the example given above, the value of `foo` will start out as `"whatever"`, and will change whenever a new line is appended to `/tmp/some_file`.

These are particularly useful when you want to apply changes instantaneously when an operation happens if you have a script
that can monitor some value on its own. Volume, brightness, workspaces that get added/removed at runtime,
monitoring currently focused desktop/tag, etc. are the most common usecases of this type of signals.
These are particularly efficient and should be preferred if possible.

For example, the command `xprop -spy -root _NET_CURRENT_DESKTOP` writes the currently focused desktop whenever it changes.
Another example usecase is monitoring the currently playing song with playerctl: `playerctl --follow metadata --format {{title}}`.

**Using these signals**

Since these are global signals, they can be used everywhere in the configuration using the `global` function. Their values can also be mutated temporarily for if you pair it with the `template` function.

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
      text = global("time").template("Time: {time}")
    }
  }
}
```

You can do arithmetic and if/else inside `template` too. Like so:

```nbcl
# arithmetic
template("{foo + 32 + ' baz'}")

# if/else
template("{foo == 10 ? 'hi' : 'bye'}")
```

## Dynamic Script Signals

`Script` is a special signal which allows running an nbcl script periodically or on event. It is a very powerful feature which allows mutating a widgets at runtime.

```nbcl
Script {
    # 'every' accepts a duration
    every = "5s"

    # 'on' accepts a command.
    # It listens to the command
    # and runs the script when the command
    # prints a message to stdout.
    #
    # on = "path/to/script"

    run = |w| {
        let my_widget = w.find("my_widget")
        my_widget.set_property("label", "hi")
        my_widget.add_class("red")
        my_widget.remove_class("red")
    }
}
```

The script requires either `every` or `on`. But not both at the same time. That is something to keep in mind. Inside the run lambda, you receive a special type on which you can call the shown functions on.

#### `find` function

Finds a widget which you can set property of or mutate class. A widget can be given a name like so:

```nbcl
Label "my_widget" {
    text = "bye"
}
```

or like so (though the first method is preferred):

```nbcl
Label {
    widget_name = "my_widget"
    text = "bye"
}
```

#### `set_property` function

Set's a property of the widget found.

#### `add_class` & `remove_class` function

Adds/Removes a class from the widget found.
