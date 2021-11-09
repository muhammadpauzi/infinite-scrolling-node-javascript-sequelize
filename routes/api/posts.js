const express = require('express');
const Post = require('../../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
    const { limit = 5, offset = 1 } = req.query;
    console.log(limit, offset);
    try {
        const posts = await Post.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ data: posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;