import { expect } from '@playwright/test';

export class Toast {
    constructor(page) {
        this.page = page;
    }

    async containText(message) {
        const toast = this.page.locator('.toast');
        await expect(toast).toContainText(message);
        await expect(toast).not.toBeVisible({ timeout: 20000 });
    }
}

export class PopUp {
    constructor(page) {
        this.page = page;
    }

    async haveText(message) {
        const element = this.page.locator('#swal2-html-container');
        await expect(element).toHaveText(message);
    }
}

export class Alert {
    constructor(page) {
        this.page = page;
    }

    async haveText(message) {
        const toast = this.page.locator('span[class$=alert]');
        await expect(toast).toHaveText(message);
    }
}

export class Submit {
    constructor(page) {
        this.page = page;
    }

    async do() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }
}

export class GoForm {
    constructor(page) {
        this.page = page;
    }

    async do() {
        await this.page.locator('a[href$="register"]').click();
    }
}

export class Delete {
    constructor(page) {
        this.page = page;
    }

    async do(movie) {
        await this.page.getByRole('row', { name: movie.title }).locator('.request-removal').click();
        await this.page.locator('.confirm-removal').click();
    }
}

export class Search {
    constructor(page) {
        this.page = page;
    }

    async do(value) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(value);
        await this.page.click('.actions button');
    }
}

export class Table {
    constructor(page) {
        this.page = page;
    }

    async have(content) {
        //const rows = this.page.getByRole('row')
        //await expect(this.page.locator('.title')).toContainText(content);

        const titles = this.page.locator('td.title');

        for (const title of content) {
            await expect(
                titles.filter({ hasText: title })
            ).toHaveCount(1);
        }
    }
}