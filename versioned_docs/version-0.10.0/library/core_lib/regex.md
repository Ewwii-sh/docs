# Regex

```nbcl
import core.regex
```

## `is_match`

> Return Type: `bool`

**Parameters:**

- text: `String`
- pattern: `String`

Check if the regex match.

**Example:**

```nbcl
import core.regex

let text = "hello world"
let pattern = "hello"

print(regex.is_match(text, pattern)) # Output: true
```

## `find`

> Return Type: `String`

**parameters:**

- text: `String`
- pattern: `String`

Find something in the given text using regex.

**Example:**

```nbcl
import core.regex

let text = "id: 12345"
let pattern = "\\d+"

print(regex.find(text, pattern)) # Output: "12345"
```

## `find_all`

> Return Type: `Array`

**parameters:**

- text: `String`
- pattern: `String`


Find all instances of something in a text using regex.

**Example:**

```nbcl
import core.regex

let text = "apples, bananas, and cherries"
let pattern = "\\w+"

print(regex.find_all(text, pattern)) # Output: ["apples", "bananas", "and", "cherries"]
```

## `replace`

> Return Type: `String`


**parameters:**

- text: `String`
- pattern: `String`

Replace things in a text using regex.

**Example:**

```nbcl
import core.regex

let text = "I love cats"
let pattern = "cats"
let replacement = "dogs"

print(regex.replace(text, pattern, replacement)) # Output: "I love dogs"
```
