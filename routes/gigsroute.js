const express = require('express') 
const router = express.Router(); 
const db = require('../config/database')
const Gig = require('../models/Gig') // connects to gig.js in models and take data from gigs table

// router.get('/', (req, res) => 
// Gig.findAll()
// .then(gigs => { 
//     console.log(gigs)
//     res.sendStatus(200)
// })
// .catch(err => console.log('error is ', err))
// );

// get all 
router.get('/', (req, res) => 
Gig.findAll()
.then(gigs => { 
  res.json(gigs)
})
.catch(err => console.log('error is ', err))
);

// get specific user data
router.get('/profile', (req, res) => 
Gig.findOne({
    where: {
        id: 1
    }
  }
)
.then(user => { 
    if (user) {
        res.json(user)
    } else {
        res.send('User does not exist')
    }
})
.catch(err => console.log('error is ', err))
);

// test add new data
router.post('/createtodo', (req, res) => {
    const today = new Date()
    const userData = {
        id: 33,
        origin: 'khgj',
        destination: 'khgj',
        createdAt: today,
        updatedAt: today
    }
    console.log('..................', userData)

    var todo = new Gig(req.body); // for forms req.body called
    // var todo = new Gig(userData);

     todo.save().then( todo => {
    // console.log('..................', req.body)
     res.json({'message': 'Todo successfully added '});
     })
     .catch(err => {
      res.send("Error when saving to database");
     });
  });


// add new data in gigs_table -- not working
router.post('/insert', (req, res) => {
    const today = new Date()
    const userData = {
        id: req.body.id,
        origin: req.body.origin,
        destination: req.body.destination,
        createdAt: today,
        updatedAt: today
    }

    Gig.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(user => {
        if(!user) {
            Gig.create(userData)
            .then(user => {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            })
            .catch(err => {
                res.send('error: ',err)
            })
        } else {
            res.json({ error: 'User already exists' })
        }
    })
    .catch(err => {
        res.send("Error: ", err)
    })
    // if (req.body.id) {
    //     res.status(400)
    //     res.json({
    //         error: "Data alrady exists"
    //     })
    // } else {
    //     Gig.create(req.body)
    //     .then(() => {
    //         res.send('New gigs data added')
    //     })
    //     .catch(err => {
    //         res.send("Error: ", err)
    //     })
    // }
}


);

module.exports = router;
