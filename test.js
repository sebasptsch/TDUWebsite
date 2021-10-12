var { Node } = require("slate");

const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

console.log(
  serialize([{ type: "paragraph", children: [{ text: "This is a test" }] }])
);
