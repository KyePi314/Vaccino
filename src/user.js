//USER SIGN UP FORM JS
var fs = require('fs'); //allows program to write to file

class user { //Created the user class
    //Variables
    userName;
    email;
    firstName;
    middleName;
    lastName;
    NHINumber
    password;
    authLvl;
    constructor(userName, email, password, firstName, lastName, middleName, NHINumber) { //constructor sets all the variables data
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.NHINumber = NHINumber;
        this.userLevel(this.authLvl);   
    }
    userLevel() //set if user or admin
    {
        if (this.NHINumber == "")
        {
            this.authLvl = "Admin";
            return this.authLvl;
        }
        else 
        {
            this.authLvl = "User";
            return this.authLvl;
        }
    }
    
}


const submission = document.getElementById("submit");
submission.addEventListener('click', submitEvent);
function submitEvent()
{
    //setting the user data on the click event
    const u = document.getElementById('username').value;
    const e = document.getElementById('email').value;
    const p = document.getElementById('password').value;
    const fN = document.getElementById('firstname').value;
    const lN = document.getElementById('lastname').value;
    const mN = document.getElementById('middlename').value;
    const num = document.getElementById('nhi').value;
    const userData = new user(u, e, p, fN, lN, mN, num); //creating a new object from the class and passing the form's data through the constructor in order to set the variables values
    
    fs.readFile('./backend/savedUsers.json', 'utf-8', function(err, data){
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.Users.push({userData});
            const json =  JSON.stringify(file, null, '\t');

            fs.writeFile('./backend/savedUsers.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("User successfully saved to the system!");
                }
            })
        }
    })
    
}
