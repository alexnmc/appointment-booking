const express = require("express")
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

//post a new user to user collection (signing up)
authRouter.post("/signup", (req, res, next) => {
    
    User.findOne({username: req.body.username}, (err, existingUser) => {
        
        if (err) {
            res.status(500)
            return next(err)
        }
        
        
        if (existingUser) {
               res.status(400)
               return next(new Error ("That username already exists!"))
        }
       
        const newUser = new User(req.body);
        newUser.save((err, addedUser) => {
            if (err) {
             res.status(500)
             return next(err)

        }
            const token = jwt.sign(addedUser.withoutPassword(), process.env.SECRET);
            return res.status(201).send({success: true, user: addedUser.withoutPassword(), token});
        });
    });
});




authRouter.post("/login", (req, res, next) => {
    // Try to find the user with the submitted username 
     User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
        res.status(500)
        return next(err)
        }

        // If that user isn't in the database OR the password is wrong:
        if (!user ) {
             res.status(403)
             return next(new Error( "Username or password are incorrect"))
        }

         user.checkPassword(req.body.password, (err, match )=>{ //this function runs the check password method from the schema, it decrypts the password and compares it w the users input

            if(err){
                res.status(500)
                return next(err)
            }
            
            if(!match){
                res.status(403)
             return next(new Error( "Username or password are incorrect")) //if password doesn not match send back this error
            }

            const token = jwt.sign(user.withoutPassword(), process.env.SECRET) //if match is true create token

             // Send the token back to the client app.
            return res.send({token: token, user: user.withoutPassword(), success: true})
       })
    })
})



authRouter.get('/', (req, res) => {    // get all for testing with postman 
    
    User.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)

    })
})





authRouter.delete('/', (req, res, next) => {
    
    User.remove((err, data) => {      // for testing, deletes everything on the /auth endpoint!
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send(` was succesfully deleted!`)
    })
})



authRouter.delete('/:id', (req, res, next) => {     //delete one by ID for admin use only
     
    User.findOneAndDelete({_id: req.params.id} , (err, data) => {
       if (err) {
           res.status(500)
           return next(err)
       }
       return res.status(202).send('user deleted')
   })
})




module.exports = authRouter
