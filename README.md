![GitHub package.json version](https://img.shields.io/github/package-json/v/scssyworks/deparam.js) ![GitHub](https://img.shields.io/github/license/scssyworks/deparam.js) [![Build Status](https://travis-ci.org/scssyworks/deparam.js.svg?branch=master)](https://travis-ci.org/scssyworks/deparam.js)

# Deparam.js
Deparam.js (formerly jquerydeparam) is a lightweight plugin that converts querystring to a JavaScript object

# Installation
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
```js
deparam(...);
```

# How it works?
Deparam converts simple and complex query strings into JavaScript objects. Examples are shown below:

<b>#1 Simple query</b>
```js
var query = "key1=value1&key2=value2";
console.log(deparam(query));
```
Result:
```js
{
    key1: "value1",
    key2: "value2"
}
```

<b>#2 Complex query</b>
```js
var query = "flag=true&arr[]=Hello&arr[]=World&ob[key1]=value1&ob[key2]=value2";
console.log(deparam(query));
```
Result:
```js
{
    flag: true,
    arr: [
        "Hello",
        "World"
    ],
    ob: {
        key1: "value1",
        key2: "value2"
    }
}
```
