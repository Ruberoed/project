import { body } from 'express-validator'

var loginValidation ; 

export default loginValidation = [
    body('email', 'Email format is wrong').isEmail(),
    body('password', 'Password must be longer then 5 symbols').isLength({ min: 5 })
];

