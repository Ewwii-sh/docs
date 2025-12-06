# Utility Properties & Usage

## localbind

### Properties

Each property of the localbind utility corresponds to the gtk4 property of the child widget. And each property should be passed a localsignal.

### Example

```js
let date = localsignal(#{ type: "poll", cmd: "date", interval: "1s" });

localbind(#{
    label: date
}, [
    button(#{ label: "initial" })
])
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