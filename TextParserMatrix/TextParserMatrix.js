//Creates a table of
const moment = require("moment");
const TextParserMatrix = (columns) => {
  // columns = [ {name:'', index:0, type:''} ]
  const table = [];
  const ParserMatrix = { table, columns };

  ParserMatrix.addText = ({ text = "", delimiter, excludeColumn, columnMap, beforeInsert }) => {
    //split text in to rows by newline
    const dataSet = text.split(/\r?\n/);
    //ensure columns are properly sorted
    columns.sort((a, b) => a.index - b.index);
    dataSet.forEach((delimitedText) => {
      //split each row of text by delimeter
      let newRow = delimitedText.split(delimiter);
      //remove unwanted column
      if (excludeColumn) newRow.splice(excludeColumn, 1);
      //Rearrange row data in accordance to column map
      if (columnMap) newRow = columns.map(({ name }) => newRow[columnMap[name]]);
      if (typeof beforeInsert === "function") beforeInsert(newRow);
      //insert new data into table
      table.push(newRow);
    });

    return ParserMatrix;
  };

  ParserMatrix.addJson = ({ json, propertyMap = {}, beforeInsert }) => {
    //const propetyMap = {column_name: property_name}

    json = Array.isArray(json) ? json : [json];
    //ensure columns are properly sorted
    columns.sort((a, b) => a.index - b.index);

    json.forEach((obj) => {
      //Arrange row data in accordance to propetyMap (column_name = obj[propety_name])
      const newRow = columns.map(({ name }, i) => obj[propertyMap[i] || name]);
      if (typeof beforeInsert === "function") beforeInsert(newRow);
      //insert new data into table
      table.push(newRow);
    });

    return ParserMatrix;
  };
  ParserMatrix.sort = (column_name, direction) => {
    const column = columns.find((col) => col.name === column_name);

    if (column.index > -1)
      table.sort((row_a, row_b) => {
        switch (column.type) {
          case "date":
            let date_a = moment(row_a[column.index], column.format);
            return moment(row_b[column.index], column.format).diff(date_a) * direction;
          case "custom":
            return column.customSort(row_a[column.index], row_b[column.index]);
          default:
            if (row_a[column.index] > row_b[column.index]) return direction * -1;
            else if (row_a[column.index] < row_b[column.index]) return direction;
            return 0;
        }
      });

    return ParserMatrix;
  };

  ParserMatrix.toString = (colDelimiter = " ", rowDelimiter = "\n") => {
    let output = "";
    table.forEach((tableRow) => {
      output += tableRow.join(colDelimiter) + rowDelimiter;
    });
    return output.trim();
  };

  ParserMatrix.toJson = (props) => {
    const arr = [];
    props =
      props ||
      columns.sort((col_a, col_b) => col_a.index - col_b.index).map((column) => column.name);

    table.forEach((row) => {
      const obj = {};
      //the index of each property name lines up with the correct column in the table
      props.forEach((prop_name, i) => (obj[prop_name] = row[i]));
      arr.push(obj);
    });
    return arr;
  };
  return ParserMatrix;
};

module.exports = TextParserMatrix;
