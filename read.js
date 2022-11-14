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
          const first = a.username.toUpperCase(); 
         const second = b.username.toUpperCase(); 
            if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }
  else{
  return 0;
  }
        });
   console.log(sort)  
   })
    } catch (error) {
        console.log(error)
    }
    }
    
toRead("./users.csv")
