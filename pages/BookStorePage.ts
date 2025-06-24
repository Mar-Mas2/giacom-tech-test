import { Page, Locator } from '@playwright/test'

export class BookStorePage {
  readonly page: Page
  readonly searchInput: Locator
  readonly bookRows: Locator
  readonly pageSize: Locator
  readonly nextPageBtn: Locator
  readonly previousPageBtn: Locator
  

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.getByPlaceholder('Type to search')
    this.bookRows = page.locator('.rt-tr-group')
    this.pageSize = page.locator('select[aria-label="rows per page"]')  // 👈 this is the key
    this.nextPageBtn = page.getByRole('button', { name: 'Next' })
    this.previousPageBtn = page.getByRole('button', { name: 'Previous' })
  }

  async goto() {
    await this.page.goto('https://demoqa.com/books')
  }

  async searchForBook(title: string) {
    await this.searchInput.fill(title)
  }

  async booksInRowsAreCorrect(title: string): Promise<boolean> {
    const rows = await this.bookRows.allTextContents()
    if (rows.length === 0) return false
    return rows.some(row => row.includes(title))
  }

  async irrelevantBooksNotAppeared(title: string): Promise<boolean> {
    const rows = await this.bookRows.allTextContents()
    return rows.every(row => !row.includes(title))
  }

  async clickBookByTitle(title: string) {
    await this.page.getByRole('link', { name: title }).click()
  }
  async setRowsPerPage(count: string) {
    await this.pageSize.selectOption(count)
  }

  async goToNextPage() {
    await this.nextPageBtn.click()
  }

  async goToPreviousPage() {
    await this.previousPageBtn.click()
  }

  async getBookTitles(): Promise<string[]> {
    await this.bookRows.first().waitFor()
    return await this.page.locator('.action-buttons a').allTextContents()
  }
  
}
