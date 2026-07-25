# Linux API

```nbcl
import api.linux
```

## `get_kernel_version`

> Return Type: `String`

Get the version of the Linux Kernel.

**Example:**

```nbcl
import api.linux
print(linux.get_kernel_version())
```

## `get_battery_perc`

> Return Type: `Int`

Get the battery percentage.

**Example:**

```nbcl
import api.linux
print(linux.get_battery_perc())
```

## `get_cpu_info`

> Return Type: `Array<Map>`

Get information about the CPU.

**Example:**

```nbcl
import api.linux
let cpus = linux.get_cpu_info()
let first_cpu = cpus[0]

let core_id = first_cpu.core_id # int
let model = first_cpu.model     # string

print(core_id)
print(model)
```

## `get_ram_info`

> Return Type: `Map`

Get information about RAM.

**Example:**

```nbcl
import api.linux
let ram = linux.get_ram_info()

# all are in kilobytes (int)
let total     = ram.total_kb
let free      = ram.free_kb
let available = ram.available_kb
let used      = ram.used_kb
```

## `get_gpu_info`

> Return Type: `Array<Map>`

Get information about GPU.

**Example:**

```nbcl
import api.linux
let gpus = linux.get_gpu_info()
let first_gpu = gpus[0]

let sys_name = first_gpu.sys_name  # string
let model    = first_gpu.model     # string
let vendor   = first_gpu.vendor    # string
let memory   = first_gpu.memory_kb # int
```

## `get_disk_info`

> Return Type: `Map`

Get information about the disk.

**Example:**

```nbcl
import api.linux
let disk = linux.get_disk_info()

# device name (string)
let device = disk.device

# all are in kilobytes (int)
let total = disk.total_kb
let used  = disk.used_kb
let free  = disk.free_kb
```

