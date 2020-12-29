---
layout: page
title: Sort array of objects by any element in TypeScript
---

## Code

```ts
const sortBy = <T>(sortTarget: keyof T) => (array: T[]) =>
  array.sort((a, b) => (a < b ? -1 : 1));

// Implement function
const sortByPosition = sortBy("position");
const sortByIndex = sortBy("index");
```

## Usage

- Test code of Deno

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Sort by position", () => {
  const array = [
    { position: 2, title: "fuga" },
    { position: 3, title: "foo" },
    { position: 1, title: "hoge" },
  ];
  const expectedArray = [
    { position: 1, title: "hoge" },
    { position: 2, title: "fuga" },
    { position: 3, title: "foo" },
  ];
  const actualSortedArray = sortByPosition(array);

  assertEquals(actualSortedArray, expectedSortedArray); // It will pass.
});

Deno.test("Sort by index", () => {
  const array = [
    { index: 2, title: "fuga" },
    { index: 3, title: "foo" },
    { index: 1, title: "hoge" },
  ];
  const expectedArray = [
    { index: 1, title: "hoge" },
    { index: 2, title: "fuga" },
    { index: 3, title: "foo" },
  ];
  const actualSortedArray = sortByIndex(array);

  assertEquals(actualSortedArray, expectedSortedArray); // It will pass.
});
```

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("", () => {
  const array = [
    { position: 2, title: "fuga" },
    { position: 3, title: "foo" },
    { position: 1, title: "hoge" },
  ];
  const expectedArray = [
    { position: 1, title: "hoge" },
    { position: 2, title: "fuga" },
    { position: 3, title: "foo" },
  ];
  const actualSortedArray = sortByIndex(array); // Syntax error. Property 'index' is missing in type '{ position: number; title: string; }' but required in type '{ index: any; }'.
});
```
