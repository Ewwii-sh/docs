# Styling Widgets

## In-Line

Ewwii allows writing inline styles to widgets using the `style` property. These styles are then applied at runtime using GTK's CSS system.

**Example:**

```nbcl
# This example makes the text color of all child
# widgets of box to black and sets the background 
# color of the box to white 
# (`#fff` is the hexadecimal for white).

Box {
  style = "color: black; background-color: #fff;"

  Label {
    text = "baz"
  }
}
```

## (S)CSS

To style a widget in (s)css, you can give that widget a class and access it using its class in (s)css.

```nbcl
Box {
  class = "my-box"

  Label {
    text = "baz"
  }
}
```

This box is given the class `my-box`, and it can be accessed like so in (s)css:

```css
.my-box {
    color: black;
    background-color: white;
}
```
