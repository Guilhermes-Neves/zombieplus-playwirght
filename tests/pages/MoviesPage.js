import { expect } from '@playwright/test';

export class MoviesPage {
    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        //await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*\/admin\/movies/);
    }

    async create(movie) {
        await this.page.locator('a[href$="register"]').click();
        await expect(this.page.getByRole('heading', 'Cadastrar novo Filme')).toBeVisible();
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

        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }
}