const express = require('express');
const Post = require('../../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
    const { limit = 5, offset = 1 } = req.query;
    try {
        const posts = await Post.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        return res.status(200).json({ data: posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;