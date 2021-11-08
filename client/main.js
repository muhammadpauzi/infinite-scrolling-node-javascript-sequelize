const postsGroup = document.querySelector('.posts-group');

async function main() {
    const posts = await getPosts();
    showPosts(posts);
}

function showLoading() {
    postsGroup.textContent = 'Loading...';
}

async function getPosts() {
    try {
        showLoading();
        const res = await fetch('http://localhost:5000/api/posts');
        if (res.ok) {
            const { data: posts } = await res.json();
            return posts;
        }
    } catch (error) {
        console.error(error);
    }
}

function showPosts(posts = []) {
    let postElements = '';
    posts.map(post => {
        postElements += getPostElement(post);
    });
    postsGroup.innerHTML = postElements;
}

function getPostElement({ image, username, content, like }) {
    return `
    <div class="post">
            <div class="flex ai-c post-info">
                <div class="post-image">
                    <img src="http://localhost:5000/images/${image}" alt="">
                </div>
                <div>
                    <a href="#" class="post-username">${username}</a>
                    <span class="post-like">${like} ${like == 1 ? 'like' : 'likes'}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
        </div>
    `;
}

main();