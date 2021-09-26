const db = require('./db');
const validator = require("validator")
const bcrypt = require("bcryptjs")

let User = function (data, getAvatar) {
    this.data = data;
    this.errors = [];
    if (getAvatar == undefined) {
        getAvatar = false
    }
    if (getAvatar) {
        this.getAvatar()
    }
};

User.prototype.cleanUp = function () {

    if (typeof (this.data.email) != "string") {
        this.data.email = "";
    }
    if (typeof (this.data.password) != "string") {
        this.data.password = "";
    }

    // get rid of any irregular properties
    if (this.data.nom && this.data.prenom && passwordConfirmation) {
        this.data = {
            agreetoterms: this.data.agreetoterms,
            nom: this.data.nom.trim().toLowerCase(),
            prenom: this.data.prenom.trim().toLowerCase(),
            email: this.data.email.trim().toLowerCase(),
            password: this.data.password,
            passwordConfirmation: this.data.passwordConfirmation
        }
    } else {
        this.data = {
            email: this.data.email.trim().toLowerCase(),
            password: this.data.password
        }
    }
};

User.prototype.validate = async function () {


    if (!validator.isEmail(this.data.email)) {
        this.errors.push("You must provide a valid email.");
    }
    if (!this.data.agreetoterms){
        this.errors.push("You must agree the Terms & Conditions.");
    }
    if (this.data.password == "") {
        this.errors.push("You must provide a password.");
    }
    if (this.data.password.length > 0 && this.data.password.length < 7) {
        this.errors.push("Password must be at least 12 caracters");
    }
    if (this.data.password.length > 50) {
        this.errors.push("Password can't exceed 50 caracters");
    }
    if (this.data.password !== this.data.repassword) {
        this.errors.push("invalid password confirmation")
    }



    //OnlyIf email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
        let emailExists = await db.query(`SELECT * FROM user WHERE email = '${this.data.email}' `)
        if (emailExists.length > 0) {
            this.errors.push("That email address is already being used.")
        }
    }


}
User.prototype.register = function (req) {
    return new Promise(async (resolve, reject) => {
        // step 1 validate user data

        await this.validate();
        // step 2 only if there are no validation errors,
        // save the user data into a database
        if (!this.errors.length) {
            //hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            //store the data
            this.data.role = 3
            this.data.dateAdded = new Date()
            this.data = {
                nom: this.data.nom,
                prenom: this.data.prenom,
                email: this.data.email,
                password: this.data.password,
                cin:this.data.cin,
                telephone:this.data.telephone,
                addresse:this.data.addresse

            }
            await db.query(`INSERT INTO user(nom,prenom,email,cin,addresse,telephone,password)VALUES('${this.data.nom}','${this.data.prenom}','${this.data.email}','${this.data.cin}','${this.data.addresse}','${this.data.telephone}','${this.data.password}') `)

            resolve('congrats!')
        } else {
            reject(this.errors)
        }
    })
}

// User.findByEmail = function (email) {
//     return new Promise(async function (resolve, reject) {
//         try {
//             if (typeof (email) != "string") {
               
//                 return
//             }
//             let results = await db.query(`SELECT * FROM user WHERE email = '${email}' `)

//             if (results.length !== 1) {
//                 this.errors.push("That email address is already being used.")
//             } else {
//                 return results[0];
//             }
//         } catch {
//             reject("please try again later")

//         }
//     })
// }

// User.prototype.confirmEmail = function (email) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let userByEmail = await findByEmail(email)
//             resolve("success")
//         } catch {
//             reject("failure")
//         }
//     })
// }

// User.prototype.login = function () {

// }

User.prototype.login = function (req) {
    return new Promise(async (resolve, reject) => {
        // await this.cleanUp()
        try {

            let results = await db.query(`SELECT * FROM user WHERE email = '${this.data.email}' `)

            if (results.length == 1){
                attemptedUser = results[0]
                if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                    this.data = attemptedUser
                    // this.getAvatar()
                    resolve("congrats")
                } else {
                    this.errors.push('wrong username/password')
                    reject(this.errors)
                }
            }else {
                this.errors.push("user does not exist")
                
                reject(this.errors)
            }

            
        }
        catch {
            reject("please try again later")
        }
    })
}

module.exports = User