var fs = require('fs'); //allows program to write to file

const submission = document.getElementById("changeCases");
submission.addEventListener('click', submitEvent1);
function submitEvent1()
    {
      
      //setting the bug report data on the click event
      const CovidNo = document.getElementById('casesInput').value;
      fs.readFile('src/covidnodata.json', 'utf-8', function(err, data){ //adds bug report data.
          if (err) {
              console.log(err);
          }
          else {
              const file = JSON.parse(data);
              file[0].covidNo = CovidNo;
              const json =  JSON.stringify(file, null, '\t');
  
              fs.writeFile('src/covidnodata.json', json, 'utf-8', function(err) {
                  if(err){
                      console.log(err);
                  }
                  else {
                      console.log("Bug report successfully saved to the system.");
                  }
              });
          }
      })

      location.reload();
      return false;
      
  }