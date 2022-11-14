//USER PAGES JS
var fs = require('fs');

var tempTwo = sessionStorage.getItem("user"); //retrieves the user's data stored in the sessions storage
var userID = JSON.parse(tempTwo); //parse's the user's information and stores it in the userID variable for later use.


const logout = document.getElementById('signout');

logout.addEventListener('click', () =>
{
    window.location.replace('index.html');
});

if (document.URL.includes('userHome.html')) //code specific to the home page
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

}


if (document.URL.includes('src/testResults.html')) //code specific to the test results page
{
    nhi = userID.num; //stores the user's nhi number
    var testsArr = [];

    fs.readFile('src/userInfo.json', 'utf-8', function(err, data){
        if(err) {
            console.log(err);
        }
        else 
        {
            const file = JSON.parse(data);
            console.log(file);
        }
    })
    
}