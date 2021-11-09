const postsGroup = document.querySelector('.posts-group');
const loader = document.querySelector('.loader');

const limit = 5;
let offset = 1;
let total = 0;
let requestOn = false;

async function loadPosts() {
    if (!requestOn) {
        requestOn = true;
        const posts = await getPosts();
        requestOn = false;

        showPosts(posts);
        offset += limit;
        total = offset + limit;

        console.log("offset", offset);
        console.log("limit", limit);
        console.log("total", total);
    }
}

function showLoader() {
    loader.classList.add('show');

    return function () {
        return loader.classList.remove('show');
    }
}


async function getPosts() {
    const hideLoader = showLoader();
    try {
        const res = await fetch(`http://localhost:5000/api/posts?limit=${limit}&offset=${offset}`);
        if (res.ok) {
            const { data: posts } = await res.json();
            return posts;
        }
    } catch (error) {
        console.error(error);
    } finally {
        hideLoader();
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

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadPosts();
    }
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