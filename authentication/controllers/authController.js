
const { check, validationResult } = require('express-validator');


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {pageTitle: "Login", isLoggedIn: false });
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {pageTitle: "Signup", isLoggedIn: false });
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.postSignup = [
  // First name validator
  check('firstName')
  .notEmpty()
  .withMessage('First name is mandatory')
  .trim()
  .isLength({ min: 2 })
  .withMessage('First name must be at least 2 characters long')
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage('First name can only contain letters and spaces'),

  
  // Last name validator
  check('lastName')
  .trim()
  .matches(/^[a-zA-Z\s]*$/)
  .withMessage('Last name can only contain letters and spaces'),

  // Email validator
  check('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .normalizeEmail(),

  // Password validator
  check('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/[a-z]/)
  .withMessage('Password must contain at least one lowercase letter')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number')
  .matches(/[!@#$%^&*?><=+]/)
  .withMessage('Password must contain at least one special character')
  .trim(),

  // Confirm password validator
  check('confirm_password')
  .trim()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
    }
    return true;
  }),
  
  // User type validator
  check('userType')
  .trim()
  .notEmpty()
  .withMessage('Please select a user type')
  .isIn(['guest', 'host'])
  .withMessage('Please select either host or guest'),

  // Terms and conditions validator
  check('terms')
  .notEmpty()
  .withMessage('Please agree to the terms and conditions'),


  (req, res, next) => {
    console.log('User came for signup', req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', 
        {
          pageTitle: 'Login',
          isLoggedIn: false,
          errorMessages: errors.array().map(err => err.msg),
          oldInput: req.body ,  
        });
    }



    res.redirect('/login');
  }
];

exports.postLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');

}