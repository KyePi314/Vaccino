var fs = require('fs');

//Create the class for vaccine logs.
class vacLog {
    Date;
    Time;
    Type;

    constructor(date, time, type){
        this.Date = date;
        this.Time = time;
        this.Type = type;
    }
}

const Common = require('electron/common');
var fs=require('fs');
let $ = require('jquery');
const { Module } = require('module');

//If the current page opened is Admin.
if (document.URL.includes('admin.html'))
{
    //Creates variables for each of the buttons and creates onclick features for each to get to certain pages.
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

    //If the current page is admin add tests.
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
            
                fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){ //This function will add new rat test to user profile
                    if (err) {
                        console.log(err);
                        }
                        else {
                            const file = JSON.parse(userD);
                            for (var k = 0; k < file.length; k++)
                            {    
                                if (file[k].userProfile.nhiNumber == nhi) //Finds the correct user profile depending on who is logged in.
                                {
                                    console.log(file[k].userProfile);
                                    var testData = file[k].userProfile.tests;
                                    testData.push({test: t, date: d, locat: l, result: r}); //Adds the new rat test result
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

//If the current page is admin add vaccine.
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
            
                fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){ //this function will add new vaccine to the user profile
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
                                    vaxData.push({type: t, Manufacturer: m, BatchNo : b, DoseNo : d, date : da}); //adds the new vaccine
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


    //Create variables by gathering real world data from the person's computer (time and date)
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();

    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

    const Type = "Vaccine Upload";

    //Creates a new object from the log class.
    const VacLog = new vacLog(date, time, Type)

    //Reads and writes to the vaclogger json file.
    fs.readFile('src/vaclogger.json', 'utf-8', function(err, data){
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.push({VacLog});
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

//Declare global variable for preventing loops.
var preventloop;

//Declare global variable to ensure screen is wiped.
var counter = 0;

if (document.URL.includes('admineditprofile.html'))
{
    const submission = document.getElementById("issueqrcodebutton");
    submission.addEventListener('click', submitEvent);
    function submitEvent(){

    const usernhi = document.getElementById("nhiinput").value;
    fs.readFile('src/savedUsers.json', 'utf-8', function(err, userD){ //this function will add new rat test to user profile
        if (err) {
            console.log(err);
            }
            else {
                const file = JSON.parse(userD);
                for (var x = 0; x < file.length; x++)
                {    
                    if (file[x].userData.NHINumber == usernhi) //finds the correct user profile.
                    {
                        console.log(file[x].userData);
                        //Assigns new QR code.
                        
                        window.alert("New QR Code given to User:" + usernhi);
                        file[x].userData.QRcode = Math.floor((Math.random() *10) +1);;
                        
                        const json = JSON.stringify(file, null, '\t');
                    
                        fs.writeFile('src/savedUsers.json', json, 'utf-8', function(err) 
                        {
                            if(err)
                            {
                                console.log(err);
                            }
                            else 
                            {
                                window.location.replace('admineditprofile.html');
                            }
                        })
                    
                    }
                            
                }
                            
            }
        })
    }


}

if(document.URL.includes('admineditprofile.html')){
    const submission2 = document.getElementById("searchbutton");
    submission2.addEventListener('click', submitEvent);
    function submitEvent(){

        function updateDiv()
        { 
            $( "#detailsBox" ).load(window.location.href + " #detailsBox" );
            $( "#QRcodeBox2" ).load(window.location.href + " #QRcodeBox2" );
        }

        setTimeout(updateDiv(), 3000);

    const usernhi = document.getElementById("nhiinput").value;
    fs.readFile('src/savedUsers.json', 'utf-8', function(err, userD){ //this function will add new rat test to user profile
        if(usernhi != preventloop){

        if (err) {
            console.log(err);
            }   
            else {
                const file = JSON.parse(userD);
                for (var i = 0; i < file.length; i++)
                {    
                    if (file[i].userData.NHINumber == usernhi) //finds the correct user profile.
                    {
                        //Prevents looping the output for the user.
                        preventloop = file[i].userData.NHINumber;
                        document.getElementById('emailTxt').innerHTML =  file[i].userData.email;
                        document.getElementById('cellNumTxt').innerHTML = file[i].userData.phone;
                        document.getElementById('streetTxt').innerHTML = file[i].userData.street;
                        document.getElementById('cityTxt').innerHTML = file[i].userData.City;
                        document.getElementById('country').innerHTML = file[i].userData.country;
                        document.getElementById('cNhi').innerHTML = file[i].userData.NHINumber;
                        //displaying the user's details on the page
                        const UserQR = file[i].userData.QRcode;
                        var mainContainer = document.getElementById("QRcodeBox2");
                        var div = document.createElement("div");
                        if(UserQR == 0){
                            div.innerHTML = "There is no QR code assigned to this person.";
                        }
                        //Prints QR code
                        else if(UserQR == 1){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR1.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 2){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR2.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 3){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR3.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 4){
                            div.innerHTMLL = "<img id='qrcodeimage' src=\"images/QRcodes/QR4.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 5){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR5.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 6){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR6.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 7){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR7.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 8){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR8.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 9){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR9.png\">";
                            mainContainer.appendChild(div);
                        }
                        else if(UserQR == 10){
                            div.innerHTML = "<img id='qrcodeimage' src=\"images/QRcodes/QR10.png\">";
                            mainContainer.appendChild(div);
                        }
                        else {
                            div.innerHTML = "Error.";
                        }
                
                        }
                
                        else {
                            console.log("Fail");
                        }
                    
                    }
                }

            }
            else if(usernhi == preventloop){
                window.alert("You have already loaded this profile.");
            }              
            })
            
        
    }
}