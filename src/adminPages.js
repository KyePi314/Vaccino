var fs = require('fs');
//KYE IS USING THIS FILE TO TEST OUT ADMIN FUNCTIONS FOR THE JAVASCRIPT I AM ARE WORKING ON SO THAT I DO ACCIDENTALLY CORRUPT THE OTHER ONHE IF ANYONE ELSE IS WORKING ON IT
var tempTwo = sessionStorage.getItem("tests"); //retrieves the user's data stored in the sessions storage
var userID = JSON.parse(tempTwo); //parse's the user's information and stores it in the userID variable for later use.

if (document.URL.includes('admin.html'))
{

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

