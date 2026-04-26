# `ewwii update`

The `update` command allows you to inject global variables into the configuration
and update it whenever needed. It takes a list of variable mappings in this format: 
`foo="val1" baz="val2"`.

**Example:**

```bash
ewwii update global1="active" global2="disabled"
```