import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login');
        // const loginForm = this.page.locator('.login-form');
        // await expect(loginForm).toBeVisible();
    }

    async submit(user) {
        await this.page.getByPlaceholder('E-mail').fill(user.email);
        await this.page.getByPlaceholder('Senha').fill(user.password);
        await this.page.getByRole('button', {name: 'entrar'}).click();
    }

    async shouldLogIn (user) {
        this.visit()
        this.submit(user)
    }
}