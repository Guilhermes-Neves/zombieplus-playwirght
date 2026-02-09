import { test } from '../support';
import { executeSQL } from '../support/database';

const data = require('../support/fixtures/movies.json')

test.beforeEach(async ({ page }) => {
    const user = {
        email: 'admin@zombieplus.com',
        password: 'pwd123'
    }

    await page.login.shouldLogIn(user);
    await page.movies.isLoggedIn();
});

test('deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create;
    executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)
    await page.movies.create(movie)
    const message = 'Cadastro realizado com sucesso!'
    await page.toast.containText(message)
});
