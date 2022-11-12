var fs=require('fs');
let $ = require('jquery');

$(document).ready(function () {
    $.getJSON('C:/Users/kyess/OneDrive - UP Education/Documents/testing4/my-app/backend/savedUsers.json', function(jsdata) {
        const login = document.getElementById("submit");
        login.addEventListener('click', submitEvent);
        function submitEvent()
        { 
            const username = document.getElementById('username').value;
            const pass = document.getElementById('password').value;

                const users = JSON.stringify(jsdata);
                const validJsonStr = users.replaceAll(`'`, `"`);
                const userDB = JSON.parse(validJsonStr);
                // console.log(userDB[0].userData.userName);
            try {
                for (var i = 0; i < userDB.length; i++){
                    if (userDB[i].userData.userName == username && userDB[i].userData.password == pass && userDB[i].userData.authLvl == "User"){
                        console.log("Success", userDB[i].userData.authLvl);
                        window.location.replace('userHome.html');
                    }
                    else if (userDB[i].userData.userName == username && userDB[i].userData.password == pass && userDB[i].userData.authLvl == "Admin") {
                        console.log("Success", userDB[i].userData.authLvl);
                        window.location.replace('admin.html');
                    }
                    else if (userDB[i].userData.userName == username && userDB[i].userData.password != pass){
                        console.log("Invalid password");
                    }
                    else if (userDB[i].userData.userName != username) {
                        console.log("Invalid username");
                    }
                    
                }
                
                
               } catch (err) {
                console.log(err);
               }
        
        }
        
    });
 });
