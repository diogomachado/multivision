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

  async get() {
    const users = await this.getUsers()
    const posts = await this.getPosts()

    const responseFormated = users.map((user) => {
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

    return responseFormated
  }
}
