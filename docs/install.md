---
sidebar_position: 1.15
---

# Installation

Ideally, you should always install ewwii from your package manager. As of right now, ewwii is only available in the AUR, so if you are an Arch Linux user, you should definitely install it from there. 

If you are **not** an Arch Linux user, you can either install it using our install script, which is linux exclusive, or compile it from source.

## Install Script

Linux users can use the following command to install ewwii through our installer:

```bash
sh -c "$(curl -fsSL https://ewwii-sh.github.io/install.sh)"
```

## Compiling from Source

Clone ewwii source code:

```bash
git clone https://github.com/ewwii-sh/ewwii
cd ewwii
```

Build ewwii:

```bash
cargo build --release
```

Move ewwii to $PATH.

```bash
cp ./target/release/ewwii ~/.local/bin/ewwii
```

:::warning
If `~/.local/bin/` is not in `$PATH`, either add it, or copy ewwii somewhere else.
:::
