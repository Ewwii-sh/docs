# Window Properties

Window properties in ewwii are divided into three: 

- **General Properties:** Properties that work regardless of environment.
- **X11 Properties:** Properties that are exclusive to x11.
- **Wayland Properties:** Properties that are exclusive to wayland.

## General Properties

|   Property | Description                                                              |
| ---------: | ------------------------------------------------------------------------ |
|  `monitor` | Which monitor this window should be displayed on. Must be an integer declaring the monitor index. |
| `geometry` | Geometry of the window.                                                  |
| `waited_close` | Close after `x` duration. |
| `passinput` | Whether to allow passing inputs (mouse interactions) through this widget. Accepts either `true` or `false`. |

### `geometry` Properties

Geometry is a special property which holds further properties under it. It pretty much acts like a namespace. Since it can be confusing,
an example is shown below the *property-description* table.

|          Property | Description                                                                                                             |
| ----------------: | ----------------------------------------------------------------------------------------------------------------------- |
|          `x`, `y` | Position of the window. Values may be provided in `px` or `%`. Will be relative to `anchor`.                            |
| `width`, `height` | Width and height of the window. Values may be provided in `px` or `%`.                                                  |
|          `anchor` | Anchor-point of the window. Either `center` or combinations of `top`, `center`, `bottom` and `left`, `center`, `right`. The anchor must be provided in the `"<y> <x>"` format. For example, `"center left"` to center it vertically, and place it left horizontally. |
|       `resizable` | Whether to allow resizing the window or not. Eiither `true` or `false`.                                                 |

**Example:**

```nbcl
Window "example" {
    geometry = {
        width = "100%"
        height = "20px"
        anchor = "top center" 
    }
}
```

## X11 Exclusive Properties

> Properties that work only on x11.

|     Property | Description                                                                                                                                                                                                                                                    |
| -----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `stacking` | Where the window should appear in the stack. Possible values: `fg`, `bg`.                                                                                                                                                                                      |
|  `wm_ignore` | Whether the window manager should ignore this window. This is useful for dashboard-style widgets that don't need to interact with other windows at all. Note that this makes some of the other properties not have any effect. Either `true` or `false`.       |
|    `reserve` | Specify how the window manager should make space for your window. This is useful for bars, which should not overlap any other windows. |
| `windowtype` | Specify what type of window this is. This will be used by your window manager to determine how it should handle your window. Possible values: `normal`, `dock`, `toolbar`, `dialog`, `desktop`. Default: `dock` if `reserve` is specified, `normal` otherwise. |

### `reserve` Properties

Just like `geometry`, `reserve` is also a special property which can hold further properties under it. An example is shown for this too.

| Property | Description | 
| -------- |  ----------- |
| `distance` | The distance to reserve. Either `px` or `%`. |
| `side` | On which side to reserve space. |

**Example:**

```nbcl
Window "example" {
    reserve = {
        distance = "4%"
        side = "left"
    }
}
```

## Wayland Exclusive Properties

> Properties that work only on wayland.

|       Property | Description                                                                                                                                                              |
| -------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     `stacking` | Where the window should appear in the stack. Possible values: `fg`, `bg`, `overlay`, `bottom`.                                                                           |
|    `exclusive` | Whether the compositor should reserve space for the window automatically. Either `true` or `false`. If `true`, `anchor` property has to include `center`.                        |
|    `focusable` | Whether the window should be able to be focused. This is necessary for any widgets that use the keyboard to work. Possible values: `none`, `exclusive` and `ondemand`.   |
|    `namespace` | Set the wayland layersurface namespace ewwii uses. Accepts a `string` value.                                                                                             |
| `force_normal` | Whether the ewwii window should forcefully act normal. Either `true` or `false`. If `true`, `exclusive`, `stacking`, `namespace`, and geometry `anchor` will be ignored. |


