# TextParser 

## Coding Challange
As a coding challange, I was tasked with parsing 3 text files containing properties of a person each delimited by a different character. I then needed to combined that data into one table and finally produce an output displaying the data sorted by different columns. 

## Solution
As a solution to this problem I created a module called ***TextParserMatrix***. This module facilitates parsing, sorting, printing, and maintaining separate strings of delimited text as one table. This abstraction made solving the coding challange much easier. Also this is something I can see myself adding to and using again in the future. 

## Build

1. Ensure that you have NodeJS installed on your OS: https://nodejs.org/en/download/
2. Download the repo, navigate into the project folder from the command line window, and run `npm install`.
3. Running `npm start` from the command line will print the code test results in the console window and produce a `target_output.txt` file in the project's root folder.

## Test
1. Install mocha globally - `npm install mocha -g`
2. Run `npm test` from the command line
