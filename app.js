import Letter from './src/Letter.js'

function createElement(type, className, content) {
  const element = document.createElement(type)
  if (className) {
    element.classList.add(className)
  }
  if (content) {
    element.textContent = content
  }
  return element
}

function createUserBlock(user) {
  let app = document.querySelector('#app')

  let userDiv = createElement('div', 'user-wrapper')
  let userHeader = createElement('header')
  let userHeaderTitle = createElement('h4', 'title', user.name)
  let userHeaderCompany = createElement('p', 'company', user.company)

  userHeader.appendChild(userHeaderTitle)
  userHeader.appendChild(userHeaderCompany)
  userDiv.appendChild(userHeader)

  // Child 'posts'
  let postsDiv = createElement('div', 'user-posts')
  let postTitle = createElement('h5', 'title', 'Posts')
  let postContainerDiv = createElement('div', 'user-posts-container')

  postsDiv.appendChild(postTitle)

  // Looping posts
  user.posts.forEach((post) => {
    let postDiv = createElement('div', 'post')
    let postTitle = createElement('p', undefined, post.title)

    postDiv.appendChild(postTitle)
    postContainerDiv.appendChild(postDiv)
  })

  postsDiv.appendChild(postContainerDiv)
  userDiv.appendChild(postsDiv)

  // Delay
  setTimeout(() => {
    const loading = document.querySelector('.loading-wrapper')
    loading.style.display = 'none'

    // Add in the parent
    app.appendChild(userDiv)
  }, 3000)
}

// Main code
const letter = new Letter()

try {
  const responseJson = await letter.get()

  // Looping each user and create the elements of the UI
  responseJson.forEach((user) => {
    createUserBlock(user)
  })
} catch (error) {
  const loading = document.querySelector('.loading-wrapper')
  const loadingTitle = document.querySelector('.loading-wrapper p')
  loading.classList.add('error')
  loadingTitle.textContent = error
}
