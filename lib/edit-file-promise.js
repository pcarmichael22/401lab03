'use strict';

const fs = require('fs');
let faker = require('faker');
let randomName = faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}");


/* Pseudo Code -
1. get filename as CLI parameter
2. read the contents of the file
3. convert file contents to a JSON object
4. use faker to modify some property
5. convert file back to JSON string
6. save file to original file name
7. open file and check if it has been changed
*/
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

 var fileName;
 var bufferString;
 var person1JSON;
 var person2JSON;

 if (process.argv.length > 2) {
    fileName = process.argv[2]
    console.log('Filename: ', fileName);
} else {
    console.error('Filename is required')
    return
}

function cbReader(callback){
    readFile(fileName)
    .then((data) => {
        bufferString = data.toString();
        console.log('File read successfully.')
        callback();
    }) 
    .catch(err => console.error(err.toString()));
};

function processFile() {
    var personObj;
    try {
        personObj = JSON.parse(bufferString);
    } catch(error) {
        console.error(error.toString())
        return
    }
    let testname = faker.fake("{{name.firstName}}");
    personObj.firstName = testname;
    person1JSON = JSON.stringify(personObj);
    console.log('Object updated.')
    cbWriter(rereadFile);
}

function cbWriter(callback) {
    writeFile(fileName, person1JSON)
    .then(() => {
        console.log('File saved successfully!');
        callback();
    })
    .catch(err => console.error(err.toString()));
}

function rereadFile() {
    cbReader(compareJSON)
}

function compareJSON(){
    var personObj;
    try {
        personObj = JSON.parse(bufferString);
    } catch(error) {
        console.error(error.toString())
        return
    }
    person2JSON = JSON.stringify(personObj);
    console.log('person 2 JSON Object parsed.')
    //to compare person1json against person2json
    if(person1JSON === person2JSON){
        console.log('person1 JSON & person2 JSON match!')
    } else {
        console.error('person1 JSON & person2 JSON do not match.')
    }
}

cbReader(processFile);
