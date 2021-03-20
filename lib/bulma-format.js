const visit = require("unist-util-visit-parents");

module.exports = () => (tree, file) => {
  visit(tree, "heading", (node, ancestors) => {
    let { depth } = node;
    node.data = {
      hProperties: { class: `title is-${depth}` },
    };
  });

  visit(tree, "blockquote", (node, ancestors) => {
    const div = {
      type: "section",
      data: {
        hName: "div",
        hProperties: { class: "content" },
      },
      children: [node],
    };
    const parent = ancestors[ancestors.length - 1];
    const startIndex = parent.children.indexOf(node);
    parent.children.splice(startIndex, 1, div);
  });

  visit(tree, "list", (node, ancestors) => {
    const div = {
      type: "section",
      data: {
        hName: "div",
        hProperties: { class: "content" },
      },
      children: [node],
    };
    const parent = ancestors[ancestors.length - 1];
    const startIndex = parent.children.indexOf(node);
    parent.children.splice(startIndex, 1, div);
  });

  visit(tree, "paragraph", (node, ancestors) => {
    if (ancestors[ancestors.length - 1].type === "root") {
      node.data = {
        hProperties: { class: "content" },
      };
    }
  });

  visit(tree, "table", (node, ancestors) => {
    node.data = {
      hProperties: { class: `table` },
    };
  });
};
