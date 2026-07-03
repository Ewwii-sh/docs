# Styling Widgets

## Getting Started

When creating your ewwii config, always make sure to add this at the top of your (s)css file:

```css
* {
    all: unset,
}
```

It gets rid of the Gtk theming and allows you to style your own widgets.

## Styling in SCSS/CSS

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

- You can read a bit more about Gtk Theming in [Working With GTK](./working_with_gtk#gtk-theming).
- Or see [GTK CSS Properties Overview wiki](https://docs.gtk.org/gtk4/css-properties.html) directly.

## Recommended Practice

It is recommended to use variables to set styling of components. It is highly reusable and will give you an easier time.

```css
/* Example */
:root {
    --bg-surface: #1e1e2e;
    --bg-card: #252538;
    --border-color: #111111;
    --fg-bright: #cdd6f4;
    --fg-default: #a6adc8;
    --fg-muted: #bac2de;
    --accent: #cba6f7;
    --critical: #f38ba8;
    --success: #a6e3a1;
}
```

Following the same naming is also recommended (optional) as Ewwii plugins related with CSS are likely to follow 
the same naming convention.
