'use strict';

var remarkCodeImport = require('@johnrom/remark-code-import');
var remarkCodeSnippets = require('@nmbl/remark-code-snippets');
var Slugger = require('github-slugger');
var extend = require('extend');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var remarkCodeImport__default = /*#__PURE__*/_interopDefaultLegacy(remarkCodeImport);
var Slugger__default = /*#__PURE__*/_interopDefaultLegacy(Slugger);
var extend__default = /*#__PURE__*/_interopDefaultLegacy(extend);

var own = {}.hasOwnProperty;

/**
 * Check if `node` has a set `name` property.
 *
 * @param {unknown} node
 * @param {string} name
 * @returns {boolean}
 */
function hasProperty(node, name) {
  /** @type {unknown} */
  var value =
    name &&
    node &&
    typeof node === 'object' &&
    // @ts-ignore Looks like a node.
    node.type === 'element' &&
    // @ts-ignore Looks like an element.
    node.properties &&
    // @ts-ignore Looks like an element.
    own.call(node.properties, name) &&
    // @ts-ignore Looks like an element.
    node.properties[name];

  return value !== null && value !== undefined && value !== false
}

/**
 * @typedef {import('hast').Parent} Parent
 * @typedef {import('hast').Root} Root
 * @typedef {Root|Parent['children'][number]} Node
 */

/**
 * Rank of a heading: H1 -> 1, H2 -> 2, etc.
 *
 * @param {Node} node
 * @returns {number|null}
 */
function headingRank(node) {
  var name =
    (node && node.type === 'element' && node.tagName.toLowerCase()) || '';
  var code =
    name.length === 2 && name.charCodeAt(0) === 104 /* `h` */
      ? name.charCodeAt(1)
      : 0;
  return code > 48 /* `0` */ && code < 55 /* `7` */ ? code - 48 /* `0` */ : null
}

/**
 * @fileoverview
 *   Get the plain-text value of a hast node.
 * @longdescription
 *   ## Use
 *
 *   ```js
 *   import {h} from 'hastscript'
 *   import {toString} from 'hast-util-to-string'
 *
 *   toString(h('p', 'Alpha'))
 *   //=> 'Alpha'
 *   toString(h('div', [h('b', 'Bold'), ' and ', h('i', 'italic'), '.']))
 *   //=> 'Bold and italic.'
 *   ```
 *
 *   ## API
 *
 *   ### `toString(node)`
 *
 *   Transform a node to a string.
 */

/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 * @typedef {Root|Root['children'][number]} Node
 */

/**
 * Get the plain-text value of a hast node.
 *
 * @param {Node} node
 * @returns {string}
 */
function toString(node) {
  // “The concatenation of data of all the Text node descendants of the context
  // object, in tree order.”
  if ('children' in node) {
    return all(node)
  }

  // “Context object’s data.”
  return 'value' in node ? node.value : ''
}

/**
 * @param {Node} node
 * @returns {string}
 */
function one(node) {
  if (node.type === 'text') {
    return node.value
  }

  return 'children' in node ? all(node) : ''
}

/**
 * @param {Root|Element} node
 * @returns {string}
 */
