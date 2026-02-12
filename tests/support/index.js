const { test: base, expect } = require('@playwright/test');

const { Login } = require('./actions/Login');
const { Movies } = require('./actions/Movies');
const { TVshows } = require('./actions/TVshows');
const { Leads } = require('./actions/Leads');
const { PopUp, Alert, Delete, Search, Table } = require('./actions/Components');
const { Api } = require('./api');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;
        
        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['tvshows'] = new TVshows(page)
        context['alert'] = new Alert(page)
        context['popUp'] = new PopUp(page)
        context['delete'] = new Delete(page)
        context['search'] = new Search(page)
        context['table'] = new Table(page)
               
        await use(context);
    },
    request: async ({ request }, use) => {
        const context = request;
        context['api'] = new Api(request)
        await context['api'].setToken();

        await use(context);
    }

})

export { test, expect }