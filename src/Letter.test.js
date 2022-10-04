import Letter from './Letter'

describe('Letter class tests', () => {
  let letter
  let mockData
  let mockDataUsers
  let mockDataPosts

  beforeAll(() => {
    mockDataUsers = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ]

    mockDataPosts = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ]

    mockData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: 'Kulas Light, Apt. 556 - 92998-3874 Gwenborough',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: 'Romaguera-Crona',
        posts: [
          {
            id: 1,
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          },
        ],
      },
    ]
  })

  beforeEach(() => {
    letter = new Letter()
    jest.spyOn(letter, 'get').mockReturnValue(mockData)
    jest.spyOn(letter, 'getUsers').mockReturnValue(mockDataUsers)
    jest.spyOn(letter, 'getPosts').mockReturnValue(mockDataPosts)
  })

  it('should have a instance of the class Letter', () => {
    expect(letter).toBeInstanceOf(Letter)
  })

  it('should getUsers() return users', () => {
    expect(letter.getUsers()).toMatchObject(mockDataUsers)
  })

  it('should getPosts() return posts', () => {
    expect(letter.getPosts()).toMatchObject(mockDataPosts)
  })

  it('should Get() return a array equal or greater than 0', async () => {
    const responseGet = await letter.get()

    expect(responseGet.length).toBeGreaterThanOrEqual(0)
    expect(responseGet).toMatchObject(mockData)
  })
})

describe('API tests', () => {
  let letter

  beforeEach(() => {
    letter = new Letter()
    jest.spyOn(letter, 'get')
    jest.spyOn(letter, 'getUsers').mockImplementation(() => {
      throw new Error('Something happened wrong')
    })
  })

  it('should return throw Error', async () => {
    await expect(letter.get()).rejects.toThrowError('Something happened wrong')
  })
})
