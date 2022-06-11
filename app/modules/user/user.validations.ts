import { validate } from "../../utility/validate";
import { body } from "express-validator";

// Array of validation using express validator
export const CreateUserValidator = [
    body('name').isString().withMessage('name is required'),
    body('email').isEmail().withMessage('email is required'),
    body('age').isNumeric().withMessage("age is required"),
    body('password').isString().notEmpty().withMessage('password is required'),
    body('userRole').isString().notEmpty().withMessage('userRole is required'),
    validate
]
