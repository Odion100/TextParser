const request = require("request");
const moment = require("moment");
const TextParserMatrix = require("./TextParserMatrix/TextParserMatrix");
const dataURIs = ["https://s3.amazonaws.com/def-method/code-test/space.txt"];
const parser = TextParserMatrix([
  { name: "last_name", index: 0 },
  { name: "first_name", index: 1 },
  { name: "gender", index: 2 },
  { name: "date_of_birth", index: 3 },
  { name: "favorite_color", index: 4 }
]);

async function test() {
  const input1 = await request(
    "https://s3.amazonaws.com/def-method/code-test/space.txt",
    (err, res, bod) => console.log("err:", bod)
  );
  const input2 = await request(
    "https://s3.amazonaws.com/def-method/code-test/comma.txt"
  );

  const input3 = await request(
    "https://s3.amazonaws.com/def-method/code-test/pipe.txt"
  );
  console.log(input1);
  parser.addText({
    text: input1.body,
    delimiter: " ",
    columnMap: {
      last_name: 1,
      first_name: 0,
      gender: 2,
      date_of_birth: 3,
      favorite_color: 4
    },
    beforeInsert: row => {
      if (row[2] === "M") row[2] = "Male";
      else if (row[2] === "F") row[2] = "Female";

      row[3] = moment(row[3], "M-D-YYYY").format("M/D/YYYY");
    }
  });

  console.log([parser.table]);
}
test();
