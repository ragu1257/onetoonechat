/* const express = require('express') 
const ejs = require('ejs');
const bodyparser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(cors())

// -------for paypal plugin test-------
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'));
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUMX1bepyatgHZuu2CTLvjdfPhXEUzQAvtrA9vTK09cQ__PmXbeM318yzv810Lkbr2eyi4yj6bY46-fl',
  'client_secret': 'EK4rsfqj4BKP0JdBMMWu4fuBHOG3YCIQKqFa0fGk12soHwpGtsaxsVw_KTBnuBG2ZFe4p985fVBcXT1X'
});

app.post('/pay', (req, res)=> {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:8081/success",
        "cancel_url": "http://localhost:8081/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "paragraph",
                "sku": "01",
                "price": "10.00",
                "currency": "EUR",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "EUR",
            "total": "10.00"
        },
        "description": "This is payment for paragraph."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      console.log("Create Payment Response--------------");
      console.log(payment);
      // res.send('testPaypal')
      for(let i=0; i<payment.links.length; i++){
        if(payment.links[i].rel == 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});
})

app.get('/success', (req, res)=>{
  const payerId = req.query.PayerID; 
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
          "currency": "EUR",
          "total": "10.00"
      }
    }]
  };
paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log('error is.....', error.response)
        throw (error);
    } else {
        console.log("Executed Payment Response--------------");
        console.log(JSON.stringify(payment));
        res.send('Success')
    }
  });

})

app.get('/cancel', (req, res)=>{
  res.send('Cancelled')
});
// ------- end------------

// initialize the cookie-session 
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//---- authentication part ----------
app.use(passport.initialize());
app.use(passport.session());

//----- login for authentication------
let users = [
  {
    id: 1,
    name: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]


//  to protect this URL, we are passing a middleware filter. This filter will check if the current session is valid before allowing 
//the user to proceed with the rest of the operation
const authMiddleware = (req, res, next) => {
  // console.log('request ', req)
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

// --- login---
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log('user is ', user)
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, err => {
      res.send("Logged in");
    });
  })(req, res, next);
});

// --- logout
app.get("/api/logout", function(req, res) {
  req.logout();

  console.log("logged out")

  return res.send();
});

// URL to get the currently logged in users’ data
app.get("/api/user", authMiddleware, (req, res) => {
  console.log('session ', req.session.passport)
  let user = users.find(user => {
    return user.id === req.session.passport.user.id
  })

  console.log('get api/user -- ', [user, req.session])

  res.send({ user: user })
})

// configure Passport.js so it knows how to log us in
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password'})
      }
    }
  )
)

//tell Passport.js how to handle a given user object. This is necessary if we want to do some work before storing it in session. In this case, we only want to store the 
//id as it is enough to identify the user when we extract it from the cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//set up the reverse. When a user makes a request for a secured URL. We tell passport how to retrieve the user object from our array of users.
// It will use the id we stored using the serializeUser method to achieve this
passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})

// ------- end authentication part ---------

app.get('/', (req, res) => res.send('INDEX'));
// app.use('/gigsroute', require('./routes/gigsroute')); // sets the paths
app.use('/route', require('./routes/route')); // sets the paths

const PORT= process.env.PORT || 8081; // tells the port num for nodejs server

app.listen((PORT), console.log(`Server started on port number ${PORT}`));

//Database
const db = require('./config/database')
// Test db
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ', err))

 */