var fs = require('fs'); //allows program to write to file

class trafficLight{
    trafficlight;

    constructor(TrafficLightNo){
        trafficlight = TrafficLightNo;
    }
}

let requiredInputs = document.querySelectorAll("[required]");
let submitButton = document.querySelector(".changeAlert");

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
constsubmission = document.getElementById("changeAlert");
submission.addEventListener('click', submitEvent2);
function submitEvent2()
{
    //setting the traffic light data on the click event
    const t = document.getElementById('trafficLight').value;
    const trafficLightData = new trafficLight(t); //creating a new object from the class and passing the form's data through the constructor in order to set the variables value
    const trafficLightChange = {
        trafficLight: trafficLightData.trafficLight,
    }
    fs.readFile('src/alertleveldata.json', 'utf-8', function(err, trafficlight){//changes the traffic light number either to 0, 1 or 2.
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(trafficlight);
            file.push({trafficLightData});
            const json =  JSON.stringify(file, null, '\t');
    
    
            fs.writeFile('src/alertleveldata.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("You have successfully changed the traffic light.");
                }
            });
        }
    })
    
}

}