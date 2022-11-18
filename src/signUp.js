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
    street;
    city;
    phone;
    authLvl;
    constructor(userName, email, password, firstName, lastName, middleName, NHINumber, city, street, phone) { //constructor sets all the variables data
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.NHINumber = NHINumber;
        this.city = city;
        this.street = street;
        this.phone = phone;
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
let requiredInputs = document.querySelectorAll("[required]");
let submitButton = document.querySelector(".sub");

for(let i = 0; i < requiredInputs.length; i++){
requiredInputs[i].addEventListener("input", buttonState)
};

function buttonState() {
    submitButton.disabled = Array.from(requiredInputs).some(x => x.value === '');
}

if (submitButton.disabled == false)
{
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
    const userData = new user(u, e, p, fN, lN, mN, num, "", "", ""); //creating a new object from the class and passing the form's data through the constructor in order to set the variables values
    const userProfile = {
        nhiNumber: num,
        tests: [{}],
        vaccines: [{}]
    }
    fs.readFile('src/savedUsers.json', 'utf-8', function(err, data){ //adds all the user info to the system
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            
            file.push({userData});
            const json =  JSON.stringify(file, null, '\t');


            fs.writeFile('src/savedUsers.json', json, 'utf-8', function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("User successfully saved to the system!");
                }
            });
        }
    })
    fs.readFile('src/userInfo.json', 'utf-8', function(err, userD){//adds the user's NHI number to the info system that handles their test results, vaccine records etc
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(userD);
            file.push({userProfile});
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
    })
    window.location.replace('index.html');
}

}

