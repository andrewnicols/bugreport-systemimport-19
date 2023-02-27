# Bug reproduction

This repository is to demonstrate an issue between:

- babel-plugin-system-import-transformer; and
- babel

This issue is apparent when using moduleIds.

If the moduleIds babel configuration is configured, then the wrong file-level module name will be used whenever a dynamic import is used.

For example, the following:

```
// index.js
export default () => {
    import('./example').then((example) => console.log(example()));
};
```

Should generate a module:

```
// build/index.js
define("index", ["exports"], function(_exports) {

    // ...
    _systemImportTransformerGlobalIdentifier.require(["example"], resolve, reject);

});
```

Unfortunately the imported module name is hoisted to the top of the file and the wrong moduleId is inserted into the built file:

```
// build/index.js
define("example", ["exports"], function(_exports) {
//      ^^^^^^^ <== Should be "index"
    // ...
    _systemImportTransformerGlobalIdentifier.require(["example"], resolve, reject);

});
```
