import { test, expect } from '@playwright/test'
import { BookStorePage } from '../pages/BookStorePage'
import { BookDetails } from '../pages/BookDetails'

test.describe('Book Detail Page', () => {
  test('Clicks on book and confirms title is visible on details page', async ({ page }) => {
    const bookstore = new BookStorePage(page)

    await bookstore.goto()
    await page.getByRole('link', { name: 'Learning JavaScript Design Patterns' }).click()

    await expect(page).toHaveURL(/.*book=9781449331818/)
  })

  test('Detailed page contains author text at least in body', async ({ page }) => {
    const details = new BookDetails(page)

    await details.assertPageContainsText('Addy Osmani')
  })
})
