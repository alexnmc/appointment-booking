const express = require("express")
const User = require("../models/user");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

//post a new user to user collection (signing up)
userRouter.post("/signup", (req, res, next) => {
    
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




userRouter.post("/login", (req, res, next) => {
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



userRouter.get('/', (req, res) => {    // get all for testing with postman 
    
    User.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})





userRouter.delete('/', (req, res, next) => {
    
    User.remove((err, data) => {      
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send(` was succesfully deleted!`)
    })
})




userRouter.delete('/:id', (req, res, next) => {     //delete one by ID for admin use only
     
     User.findOneAndDelete({_id: req.params.id} , (err, data) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('booking deleted')
    })
})








// checks if the booking is in the database and if the time and date requested is availabale 

/*userRouter.put('/:username', (req, res, next) => {
   
    User.findOne({username: req.params.username}, (err, booking) => {
        if (err) {
            
            res.status(500)
            return next(err)
        }
            
        if(booking){ 
           
                if(booking.time){
                    return res.status(200).send("Not available")
                }
            }
            
            
        } else {
            
            const newBooking = new Booking(req.body)
            newBooking.save((err, booking) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send("You are booked!")
            })
        }
    })
})
*/



userRouter.put('/:username',  (req, res, next) => {   // express router reads the endpoint, and after the : sign is a variable containing a number, the id number of the item ..:id is a variable changing
               
   User.findOneAndUpdate(
            {username: req.params.username},
            req.body,                       // update existing booking with this object(this is the 2nd argument of the axios.put)
            {new: true},                   // 3rd argument of the axios.put..it tells the database to get the new updated version of the booking
            (err, updatedBooking) => {
               
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedBooking)
                
            }
        )
    })


    
    
    userRouter.get('/:username', (req, res, next) => {    
    
        User.findOne({username: req.params.username}, (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(user)
        })
    })






module.exports = userRouter
