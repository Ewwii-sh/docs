---
sidebar_position: 2.6
---

# Advanced

There are many advanced features and patterns in ewwii that will help you make your configuration more flexible and powerful. 
Do note that most of these features and patterns are **very simple**. don't let the term *advanced* scare you.

## Calling Nbcl Functions

You can call nbcl functions directly from an ewwii command like so: `ewwii call-fns "function(args)"` as stated in [advanced commands](../commands/call_fns).

They can be used in ewwii like this:

```nbcl
Button "my-btn" {
    label = "Hello, Bob!"
    onclick = "ewwii call-fns 'change_label()'"
}
```

```nbcl
# ewwii.nbcl

import core.command

# function must be in ewwii.nbcl
fn change_label() {
    command.run("echo 'called' > ~/.local/share/my_program/state.txt")
    command.run("notify-send 'called'")
    # ... other stuff

    # update the property using widget-contorl
    # (will be mentioned below)
    command.run("ewwii wc property-update --widget 'my-btn' label='Hello, Alice!'")
}
```

## Updating Widgets Externally

One of the most powerful features of ewwii is `widget-control`. It allows ewwii to **update, create, remove,** widgets directly 
from the terminal with a single command. It is quite hard to explain, so it will be ideal to read its documentation
directly from [advanced commands](../commands/widget-control).

```nbcl
Button "my-btn" {
    label = "Click me!"
    onclick = "ewwii wc property-update --widget 'my-btn' label='Surprise!'"
}
```

## Using Unsupported Widgets

Ewwii has a [special widget](../widgets/special) called GtkUI that lets you load a widget from a Gtk XML file. 
Though these widgets cant be updated during runtime, they are a viable option if you want to register a set of static
widgets that wont update values.

```nbcl
# Loads a widget with the id 'my-btn'
# from the 'mywidgets.ui' gtk xml file.
GtkUI {
    file = "./mywidgets.ui"
    id = "my-btn"
}
```
