const { GoForm, Submit } = require('./Components');

export class TVshows {
    constructor(page) {
        this.page = page;
        this.goForm = new GoForm(page)
        this.submit = new Submit(page)
    }

    async go() {
        await this.page.goto('/admin/tvshows');
    }

    async create(tvshow) {
        this.goForm.do();
        await this.page.getByLabel('Titulo da série').fill(tvshow.title);
        await this.page.getByLabel('Sinopse').fill(tvshow.overview);
        await this.page.locator('#select_company_id .react-select__indicators').click();
        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.company })
            .click()

        await this.page.locator('#select_year .react-select__indicators').click();
        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.release_year })
            .click();

        await this.page.getByLabel('Temporadas').fill(tvshow.seasons)

        await this.page.locator('input[name=cover]')
            .setInputFiles(`tests/support/fixtures/${tvshow.cover}`);

        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        this.submit.do()
    }
}
