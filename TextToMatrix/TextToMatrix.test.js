const chai = require("chai");
const { expect } = chai;
const TextParserMatrix = require("./TextParserMatrix");
const text =  `Smith | Steve | D | M | Red | 3-3-1985
Bonk | Radek | S | M | Green | 6-3-1975
Bouillon | Francis | G | M | Blue | 6-3-1975`,

describe("TextParserMatrix Test", () => {
  const parser = TextParserMatrix([
    { name: "last_name", index: 0 },
    { name: "first_name", index: 1 },
    { name: "gender", index: 2 },
    { name: "date_of_birth", index: 3 },
    { name: "favorite_color", index: 4 }
  ]);
  it("should create and return an object with the following properties and methods:table, addText, sort, print", () => {
    expect(parser)
      .to.be.an("Object")
      .that.has.all.keys("table", "addText", "sort", "print")

      .that.respondsTo("addText")
      .that.respondsTo("sort")
      .that.respondsTo("print");
  });
  it("should add rows of delimited text to the table", () => {
    parser.addText({
        text,
        delimiter: " | "
      });
      
      expect(parser.table).to.have.a.lengthOf(3)
      expect(parser.table[0]).to.have.a.lengthOf(6)
      expect(parser.table[1]).to.equal([ 'Bonk', 'Radek', 'S', 'M', 'Green', '6-3-1975' ],)
  });

  it("should be able to exclude a column of delimited text", () => {
    //
  });

  it("should be able to map delimited text to specific columns", () => {
    //
  });
});
