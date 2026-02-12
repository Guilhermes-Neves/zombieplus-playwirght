import { expect } from '@playwright/test';

export class Login {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('/admin/login');
        const loginForm = this.page.locator('.login-form');
        await expect(loginForm).toBeVisible();
    }

    async submit(user) {
        await this.page.getByPlaceholder('E-mail').fill(user.email);
        await this.page.getByPlaceholder('Senha').fill(user.password);
        await this.page.getByRole('button', { name: 'entrar' }).click();
    }

    async do(user) {
        await this.visit()
        await this.submit(user)
        await this.isLoggedIn(user)
    }

    async isLoggedIn(user) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${user.name}`);
    }
}