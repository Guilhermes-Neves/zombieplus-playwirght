const { test: base, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage');
const { LandingPage } = require('../pages/LandingPage');
const { Toast, Alert } = require('../pages/Components');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;
        
        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['movies'] = new MoviesPage(page)
        context['toast'] = new Toast(page)
        context['alert'] = new Alert(page)
       
        await use(context);
    }
})

export { test, expect }