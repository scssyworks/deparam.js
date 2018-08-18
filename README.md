# JQuery deparam
JQuery deparam is a lightweight plugin that converts querystring to a JavaScript object

# Installation
```
npm install --save jquerydeparam
```

# Usage
JQuery deparam can be imported as an ES6 or CommonJS module, or you can include it as a separate script and use it globally or with jQuery. If jQuery is available in global scope, you can use the following syntax:

```js
$.deparam(...);
```

As a separate module you can import it using ES6 import or CommonJS require:

ES6
```js
import deparam from "jquerydeparam";
deparam(...);
```

CommonJS
```js
const deparam = require('jquerydeparam');
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
