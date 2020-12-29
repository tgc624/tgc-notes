# Export array of array as csv file in JavaScript

## Code

```js
const aoa2csv = (aoa) =>
  aoa
    .map((row) =>
      row
        .map((col) => {
          // Replace tab -> white space, " -> ""
          const _col = `${col}`.replace(/\t/g, " ").replace(/"/g, '""');
          // Enclose in double quotation marks if the column value contains '"' or ',' or '\n'.
          const isContainsCharacterToEscape = /("|,|\n)/.test(_col);
          return isContainsCharacterToEscape ? `"${_col}"` : _col;
        })
        .join(",")
    )
    .join("\n");

const downloadCsv = (csv, filename = "data.csv") => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8;" })
  );
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

## Usage

1. Define above functions.
2. Define source data and call functions.

   ```js
   // Define an array of array.
   const aoa = [
     ["aa", "bb"],
     [, , "cc", , "dd"],
     ["ee ee", "ff\nff", "gg\tgg", 'hh"hh', `ii'ii`, "jj,jj"],
     [1, -1, 0, -0, Infinity, -Infinity],
     ["", null, undefined, NaN],
     [[1, 2], { a: 1 }, () => {}],
   ];

   // Create a csv and download it by each functions.
   const csv = aoa2csv(aoa);
   downloadCsv(csv);
   ```

3. The csv file will be downloaded from browser. You will get follows.

   |       |                 |           |       |          |           |
   | ----- | --------------- | --------- | ----- | -------- | --------- |
   | aa    | bb              |           |       |          |           |
   |       |                 | cc        |       | dd       |           |
   | ee ee | ff<br>ff        | gg gg     | hh"hh | ii'ii    | jj,jj     |
   | 1     | -1              | 0         | 0     | Infinity | -Infinity |
   |       | null            | undefined | NaN   |          |           |
   | 1,2   | [object Object] | () => {}  |       |          |           |
