
var fs = require('fs');

class user {
    #userName;
    #email;
    #password;
    constructor(userName, email, password) {
        this.#userName = userName;
        this.#email = email;
        this.#password = password
        //return this.userName + " " + this.email + " " + this.password;
    }
    userLevel() //set if user or admin
    {

    }
    
}



const submission = document.getElementById("submit");
submission.addEventListener('click', submitEvent);
function submitEvent()
{
    const u = document.getElementById('username').value;
    const e = document.getElementById('email').value;
    const p = document.getElementById('password').value;
    const userD = new user(u, e, p);

    fs.appendFile('savedData.txt', JSON.stringify(userD), 'utf-8', function(err) {
        if (err) return console.log(err);
        console.log(userD);
    })
    
}
