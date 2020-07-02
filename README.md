![GitHub package.json version](https://img.shields.io/github/package-json/v/scssyworks/deparam.js) ![GitHub](https://img.shields.io/github/license/scssyworks/deparam.js) [![Build Status](https://travis-ci.org/scssyworks/deparam.js.svg?branch=master)](https://travis-ci.org/scssyworks/deparam.js)

# Deparam.js
Deparam.js is a lightweight query string to JavaScript object converter

# Install
```sh
npm install --save deparam.js
```

# Usage

### ES6
```js
import deparam from 'deparam.js';
deparam(...);
```

### CommonJS
```js
const deparam = require('deparam.js');
deparam(...);
```

### Browser
```html
<script src="deparam.js"></script>
<script>
  deparam(...);
</script>
```

# How it works?

Deparam can convert simple as well as complex query strings to regular JavaScript objects. Examples are shown below:

## Simple string

```js
deparam('?a=10&b=helloworld'); // --> { a: 10, b: 'helloworld'}
```

## Complex string
```js
deparam('a=10&a=20&b=test&c=test2&x[]=45&x[]=99&y[a]=22&y[b]=33'); 

// --> { a: [10, 20], b: 'test', c: 'test2', x: [99, 22], y: { a: 22, b: 33 } }
```

## Disable type coercion

Deparam enables type coercion by default. However this can have performance implications and it's better to disable it. You can do so by passing a flag.

```js
deparam('a=10&b=20', false); // --> { a: '10', b: '20' }
```