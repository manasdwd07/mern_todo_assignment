// importing express Router
const router = require('express').Router();

// User Model import
const User = require('../models/user_model');

// importing bcrypt
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');



// @route POST /auth
// @desc AUTH USER, JWT sign token
// @access Public 

router.route('/').post((req, res) => {
    //destructuring to get properties of req object
    const { email, password } = req.body;


    // Some simple validations
    if (!email || !password) {
        res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Checking for existing users
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });




            // Create salt & hash
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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
                })
                .catch(err => res.status(400).json({ msg: 'User not found' }))

        })


});

// @route GET /auth/user/:id
// @desc Getting user details with authentication
// @access Private

router.get('/user/:id', auth, (req, res) => {
    
    try {
        User.findById(req.params.id)
            .then(user => {
                res.send({
                    data : user
                })
            })
            .catch(err => {
                res.send({
                    err : err
                })
            })

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: error })
    }


});

module.exports = router;