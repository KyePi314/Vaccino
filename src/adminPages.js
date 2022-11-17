var fs = require('fs');



if (document.URL.includes('admin.html'))
{
    const profile = document.getElementById('profile');
    const reports = document.getElementById('bugReports');
    const alerts = document.getElementById('alert');
    const cases = document.getElementById('cases');
    profile.addEventListener('click', () => {
        window.location.replace('admineditprofile.html')
    });
    reports.addEventListener('click', () => {
        window.location.replace('adminbugreports.html')
    });
    alerts.addEventListener('click', () => {
        window.location.replace('adminalert.html')
    });
    cases.addEventListener('click', () => {
        window.location.replace('admincases.html')
    });
}
else{
    
    const home = document.getElementById('homebutton'); //handles the home button
    home.addEventListener('click', () => {
        window.location.replace('admin.html');
    } );
}

const logout = document.getElementById('signout'); //handles the signout button
logout.addEventListener('click', () =>
    {
        window.location.replace('index.html');
    });

if (document.URL.includes('adminAddTests.html'))
{
    const submission = document.getElementById("uploadResult");
    submission.addEventListener('click', submitEvent);
    function submitEvent()
        {
            const nhi = document.getElementById('nhiNum').value;
            const t = document.getElementById('test').value;
            const d = document.getElementById('date').value;
            const l = document.getElementById('location').value;
            const r = document.getElementById('result').value;
            
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
                                        testData.push({test: t, date: d, locat: l, result: r});
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
/* fs.readFile('src/userInfo.json', 'utf-8', function(err, data){//adds the user's NHI number to the info system that handles their test results, vaccine records etc
    if (err) {
        console.log(err);
    }
    else {
        const file = JSON.parse(data);
        file.push({userID});
        const json =  JSON.stringify(file, null, '\t');

        
        fs.writeFile('src/userInfo.json', json, 'utf-8', function(err) {
            if(err){
                console.log(err);
            }
            else {
                console.log("User successfully saved to the system!");
            }
        });
    }
})  */

