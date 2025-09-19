/**
 * Remark plugin that prevents fenced code blocks (```js)
 * from being parsed as MDX ESM.
 */
function disableMdxEsm() {
  return (tree) => {
    tree.children.forEach((node) => {
      if (node.type === "mdxjsEsm") {
        node.type = "code";
        node.lang = "js";
        node.value = node.value || "";
      }
    });
  };
}

module.exports = disableMdxEsm;
