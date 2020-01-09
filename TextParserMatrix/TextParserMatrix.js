//Creates a table of
const moment = require("moment");
const TextParserMatrix = columns => {
  // columns = [ {name:'', index:0, type:''} ]
  const ParserMatrix = {};
  const table = [];

  ParserMatrix.addText = ({
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
      //Rearrange row data in accordance to column map
      if (columnMap)
        newRow = columns
          .sort((a, b) => a.index - b.index)
          .map(({ name }) => newRow[columnMap[name]]);
      if (typeof beforeInsert === "function") beforeInsert(newRow);
      //insert new data into table
      table.push(newRow);
    });

    return ParserMatrix;
  };

  ParserMatrix.sort = (column_name, direction) => {
    const column = columns.find(col => col.name === column_name);

    if (column.index > -1)
      table.sort((row_a, row_b) => {
        switch (column.type) {
          case "date":
            let date_a = moment(row_a[column.index], column.format);
            return (
              moment(row_b[column.index], column.format).diff(date_a) *
              direction
            );
          case "custom":
            return column.customSort(row_a[column.index], row_b[column.index]);
          default:
            if (row_a[column.index] > row_b[column.index])
              return direction * -1;
            else if (row_a[column.index] < row_b[column.index])
              return direction;
            return 0;
        }
      });

    return ParserMatrix;
  };

  ParserMatrix.toString = (colDelimiter = " ", rowDelimiter = "\n") => {
    let output = "";
    table.forEach(tableRow => {
      output += tableRow.join(colDelimiter) + rowDelimiter;
    });
    return output.trim();
  };

  ParserMatrix.table = table;

  return ParserMatrix;
};

module.exports = TextParserMatrix;
