# `ewwii nbcl-run`

The `nbcl-run` command allows you to run an nbcl expression on your ewwii configuration context. This can be useful for triggering specific functionality in your widget configuration without updating or interacting with the GUI.

**Example:**

```bash
# Calling a function:
ewwii nbcl-run "my_function(32, 21)"

# Or more complex:
ewwii nbcl-run '
    fn tmp_fn() {
        print("Hi there!")
    }

    tmp_fn()
'
```

You can also access imports, functions, variables, etc. defined in your `ewwii.nbcl` file.
