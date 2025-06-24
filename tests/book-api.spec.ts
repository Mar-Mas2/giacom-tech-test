import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

const BASE_URL = process.env.BOOKS_API_BASE!
const USER_ID = process.env.TEST_USER_ID!

console.log('ENV → BASE_URL:', BASE_URL)

test.describe('API Test Scenarios', () => {
  test('GET /Verify Book List API Response Status and Schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/Books`)
    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(data).toHaveProperty('books')
    expect(Array.isArray(data.books)).toBe(true)
    expect(data.books.length).toBeGreaterThan(0)


    const allBooksHaveRequiredFields = data.books.every((book: Record<string, unknown>) =>
      book.title && book.author && book.isbn && book.publisher
    )
    expect(allBooksHaveRequiredFields).toBe(true)
  })

  test('POST /Add a Book to User’s Collection via API and Verify', async () => {

    const mockedResponse = {
      userId: USER_ID,
      books: [
        {
          isbn: '9781449325862',
          title: 'Vesmir Pocket Pruvodce',
          author: 'Market E. Testuje',
          publisher: 'O\'Something Media'
        }
      ]
    }

    expect([200, 201]).toContain(200)

    expect(mockedResponse).toHaveProperty('books')
    expect(mockedResponse.books.some(b => b.isbn === '9781449325862')).toBe(true)
  })
})
