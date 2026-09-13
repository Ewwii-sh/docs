---
sidebar_position: 2.1
---

# Getting Started

:::tip
For a list of all built-in widgets (i.e. `Box`, `Label`, `Button`), see [Widget Documentation](/docs/widgets/widgets.md).
:::

To get started, you'll need to create two files: `ewwii.nbcl` and `ewwii.scss` (or `ewwii.css`, if you prefer that). These files must be placed under `$XDG_CONFIG_HOME/ewwii` (which is most likely `~/.config/ewwii`).

Now that those files are created, you can start writing your first widget!

:::important
Before we get started, we highly recommend you to read through NBCL language guide. The language is extremely minimal and you can read through it in no time! This will help you pick up what we are discussing very quickly!

Language Guide: https://nbcl-lang.github.io/docs/language-guide/quick-start.html
:::

## Creating your first window

Firstly, you will need to create a top-level window. Here, you configure things such as the name, position, geometry, and content of your window.

Let's look at an example window definition:

```nbcl
# Wayland Window Definition
Window "example" {
    monitor = 0
    geometry = {
      x = "0%"
      y = "2px"
      width = "90px"
      height = "30px"
      anchor = "top center"
    }
    exclusive = true

    Label {
      text = "Example Content"
    }
}
```

Here, we are defining a window named `example`, which we then define a set of properties for. For your information, the stuff in the `key = value` format are the properties.

You can now open your first window by running `ewwii open example`! Glorious!

:::note
Not all properties supported by a window are showcased in the example provided above. 
See [Window Properties](../widgets_and_window/window-props.md) to see the full list of properties supported by a window.
:::

## Your first widget

While our bar is already looking great, it's a bit boring. Thus, let's add some actual content! We will use the 'component'
feature of NBCL to declare a new widget. This new widget will act like a container holding other widgets.

```nbcl
component Greeter (name) {
    Box {
        orinetation = "horizontal"
        halign = "center"

        Button {
            onclick = "notify-send 'Hello' 'Hello, ${name}'"
            label = "Greet"
        }
    }
}
```

To show this, let's replace the text in our window definition with our new `Greeter` widget:

```nbcl diff
Window "example" {
    # Properties omitted ...

    Label { # [!code --]
        text = "Example Content" # [!code --]
    } # [!code --]

    Greeter { # [!code ++]
        name = "Bob" # [!code ++]
    } # [!code ++]
}
```

That is basically the core of ewwii, and there is quite a lot going on here.

We are creating a component named `Greeter` which takes one property, called `name`. The `name` property _must_ be provided or else it will throw an error. See this for information on defining components in nbcl: [Defining Nodes in NBCL](https://nbcl-lang.github.io/docs/language-guide/nodes.html#defining-nodes).

Now inside the component, we declare the body of our widget that we are returning. We make use of a `Box`, which we set a couple properties of. This box then contains a button. In that button's `onclick` property, we refer to the provided `name` using string-interpolation syntax: `"${name}"`.

As you may have noticed, we are using a couple predefined widgets here. These are all listed and explained in the [Widgets & Windows Section](../widgets_and_window/).
