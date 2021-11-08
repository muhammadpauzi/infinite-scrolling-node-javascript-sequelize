const Post = require("./models/Post");
const faker = require('faker');

const seedPost = async () => {
    faker.locale = 'id_ID';
    const posts = [];
    const imageProfiles = ['profile1.jpg', 'profile2.jpg', 'profile3.jpg', 'profile4.jpg'];
    for (let i = 0; i < 200; i++) {
        posts.push({
            username: faker.internet.userName(),
            content: faker.lorem.paragraphs(1),
            like: Math.floor(Math.random() * 100),
            image: imageProfiles[Math.floor(Math.random() * imageProfiles.length)]
        });
    }
    try {
        await Post.bulkCreate(posts);
    } catch (error) {
        console.log(error);
    }
}

seedPost();