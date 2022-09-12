import { body } from 'express-validator'

var registerValidation

export default registerValidation = [
    body('email', 'Email format is wrong').isEmail(),
    body('password', 'Password must be longer then 5 symbols').isLength({ min: 5 }),
    body('name', 'Name must be more then 5 symvobols').isLength({ min: 5}),
    body('avatarUrl', 'Wrong Avatar link').optional().isURL(),
]

