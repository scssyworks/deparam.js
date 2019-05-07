# JQuery deparam
JQuery deparam is a lightweight plugin that converts querystring to a JavaScript object

# Installation
```
npm install --save jquerydeparam
```

# Usage

### ES6
```js
import deparam from 'jquerydeparam';
deparam(...);
```

### CommonJS
```js
const deparam = require('jquerydeparam');
deparam(...);
```

### Browser
```js
deparam(...);
```

### As JQuery plugin
```js
import $ from 'jquery';
import 'jquerydeparam';
$.deparam(...);
```

<b>Note:</b> JQuery deparam is dependent on jquery. Therefore, if the package throws an error, you know what to do!

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
