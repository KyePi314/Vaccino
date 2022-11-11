const fs = require('fs');
const readline = require('readline');

const login = document.getElementById("submit");
login.addEventListener('click', submitEvent);
function submitEvent()
{
    fs.readFile('./backend/savedUsers.json', (err, fileContent) => {
        if(err){
            console.log(err);
        }
        else{
            data = JSON.parse(fileContent.toString());
            
        }
    })

}