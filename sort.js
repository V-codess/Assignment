const fs = require('fs');
const axios = require("axios");
require('dotenv').config()
let results = "";
let sorted;
//to create a file

function createFile(filename){
    let writeStream = fs.createWriteStream(filename)
    writeStream.write(results, (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("created")
        }
    })
}

// to get data from random api url
async function dataUsers(){
    try {
        const res = await axios.get(process.env.URL);
        let newData = res.data
        sorted = newData.sort((a,b)=>{
             let first = a.username.toUpperCase();
             let second = b.username.toUpperCase();
             if(first > second){
               return 1
             }
             if(first < second){
               return -1
             }
             else{
               return 0
             }
            })
        let key = Object.keys(sorted[0]).splice(0,10).join(",")   
        results += key + "\n";
            for(let rec in sorted){
                let val = Object.values(sorted[rec]).splice(0,10).join(",");
                   results += val + "\n";
            }   
            console.log(results)
     createFile('./users-sort.csv')
 } catch (error) {
      console.log(error)
 }
}
dataUsers()


