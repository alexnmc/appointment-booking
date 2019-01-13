const express = require('express')
const bookingsRouter = express.Router()
const Booking = require("../models/bookings")



bookingsRouter.get('/', (req, res) => {    // get all for testing with postman 
    
    Booking.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})



bookingsRouter.delete('/', (req, res, next) => {
    
    Booking.remove((err, data) => {      // for postman testing, deletes everything !
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('all bookings were succesfully deleted!')
    })
})




bookingsRouter.delete('/:id', (req, res, next) => {  //delete one by ID for admin use only
     
    Booking.findOneAndDelete({_id: req.params.id} , (err, data) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('booking deleted')
    })
})



bookingsRouter.post('/', (req, res) => {   //for testing with postman
    
    const newBooking = new Booking(req.body)
    
    newBooking.save((err, booking) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(booking)
    })
})


bookingsRouter.put('/:id', (req, res, next) => { // express router reads the endpoint, and after the : sign is a variable containing a number, the id number of the item ..:id is a variable changing
    
    
    Booking.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        (err, updatedBooking) => {
            if (err) {
                return next(err)
            }
            return res.status(201).send(updatedBooking)
        }
    )
})



// checks if the booking is in the database and if the time and date requested is availabale 

bookingsRouter.post('/:date', (req, res, next) => {
    
    Booking.findOne({date: req.params.date, time: req.body.time}, (err, booking) => {
        if (err) {
            
            res.status(500)
            return next(err)
        }
            
        if(booking){ 
            
            return res.status(200).send("Not available")

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




module.exports = bookingsRouter