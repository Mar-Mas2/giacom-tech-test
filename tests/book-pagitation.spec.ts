import { test, expect } from '@playwright/test'
import { BookStorePage } from '../pages/BookStorePage'

test.describe('Validate Pagination Functionality', () => {
  let bookstore: BookStorePage

  test.beforeEach(async ({ page }) => {
    bookstore = new BookStorePage(page)
    await bookstore.goto()
    await bookstore.setRowsPerPage('5')
  })

  test('Navigates to next page and checks book', async ({ page }) => {
    await bookstore.goToNextPage()

    await expect(bookstore.bookRows.first()).toBeVisible()

    const secondPageBooks = await bookstore.getBookTitles()
    console.log('Page 2 titles:', secondPageBooks)
    expect(secondPageBooks).toContain('Programming JavaScript Applications')
    await page.pause()

    await bookstore.goToPreviousPage()
    const firstPageBooks = await bookstore.getBookTitles()
    console.log('Page 1 titles:', firstPageBooks)
    expect(firstPageBooks).toContain('Git Pocket Guide')
  })
})
