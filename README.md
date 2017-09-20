# JQuery deparam
JQuery Deparam is a lightweight plugin to convert querystring into a JavaScript object

# Installation
<pre><code>npm install jquerydeparam</code></pre>
<pre><code>bower install jquerydeparam</code></pre>
or simply clone the repository

# Usage
<pre><code>var querystring = "param1=10&amp;param2=Hello";
$.deparam(querystring);</code></pre>
deparam function returns a JavaScript object. For example, the output for the code above is:
<pre><code>{ param1: 10, param2: "Hello" }</code></pre>

JQuery deparam smartly converts any querystring into JavaScript object. For example:

<code>param[]=10&param[]=20</code> becomes <code>{ param: [10, 20] }</code>

AND

<code>param[x]=Hello&param[y]=World</code> becomes <code>{ param: { x: "Hello", y: "World" } }</code>.
