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
    const userD = new user(u, e, p, fN, lN, mN, num); //creating a new object from the class and passing the form's data through the constructor in order to set the variables values

    fs.appendFile("./backend/savedUsers.txt", JSON.stringify(userD, null, '\t'), 'utf-8', function(err) { //Function that add the new user to the existing file in string format
        if (err) return console.log(err);
        console.log(userD);
    })
    
}
