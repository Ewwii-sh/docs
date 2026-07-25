---
sidebar_position: 2
---

# Configuration

This section introduces you to the configuration language of ewwii, [Nbcl](https://nbcl-lang.github.io). It is **very** simple configuration language in which you can do scripting as well. With nbcl, you can declare the structure and content of your widgets, the geometry, position, the behavior of windows, etc. in a node based syntax.

Additionally, any styles are defined in CSS or SCSS (which is mostly just slightly improved CSS syntax).
While ewwii supports a significant portion of the CSS you know from the web, not everything is supported, as ewwii relies on GTK's own CSS engine. Notably, some animation features are unsupported, as well as most layout-related CSS properties such as flexbox, `float`, absolute position or `width`/`height`.


:::info
You can make use of the nbcl tooling to get syntax highlighting and more!

- If you're using vim/nvim, you can make use of [vim-nbcl](https://github.com/NBCL-Lang/vim-nbcl) for editor support.
- If you're using VSCode, you can get syntax highlighting and formatting from [vscode-nbcl](https://github.com/NBCL-Lang/vscode-nbcl).
:::
