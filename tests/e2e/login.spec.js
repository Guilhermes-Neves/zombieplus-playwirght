import { test } from '../support';

test.beforeEach(async ({ page }) => {
    // visit
    await page.login.visit();
});

test('deve logar com administrador', async ({ page }) => {
    
    const user = {
        email: 'admin@zombieplus.com',
        password: 'pwd123'
    }

    await page.login.submit(user);
    await page.movies.isLoggedIn();
});

test('não deve logar senha incorreta', async ({ page }) => {
    const user = {
        email: 'admin@zombieplus.com',
        password: 'pwd12'
    }

    await page.login.submit(user);
    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.toast.containText(message);
});

test('não deve logar com email invalido', async ({ page }) => {
    const user = {
        email: 'invalidEmail',
        password: 'pwd123'
    }

    await page.login.submit(user);
    await page.alert.haveText('Email incorreto');
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    const user = {
        email: '',
        password: 'pwd123'
    }

    await page.login.submit(user);
    await page.alert.haveText('Campo obrigatório');
});

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    const user = {
        email: 'guilherme@teste.com',
        password: ''
    }

    await page.login.submit(user);
    await page.alert.haveText('Campo obrigatório');
});

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    const user = {
        email: '',
        password: ''
    }

    await page.login.submit(user);
    await page.alert.haveText(['Campo obrigatório', 'Campo obrigatório']);
});

test('não deve logar com usuário não registrado', async ({ page }) => {
    const user = {
        email: 'guilherme@teste.com',
        password: '12345'
    }

    await page.login.submit(user);
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.toast.containText(message);
});


