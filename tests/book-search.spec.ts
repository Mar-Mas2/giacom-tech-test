import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/BookStorePage';

test.describe('Search for a Book and Validate Results', () => {
  let books: BookStorePage

  test.beforeEach(async ({ page }) => {
    books = new BookStorePage(page)
    await books.goto()             
  })

  test('Searched book is shown correctly', async () => {
    await books.searchForBook('Git Pocket Guide');
    expect(await books.booksInRowsAreCorrect('Git Pocket Guide')).toBeTruthy();
  })

  test('Irrelevant books not appeared', async () => {
    await books.searchForBook('Git Pocket Guide');
    expect(await books.irrelevantBooksNotAppeared('Design Patterns')).toBeTruthy();
  })
})
