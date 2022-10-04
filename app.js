import Letter from './src/Letter.js'

function createUserBlock(user) {
  // Parent
  let app = document.querySelector('#app')

  // Child
  let userDiv = document.createElement('div')
  userDiv.classList.add('user-wrapper')

  // Header
  let userHeader = document.createElement('header')
  let userHeaderTitle = document.createElement('h4')
  userHeaderTitle.classList.add('title')
  userHeaderTitle.textContent = user.name
  let userHeaderCompany = document.createElement('p')
  userHeaderCompany.classList.add('company')
  userHeaderCompany.textContent = user.company
  userHeader.appendChild(userHeaderTitle)
  userHeader.appendChild(userHeaderCompany)
  userDiv.appendChild(userHeader)

  // Child 'posts'
  let postsDiv = document.createElement('div')
  postsDiv.classList.add('user-posts')

  let postTitle = document.createElement('h5')
  postTitle.classList.add('title')
  postTitle.textContent = 'Posts'

  let postContainerDiv = document.createElement('div')
  postContainerDiv.classList.add('user-posts-container')

  postsDiv.appendChild(postTitle)

  let posts = user.posts
  // Looping posts
  posts.forEach((post) => {
    let postDiv = document.createElement('div')
    postDiv.classList.add('post')

    let postTitle = document.createElement('p')
    postTitle.textContent = post.title

    postDiv.appendChild(postTitle)
    postContainerDiv.appendChild(postDiv)
  })
  console.log(postContainerDiv)
  postsDiv.appendChild(postContainerDiv)
  userDiv.appendChild(postsDiv)

  // Add in the parent
  app.appendChild(userDiv)
}

// Main code
const letter = new Letter()
const responseJson = await letter.get()

// Create the blocks
{
  /* <div class="user-wrapper">
  <header>
    <h4 class="title">Diogo Machado</h4>
    <p class="company">DM Technology</p>
  </header>
  <div class="user-posts">
    <h5 class="title">Posts</h5>
    <div class="user-posts-container">
      <div class="post">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, assumenda!</p>
      </div>
    </div>
  </div>
</div> */
}
const users = responseJson

users.forEach((user) => {
  createUserBlock(user)
})
