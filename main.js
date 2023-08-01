const postSectionParent = document.getElementById('posts-section');

let lastScrollHeight = 0;
let skip = 5;

const renderPosts = (posts) => {

    posts.forEach(post => {
        const postHtml = `
            <div id="post-${post.id}" class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                <a type="button" onclick="toggleComments(${post.id})" class="btn btn-primary click-toggle-btn">Comments</a>
            </div>`
        
        const postSection = document.createElement('section')
        postSection.classList.add('card')
        postSection.classList.add('post')
        postSection.innerHTML = postHtml

        postSectionParent.appendChild(postSection)

    })
}

const fetchCommentsForPost = (id) => {
    return fetch(`https://dummyjson.com/posts/${id}/comments`)
        .then(res => res.json())
        .then(response => response.comments)
} 

const toggleComments = (id) => {
    const postCard = document.getElementById(`post-${id}`)

    const commentSection = document.createElement('ul')
    commentSection.classList.add('list-group')
    commentSection.classList.add('list-group-flush')

    fetchCommentsForPost(id).then(comments => {
        comments.forEach(comment => {
            const commentItem = document.createElement('li')
            commentItem.classList.add('list-group-item')
            commentItem.innerText = `[${comment.user.username}]: ${comment.body}`
            commentSection.appendChild(commentItem)
        })
    })

    postCard.appendChild(commentSection)

}


const fetchPosts = (limit, skip) => {
    return fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(response => response.posts);
}

window.addEventListener('scroll', e => {
   
   const y = window.scrollY
   if (y - lastScrollHeight > 100) {
        fetchPosts(5, 5).then(posts => {
            renderPosts(posts)
        })
        lastScrollHeight = y
        skip += 5
   }
})

fetchPosts(5, 0).then(posts => renderPosts(posts))





            