import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import registerValidation from './validations/register.js'
import loginValidation from './validations/register.js'
import postCreateValidation from './validations/postCreateValidation.js'
import {PostController, UserController} from './controllers/index.js'
import { HandleValididationError, checkAuth }from './utils/index.js'
const app = express();


mongoose
    .connect('mongodb+srv://rob:13@projectcluster.mdfp4he.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('MONGO OK'))
    .catch((err) => (console.log('MONGO NOT WORKING!!!', err)))

app.use(express.json());

app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage: storage })

app.post('/auth/register', registerValidation, HandleValididationError, UserController.register); // REGISTRATION

app.post('/auth/login', loginValidation, UserController.login,); // LOGIN

app.get('/auth/me', checkAuth, UserController.getMe); // SHOW INFO ABOUT USER

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        });

});

app.get('/posts', PostController.getAll); // SHOW ALL POSTS

app.get('/posts/:id', PostController.getOne); // SHOW ONE POST

app.post('/posts', checkAuth, postCreateValidation, HandleValididationError, PostController.create); // CREATE POST

app.patch('/posts/:id',checkAuth, HandleValididationError, postCreateValidation, PostController.update); // UPDATE POST 

app.delete('/posts/:id', checkAuth, PostController.remove); // DELETE POST



app.listen(1313, (err) => {
    if (err) {
        console.log('ERROR');
    }
    console.log('WORKING');
});