const express = require('express') 
const router = express.Router(); 
const db = require('../config/database')
const SignUpUser = require('../models/signup')
const CarrierUser = require('../models/carrieruser')
const Chat = require('../models/chat')

// for chatting system
router.post('/chatPage', (req, res) => {
  const today = new Date()
  // const userData = {
  //     id: 33,
  //     origin: 'khgj',
  //     destination: 'khgj',
  //     createdAt: today,
  //     updatedAt: today
  // }
  // console.log('..................', userData)
  
  var todo = new Chat(req.body); // for forms req.body called
  // var todo = new Gig(userData);
  console.log('..................', req.body)

   todo.save().then( todo => {
   console.log('..................', req.body)
   res.json({'message': 'Todo successfully added '});
   })
   .catch(err => {
    res.send("Error when saving to database");
   });
});



// get all 
router.get('/', (req, res) => 
SignUpUser.findAll()
.then(data => { 
  res.json(data)
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
    // const userData = {
    //     id: 33,
    //     origin: 'khgj',
    //     destination: 'khgj',
    //     createdAt: today,
    //     updatedAt: today
    // }
    // console.log('..................', userData)
    
    var todo = new SignUpUser(req.body); // for forms req.body called
    // var todo = new Gig(userData);
    console.log('..................', req.body)

     todo.save().then( todo => {
     console.log('..................', req.body)
     res.json({'message': 'Todo successfully added '});
     })
     .catch(err => {
      res.send("Error when saving to database");
     });
  });


  router.get('/carrieruser', (req, res) => 
  CarrierUser.findAll()
.then(data => { 
  res.json(data)
})
.catch(err => console.log('error is ', err))
);


  router.post('/carrierformtodo', (req, res) => {
    const today = new Date()   
    var todo = new CarrierUser(req.body); // for forms req.body called
    // var todo = new Gig(userData);
    console.log('..................', req.body)

     todo.save().then( todo => {
     console.log('..................', req.body)
     res.json({'message': 'Todo successfully added '});
     })
     .catch(err => {
      res.send("Error when saving to database");
     });
  });
  

module.exports = router;
