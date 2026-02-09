export const gerarEmailValido = () => {
    // gera uma string aleatória
    const randomString = Math.random().toString(36).substring(2, 10);

    // monta o email
    const email = `${randomString}@exemplo.com`;

    return email;
}

export const gerarNomeProprio = () => {
    const nomes = ["Ana", "Carlos", "Mariana", "João", "Fernanda", "Pedro", "Luiza", "Ricardo"];
    const sobrenomes = ["Silva", "Souza", "Oliveira", "Costa", "Pereira", "Almeida", "Ferreira", "Gomes"];
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`
}