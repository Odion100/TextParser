//Creates a table of
const TextMatrix = columns => {
  // columns = [ {column_name:index} ]
  const table = [];

  const addText = ({
    text = "",
    delimiter,
    excludeColumn,
    columnIdices,
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
      if (columnIdices)
        newRow = columns
          .sort((a, b) => a.index - b.index)
          .map(({ name }) => newRow[columnIdices[name]]);
      if (typeof beforeInsert === "function") beforeInsert(newRow);
      //insert new data into table
      table.push(newRow);
    });

    return table;
  };

  const sort = (column, direction) => {};

  const print = (rowDelimiter = "\n", colDelimiter = " ") =>
    table.reduce((accumulator, tableRow) => {
      accumulator += tableRow.join(colDelimiter) + rowDelimiter;
    });

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
  delimiter: "|"
});
console.log("\n", "output1:", parser.table, "\n");
parser.addText({
  text: `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`,
  delimiter: "|",
  excludeColumn: 2
});
console.log("\n", "output2:", parser.table, "\n");

parser.addText({
  text: `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`,
  delimiter: "|",
  columnIdices: {
    last_name: 1,
    first_name: 0,
    gender: 3,
    date_of_birth: 5,
    favorite_color: 4
  }
});

parser.print(" ");
console.log("\n", "output3:", parser.table, "\n");
