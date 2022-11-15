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
const submission = document.getElementById("changeCases");
submission.addEventListener('click', submitEvent1);
function submitEvent1()
{
    //setting the covid data on the click event
    const c = document.getElementById('covidno').value;
    const covidCases = new covidNo(c); //creating a new object from the class and passing the form's data through the constructor in order to set the variables values
    const CovidCasesCurrent = {
        CovidNo: covidCases.covidno
    }
    fs.readFile('src/admincases.json', 'utf-8', function(err, Covidnocases){ //adds all the user info to the system
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(Covidnocases);
            file.push({covidCases});
            const json =  JSON.stringify(file, null, '\t');


            fs.writeFile('src/admincases.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("You have successfully changed the covid numbers.");
                }
            });
        }
    })
    
}

}

// var mydata = JSON.parse(covidnodata);
// alert(mydata[0].covidno);

fetch(covidnodata.json)
  .then(function (response) {
    // The JSON data will arrive here
  })
  .catch(function (err) {
    // If an error occured, you will catch it here
  });

  fetch('covidnodata.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });

  var mainContainer = document.getElementById("CurrentCases");

  for (var i = 0; i < data.length; i++) {
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