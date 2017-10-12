# doitlater

Increase page load speed, just load/execute unnecessary things later!

Defer scripts, styles, html, json, images, functions!

[![Gemnasium](https://img.shields.io/gemnasium/mathiasbynens/he.svg)]()
![Lib Size](http://img.badgesize.io/AntonLapshin/doitlater/master/bin/doitlater.min.js.svg?compression=gzip)
[![npm](https://img.shields.io/npm/dt/doitlater.svg)](https://www.npmjs.com/package/doitlater)
[![GitHub stars](https://img.shields.io/github/stars/AntonLapshin/doitlater.svg?style=social&label=Star)](https://github.com/AntonLapshin/doitlater)

> Use [promise-polyfill](https://www.npmjs.com/package/promise-polyfill) for old browsers support

## Install

    npm install doitlater --save

## Usage

### Execute a snippet (after DOM Ready event for example):

```js
doitlater.waitFor("DOMReady").then(() => {
  doitlater.load("gtm", () => {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXX');
  });
});

window.addEventListener('load', function(){
  doitlater.add("DOMReady", Promise.resolve);
});
```

### Load a stylesheet:

```js
doitlater.waitFor("gtm").then(() => {
  doitlater.load("materializecss", "//cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css");
});
```

### Preaload images:

```js
doitlater.load("header-images", ["/img/logo.png", "/img/bg.jpg"]);
```

### Load JSON:

```js
doitlater.load("headerJSON", "/config/header.json");
```

### Execute functions:

```js
doitlater.waitFor("DOMReady").then(() => {
  doitlater.load("logging", () => { console.log("DOM Ready")});
});

doitlater.waitFor("logging").then(function(){
  console.log("After logging");
});
```

### Mixed loading: 

```js
doitlater.load(
  "resources", 
  [
    "/img/logo.png", "/config/header.json", "/css/header.css",
    () => { console.log("Logging")}
  ]
);
```

### Load a view (HTML file)

```js
doitlater.waitFor("DOMReady").then(() => {
  doitlater.load("headerHTML", "/view/header.html").then(result => {
    const html = result[0]; // result is an Array
    document.body.insertAdjacentHTML("afterend", html);
  })
});
```

### Reuse your promises

```js
doitlater.add(
  "headerLoaded", 
  Promise.all([
    doitlater.waitFor("resources"), 
    doitlater.waitFor("headerHTML")
  ])
);

doitlater.waitFor("headerLoaded").then(()=>{
  console.log("Header has been loaded");
});
```

### async/await example

```js
await doitlater.waitFor("DOMReady");
await doitlater.load("resources", [
  "/img/logo.png", "/config/header.json", "/css/header.css"
]);
```

## Other useful methods

### createDefer

```js
const defer = doitlater.createDefer();
defer.promise.then(() => { console.log("Resolved")});
defer.resolve();
```

### runLater

```js
doitlater.runLater(() => {
  console.log("Executed in Idle or in a new frame if it's supported");
});
```

For more detailed information read [API](API.md)