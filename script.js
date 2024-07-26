async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

function filterPosts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    getPosts().then(posts => {
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchInput));
        displayPosts(filteredPosts);
    });
}

function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    if (posts.length === 0) {
        postList.innerHTML = '<p>No posts found</p>';
        return;
    }
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="title">${post.title}</div>
            <div class="body">${post.body}</div>
        `;
        postList.appendChild(postElement);
    });
}
