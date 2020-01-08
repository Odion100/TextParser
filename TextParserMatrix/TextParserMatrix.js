//Creates a table of
const TextParserMatrix = columns => {
  // columns = [ {column_name:index} ]
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
      //Rearrange row data in accordance to column sort
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

  ParserMatrix.sort = (column, direction) => {
    const colIndex = columns.find(col => col.name === column).index;

    if (colIndex > -1)
      table.sort((row_a, row_b) => {
        if (row_a[colIndex] > row_b[colIndex]) return direction * -1;
        else if (row_a[colIndex] < row_b[colIndex]) return direction;
        return 0;
      });

    return ParserMatrix;
  };

  ParserMatrix.print = (colDelimiter = " ", rowDelimiter = "\n") => {
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
