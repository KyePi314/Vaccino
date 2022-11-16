var fs = require('fs'); //allows program to write to file

class covidNo{
    covidno;

    constructor(CovidNoCases){
        this.covidno = CovidNoCases; 
    }
}


const submission = document.getElementById("changeCases");
submission.addEventListener('click', submitEvent1);
function submitEvent1()
{
    //setting the covid data on the click event
    const c = document.getElementById('casesInput').value; //Originally you had the id as covidNo I think? but in the html the id for the input is casesInput so changed it that, other wise you wouldn't be able to read any of the data at all!
    const covidCases = new covidNo(c); //creating a new object from the class and passing the form's data through the constructor in order to set the variables values
    
    fs.readFile('src/covidnodata.json', 'utf-8', function(err, data){ //adds all the user info to the system //KYE HERE: Hey so here you were only writing, with json you need to raead the file, parse and save the data
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data); //So here I parsed the data from the json file
            file.covidNo = covidCases.covidno; //Here I change the covidNo that currently exists in the file (file.covidNo accesses that), to the value you get from the html that's saved to your covid number object
            const validJson = JSON.stringify(file); //making the data back into a json string ready to be written back to the file


            fs.writeFile('src/covidnodata.json', validJson, 'utf-8', function(err) { //sends the data back to the file with the new, updated number
                if(err){
                    console.log(err); 
                }
                else {
                    console.log("You have successfully changed the covid numbers."); //message just for testing purposes, you should look at making this a pop up dialog box though so the admin knows the new number has been saved
                }
            });
        }
    })
    
}

//Dunno what this is but you don't need it if its for changing the covid number
/* // var mydata = JSON.parse(covidnodata);
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
   */

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