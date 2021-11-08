const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/api/posts');
const { resolve, dirname } = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/api/posts', postsRouter);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});