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

///////// TEST CODE ///////////////////////////////////

// let testJSON = '{"firstName":"Edward","lastName":"Scissorhands","hair":{"type":"wavy","color":"brown"},"favoriteFoods":["pizza","cupcakes","children"],"married":false,"kids":0}'


//  const convertJSON = (person1JSON) => {
//      let testname = faker.fake("{{name.firstName}}");
//      console.log(testname);

//      let personObj = JSON.parse(person1JSON);
//      console.log(personObj);

//      personObj.firstName = testname;
//      console.log(personObj);

//      return JSON.stringify(personObj);
//  };
//  console.log(process.argv.length);
//  if (process.argv.length > 2) {
//      let fileName = process.argv[2]
//      console.log(fileName);
//  } else {
//      console.error("filename is required")
//  }
// //  convertJSON(testJSON);

 ////////////////////////////////////////////////////////

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
    fs.readFile(fileName, function (err, data) {
        if(err){
            console.error(err.toString());
            return
        }
        bufferString = data.toString();
        console.log('File read successfully.')
        callback();
    })
}
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
    fs.writeFile(fileName, person1JSON, function(err) {
        if(err) {
            console.error(err.toString());
            return
        }
        console.log('File saved successfully!');
        callback();
    });  
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