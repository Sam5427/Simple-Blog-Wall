const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const Post = require('./models/Post');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://127.0.0.1:27017/blogWall', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),

    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err); // Log the error
        res.status(500).json({ error: 'Server error while fetching posts', details: err.message });
    }
});

app.post('/posts', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const newPost = new Post({
            title,
            content,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
            createdAt: new Date(),
        });

        await newPost.save();
        res.json(newPost);
    } catch (err) {
        console.error('Error while creating post:', err); // Log the error
        res.status(500).json({ error: 'Something went wrong on the server', details: err.message });
    }
});


app.post('/posts', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const newPost = new Post({
            title,
            content,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
            createdAt: new Date(),
        });

        await newPost.save();
        res.json(newPost);
    } catch (err) {
        console.error('Error while creating post:', err.message); // Log the error message
        res.status(500).json({ error: 'Something went wrong on the server', details: err.message });
    }
});


app.listen(5000, () => console.log('Server running on port 5000'));
