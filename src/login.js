//This file users the user's inputed login data from the login form on the login page, and takes the saved users data to check for a matching login
/*
---------------------------------------------
PLEASE DO NOT EDIT THIS FILE, LEAVE IT AS IS
---------------------------------------------
*/
const Common = require('electron/common');
var fs=require('fs');
let $ = require('jquery');
const { Module } = require('module');
if (document.URL.includes('login.html'))
{
    $(document).ready(function () {
        $.getJSON('savedUsers.json', function(jsdata) { //takes the json file with all the saved user's and stores its data in the jsdata variable (originally had the json file stored in the backend folder, but found that when trying to get the login system to work, it would throw constant errors and not be able to find it, so moved the json file to the src folder for now)
            const login = document.getElementById("submit");
            login.addEventListener('click', submitEvent);   //Creates an event listener for when the user hits the login button
            function submitEvent() //This function will start running once the user hits the login button
            { 
                const username = document.getElementById('username').value; //Takes the value that the user has stored in the username field and stores it
                const pass = document.getElementById('password').value; //Takes the value that the user has stored in the password field and stores it
    
                    var users = JSON.stringify(jsdata); //first turns the data taken from the json file and turns it to a JSON string
                    var validJsonStr = users.replaceAll(`'`, `"`);
                    var userDB = JSON.parse(validJsonStr);    //parses the json data string
                try {   
                    for (var i = 0; i < userDB.length; i++){ //loops through the data that has been pulled from the json file, for the length of it, in order to be able to do login checks
                        //these if statements check whether or not the login is valid
                        if (userDB[i].userData.userName == username && userDB[i].userData.password == pass && userDB[i].userData.authLvl == "User") //this statement will become true and run if the login details are a match to one in the system, and the user's auth level is that of a regular user - sending them to the user home page
                        {   
                            var userP = { //creating the user object which will be stored in session storage so the user can access their information
                                fName: userDB[i].userData.firstName,
                                lName: userDB[i].userData.lastName,
                                mName: userDB[i].userData.middleName,
                                num: userDB[i].userData.NHINumber,
                                email: userDB[i].userData.email,
                                userN: userDB[i].userData.userName
                            }
                            console.log("Success", userDB[i].userData.authLvl);
                            
                            window.location.replace('userHome.html'); //takes the user to their home page
                        }
                        else if (userDB[i].userData.userName == username && userDB[i].userData.password == pass && userDB[i].userData.authLvl == "Admin") //this statement runs if the user's login information is correct and their auth level is set to admin, sending them to the admin pages
                        {
                            console.log("Success", userDB[i].userData.authLvl);
                            window.location.replace('admin.html'); //takes the admin to their homepage
                        }
                        else if (userDB[i].userData.userName == username && userDB[i].userData.password != pass) //This statement runs if the user has entered the wrong password
                        {
                            console.log("Invalid password");
                            
                        }
                        else if (userDB[i].userData.userName != username && userDB[i].userData.password == pass)
                         {
                            console.log("Invalid username");
                        }
                        
                    }
                   
                    const tempUD =  JSON.stringify(userP); //gets the user object ready to be stored (temp userdata)
                    sessionStorage.setItem("user", tempUD); //stores the user in sessstorage which will clear after the session is done, using the key user to be able to find it

                 } catch (err) {
                    console.log(err);
                   }   
            }
            
        });
     }); 
}


var input = document.getElementById("password");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});