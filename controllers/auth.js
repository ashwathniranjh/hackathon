const bcrypt = require('bcryptjs');
const User = require('../models/users');


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const userid = req.body.userid.toString();
  const password = req.body.password.toString();
  User.findOne({  userid: userid })
    .then(user => {
      if (!user) {
        console.log("1");
        return res.redirect('/');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
           
            
              req.session.user = user;
              req.session.save(err => {
                console.log(err);
                res.redirect('/dashboard');
              });
         
          }
          else{
             res.redirect('/');
          }
        })
        .catch(err => {
          console.log(err);
          res.redirect('/');
        });
    })
    .catch(err => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    msg: undefined
  });
};

exports.postSignup = (req, res, next) => {
  const userid = req.body.userid;
  const name = req.body.name;
  const password = req.body.password.toString();
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ userid: userid })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      if(password === confirmPassword){
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            userid: userid,
            password: hashedPassword
          });

          return user.save();
          
        })
        .then(result => {
          res.redirect('/');
        });
    }
    else{
        return res.redirect('/signup');
    }
    })
    .catch(err => {
      if( err.code === 11000){
        res.render('auth/signup', {
          path: '/signup',
          pageTitle: 'Signup',
          isAuthenticated: false,
          msg:'username already taken'
        });
      }
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.user.lastLogout = new Date().toISOString();
  req.user.save()
  .then(user => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  })
  .catch(err => {
    console.log(err);
  }
  );
 
};
