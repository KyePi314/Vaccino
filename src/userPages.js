//USER PAGES JS
var fs=require('fs');

let tempTwo = localStorage.getItem("testing");
let userID = JSON.parse(tempTwo);

window.addEventListener('load', function(){
   
    console.log(userID);
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