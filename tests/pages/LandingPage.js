import { expect } from '@playwright/test';

export class LandingPage {

    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000');
        await expect(this.page.getByRole('img', { name: 'Zombie+', exact: true })).toBeVisible();
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();
        await expect(this.page.getByTestId('modal').getByRole('heading'))
            .toContainText('Fila de espera');
    }

    async submitLeadForm(lead) {
        await this.page.getByPlaceholder('Informe seu nome').fill(lead.name);
        await this.page.getByPlaceholder('Informe seu email').fill(lead.email);
        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click();
    }
}