var fs = require('fs');

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

if (document.URL.includes('admin.html'))
{
    const profile = document.getElementById('profile');
    const reports = document.getElementById('bugReports');
    const alerts = document.getElementById('alert');
    const cases = document.getElementById('cases');
    profile.addEventListener('click', () => {
        window.location.replace('admineditprofile.html')
    });
    reports.addEventListener('click', () => {
        window.location.replace('adminbugreports.html')
    });
    alerts.addEventListener('click', () => {
        window.location.replace('adminalert.html')
    });
    cases.addEventListener('click', () => {
        window.location.replace('admincases.html')
    });
}
else{
    
    const home = document.getElementById('homebutton'); //handles the home button
    home.addEventListener('click', () => {
        window.location.replace('admin.html');
    } );
}

const logout = document.getElementById('signout'); //handles the signout button
logout.addEventListener('click', () =>
    {
        window.location.replace('index.html');
    });

if (document.URL.includes('adminAddTests.html'))
{
    const submission = document.getElementById("uploadResult");
    submission.addEventListener('click', submitEvent);
    function submitEvent()
        {
            const nhi = document.getElementById('nhiNum').value;
            const t = document.getElementById('test').value;
            const d = document.getElementById('date').value;
            const l = document.getElementById('location').value;
            const r = document.getElementById('result').value;
            
                fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){ //this function will add new rat test to user profile
                    if (err) {
                        console.log(err);
                        }
                        else {
                            const file = JSON.parse(userD);
                            for (var k = 0; k < file.length; k++)
                            {    
                                if (file[k].userProfile.nhiNumber == nhi) //finds the correct user profile depending on whos logged in
                                {
                                    console.log(file[k].userProfile);
                                    var testData = file[k].userProfile.tests;
                                    testData.push({test: t, date: d, locat: l, result: r}); //adds the new rat test result
                                    const json =  JSON.stringify(file, null, '\t');
                                
                                    fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) 
                                    {
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else 
                                        {
                                            console.log("Results added!");
                                        }
                                    });
                                }
                                        
                            }
                                        
                        }
                })
        }
}
if (document.URL.includes('adminAddVaccine.html'))
{
    const submission = document.getElementById("upload");
    submission.addEventListener('click', submitEvent);
    function submitEvent()
        {
            const nhi = document.getElementById('nhiNum').value;
            const t = document.getElementById('type').value;
            const da = document.getElementById('date').value;
            const d = document.getElementById('dose').value;
            const b = document.getElementById('batch').value;
            const m = document.getElementById('manufact').value;
            
                fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){ //this function will add new rat test to user profile
                    if (err) {
                        console.log(err);
                        }
                        else {
                            const file = JSON.parse(userD);
                            for (var k = 0; k < file.length; k++)
                            {    
                                if (file[k].userProfile.nhiNumber == nhi) //finds the correct user profile depending on whos logged in
                                {
                                    console.log(file[k].userProfile);
                                    var vaxData = file[k].userProfile.vaccines;
                                    vaxData.push({type: t, Manufacturer: m, BatchNo : b, DoseNo : d, date : da}); //adds the new rat test result
                                    const json =  JSON.stringify(file, null, '\t');
                                
                                    fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) 
                                    {
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else 
                                        {
                                            console.log("Results added!");
                                        }
                                    });
                                }
                                        
                            }
                                        
                        }
                })

                    //Logging the time of the submission and type.

    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();

    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

    const Type = "Vaccine Upload";

    const BugLog = new Log(date, time, Type)


    fs.readFile('src/vaclogger.json', 'utf-8', function(err, data){
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.push({BugLog});
            const json =  JSON.stringify(file, null, '\t');

            fs.writeFile('src/vaclogger.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("Vaccine log saved.");
                }
            });
        }
    })
    window.alert("Thank you for submitting a Vaccine for a User.");

    }
}