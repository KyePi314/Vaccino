var fs = require('fs'); //allows program to write to file

const submission = document.getElementById("BugSubmit");
submission.addEventListener('click', submitEvent);
function submitEvent()
{
    //setting the bug report data on the click event
    const BugReport = document.getElementById('bugreportinput').value;
    
    fs.readFile('src/bugreports.json', 'utf-8', function(err, data){ //adds bug report data.
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.push({BugReport});
            const json =  JSON.stringify(file, null, '\t');

            fs.writeFile('src/bugreports.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("Bug report successfully saved to the system.");
                }
            });
        }
    })
    
}
