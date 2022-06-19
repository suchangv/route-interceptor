<h1 align="center">Route Interceptor</h1>

## Introduction

This package can intercept front-end route jumps, Does not depend on any framework, So you can use it in React, Vue, etc.

## Online Demo

todo

## How to use

### 1. Installation

```shell
  npm i route-interceptor
```

### 2. Add this code where you like

```javascript
import { create } from "route-interceptor";

const interceptor = create({
  way: ["a", "window.open", "history", "hash", "location"],
  intercept: (path) => {
    return path.replace("/bbb", "/ccc");
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

Will intercept both history.pushState and history.replaceState

#### hash

Intercept hash change, such as `location.hash = '#some'`

#### location

Because the origin location object can't be override, intercept `set location.href` and `location.replace`, You need to use Babel at the same time or use global object `$location` to jump.

This is type declaration for `$location`.

```typescript
interface Window {
  $location: Pick<Location, "href" | "replace">;
}
```

Use babel plugin.
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

Only `location.href` and `location.replace` will be transformed.

> Can't support esbuild-loader, because esbuild transform api does't support plugin.

### intercept

return a new path to jump, or return `false` to stop jump
