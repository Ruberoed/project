import PostModel from '../models/PostModel.js'
import PostSchema from '../models/PostModel.js'

// GET ALL POSTS 

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'CANNOT GET POSTS'
        });
    };
};

// GET ONE POST BY ID

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }, (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'ERROR'
                    });
                };

                if (!doc) {
                    return res.status(404).json({
                        message: 'POST NOT FOUND'
                    });
                };

                res.json(doc);
            });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'CANNOT GET POST'
        });
    };
};

// CREATE POST

export const create = async (req, res) => {
    try {
        const doc = new PostSchema({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'CANNOT CREATE POST'
        });
    };
};

// UPDATE POST 

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.tags,
            },
            res.json({
                success: true,
        })
    );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'ERROR WITH UPDATING'
        });
    };
};

// REMOVE ONE POST BY ID 

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'CANNOT REMOVE POST'
                    });
                }

                if (!doc) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'CANNOT FIND POST'
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'ERROR WITH REMOVING'
        });
    }
};

