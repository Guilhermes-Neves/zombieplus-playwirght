import { test } from '../support';
import { executeSQL } from '../support/database';

const data = require('../support/fixtures/tvshows.json')

const user = {
    email: 'admin@zombieplus.com',
    password: 'pwd123',
    name: 'Admin'
}

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.tvshows;`)
})


test('deve poder cadastrar uma nova série', async ({ page }) => {
    const tvshow = data.create;
    await page.login.do(user);
    await page.tvshows.go();
    await page.tvshows.create(tvshow)
    const message = `A série '${tvshow.title}' foi adicionada ao catálogo.`;
    await page.popUp.haveText(message)
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do(user);
    await page.tvshows.go();
    await page.tvshows.goForm.do();
    await page.tvshows.submit.do();

    const messages = [
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ]
    await page.alert.haveText(messages)
});

test('não deve cadastrar uma série duplicada', async ({ page, request }) => {
    const tvshow = data.duplicate;
    await request.api.postTvshow(tvshow);
    await page.login.do(user);
    await page.tvshows.go();
    await page.tvshows.create(tvshow);
    const message = `O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`;
    await page.popUp.haveText(message);
});

test('deve poder remover uma série', async ({ page, request }) => {
    const tvshow = data.to_remove;

    await request.api.postTvshow(tvshow);
    await page.login.do(user);
    await page.tvshows.go();
    await page.delete.do(tvshow);
    const message = 'Série removida com sucesso.';
    await page.popUp.haveText(message);
});

test('deve realizar busca pelo termo us', async ({ page, request }) => {
    const tvshows = data.search;
    tvshows.data.forEach(async (m) => {
        await request.api.postTvshow(m);
    })

    await page.login.do(user);
    await page.tvshows.go();
    await page.search.do(tvshows.input)
    await page.table.have(tvshows.outputs)
});
