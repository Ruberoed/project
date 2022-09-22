import { body } from "express-validator"

var postCreateValidation ;

export default postCreateValidation = [
    body('title', 'Write title').isLength({ min: 3}).isString(),
    body('text', 'Write text').isLength({ min: 10}).isString(),
    body('tags', 'Wrong tag  format( write array)').optional().isString(),
    body('imageURL', 'Wrong image link').optional().isString()
];