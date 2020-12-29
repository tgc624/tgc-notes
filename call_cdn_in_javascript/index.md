---
layout: page
title: Call CDN in JavaScript
---

## Code

```js
const readCDN = (url) => {
  const vDom = document.createElement("script");
  vDom.setAttribute("src", url);
  document.head.appendChild(vDom);
};
```
