# `ewwii update`

The `update` command allows you to update or create global signals that are accessible from the configuration. 
It takes a list of variable mappings in this format: `foo="val1" baz="val2"`.

:::info
A signal is just a reactive value a widget property can be bound to. `Poll`, `Listen`, and `Script`, all are signals. 
And this command allows you to update the values of these signals too.
:::

**Example:**

```bash
ewwii update global1="active" global2="disabled"
```
