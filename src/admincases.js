var fs = require('fs'); //allows program to write to file

class covidNo{
    covidno;

    constructor(CovidNoCases){
        covidno = CovidNoCases;
    }
}

let requiredInputs = document.querySelectorAll("[required]");
let submitButton = document.querySelector(".changeCases");

submitButton.disabled = true;

for(let i = 0; i < requiredInputs.length; i++){
requiredInputs[i].addEventListener("input", buttonState)
};

function buttonState() {
  if (requiredInputs.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

if (submitButton.disabled == false)
{
const submission = document.getElementById("submit");
submission.addEventListener('click', submitEvent);
function submitEvent()
{
    //setting the covid data on the click event
    const c = document.getElementById('casesInput').value;
    const covidCases = new covidNo(c); //creating a new object from the class and passing the form's data through the constructor in order to set the variables values

    const fs = require('fs');
    fs.writeFile('./covidnodata.json', JSON.stringify(covidCases), err =>{
        if (err) {
            console.log(err);
        }
        const jsonString = JSON.stringify(covidCases);
        console.log(jsonString);

    });
}

}

//<!--This function will be used to change the covid numbers for the system and home page-->
//function covidno(){

//syncReadFile('./miscsitefunctions');
//if(){
//var covidswitch = 0;

//  return ;
//}
//}

//<!--This function will be used to change the alerts in the system and on the home page-->
//function alerts(){

//syncReadFile('./miscsitefunctions');
//if(alertswitch == 0){
//  

//  return <img id="alert1" src="images\yellow.svg">;
//}
//else if(alertswitch == 1){
//  return <img id="alert1" src="images\red.svg">;
//}

//else if(alertswitch == 2){
//return <img id="alert1" src="images\green.svg">;
//}
//}