function all(node) {
  let index = -1;
  /** @type {string[]} */
  const result = [];

  while (++index < node.children.length) {
    result[index] = one(node.children[index]);
  }

  return result.join('')
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 *
 * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
 */

const convert$1 =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok$1
      }

      if (typeof test === 'string') {
        return typeFactory$1(test)
      }

      if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory$2(test) : propsFactory$1(test)
      }

      if (typeof test === 'function') {
        return castFactory$2(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  );
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory$2(tests) {
  /** @type {Array.<AssertAnything>} */
  const checks = [];
  let index = -1;

  while (++index < tests.length) {
    checks[index] = convert$1(tests[index]);
  }

  return castFactory$2(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    let index = -1;

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }

    return false
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory$1(check) {
  return castFactory$2(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    let key;

    for (key in check) {
      // @ts-expect-error: hush, it sure works as an index.
      if (node[key] !== check[key]) return false
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory$1(check) {
  return castFactory$2(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory$2(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    // @ts-expect-error: spreading is fine.
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok$1() {
  return true
}

/**
 * @param {string} d
 * @returns {string}
 */
function color$1(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('./complex-types').Action} Action
 * @typedef {import('./complex-types').Index} Index
 * @typedef {import('./complex-types').ActionTuple} ActionTuple
 * @typedef {import('./complex-types').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */

/**
 * Continue traversing as normal
 */
const CONTINUE$1 = true;
/**
 * Do not traverse this node’s children
 */
const SKIP$1 = 'skip';
/**
 * Stop traversing immediately
 */
const EXIT$1 = false;

/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test node, optional
 * @param visitor Function to run for each node
 * @param reverse Visit the tree in reverse order, defaults to false
 */
const visitParents$1 =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor<Node>} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test;
        test = null;
      }

      const is = convert$1(test);
      const step = reverse ? -1 : 1;

      factory(tree, null, [])();

      /**
       * @param {Node} node
       * @param {number?} index
       * @param {Array.<Parent>} parents
       */
      function factory(node, index, parents) {
        /** @type {Object.<string, unknown>} */
        // @ts-expect-error: hush
        const value = typeof node === 'object' && node !== null ? node : {};
        /** @type {string|undefined} */
        let name;

        if (typeof value.type === 'string') {
          name =
            typeof value.tagName === 'string'
              ? value.tagName
              : typeof value.name === 'string'
              ? value.name
              : undefined;

          Object.defineProperty(visit, 'name', {
            value:
              'node (' +
              color$1(value.type + (name ? '<' + name + '>' : '')) +
              ')'
          });
        }

        return visit

        function visit() {
          /** @type {ActionTuple} */
          let result = [];
          /** @type {ActionTuple} */
          let subresult;
          /** @type {number} */
          let offset;
          /** @type {Array.<Parent>} */
          let grandparents;

          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult$1(visitor(node, parents));

            if (result[0] === EXIT$1) {
              return result
            }
          }

          // @ts-expect-error looks like a parent.
          if (node.children && result[0] !== SKIP$1) {
            // @ts-expect-error looks like a parent.
            offset = (reverse ? node.children.length : -1) + step;
            // @ts-expect-error looks like a parent.
            grandparents = parents.concat(node);

            // @ts-expect-error looks like a parent.
            while (offset > -1 && offset < node.children.length) {
              // @ts-expect-error looks like a parent.
              subresult = factory(node.children[offset], offset, grandparents)();

              if (subresult[0] === EXIT$1) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step;
            }
          }

          return result
        }
      }
    }
  );

/**
 * @param {VisitorResult} value
 * @returns {ActionTuple}
 */
function toResult$1(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE$1, value]
  }

  return [value]
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */

/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test, optional
 * @param visitor Function to run for each node
 * @param reverse Fisit the tree in reverse, defaults to false
 */
const visit$1 =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        visitor = test;
        test = null;
      }

      visitParents$1(tree, test, overload, reverse);

      /**
       * @param {Node} node
       * @param {Array.<Parent>} parents
       */
      function overload(node, parents) {
        const parent = parents[parents.length - 1];
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        )
      }
    }
  );

/**
 * @typedef {import('hast').Root} Root
 */

const slugs = new Slugger__default["default"]();

/**
 * Plugin to add `id`s to headings.
 *
 * @type {import('unified').Plugin<[], Root>}
 */
function rehypeSlug() {
  return (tree) => {
    slugs.reset();

    visit$1(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        node.properties.id = slugs.slug(toString(node));
      }
    });
  }
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('hast').Element} Element
 *
 * @typedef {string} TagName
 * @typedef {null|undefined|TagName|TestFunctionAnything|Array.<TagName|TestFunctionAnything>} Test
 */

const convertElement =
  /**
   * @type {(
   *   (<T extends Element>(test: T['tagName']|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return element
      }

      if (typeof test === 'string') {
        return tagNameFactory(test)
      }

      if (typeof test === 'object') {
        return anyFactory$1(test)
      }

      if (typeof test === 'function') {
        return castFactory$1(test)
      }

      throw new Error('Expected function, string, or array as test')
    }
  );

/**
 * @param {Array.<TagName|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory$1(tests) {
  /** @type {Array.<AssertAnything>} */
  const checks = [];
  let index = -1;

  while (++index < tests.length) {
    checks[index] = convertElement(tests[index]);
  }

  return castFactory$1(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    let index = -1;

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) {
        return true
      }
    }

    return false
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s tag
 * name for said string.
 *
 * @param {TagName} check
 * @returns {AssertAnything}
 */
function tagNameFactory(check) {
  return tagName

  /**
   * @param {unknown} node
   * @returns {boolean}
   */
  function tagName(node) {
    return element(node) && node.tagName === check
  }
}

/**
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory$1(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {unknown} node
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(node, ...parameters) {
    // @ts-expect-error: fine.
    return element(node) && Boolean(check.call(this, node, ...parameters))
  }
}

/**
 * Utility to return true if this is an element.
 * @param {unknown} node
 * @returns {node is Element}
 */
