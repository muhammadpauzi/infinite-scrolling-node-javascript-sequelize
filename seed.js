const Post = require("./models/Post");
const faker = require('faker');

const seedPost = async () => {
    faker.locale = 'id_ID';
    const posts = [];
    const imageProfiles = ['profile1.png', 'profile2.png', 'profile3.png', 'profile4.png'];
    for (let i = 0; i < 200; i++) {
        posts.push({
            username: faker.internet.userName(),
            content: faker.lorem.paragraphs(1),
            like: Math.floor(Math.random() * 100),
            image: imageProfiles[Math.floor(Math.random() * imageProfiles.length)]
        });
    }
    try {
        await Post.destroy({ truncate: true, cascade: false });
        await Post.bulkCreate(posts);
    } catch (error) {
        console.log(error);
    }
}

seedPost();