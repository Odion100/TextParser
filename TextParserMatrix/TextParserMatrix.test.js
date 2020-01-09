const chai = require("chai");
const { expect } = chai;
const TextParserMatrix = require("./TextParserMatrix");
const text = `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`;

describe("TextParserMatrix Test", () => {
  const parser = TextParserMatrix([
    { name: "last_name", index: 0 },
    { name: "first_name", index: 1 },
    { name: "gender", index: 2 },
    { name: "date_of_birth", index: 3 },
    { name: "favorite_color", index: 4 }
  ]);
  it("should return an object with the following properties and methods:table (Array), addText (fn), sort (fn), print (fn)", () => {
    expect(parser)
      .to.be.an("Object")
      .that.has.all.keys("table", "addText", "sort", "print")

      .that.respondsTo("addText")
      .that.respondsTo("sort")
      .that.respondsTo("print");
  });
  it("should be able to add rows of delimited text to the table property using the addText method", () => {
    parser.addText({
      text,
      delimiter: " | "
    });

    expect(parser.table).to.have.a.lengthOf(3);
    expect(parser.table[0]).to.have.a.lengthOf(6);
    expect(parser.table[1]).to.eql([
      "Bonk",
      "Radek",
      "S",
      "M",
      "Green",
      "6-3-1975"
    ]);
  });

  it("should be able to exclude a column of delimited text when adding rows of delimited text", () => {
    parser.addText({
      text,
      delimiter: " | ",
      excludeColumn: 2
    });
    expect(parser.table).to.have.a.lengthOf(6);
    expect(parser.table[3]).to.have.a.lengthOf(5);
    expect(parser.table[4]).to.eql(["Bonk", "Radek", "M", "Green", "6-3-1975"]);
  });

  it("should be able to map delimited text to specific columns when adding rows of delimited text", () => {
    parser.addText({
      text,
      delimiter: " | ",
      columnMap: {
        last_name: 1,
        first_name: 0,
        gender: 3,
        date_of_birth: 5,
        favorite_color: 4
      }
    });
    expect(parser.table).to.have.a.lengthOf(9);
    expect(parser.table[6]).to.have.a.lengthOf(5);
    expect(parser.table[7]).to.eql(["Radek", "Bonk", "M", "6-3-1975", "Green"]);
  });

  it("should be able to sort the table by a given column and a sort direction", () => {
    expect(parser.sort("first_name", -1).table).to.eql([
      ["Radek", "Bonk", "M", "6-3-1975", "Green"],
      ["Francis", "Bouillon", "M", "6-3-1975", "Blue"],
      ["Bouillon", "Francis", "G", "M", "Blue", "6-3-1975"],
      ["Bouillon", "Francis", "M", "Blue", "6-3-1975"],
      ["Bonk", "Radek", "S", "M", "Green", "6-3-1975"],
      ["Bonk", "Radek", "M", "Green", "6-3-1975"],
      ["Steve", "Smith", "M", "3-3-1985", "Red"],
      ["Smith", "Steve", "D", "M", "Red", "3-3-1985"],
      ["Smith", "Steve", "M", "Red", "3-3-1985"]
    ]);
  });

  it("should be able to convert table (Array) to text with optional column and row delimiters", () => {
    expect(parser.print()).to.equal(
      `Radek Bonk M 6-3-1975 Green
Francis Bouillon M 6-3-1975 Blue
Bouillon Francis G M Blue 6-3-1975
Bouillon Francis M Blue 6-3-1975
Bonk Radek S M Green 6-3-1975
Bonk Radek M Green 6-3-1975
Steve Smith M 3-3-1985 Red
Smith Steve D M Red 3-3-1985
Smith Steve M Red 3-3-1985`
    );
  });
});
