async function loadBlogPosts() {
    try {
        const response = await fetch('blogposts.json');
        const posts = await response.json();

        const recentPosts = document.getElementById('recent-posts');
        const olderPosts = document.getElementById('older-posts');
        const blogContent = document.getElementById('blog-content');

        let recentHTML = '';
        let olderHTML = '';

        posts.slice(0, 2).forEach((post, index) => {
            recentHTML += `<a href="blog.html?post=${index}" class="blog-link">${post.title} (${post.date})</a><br>`;
        });

        posts.slice(2).forEach((post, index) => {
            olderHTML += `<a href="blog.html?post=${index+2}" class="blog-link">${post.title} (${post.date})</a><br>`;
        });

        if (recentPosts) recentPosts.innerHTML = recentHTML;
        if (olderPosts) olderPosts.innerHTML = olderHTML;

        const urlParams = new URLSearchParams(window.location.search);
        const postIndex = urlParams.get('post');
        if (postIndex !== null && blogContent) {
            const post = posts[parseInt(postIndex)];
            blogContent.innerHTML = `
                <div class="post-title">${post.title}</div>
                <div class="post-date">${post.date}</div>
                <div class="post-content">${post.content}</div>
            `;
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);
