// importing express Router
const router = require('express').Router();

// User Model import
const User = require('../models/user_model');

// importing bcrypt
const bcrypt = require('bcrypt');

// 
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');


// Route for getting users from db
// @route GET /users
// @desc Gets the list of users
// @access Public
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Route for Adding users
// @route POST /exercises
// @desc CREATE or add user
// @access Public
router.route('/add').post( (req, res) => {
    //destructuring to get properties of req object
    const { name, email, password, confirmpassword } = req.body;


    // Some simple validations
    if (!name || !email || !password || password != confirmpassword) {
        res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Checking for existing users
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            // Creating a user with User model and passing info from request object
            const newUser = new User({ name, email, password, confirmpassword });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.confirmpassword = hash;
                    // Saving newUser details
                    newUser.save()
                        .then(user =>
                            jwt.sign(
                                { id: user.id },
                                'secretkey',
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }


                            )


                        )
                })
            })

        })


});

module.exports = router;