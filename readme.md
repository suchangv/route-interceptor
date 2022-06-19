<h1 align="center">Route Interceptor</h1>

## Introduction

This package can intercept front-end route jumps, Does not depend on any framework, So you can use it in React, Vue, etc.
for example, intercept jump `https://wwww.google.com/` to `https://www.youtube.com`

## Online Demo

todo

## How to use

### 1. Installation

```shell
  npm i route-interceptor --save
```

### 2. Add this code where you like

```javascript
import { create } from "route-interceptor";

const interceptor = create({
  way: ["a", "window.open", "history", "hash", "location"],
  intercept: (path) => {
    return path.replace("google.com", "youtube.com");
  },
});

interceptor.start();
```

## API

| Parameter | Description             | Type                                                          | Default     |
| --------- | ----------------------- | ------------------------------------------------------------- | ----------- |
| way       | Way to be intercepted   | ('a' \| 'window.open' \| 'history' \| 'hash' \| 'location')[] | []          |
| intercept | intercept rule callback | () => string \| false                                         | () => false |

### way

#### a

Intercept Anchor tag jump, if Anchor tag has click event and called preventDefault, Will not be intercepted.

#### window.open

Intercept window.open

#### history

Will both intercept history.pushState and history.replaceState

#### hash

Intercept hash change, such as `location.hash = '#some'`

#### location

Because the origin location object can't be override, if you want to intercept `set location.href` and `location.replace`, You need to use Babel at the same time.

```javascript
// .babelrc.js
module.exports = {
  plugins: ["route-interceptor/plugins/babel"],
};
```

How it works

```javascript
location.href = "https://www.google.com";
location.replace("https://www.google.com");
// will transform to
$location.href = "https://www.google.com";
$location.replace("https://www.google.com");
```

It will register a object \$location into window, and transform all your code location.href to \$location.href location.replace to \$location.replace, only support intercept location.href and location.replace, don't transform other location property.

> Can't support esbuild-loader, because esbuild transform api does't support plugin.

### intercept

return a new path to jump, or return `false` to stop jump