function element(node) {
  return Boolean(
    node &&
      typeof node === 'object' &&
      // @ts-expect-error Looks like a node.
      node.type === 'element' &&
      // @ts-expect-error Looks like an element.
      typeof node.tagName === 'string'
  )
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 *
 * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
 */

const convert =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  );
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory(tests) {
  /** @type {Array.<AssertAnything>} */
  const checks = [];
  let index = -1;

  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    let index = -1;

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }

    return false
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory(check) {
  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    let key;

    for (key in check) {
      // @ts-expect-error: hush, it sure works as an index.
      if (node[key] !== check[key]) return false
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    // @ts-expect-error: spreading is fine.
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok() {
  return true
}

/**
 * @param {string} d
 * @returns {string}
 */
function color(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('./complex-types').Action} Action
 * @typedef {import('./complex-types').Index} Index
 * @typedef {import('./complex-types').ActionTuple} ActionTuple
 * @typedef {import('./complex-types').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */

/**
 * Continue traversing as normal
 */
const CONTINUE = true;
/**
 * Do not traverse this node’s children
 */
const SKIP = 'skip';
/**
 * Stop traversing immediately
 */
const EXIT = false;

/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test node, optional
 * @param visitor Function to run for each node
 * @param reverse Visit the tree in reverse order, defaults to false
 */
const visitParents =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor<Node>} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test;
        test = null;
      }

      const is = convert(test);
      const step = reverse ? -1 : 1;

      factory(tree, null, [])();

      /**
       * @param {Node} node
       * @param {number?} index
       * @param {Array.<Parent>} parents
       */
      function factory(node, index, parents) {
        /** @type {Object.<string, unknown>} */
        // @ts-expect-error: hush
        const value = typeof node === 'object' && node !== null ? node : {};
        /** @type {string|undefined} */
        let name;

        if (typeof value.type === 'string') {
          name =
            typeof value.tagName === 'string'
              ? value.tagName
              : typeof value.name === 'string'
              ? value.name
              : undefined;

          Object.defineProperty(visit, 'name', {
            value:
              'node (' +
              color(value.type + (name ? '<' + name + '>' : '')) +
              ')'
          });
        }

        return visit

        function visit() {
          /** @type {ActionTuple} */
          let result = [];
          /** @type {ActionTuple} */
          let subresult;
          /** @type {number} */
          let offset;
          /** @type {Array.<Parent>} */
          let grandparents;

          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents));

            if (result[0] === EXIT) {
              return result
            }
          }

          // @ts-expect-error looks like a parent.
          if (node.children && result[0] !== SKIP) {
            // @ts-expect-error looks like a parent.
            offset = (reverse ? node.children.length : -1) + step;
            // @ts-expect-error looks like a parent.
            grandparents = parents.concat(node);

            // @ts-expect-error looks like a parent.
            while (offset > -1 && offset < node.children.length) {
              // @ts-expect-error looks like a parent.
              subresult = factory(node.children[offset], offset, grandparents)();

              if (subresult[0] === EXIT) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step;
            }
          }

          return result
        }
      }
    }
  );

/**
 * @param {VisitorResult} value
 * @returns {ActionTuple}
 */
function toResult(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE, value]
  }

  return [value]
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 * @typedef {import('./complex-types').Visitor} Visitor
 */

/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test, optional
 * @param visitor Function to run for each node
 * @param reverse Fisit the tree in reverse, defaults to false
 */
const visit =
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: import('./complex-types').BuildVisitor<Tree, Check>, reverse?: boolean) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: import('./complex-types').BuildVisitor<Tree>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * @param {Node} tree
     * @param {Test} test
     * @param {import('./complex-types').Visitor} visitor
     * @param {boolean} [reverse]
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        visitor = test;
        test = null;
      }

      visitParents(tree, test, overload, reverse);

      /**
       * @param {Node} node
       * @param {Array.<Parent>} parents
       */
      function overload(node, parents) {
        const parent = parents[parents.length - 1];
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        )
      }
    }
  );

