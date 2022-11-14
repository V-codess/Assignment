const csv = require('csv-parser');
const fs = require('fs');

let read = [];
let sort;
// create a read stream
function toRead(filename){
    try {
       fs.createReadStream(filename)
      .pipe(csv())
      .on('data', (data) => read.push(data))
      .on('end', () => {
        sort = read.sort((a,b)=>{
          const nameA = a.username.toUpperCase(); 
         const nameB = b.username.toUpperCase(); 
            if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  else{
  return 0;
  }
  // names must be equal
        });
   console.log(sort)  
   })
    } catch (error) {
        console.log(error)
    }
    }
    
toRead("./users.csv")