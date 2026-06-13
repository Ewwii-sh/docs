# Command

```nbcl
import core.command
```

## `run`

> Return Type: `None`

Run a command.

**Example:**

```nbcl
import core.command
command.run("notify-send hi")
```

## `run_and_read`

> Return Type: `String`

Run a command and read the output.

**Example:**

```nbcl
import core.command
command.run_and_read("echo Hello")
```
