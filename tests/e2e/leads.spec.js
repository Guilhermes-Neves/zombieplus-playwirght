import { test, expect } from '../support';
import { gerarEmailValido , gerarNomeProprio} from '../utils/utils'
import { executeSQL } from '../support/database';

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.leads;`)
})


test.beforeEach(async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const lead = {
    name: gerarNomeProprio(),
    email: gerarEmailValido()
  }

  await page.leads.submitLeadForm(lead);
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.';
  await page.popUp.haveText(message);
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const lead = {
    email: 'guilherme@teste.com',
    name: 'Guilherme Neves'
  }

  const newLead = await request.post('http://localhost:3333/leads', {
    data: lead
  })
  expect(newLead.ok()).toBeTruthy();

  await page.leads.submitLeadForm(lead);
  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.';
  await page.popUp.haveText(message);
});


test('não deve cadastrar um lead com email invalido', async ({ page }) => {
  const lead = {
    name: 'Guilherme Neves',
    email: 'invalidEmail'
  }

  await page.leads.submitLeadForm(lead);
  await page.alert.haveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
  const lead = {
    name: '',
    email: 'teste@teste.com'
  }

  await page.leads.submitLeadForm(lead);
  await page.alert.haveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando o email não é preenchido', async ({ page }) => {
  const lead = {
    name: 'Guilherme Neves',
    email: ''
  }

  await page.leads.submitLeadForm(lead);
  await page.alert.haveText('Campo obrigatório');
});

test('não deve cadastrar um lead com campos em branco', async ({ page }) => {
  const lead = {
    name: '',
    email: ''
  }

  await page.leads.submitLeadForm(lead);
  await page.alert.haveText(['Campo obrigatório', 'Campo obrigatório']);
});


