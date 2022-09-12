import express from 'express'
import mongoose from 'mongoose'
import  registerValidation   from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'


mongoose
    .connect('mongodb+srv://rob:13@projectcluster.mdfp4he.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => (console.log('PIZDA, NE RABOTAET !!!', err)))
const app = express()

app.use(express.json())

app.post('/auth/login', UserController.login)


app.post('/auth/register',  registerValidation, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(1313, (err) => {
    if (err) {
        console.log('chtoto poshlo ne tak')
    }

    console.log('Rabotaet')
});