/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Parent} Parent
 * @typedef {import('hast').Element} Element
 * @typedef {Element['children'][number]} ElementChild
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast-util-is-element').Test} Test
 *
 * @typedef {'prepend'|'append'|'wrap'|'before'|'after'} Behavior
 *
 * @callback Build
 * @param {Element} node
 * @returns {ElementChild|ElementChild[]}
 *
 * @typedef Options
 *   Configuration.
 * @property {Behavior} [behavior='prepend']
 *   How to create links.
 * @property {Behavior} [behaviour]
 *   Please use `behavior` instead
 * @property {Properties} [properties]
 *   Extra properties to set on the link when injecting.
 *   Defaults to `{ariaHidden: true, tabIndex: -1}` when `'prepend'` or
 *   `'append'`.
 * @property {ElementChild|ElementChild[]|Build} [content={type: 'element', tagName: 'span', properties: {className: ['icon', 'icon-link']}, children: []}]
 *   hast nodes to insert in the link.
 * @property {ElementChild|ElementChild[]|Build} [group]
 *   hast node to wrap the heading and link with, if `behavior` is `'before'` or
 *   `'after'`.
 *   There is no default.
 * @property {Test} [test]
 *   Test to define which heading elements are linked.
 *   Any test that can be given to `hast-util-is-element` is supported.
 *   The default (no test) is to link all headings.
 *   Can be used to link only h1-h3, or for example all except h1.
 */

/** @type {Element} */
const contentDefaults = {
  type: 'element',
  tagName: 'span',
  properties: {className: ['icon', 'icon-link']},
  children: []
};

/**
 * Plugin to automatically add links to headings (h1-h6).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
function rehypeAutolinkHeadings(options = {}) {
  let props = options.properties;
  const behavior = options.behaviour || options.behavior || 'prepend';
  const content = options.content || contentDefaults;
  const group = options.group;
  const is = convertElement(options.test);

  /** @type {import('unist-util-visit').Visitor<Element>} */
  let method;

  if (behavior === 'wrap') {
    method = wrap;
  } else if (behavior === 'before' || behavior === 'after') {
    method = around;
  } else {
    if (!props) {
      props = {ariaHidden: 'true', tabIndex: -1};
    }

    method = inject;
  }

  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (
        headingRank(node) &&
        hasProperty(node, 'id') &&
        is(node, index, parent)
      ) {
        return method(node, index, parent)
      }
    });
  }

  /** @type {import('unist-util-visit').Visitor<Element>} */
  function inject(node) {
    node.children[behavior === 'prepend' ? 'unshift' : 'push'](
      create(node, extend__default["default"](true, {}, props), toChildren(content, node))
    );

    return [SKIP]
  }

  /** @type {import('unist-util-visit').Visitor<Element>} */
  function around(node, index, parent) {
    // Uncommon.
    /* c8 ignore next */
    if (typeof index !== 'number' || !parent) return

    const link = create(
      node,
      extend__default["default"](true, {}, props),
      toChildren(content, node)
    );
    let nodes = behavior === 'before' ? [link, node] : [node, link];

    if (group) {
      const grouping = toNode(group, node);

      if (grouping && !Array.isArray(grouping) && grouping.type === 'element') {
        grouping.children = nodes;
        nodes = [grouping];
      }
    }

    parent.children.splice(index, 1, ...nodes);

    return [SKIP, index + nodes.length]
  }

  /** @type {import('unist-util-visit').Visitor<Element>} */
  function wrap(node) {
    node.children = [create(node, extend__default["default"](true, {}, props), node.children)];
    return [SKIP]
  }

  /**
   * @param {ElementChild|ElementChild[]|Build} value
   * @param {Element} node
   * @returns {ElementChild[]}
   */
  function toChildren(value, node) {
    const result = toNode(value, node);
    return Array.isArray(result) ? result : [result]
  }

  /**
   * @param {ElementChild|ElementChild[]|Build} value
   * @param {Element} node
   * @returns {ElementChild|ElementChild[]}
   */
  function toNode(value, node) {
    if (typeof value === 'function') return value(node)
    return extend__default["default"](true, Array.isArray(value) ? [] : {}, value)
  }

  /**
   * @param {Element} node
   * @param {Properties} props
   * @param {ElementChild[]} children
   * @returns {Element}
   */
  function create(node, props, children) {
    return {
      type: 'element',
      tagName: 'a',
      properties: Object.assign({}, props, {
        // Fix hast types and make them required.
        /* c8 ignore next */
        href: '#' + (node.properties || {}).id
      }),
      children
    }
  }
}

module.exports = {
  siteMetadata: {
    siteUrl: 'https://codesnip.local',
    title: 'Nmbl Code Snippets - Documentation',
  },
  plugins: [
    // @snippet:start gatsby-plugin-mdx
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        remarkPlugins: [
          [
            remarkCodeImport__default["default"],
            {
              async: true,
              basePath: process.cwd(),
            },
          ],
          [remarkCodeSnippets.RemarkPluginCodeSnippets, {}],
        ],
        rehypePlugins: [
          // Generate heading ids for rehype-autolink-headings
          rehypeSlug,
          // To pass options, use a 2-element array with the
          // configuration in an object in the second element
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    },
    // @snippet:end gatsby-plugin-mdx
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
      __key: 'content',
    },
  ],
};
