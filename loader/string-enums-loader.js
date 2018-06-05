"use strict"

let ts = require('typescript');

const printer = ts.createPrinter();

function nodeIsInitialized(node) {
  return node.initializer != undefined && node.initializer != null;
}

function initializeNodeWithString(node) {
  return ts.updateEnumMember(node, node.name, ts.createLiteral(node.name.escapedText));
}

const transformer = (context) => (rootNode) => {
  const visitWrapper = (insideEnum) => (node) => {
    if(insideEnum && ts.isEnumMember(node) && !nodeIsInitialized(node)){
      return initializeNodeWithString(node);
    }
    return ts.visitEachChild(node, visitWrapper(ts.isEnumDeclaration(node)), context);
  }
  return ts.visitNode(rootNode, visitWrapper(false));
}

function load(content){
  const sourceFile = ts.createSourceFile('enums.ts', content, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
  const result = ts.transform(
    sourceFile, [ transformer ]
  );
  return printer.printFile(result.transformed[0]);
}

module.exports = load;
