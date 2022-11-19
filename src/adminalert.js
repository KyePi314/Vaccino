var fs = require('fs'); //allows program to write to file
var trafficnumber;
const submission = document.getElementById("changeAlert");
submission.addEventListener('click', submitEvent2);
function submitEvent2()
{
    //setting the traffic light data on the click event
    // const t = document.getElementById('trafficLight').value;
    // const trafficLightData = new trafficLight(t); //creating a new object from the class and passing the form's data through the constructor in order to set the variables value
      
    //This code is used for acquiring and parsing data from files without having to use fs.readfile.
        fetch('alertleveldata.json')
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData2(data);
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
  function appendData2(data) {
      var trafficdata = data[0].trafficLight;
      //Count the number of lines.
      for (var i = 0; i < data.length; i++) {
        //Acquire the right number for trafficdata for input into the system.
      if(trafficdata == 0){
        trafficnumber = 1;
      }
      else if(trafficdata == 1){
        trafficnumber = 2;
      }
      else if(trafficdata == 2){
        trafficnumber = 0;
      }
    }
    location.reload();
    return false;
  }
  //Here we use a read file.
    fs.readFile('src/alertleveldata.json', 'utf-8', function(err, data){//changes the traffic light number either to 0, 1 or 2.
        if (err) {
            console.log(err);
        }
        else {
            //This is working fine.
            const trafficNo = trafficnumber;

            //Finally got this working. Only issue is it does not refresh the page but that has been resolved below.
            const file = JSON.parse(data);
            file[0].trafficLight = trafficNo;
            const json = JSON.stringify(file, null, '\t');
    
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
    //Refreshes the page.
    location.reload();
    return false;
    
}