//USER PAGES JS
const { captureRejectionSymbol } = require('events');
var fs = require('fs');
let $ = require('jquery');

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

var tempTwo = sessionStorage.getItem("user"); //retrieves the user's data stored in the sessions storage
var userID = JSON.parse(tempTwo); //parse's the user's information and stores it in the userID variable for later use.

if (document.URL.includes('src/userHome.html')) //code specific to the home page
{  
    
    const vaxRec = document.getElementById('vaccineRecords');
    const test = document.getElementById('testResults');
    const code = document.getElementById('qrCode');
    const profile = document.getElementById('details');

    vaxRec.addEventListener('click', () => {
        window.location.replace('vaccineRecords.html');
    });

    test.addEventListener('click', () => {
        window.location.replace('testResults.html');
    });

    code.addEventListener('click', () => {
        window.location.replace('userQrCode.html');
    });

    profile.addEventListener('click', () => {
        window.location.replace('userProfile.html');
    });

} else{
    
    const home = document.getElementById('homebutton'); //handles the home button
    home.addEventListener('click', () => {
        window.location.replace('userHome.html');
    } );
}

const logout = document.getElementById('signout'); //handles the signout button
logout.addEventListener('click', () =>
    {
        window.location.replace('index.html');
    });

if (document.URL.includes('src/testResults.html')) //code specific to the test results page
{
    nhi = userID.num; //stores the user's nhi number
   
    $.getJSON('userInfo.json', function(jsdata) 
        { 
            
            var users = JSON.stringify(jsdata); //first turns the data taken from the json file and turns it to a JSON string
            var validJsonStr = users.replaceAll(`'`, `"`);
            var userDB = JSON.parse(validJsonStr);    //parses the json data string
        try 
        {   
            
            for (var i = 0; i < userDB.length; i++)//loops through the data that has been pulled from the json file, for the length of it, in order to be able to do login checks
            { 
                if (userDB[i].userProfile.nhiNumber == nhi)
                {
                    
                    var tests = userDB[i].userProfile.tests;
                    
                    //creating a table that will be dynamic and grow if need be
                    var html = "<table border='1'>";
                    html+="<tr>";
                    html+="<th>"+"Test"+"</th>";
                    html+="<th>"+"Date"+"</th>";
                    html+="<th>"+"Location"+"</th>";
                    html+="<th>"+"Result"+"</th>";
                    html+="</tr>";
                    for (var j = 0; j < tests.length; j++) //table loops through the data taken from the json file and stores it in the table
                    {
                        var userP = { //creating the user object which will be stored in session storage so the user can access their information
                            test: tests[j].test,
                            date: tests[j].date,
                            location: tests[j].locat,
                            res: tests[j].result
                        }
                        html+="<tr>";
                        html+="<td>"+tests[j].test+"</td>";
                        html+="<td>"+tests[j].date+"</td>";
                        html+="<td>"+tests[j].locat+"</td>";
                        html+="<td>"+tests[j].result+"</td>";
                        html+="</tr>";
                    
                        
                    }
                    html+="</table>";
                    document.getElementById("table").innerHTML = html; //table code finishes here
            
                }           
                     
            }
            

        } catch (err) 
            {
                console.log(err);
            }   
    });
    const submission = document.getElementById("submitResult");
    submission.addEventListener('click', submitEvent);
                        function submitEvent()
                        {
                            const d = document.getElementById('date').value;
                            const l = document.getElementById('location').value;
                            const r = document.getElementById('result').value;
                            const testsData = {
                                test: {test: "RAT", date: d, locat: l, result: r}
                            }
                                fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){//adds the user's NHI number to the info system that handles their test results, vaccine records etc
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        const file = JSON.parse(userD);
                                        for (var k = 0; k < file.length; k++)
                                        {
                                            
                                            if (file[k].userProfile.nhiNumber == nhi)
                                            {
                                                console.log(file[k].userProfile);
                                                var testData = file[k].userProfile.tests;
                                                testData.push({test: "RAT", date: d, locat: l, result: r});
                                                const json =  JSON.stringify(file, null, '\t');
                                
                                
                                            fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) {
                                                if(err){
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log("Results added!");
                                                }
                                            });
                                            }
                                           /*  tests.push({testsData});
                                            const json =  JSON.stringify(file, null, '\t');
                                
                                
                                            fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) {
                                                if(err){
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log("User successfully saved to the system!");
                                                }
                                            }); */
                                        }
                                        
                                        
                                    }
                                })

    //Logging the time of the submission and type into testlogger.json

    var today = new Date();
    var minutes = today.getMinutes();
    if (today.getMinutes() < 10){
        minutes = "0" + minutes;
    }
    var time = today.getHours() + ":" + minutes;

    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

    const Type = "Test Update";

    const BugLog = new Log(date, time, Type)

    //First read the file.
    fs.readFile('src/testlogger.json', 'utf-8', function(err, data){
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.push({BugLog});
            const json =  JSON.stringify(file, null, '\t');
            //Then we wriet to it.
            fs.writeFile('src/testlogger.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("Test update log saved.");
                }
            });
        }
    })
    //A message pops up to let the user know the upload was successful.
    window.alert("Thank you for submitting a test update.");
                                
    }

    
}

