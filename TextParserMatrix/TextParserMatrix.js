//Creates a table of
const TextMatrix = columns => {
  // columns = [ {column_name:index} ]
  const table = [];

  const addText = ({
    text = "",
    delimiter,
    excludeColumn,
    columnMap,
    beforeInsert
  }) => {
    //split text in to rows by newline
    const dataSet = text.split(/\r?\n/);

    dataSet.forEach(delimitedText => {
      //split each row of text by delimeter
      let newRow = delimitedText.split(delimiter);
      //remove unwanted column
      if (excludeColumn) newRow.splice(excludeColumn, 1);
      //Rearrange row data in accordance to column sort
      if (columnMap)
        newRow = columns
          .sort((a, b) => a.index - b.index)
          .map(({ name }) => newRow[columnMap[name]]);
      if (typeof beforeInsert === "function") beforeInsert(newRow);
      //insert new data into table
      table.push(newRow);
    });

    return table;
  };

  const sort = (column, direction) => {
    const colIndex = columns.find(col => col.name === column).index;
    console.log(colIndex);
    if (colIndex > -1)
      table.sort((row_a, row_b) => {
        if (row_a[colIndex] > row_b[colIndex]) return direction * -1;
        else if (row_a[colIndex] < row_b[colIndex]) return direction;
        return 0;
      });

    return table;
  };

  const print = (colDelimiter = " ", rowDelimiter = "\n") => {
    let output = "";
    table.sort(tableRow => {
      output += tableRow.join(colDelimiter) + rowDelimiter;
    });
    return output;
  };

  return {
    table,
    addText,
    sort,
    print
  };
};

const parser = TextMatrix([
  { name: "last_name", index: 0 },
  { name: "first_name", index: 1 },
  { name: "gender", index: 2 },
  { name: "date_of_birth", index: 3 },
  { name: "favorite_color", index: 4 }
]);

parser.addText({
  text: `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`,
  delimiter: " | "
});
console.log("\n", "output1:", parser.table, "\n");
parser.addText({
  text: `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`,
  delimiter: " | ",
  excludeColumn: 2
});
console.log("\n", "output2:", parser.table, "\n");

parser.addText({
  text: `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`,
  delimiter: " | ",
  columnMap: {
    last_name: 1,
    first_name: 0,
    gender: 3,
    date_of_birth: 5,
    favorite_color: 4
  }
});
console.log("\n", "output3:", parser.table, "\n");

console.log(parser.print(" "));
console.log(parser.sort("first_name", -1));
console.log(parser.table.length);
