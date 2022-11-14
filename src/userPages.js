//USER PAGES JS
var fs = require('fs');
let $ = require('jquery');

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
    const logout = document.getElementById('signout');
    const home = document.getElementById('homebutton');

    logout.addEventListener('click', () =>
    {
        window.location.replace('index.html');
    });
    home.addEventListener('click', () => {
        window.location.replace('userHome.html');
    } );
}



if (document.URL.includes('src/testResults.html')) //code specific to the test results page
{
    nhi = userID.num; //stores the user's nhi number
    var testsArr = [];


    $.getJSON('userInfo.json', function(jsdata) 
        { 
            
            var users = JSON.stringify(jsdata); //first turns the data taken from the json file and turns it to a JSON string
            var validJsonStr = users.replaceAll(`'`, `"`);
            var userDB = JSON.parse(validJsonStr);    //parses the json data string
        try 
        {   
            for (var i = 0; i < userDB.length; i++)//loops through the data that has been pulled from the json file, for the length of it, in order to be able to do login checks
            { 
                if (userDB[i].userProfile.NHINumber == nhi)
                {
                    
                }           
                     
            }

        } catch (err) 
            {
                console.log(err);
            }   
    });
    
}