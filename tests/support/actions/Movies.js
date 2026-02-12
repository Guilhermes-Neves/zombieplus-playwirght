import { expect } from '@playwright/test';
const { GoForm, Submit } = require('./Components');

export class Movies {
    constructor(page) {
        this.page = page;
        this.goForm = new GoForm(page)
        this.submit = new Submit(page)
    }

    async create(movie) {
        this.goForm.do();
        await this.page.getByLabel('Titulo do filme').fill(movie.title);
        await this.page.getByLabel('Sinopse').fill(movie.overview);
        await this.page.locator('#select_company_id .react-select__indicators').click();
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicators').click();
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year })
            .click();

        await this.page.locator('input[name=cover]')
            .setInputFiles(`tests/support/fixtures/${movie.cover}`);

        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        this.submit.do();
    }

}
