//USER PAGES JS
const { captureRejectionSymbol } = require('events');
var fs = require('fs');
let $ = require('jquery');

var tempTwo = sessionStorage.getItem("user"); //retrieves the user's data stored in the sessions storage
var userID = JSON.parse(tempTwo); //parse's the user's information and stores it in the userID variable for later use.

if (document.URL.includes('src/userHome.html')) //code specific to the home page
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

} else{
    
    const home = document.getElementById('homebutton'); //handles the home button
    home.addEventListener('click', () => {
        window.location.replace('userHome.html');
    } );
}

const logout = document.getElementById('signout'); //handles the signout button
logout.addEventListener('click', () =>
    {
        window.location.replace('index.html');
    });

if (document.URL.includes('src/testResults.html')) //code specific to the test results page
{
    nhi = userID.num; //stores the user's nhi number
   
    $.getJSON('userInfo.json', function(jsdata) 
        { 
            
            var users = JSON.stringify(jsdata); //first turns the data taken from the json file and turns it to a JSON string
            var validJsonStr = users.replaceAll(`'`, `"`);
            var userDB = JSON.parse(validJsonStr);    //parses the json data string
        try 
        {   
            
            for (var i = 0; i < userDB.length; i++)//loops through the data that has been pulled from the json file, for the length of it, in order to be able to do login checks
            { 
                if (userDB[i].userProfile.nhiNumber == nhi)
                {
                    
                    var tests = userDB[i].userProfile.tests;
                    
                    //creating a table that will be dynamic and grow if need be
                    var html = "<table border='1'>";
                    html+="<tr>";
                    html+="<th>"+"Test"+"</th>";
                    html+="<th>"+"Date"+"</th>";
                    html+="<th>"+"Location"+"</th>";
                    html+="<th>"+"Result"+"</th>";
                    html+="</tr>";
                    for (var j = 0; j < tests.length; j++) //table loops through the data taken from the json file and stores it in the table
                    {
                        var userP = { //creating the user object which will be stored in session storage so the user can access their information
                            test: tests[j].test,
                            date: tests[j].date,
                            location: tests[j].locat,
                            res: tests[j].result
                        }
                        html+="<tr>";
                        html+="<td>"+tests[j].test+"</td>";
                        html+="<td>"+tests[j].date+"</td>";
                        html+="<td>"+tests[j].locat+"</td>";
                        html+="<td>"+tests[j].result+"</td>";
                        html+="</tr>";
                    
                        
                    }
                    html+="</table>";
                    document.getElementById("table").innerHTML = html; //table code finishes here
            
                }           
                     
            }
            

        } catch (err) 
            {
                console.log(err);
            }   
    });
    const submission = document.getElementById("submitResult");
    submission.addEventListener('click', submitEvent);
                        function submitEvent()
                        {
                            const d = document.getElementById('date').value;
                            const l = document.getElementById('location').value;
                            const r = document.getElementById('result').value;
                            const testsData = {
                                test: {test: "RAT", date: d, locat: l, result: r}
                            }
                                fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){//adds the user's NHI number to the info system that handles their test results, vaccine records etc
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        const file = JSON.parse(userD);
                                        for (var k = 0; k < file.length; k++)
                                        {
                                            
                                            if (file[k].userProfile.nhiNumber == nhi)
                                            {
                                                console.log(file[k].userProfile);
                                                var testData = file[k].userProfile.tests;
                                                testData.push({test: "RAT", date: d, locat: l, result: r});
                                                const json =  JSON.stringify(file, null, '\t');
                                
                                
                                            fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) {
                                                if(err){
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log("Results added!");
                                                }
                                            });
                                            }
                                           /*  tests.push({testsData});
                                            const json =  JSON.stringify(file, null, '\t');
                                
                                
                                            fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) {
                                                if(err){
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log("User successfully saved to the system!");
                                                }
                                            }); */
                                        }
                                        
                                        
                                    }
                                })
                        }
    
}

