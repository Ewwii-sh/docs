# `ewwii widget-control`

The `widget-control` command is built for controlling/manipulating widgets through the terminal directly.

**This command supports:**

- Removal of widgets
- Creation of widgets
- Property update of widgets
- Removal of classes of widgets
- Addition of class to widgets

These features are especially useful when dynamic content and performance are critical.

## Commands

### `remove`

Remove one or more widgets by name.

```bash
ewwii widget-control remove <NAME>...
```

**Example**

```bash
# Remove a single widget
ewwii widget-control remove sidebar

# Remove multiple widgets
ewwii widget-control remove popup1 popup2
```


### `create`

Create widgets dynamically under a given parent widget.
Widget definitions are passed as inline Rhai snippets.

```bash
ewwii widget-control create --parent <PARENT_NAME> <RHAI_CODES>...
```

**Example**

```bash
# Create a button inside the widget named "awesome_box"
ewwii widget-control create \
    --parent awesome_box \
    'button(#{ label: "Click Me", widget_name: "btn1" })'
```

Multiple definitions can be passed in one call:

```bash
ewwii widget-control create --parent awesome_box \
    'label(#{ text: "CPU" })' \
    'button(#{ label: "Click Me", widget_name: "btn1" })'
```

### `property-update`

Update one or more properties on a widget.

The syntax follows a simple key/value assignment format:

```
value="..." other_property="..."
```

At least one property must be provided.

```bash
ewwii widget-control property-update \
    --widget <WIDGET_NAME> \
    'prop1="value1" prop2="value2"'
```

**Example**

```bash
ewwii widget-control property-update \
    --widget clock \
    'label="12:38 PM" tooltip="Local Time"'
```

### `add-class`

Attach a CSS class to a widget.

```bash
ewwii widget-control add-class --widget <WIDGET_NAME> <CLASS>
```

**Example**

```bash
ewwii widget-control add-class --widget notif highlight
```



### `remove-class`

Remove a CSS class from a widget.

```bash
ewwii widget-control remove-class --widget <WIDGET_NAME> <CLASS>
```

**Example**

```bash
ewwii widget-control remove-class --widget notif highlight
```
