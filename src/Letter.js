export default class Letter {
  constructor() {
    // This info could be stored in a environment
    this.urlApi = 'https://jsonplaceholder.typicode.com'
  }

  handleRequest(method, pathApiRequest) {
    let requestOptions = {
      method: method,
      redirect: 'follow',
    }

    return fetch(this.urlApi + pathApiRequest, requestOptions).then(
      (response) => response.json()
    )
  }

  async getUsers() {
    return this.handleRequest('GET', '/users')
  }

  async getPosts() {
    return this.handleRequest('GET', '/posts')
  }

  formatResponse(users, posts) {
    return users.map((user) => {
      return {
        ...user,
        address: `${user?.address?.street}, ${user?.address?.suite} - ${user?.address?.zipcode} ${user?.address?.city}`,
        company: `${user?.company?.name}`,
        posts: posts
          .filter((post) => user.id === post.userId)
          .map((post) => {
            return {
              id: post.id,
              title: post.title,
              body: post.body,
            }
          }),
      }
    })
  }

  async get() {
    let users, posts

    try {
      users = await this.getUsers()
      posts = await this.getPosts()

      return this.formatResponse(users, posts)
    } catch (error) {
      throw new Error('Something happened wrong')
    }
  }
}
