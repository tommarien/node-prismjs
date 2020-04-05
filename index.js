'use strict';

const fs = require('fs');
const path = require('path');

function uniq(arr) {
  const set = arr.reduce((set, item) => {
    set[item] = true;
    return set;
  }, {});
  return Object.keys(set);
}

const prismCore = 'prismjs/components/prism-core';
const Prism = require(prismCore);

const prelude = [
  'prism-clike', 'prism-markup', 'prism-javascript', 'prism-typescript',
  'prism-c', 'prism-ruby', 'prism-css', 'prism-cpp', 'prism-java', 'prism-javadoclike', 'prism-sql', 'prism-turtle', 'prism-t4-templating', 'prism-markup-templating',
];
const prismComponents = path.dirname(require.resolve(prismCore));
const components = prelude.concat(fs.readdirSync(prismComponents))
        .map((component) => component.replace(/(\.min)?\.js$/, ''));

const componentsSet = uniq(components);
componentsSet
  .forEach((component) => require(path.join(prismComponents, component)));

module.exports = Prism;
