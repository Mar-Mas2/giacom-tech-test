import { Page, expect } from '@playwright/test'

export class BookDetails {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async assertPageContainsText(expected: string) {
    const bodyText = await this.page.locator('body').textContent()
    const content = bodyText?.toLowerCase() || ''
    expect(content).toContain(expected.toLowerCase())
  }
}
