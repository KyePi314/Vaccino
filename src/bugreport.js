var fs = require('fs'); //allows program to write to file

class Log {
    Date;
    Time;
    Type;

    constructor(date, time, type){
        this.Date = date;
        this.Time = time;
        this.Type = type;
    }
}

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
    //Logging the time of the submission and type.

    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();

    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

    const Type = "Bug Report";

    const BugLog = new Log(date, time, Type)


    fs.readFile('src/buglogger.json', 'utf-8', function(err, data){
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.push({BugLog});
            const json =  JSON.stringify(file, null, '\t');

            fs.writeFile('src/buglogger.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("Bug report log saved.");
                }
            });
        }
    })
    window.alert("Thank you for submitting a bug report.");
    location.reload();
    return false;
}
