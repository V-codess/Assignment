const fs = require('fs');
const axios = require("axios");
require("dotenv").config();
let results = "";

//to create a file

function createFile(filename){
    let writeStream = fs.createWriteStream(filename)
    return new Promise(( resolve, reject)=>{
    try {
    resolve("Created");
    writeStream.write(results);
    }
    catch (error) {
    reject(error)
    } 
    })

}

// to get data from random api url
async function dataUsers(){
    try {
        const res = await axios.get(process.env.URL);
        let newData = res.data
        let key = Object.keys(newData[0]).splice(0,10).join(",");
        let val;
        results += key + "\n";
            for(let rec in newData){
                val = Object.values(newData[rec]).splice(0,10).join(",");   
                    results += val + "\n";
            }   
        console.log(results)
        createFile('./users.csv').then(()=> console.log("created succesfully")).catch((err)=> console.log(err))
 } catch (error) {
      console.log(error)
 }
}
dataUsers()


