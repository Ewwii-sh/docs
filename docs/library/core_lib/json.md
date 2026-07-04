# Json

```nbcl
import core.json
```

## `parse`

> Return Type: `Map`

**Parameters:**

- json: `String`

Parse a json string into a map.

**Example:**

```nbcl 
import core.json 

let str_json = '{ "key": "value" }'
print(json.parse(str_json))
```

## `stringify`

> Return Type: `String`

**Parameters:**

- map: `Map`

Get a json string from a map.

**Example:**

```nbcl
import core.json

let map = { key = "value" }
print(json.stringify(map))
```
