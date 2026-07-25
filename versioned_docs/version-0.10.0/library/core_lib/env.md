# Env

```nbcl
import core.env
```

## `set_env`

> Return Type: `None`

**Parameters:**

- env: `String`
- value: `String`

Set the value of an environmental variable.

**Example:**

```nbcl
import core.env
env.set_env("FOO", "bar")
```

## `get_env`

> Return Type: `None`

**Parameters:**

- env: `String`

Get the value of an environmental variable.

**Example:**

```nbcl
import core.env
print(env.get_env("FOO"))
```

## `get_homedir`

> Return Type: `String`

Get the home directory.

**Example:**

```nbcl
import core.env
print(env.get_homedir())
```

## `get_current_dir`

> Return Type: `String`

Get the current directory.

**Example:**

```nbcl
import core.env
print(env.get_current_dir())
```

## `get_username`

> Return Type: `String`

Get the username of the user.

**Example:**

```nbcl
import core.env
print(env.get_username())
```
