//Creates a table of
const TextToMatrix = () => {
  const table = [];

  const addText = ({ text = "", delimiter, excludeColum, columnSort }) => {
    //split text by newline
    const dataSet = text.split(/\r?\n/);
    //split by delimeter
    dataSet.forEach((delimitedText, i) => {
      //split by delimeter
      let newRow = delimitedText.split(delimiter);
      //remove unwanted column

      //insert new row in table
    });
  };

  const sort = sortIndex => {};

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
