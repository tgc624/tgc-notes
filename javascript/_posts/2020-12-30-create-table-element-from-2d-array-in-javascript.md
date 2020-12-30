## Code

```js
const aoa2table = (aoa, header = true) => {
  const table = document.createElement("table");
  table.style.border = "1px solid black";
  const rowElements = aoa.map((row, rowNum) => {
    const rawElement = document.createElement("tr");
    const cellElements = row.map((cell) => {
      const cellElement =
        header && rowNum === 0
          ? document.createElement("th")
          : document.createElement("td");
      cellElement.style.border = "1px solid black";
      cellElement.style.padding = "4px";
      cellElement.textContent = cell;
      return cellElement;
    });
    cellElements.forEach((cellElement) => rawElement.appendChild(cellElement));
    return rawElement;
  });
  rowElements.forEach((rawElement) => table.appendChild(rawElement));
  return table;
};
```

## Usage

1. Define above functions.
2. Define source data and call functions.

   ```js
   // Define an array of array.
   const aoa = [
     ["rank", "name", "number of people in million"],
     [1, "佐藤", 200],
     [2, "鈴木", 180],
     [3, "高橋", 160],
     [4, "田中", 140],
     [5, "伊藤", 120],
   ];

   // Create a table element.
   const tableElement = aoa2table(aoa);

   // Append the table element to the body element.
   document.body.appendChild(tableElement);
   ```

3. The below table will be displayed..

   | rank | name | number of people in million |
   | ---- | ---- | --------------------------- |
   | 1    | 佐藤 | 200                         |
   | 2    | 鈴木 | 180                         |
   | 3    | 高橋 | 160                         |
   | 4    | 田中 | 140                         |
   | 5    | 伊藤 | 120                         |
