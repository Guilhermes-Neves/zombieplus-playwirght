import { test } from '../support';
import { executeSQL } from '../support/database';

const data = require('../support/fixtures/movies.json')

const user = {
    email: 'admin@zombieplus.com',
    password: 'pwd123',
    name: 'Admin'
}

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.movies;`)
})


test('deve poder cadastrar um novo filme', async ({ page }) => {
    await page.login.do(user);
    const movie = data.create;
    await page.movies.create(movie)
    const message = `O filme '${movie.title}' foi adicionado ao catálogo.`;
    await page.popUp.haveText(message)
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do(user);
    await page.movies.goForm.do();
    await page.movies.submit.do();

    const messages = [
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ]
    await page.alert.haveText(messages)
});

test('não deve cadastrar um filme duplicado', async ({ page, request }) => {
    const movie = data.duplicate;
    await request.api.postMovie(movie);
    await page.login.do(user);
    await page.movies.create(movie);
    const message = `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`;
    await page.popUp.haveText(message);
});

test('deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove;

    await request.api.postMovie(movie);
    await page.login.do(user);
    await page.delete.do(movie);
    const message = 'Filme removido com sucesso.';
    await page.popUp.haveText(message);
});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const movies = data.search;
    movies.data.forEach(async (m) => {
        await request.api.postMovie(m);
    })

    await page.login.do(user);
    await page.search.do(movies.input)
    await page.table.have(movies.outputs)
});
