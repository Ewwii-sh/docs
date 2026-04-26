# Utility Properties & Usage

## gtk_ui

### Properties

- `file`: `string` path to the Gtk .ui file to load
- `id`: `string` id of the widget to load

### Example

```js
gtk_ui("./example.ui", "my_button")
```

## widget_control

- `trigger`: `localsignal` triggered when localsignal prints something
- `actions`: `array` an array of strings with desired action

### Actions

- `add-class`: add a class to child widget (e.g. `add-class example`)
- `remove-class`: remove a class from child widget (e.g. `remove-class example`)
- `set-property`: set a property of child widget (e.g. `set-property label Hello`)

### Example

```js
// widget_control is triggered when localsingal prints anything
let time = localsignal(#{ type: "poll", cmd: "echo", interval: "1s" });

widget_control(#{
    trigger: time,
    actions: ["add-class highlight", "set-property label 'Hello, World'"]
}, [
    button(#{ label: "initial" })
])
```