---
sidebar_position: 2.3
---

# Best Practices

Before you continue, just keep these practices in mind as they showcase really useful patterns.

## Using Components

As your configuration grows, you might want to improve its structure by factoring out pieces into reusable components.

In Ewwii's Nbcl-based configuration system, you can define wrapper functions that return widgets and accept a `children` parameter (or any parameter that you prefer), just like built-in widgets such as `box()` or `button()`.

Here's an example of a custom container that adds a label before its children:

```nbcl
component LabeledContainer () {
  Box {
    class = "container"

    Label {
      text = self.id
    }

    self.children
  }
}
```

You can call it like this:

```nbcl
LabeledContainer "foo" {
  Button {
    onclick = "notify-send hey ho"
    label = "Click me"
  }
}
```

## Window ID

In some cases you may want to use the same window configuration for multiple widgets, e.g. for multiple windows. This is where arguments and ids come in.

Firstly let us start off with ids. An id can be specified in the `open` command
with `--id`, by default the id will be set to the name of the window
configuration. These ids allow you to spawn multiple of the same windows. So
for example you can do:

```bash
ewwii open my_bar --screen 0 --id primary
ewwii open my_bar --screen 1 --id secondary
```

## Generating a list of widgets from array using `for`

If you want to display a list of values, you can use the `for`-Element to fill a container with a list of elements generated from a JSON-array.

```nbcl
let my_array = [1, 2, 3];

# Inside your widget, you can do  this
Box {
  for entry in my_array {
    Button {
      onclick = "notify-send 'click' 'button ${entry}'",
      label = entry.to_string()
    }
  }
}
```

This can be useful in many situations, for example when generating a workspace list from an array representation of your workspaces.

<!-- To see how to declare and use more advanced data structures, check out the [data structures example](/examples/data-structures/ewwii.rhai). -->

## Splitting up your configuration

As time passes, your configuration might grow larger and larger. Luckily, you can easily split up your configuration into multiple files!

There are two options to achieve this:

### Using `import/export`

```nbcl
# in ./foo/baz.nbcl
## Note: all functions and variables 
## at the top level are automatically exported.
fn greet() { return "Greetings!" }
let PI = 3.14159

# in ./ewwii.nbcl
import "foo/baz.nbcl" as example;
print(example.greet()); # Greetings!
print(example.PI);      # 3.14159
```

A nbcl file may import the contents of any other rhai file that they export. For this, make use of the `import` directive. However, a slight limitation is that `import "eg.nbcl" as example` only imports functions and variables under the `example` namespace. To import a **component**, you would have to use this syntax:

```nbcl
# in ./example.nbcl
component ExampleCmp () {
  # implementation omitted ... 
}

# in ./main.nbcl
import "example.nbcl" as example { ExampleCmp }
ExampleCmp {
  # All the functions and variables are
  # imported under the `example` variable,
  # and components are imported directly as-is.
}
```

### Using a separate ewwii configuration directory

If you want to separate different widgets even further, you can create a new ewwii config folder anywhere else.
Then, you can tell ewwii to use that configuration directory by passing _every_ command the `--config /path/to/your/config/dir` flag.
Make sure to actually include this in all your `ewwii` calls, including `ewwii kill`, `eww logs`, etc.
This launches a separate instance of the ewwii daemon that has separate logs and state from your main ewwii configuration.

```bash
ewwii --config "/path/to/your/config/dir"
```
