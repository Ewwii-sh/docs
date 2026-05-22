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

### Window Properties

|   Property | Description                                                              |
| ---------: | ------------------------------------------------------------------------ |
|  `monitor` | Which monitor this window should be displayed on. See below for details. |
| `geometry` | Geometry of the window.                                                  |

**`monitor` properties**

This field should be an integer, declaring the monitor index.

**`geometry` properties**

|          Property | Description                                                                                                             |
| ----------------: | ----------------------------------------------------------------------------------------------------------------------- |
|          `x`, `y` | Position of the window. Values may be provided in `px` or `%`. Will be relative to `anchor`.                            |
| `width`, `height` | Width and height of the window. Values may be provided in `px` or `%`.                                                  |
|          `anchor` | Anchor-point of the window. Either `center` or combinations of `top`, `center`, `bottom` and `left`, `center`, `right`. |
|       `resizable` | Whether to allow resizing the window or not. Eiither `true` or `false`.                                                 |

<br/>
Depending on if you are using X11 or Wayland, some additional properties exist:

#### X11

|     Property | Description                                                                                                                                                                                                                                                    |
| -----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `stacking` | Where the window should appear in the stack. Possible values: `fg`, `bg`.                                                                                                                                                                                      |
|  `wm_ignore` | Whether the window manager should ignore this window. This is useful for dashboard-style widgets that don't need to interact with other windows at all. Note that this makes some of the other properties not have any effect. Either `true` or `false`.       |
|    `reserve` | Specify how the window manager should make space for your window. This is useful for bars, which should not overlap any other windows.                                                                                                                         |
| `windowtype` | Specify what type of window this is. This will be used by your window manager to determine how it should handle your window. Possible values: `normal`, `dock`, `toolbar`, `dialog`, `desktop`. Default: `dock` if `reserve` is specified, `normal` otherwise. |

#### Wayland

|       Property | Description                                                                                                                                                              |
| -------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     `stacking` | Where the window should appear in the stack. Possible values: `fg`, `bg`, `overlay`, `bottom`.                                                                           |
|    `exclusive` | Whether the compositor should reserve space for the window automatically. Either `true` or `false`. If `true`, `:anchor` has to include `center`.                        |
|    `focusable` | Whether the window should be able to be focused. This is necessary for any widgets that use the keyboard to work. Possible values: `none`, `exclusive` and `ondemand`.   |
|    `namespace` | Set the wayland layersurface namespace ewwii uses. Accepts a `string` value.                                                                                             |
| `force_normal` | Whether the ewwii window should forcefully act normal. Either `true` or `false`. If `true`, `exclusive`, `stacking`, `namespace`, and geometry `anchor` will be ignored. |

## Your first widget

While our bar is already looking great, it's a bit boring. Thus, let's add some actual content!

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

To show this, let's replace the text in our window definition with a call to this new widget:

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

There is a lot going on here.

We are creating a component named `Greeter`. This component takes one property, called `name`. The `name` property _must_ be provided or else it will throw an error. See this for information on defining components in nbcl: [Defining Nodes in NBCL](https://nbcl-lang.github.io/docs/language-guide/nodes.html#defining-nodes).

Now inside the component, we declare the body of our widget that we are returning. We make use of a `Box`, which we set a couple properties of. This box then contains a button. In that button's `onclick` property, we refer to the provided `name` using string-interpolation syntax: `"${name}"`.

As you may have noticed, we are using a couple predefined widgets here. These are all listed and explained in the [Widgets Chapter](/docs/widgets).
