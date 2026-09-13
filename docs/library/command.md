# Command

```nbcl
import ewwii.command
```

## `run`

> Return Type: `None`

Run a command.

**Example:**

```nbcl
import ewwii.command
command.run("notify-send hi")
```

## `run_and_read`

> Return Type: `String`

Run a command and read the output.

**Example:**

```nbcl
import ewwii.command
let stdout = command.run_and_read("echo Hello")
print(stdout)
```
