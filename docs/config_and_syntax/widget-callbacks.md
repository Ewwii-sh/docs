---
sidebar_position: 2.6
---

# Widget Events

Some widgets like `Button`, `EventBox`, etc. support *events*. You may be wondering what an event is now.
An event is something that happens when you do an action like a mouse click.

Let's take `Button` for example. When you click a button, it emits a `onclick` event. And the command attached to this
event will be triggered. Here is an example in code:

```nbcl
# When you click this, you receive a notification:
# "Hello"
Button {
    onclick = "notify-send Hello"
}
```

These events only accept a bash command as input in the string form. 

## Event Arguments

Some widgets can pass arguments to an event when triggering its command. The arguments are in the form `{n}`, where `n` stands for a number. 
Let's take the `Scale` widget's `onchange` property for example.

The scale widget passes two arguments when triggering the `onchange` event:

- `{0}`: The current value (as float).
- `{1}`: The current valeu (as integer).

```nbcl
Scale {
    min = 0
    max = 101
    onchange = "notify-send {0}"
}
```

Now when you slide the scale, you will receive a notification of the current value of the scale as a floating-point number (decimal number).

:::note
`{}` is also a valid way of retreiving an argument. It has the same effect as `{0}`.
:::

## NBCL Callback

Although events only accept bash strings, the built-in `nbcl` function can be used to make the widget run the NBCL code
instead of the a bash string. The `nbcl` function accepts a lambda function as its first and only argument. This is the
lambda that is called when the event is triggered.

```nbcl
Button {
    onclick = nbcl(|| {
        print("Hello, World!")
    })
}
```

Now when you click this button, the the widget will run the NBCl code and print `"Hello, World!"` in the logs.

:::info 
For the nerds who are curious how `nbcl` function bypasses the bash only requirement, it simply doesn't. It makes use of the
[nbcl-run](../commands/nbcl_run.md) command, and provides a simpler, in-config interface for it.
:::
