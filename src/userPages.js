//USER PAGES JS

let tempTwo = sessionStorage.getItem("user"); //retrieves the user's data stored in the sessions storage
let userID = JSON.parse(tempTwo); //parse's the user's information and stores it in the userID variable for later use.

window.addEventListener('load', function(){
   
    console.log(userID);
});

const logout = document.getElementById('signout');


logout.addEventListener('click', () =>
{
    window.location.replace('index.html');
});

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

