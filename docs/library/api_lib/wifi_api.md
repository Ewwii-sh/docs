# Wifi API


```nbcl
import api.wifi
```


## `scan`

> Return Type: `Array<Map>`

Scan for wifi.

**Example:**

```nbcl
import api.wifi
let wifi_found = wifi.scan()
let first_wifi = wifi_found[0]

# all are string
let ssid     = first_wifi.ssid
let signal   = first_wifi.signal
let security = first_wifi.security
```

## `current_connection`

> Return Type: `Map`

Information about the wifi connected to right now.

**Example:**

```nbcl
import api.wifi
let wifi_found = wifi.current_connection()

# all are string
let ssid     = wifi.ssid
let signal   = wifi.signal
let security = wifi.security
```

## `connect`

> Return Type: `None`

**Parameters:**

- ssid: `String`
- password: `String`

Connect to a wifi network.

**Example:**

```nbcl
import api.wifi
wifi.connect("home_wifi", "home123")
```

## `connect_without_password`

> Return Type: `None`

**Parameters:**

- ssid: `String`

Connect to a wifi network without password by relying on previous connection memory.


**Example:**

```nbcl
import api.wifi
wifi.connect("home_wifi")
```

## `disconnect`

> Return Type: `None`

Disconnect from the currently connected wifi.

**Example:**

```nbcl
import api.wifi
wifi.disconnect()
```

## `disable_adapter`

> Return Type: `None`

Disable the wifi adapter.

**Example:**

```nbcl
import api.wifi
wifi.disable_adapter()
```

## `enable_adapter`

> Return Type: `None`

Enable the wifi adapter.

**Example:**

```nbcl
import api.wifi
wifi.enable_adapter()
```

## `get_adapter_connectivity`

> Return Type: `String`

Get the adapters connectivity.

**Example:**

```nbcl
import api.wifi
print(wifi.get_adapter_connectivity())
```

