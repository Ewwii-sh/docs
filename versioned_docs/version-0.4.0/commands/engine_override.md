# `ewwii engine-override`

The `engine-override` command allows you to override the default functionalities of the ewwii engine on a particular daemon. It requires a JSON string passed to it, which it will use to update the settings. This feature can be changed to get maximum performance as well.

## Keys And Values

Before using this command, we should we familiar with the key-value pairs that it expects. This section will cover all the things that you can customize in ewwii's runtime engine.

### `optimization_level`

The optimizations applied on your configuration. You may pass either `0`, `1`, or `2` as the value of this key.

- `0`: No optimizations
- `1`: Simple optimizations (default)
- `2`: Full optimizations

:::danger
Full optimizations may cause your configuration to behave unpredictably on certain scinarios. Always verify that your configuration is working as expected or stay with simple optimizations.
:::

### `batching_interval`

How long the engine should wait to gather update request from poll/listen handlers. You may pass an integer which represents a duration in milliseconds. For example, `100` for 100 millisecond. The default value is `16`.

:::note
A duration of `0` millisecond will effectively disable batching. Though more performant, resource usage may increase.
:::

## Example

```bash
# Low Resource Usage oriented override
ewwii engine-override '{ "optimization_level": 2, "batching_interval": 100 }'

# Performance oriented override
ewwii engine-override '{ "optimization_level": 2, "batching_interval": 0 }'
```
