//USER PAGES JS
var fs=require('fs');
var userID = require('./login');


window.addEventListener('load', function(){
   
    console.log(userID.userDB);
});

const signout = document.getElementById('signout');
const vaxRec = document.getElementById('vaccineRecords');


signout.addEventListener('click', () =>
{
    window.location.replace('index.html');
});

vaxRec.addEventListener('click', () => {
    window.location.replace('vaccineRecords.html');
})