const postsGroup = document.querySelector('.posts-group');

const limit = 5;
let offset = 1;

function loadPosts() {
    setTimeout(async () => {
        const posts = await getPosts();
        showPosts(posts);
        offset += limit;
    }, 500);
}

// function showLoading() {
//     postsGroup.textContent = 'Loading...';
// }

async function getPosts() {
    try {
        // showLoading();
        const res = await fetch(`http://localhost:5000/api/posts?limit=${limit}&offset=${offset}`);
        if (res.ok) {
            const { data: posts } = await res.json();
            return posts;
        }
    } catch (error) {
        console.error(error);
    }
}

function showPosts(posts = []) {
    posts.map(post => {
        postsGroup.append(getPostElement(post));
    });
}

function getPostElement({ image, username, content, like }) {
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'post');
    postDiv.innerHTML = `
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
        </div>`;
    return postDiv;
}
loadPosts();

window.addEventListener('scroll', throttle(() => {
    loadPosts();
}, 1000), {
    passive: true
});

function throttle(fn, wait) {
    let time = Date.now();
    return function () {
        if (time + wait - Date.now() < 0) {
            fn();
            time = Date.now();
        }
    }
}