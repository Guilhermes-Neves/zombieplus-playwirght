import { test } from '../support';
import { gerarEmailValido , gerarNomeProprio} from '../utils/utils'

test.beforeEach(async ({ page }) => {
  // visit
  await page.landing.visit();
  await page.landing.openLeadModal();
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const lead = {
    name: gerarNomeProprio(),
    email: gerarEmailValido()
  }

  await page.landing.submitLeadForm(lead);
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await page.toast.containText(message);
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const lead = {
    email: 'guilherme@teste.com',
    name: 'Guilherme Neves'
  }

  const newLead = await request.post('http://localhost:3333/leads', {
    data: lead
  })

  await page.landing.submitLeadForm(lead);
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await page.toast.containText(message);
});


test('não deve cadastrar um lead com email invalido', async ({ page }) => {
  const lead = {
    name: 'Guilherme Neves',
    email: 'invalidEmail'
  }

  await page.landing.submitLeadForm(lead);
  await page.alert.haveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
  const lead = {
    name: '',
    email: 'teste@teste.com'
  }

  await page.landing.submitLeadForm(lead);
  await page.alert.haveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando o email não é preenchido', async ({ page }) => {
  const lead = {
    name: 'Guilherme Neves',
    email: ''
  }

  await page.landing.submitLeadForm(lead);
  await page.alert.haveText('Campo obrigatório');
});

test('não deve cadastrar um lead com campos em branco', async ({ page }) => {
  const lead = {
    name: '',
    email: ''
  }

  await page.landing.submitLeadForm(lead);
  await page.alert.haveText(['Campo obrigatório', 'Campo obrigatório']);
});


