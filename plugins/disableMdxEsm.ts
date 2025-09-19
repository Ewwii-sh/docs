import type { Plugin } from "unified";

const disableMdxEsm: Plugin = () => {
  return {
    micromarkExtensions: [],
    fromMarkdown: {
      extensions: [],
      mdastExtensions: [],
    },
  } as any;
};

export default disableMdxEsm;
