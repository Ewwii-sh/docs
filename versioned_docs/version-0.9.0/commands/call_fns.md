# `ewwii call-fns`

The `call-fns` command allows you to call **Nbcl functions** directly from the terminal. 

**Example:**

```bash
# Call a single Nbcl function
ewwii call-fns "my_function(32, 21)"

# Call multiple functions
ewwii call-fns "first_function('string')" "second_function()"
```

This will execute the specified functions in the context of your current configuration.