if (document.URL.includes('vaccineRecords.html')) //code specific to vaccine records page
{
    nhi = userID.num; //stores the user's nhi number
    $.getJSON('userInfo.json', function(jsdata) 
    { 
        
        var users = JSON.stringify(jsdata); //first turns the data taken from the json file and turns it to a JSON string
        var validJsonStr = users.replaceAll(`'`, `"`);
        var userDB = JSON.parse(validJsonStr);    //parses the json data string
    try 
    {   
        
        for (var i = 0; i < userDB.length; i++)//loops through the data that has been pulled from the json file, for the length of it, in order to be able to do login checks
        { 
            if (userDB[i].userProfile.nhiNumber == nhi)
            {
                
                var vax = userDB[i].userProfile.vaccines;
                
                //creating a table that will be dynamic and grow if need be
                var html = "<table border='1'>";
                html+="<tr>";
                html+="<th>"+"Type"+"</th>";
                html+="<th>"+"Manufacturer"+"</th>";
                html+="<th>"+"Batch No"+"</th>";
                html+="<th>"+"Dose No"+"</th>";
                html+="<th>"+"Date"+"</th>";
                html+="</tr>";
                for (var j = 0; j < vax.length; j++) //table loops through the data taken from the json file and stores it in the table
                {
                   
                    html+="<tr>";
                    html+="<td>"+vax[j].type+"</td>";
                    html+="<td>"+vax[j].Manufacturer+"</td>";
                    html+="<td>"+vax[j].BatchNo+"</td>";
                    html+="<td>"+vax[j].DoseNo+"</td>";
                    html+="<td>"+vax[j].date+"</td>";
                    html+="</tr>";
                
                    
                }
                html+="</table>";
                document.getElementById("table").innerHTML = html; //table code finishes here
        
            }           
                 
        }
        

    } catch (err) 
        {
            console.log(err);
        }   
});
}

if (document.URL.includes('src/userProfile.html'))
{
    //displaying the user's details on the page
    const fullName = userID.fName + " " + userID.lName;
    document.getElementById('cName').innerHTML = fullName;
    document.getElementById('cNhi').innerHTML = userID.num;
    document.getElementById('emailTxt').innerHTML =  userID.email;
    document.getElementById('CellNumTxt').innerHTML = userID.phone;
    document.getElementById('streetTxt').innerHTML = userID.street;
    document.getElementById('cityTxt').innerHTML = userID.City;
    document.getElementById('country').innerHTML = userID.country;
    //Profile details code
    document.getElementById('nTxt').innerHTML = fullName;
} 
if (document.URL.includes('src/editProfile.html'))
{
    nhi = userID.num; //stores the user's nhi number
    const update = document.getElementById('update');
    update.addEventListener('click', () =>
    {
        const street = document.getElementById('street').value;
        const e = document.getElementById('email').value;
        const city = document.getElementById('town').value;
        const phone = document.getElementById('cell').value;
        const country =  document.getElementById('country').value;
        fs.readFile('src/savedUsers.json', 'utf-8', function(err, userD){ //this function will add new rat test to user profile
            if (err) {
                console.log(err);
                }
                else {
                    const file = JSON.parse(userD);
                    for (var x = 0; x < file.length; x++)
                    {    
                        if (file[x].userData.NHINumber == nhi) //finds the correct user profile depending on whos logged in
                        {
                            console.log(file[x].userData);
                            //Updates the user's data based on what they entered in the form, the if statements check to make sure the value isn't null before replacing the data
                            if (e != "")
                            {
                                file[x].userData.email = e;
                            }
                            if (street != "")
                            {
                                file[x].userData.street = street;
                            }
                            if (city != "")
                            {   
                                file[x].userData.City = city;
                            }
                            if (phone != "")
                            {
                                file[x].userData.phone = phone;
                            }
                            if(country != "")
                            {
                                file[x].userData.country = country;
                            }
                            const json =  JSON.stringify(file, null, '\t');
                        
                            fs.writeFile('src/savedUsers.json', json, 'utf-8', function(err) 
                            {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else 
                                {
                                    window.location.replace('userProfile.html');
                                }
                            });
                        }
                                
                    }
                                
                }
        })
    });


    
}