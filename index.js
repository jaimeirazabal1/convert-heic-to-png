const { promisify } = require('util');
const convert = require('heic-convert');

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'heic_files');
//passsing directoryPath and callback function
console.log('reading',directoryPath)
try {
    
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        // console.log(files)
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(async function (file) {
            // Do whatever you want to do with the file
            // console.log(file); 
            
            let inputBuffer = await promisify(fs.readFile)(path.join(directoryPath, file));
            let filename = file.split('.');
            let outputBuffer = await convert({
                buffer: inputBuffer, // the HEIC file buffer
                format: 'PNG'        // output format
            });
            console.log("writing ",`./output/${filename[0]}.png`)
            let terminado = await promisify(fs.writeFile)(`./output/${filename[0]}.png`, outputBuffer);
            console.log("finished ",`./output/${filename[0]}.png`)
           
        });
    });
} catch (error) {
    console.log(error)
}