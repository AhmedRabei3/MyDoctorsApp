const {body , validationResult} = require("express-validator");

const userValidationRules = () =>{
    return[
    body('name').notEmpty().withMessage('Name is required')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters'),
    body( 'email' ).trim().normalizeEmail()
        .isEmail().withMessage('Email must be valid')
        .notEmpty().withMessage('Email is required')
        .isString().withMessage('Email must be a string')
        .toLowerCase(),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must contain at least  5 characters')
    ]
    };

const validate = (req , res , next) =>{
    const  errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    const extractedError = [];
    errors.array().map(err=>{
        extractedError.push({msg : err.param + " "+ err.message})
    });
    res.status(422).json({ error : extractedError});
};

module.exports= {userValidationRules,validate};