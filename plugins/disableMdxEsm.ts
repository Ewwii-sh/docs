import type { Plugin } from "unified";
import type { Root } from "mdast";

/**
 * Remark plugin that prevents fenced code blocks (```js)
 * from being parsed as MDX ESM.
 */
const disableMdxEsm: Plugin<[], Root> = () => {
  return (tree) => {
    tree.children.forEach((node: any) => {
      if (node.type === "mdxjsEsm") {
        // Convert it into a code block instead of executable JS
        node.type = "code";
        node.lang = "js";
        node.value = node.value ?? "";
      }
    });
  };
};

export default disableMdxEsm;
