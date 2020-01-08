const request = require("request");
const TextParserMatrix = require("./TextParserMatrix/TextParserMatrix");

const dataURIs = [
  "https://s3.amazonaws.com/def-method/code-test/space.txt",
  "https://s3.amazonaws.com/def-method/code-test/comma.txt",
  "https://s3.amazonaws.com/def-method/code-test/pipe.txt"
];
const parser = TextParserMatrix([
  { name: "last_name", index: 0 },
  { name: "first_name", index: 1 },
  { name: "gender", index: 2 },
  { name: "date_of_birth", index: 3, type: "date", format: "M/D/YYYY" },
  { name: "favorite_color", index: 4 }
]);

const p1 = new Promise((resolve, reject) => {
  request(dataURIs[0], (err, res, body) => {
    if (err) return reject(err);

    parser.addText({
      text: body,
      delimiter: " ",
      columnMap: {
        last_name: 0,
        first_name: 1,
        gender: 3,
        date_of_birth: 4,
        favorite_color: 5
      },
      beforeInsert: row => {
        if (row[2] === "M") row[2] = "Male";
        else if (row[2] === "F") row[2] = "Female";
        row[3] = row[3].split("-").join("/");
      }
    });
    resolve();
  });
});

const p2 = new Promise((resolve, reject) => {
  request(dataURIs[1], (err, res, body) => {
    if (err) return reject(err);

    parser.addText({
      text: body,
      delimiter: ", ",
      columnMap: {
        last_name: 0,
        first_name: 1,
        gender: 2,
        date_of_birth: 4,
        favorite_color: 3
      }
    });
    resolve();
  });
});
const p3 = new Promise((resolve, reject) => {
  request(dataURIs[2], (err, res, body) => {
    if (err) return reject(err);

    parser.addText({
      text: body,
      delimiter: " | ",
      columnMap: {
        last_name: 0,
        first_name: 1,
        gender: 3,
        date_of_birth: 5,
        favorite_color: 4
      },
      beforeInsert: row => {
        if (row[2] === "M") row[2] = "Male";
        else if (row[2] === "F") row[2] = "Female";
        row[3] = row[3].split("-").join("/");
      }
    });
    resolve();
  });
});

Promise.all([p1, p2, p3])
  .then(() => {
    console.log("\nOutput 1:\n");
    console.log(
      parser
        .sort("last_name", -1)
        .sort("gender", -1)
        .print()
    );
    console.log("\nOutput 2:\n");
    console.log(
      parser
        .sort("last_name", -1)
        .sort("date_of_birth", -1)

        .print()
    );
    console.log("\nOutput 3:\n");
    console.log(parser.sort("last_name", 1).print());
  })
  .catch(err => console.log(err));
