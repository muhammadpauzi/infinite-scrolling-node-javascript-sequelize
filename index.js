const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/api/posts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});