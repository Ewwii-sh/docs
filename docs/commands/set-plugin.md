# `ewwii set-plugin`

The `set-plugin` command allows users to load compiled shared libraries directly into ewwii for modifying its functionality.

**Example:**

```bash
# load the plugin at a specified path
ewwii set-plugin ./path/to/mylib.so
```

There can only be one plugin loaded into a daemon. Once a library is loaded, there is no way to unload it without killing the daemon.