import { Page, test as base } from "@playwright/test";

class ShinyPoems {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForComboboxLoading() {
    const allCombobox = await this.page.getByTestId("combobox-loading").all();

    await Promise.all(
      allCombobox.map(async (combobox) => {
        await combobox.waitFor({ state: "hidden" });
      })
    );
  }

  async searchByQuery(q: string) {
    const textbox = this.page.getByTestId("poem-textbox");
    await textbox.fill(q);

    const submitButton = this.page.getByTestId("poem-submit-button");
    await submitButton.click();
  }

  async searchByIdol(idol: string) {
    await this.waitForComboboxLoading();

    const combobox = this.page.locator("#react-select-アイドルから-input");
    await combobox.fill(idol);
    await combobox.press("Enter");
  }

  async searchByClothe(clothe: string) {
    await this.waitForComboboxLoading();

    const combobox = this.page.locator("#react-select-衣装から-input");
    await combobox.fill(clothe);
    await combobox.press("Enter");
  }
}

export const test = base.extend<{ shinyPoems: ShinyPoems }>({
  shinyPoems: async ({ page }, use) => {
    // NOTE: ESLintが怒るけど、これはReact.useと勘違いしてるだけなので無視
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(new ShinyPoems(page));
  }
});

export { expect } from "@playwright/test";
