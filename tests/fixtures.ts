import { Page, test as base } from "@playwright/test";

class ShinyPoems {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchWithPoem(q: string) {
    const textbox = this.page.getByTestId("poem-textbox");
    await textbox.fill(q);

    const submitButton = this.page.getByTestId("poem-submit-button");
    await submitButton.click();
  }

  async searchWithIdol(idol: string) {
    const combobox = this.page.getByTestId("idol-combobox");
    await combobox.selectOption(idol);
  }

  async searchWithClothe(clothe: string) {
    const combobox = this.page.getByTestId("clothe-combobox");
    await combobox.selectOption(clothe);
  }
}

export const test = base.extend<{ shinyPoems: ShinyPoems }>({
  shinyPoems: async ({ page }, use) => {
    await use(new ShinyPoems(page));
  }
});

export { expect } from "@playwright/test";
