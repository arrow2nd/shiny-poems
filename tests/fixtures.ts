import { Page, test as base } from "@playwright/test";

class ShinyPoems {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchByQuery(q: string) {
    const textbox = this.page.getByTestId(testid.queryTextbox);
    await textbox.fill(q);

    const submitButton = this.page.getByTestId(testid.submitButton);
    await submitButton.click();
  }

  async searchByIdol(idol: string) {
    const combobox = this.page.getByTestId(testid.idolCombobox);
    await combobox.selectOption(idol);
  }

  async searchByClothe(clothe: string) {
    const combobox = this.page.getByTestId(testid.clotheCombobox);
    await combobox.selectOption(clothe);
  }
}

export const testid = {
  queryTextbox: "poem-textbox",
  submitButton: "poem-submit-button",
  idolCombobox: "idol-combobox",
  clotheCombobox: "clothe-combobox"
};

export const test = base.extend<{ shinyPoems: ShinyPoems }>({
  shinyPoems: async ({ page }, use) => {
    await use(new ShinyPoems(page));
  }
});

export { expect } from "@playwright/test";
