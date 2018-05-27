# JQuery deparam
JQuery Deparam is a lightweight plugin that converts querystring to a JavaScript object

# Installation
```
npm install jquerydeparam
```

# How it works?
JQuery deparam converts simple and complex query strings into JavaScript objects. Examples are shown below:

<b>#1 Simple query</b>
```js
var query = key1=value1&key2=value2;
console.log($.deparam(query));
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
var query = flag=true&arr[]=Hello&arr[]=World&ob[key1]=value1&ob[key2]=value2;
console.log($.deparam(query));
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
