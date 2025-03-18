const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc >= 40) return "Obesidade grau III";
    if (imc >= 35) return "Obesidade grau II";
    if (imc >= 30) return "Obesidade grau I";
    if (imc >= 25) return "Sobrepeso";
    if (imc >= 18.5) return "Peso normal";
    if (imc >= 17) return "Baixo peso";
    if (imc >= 16) return "Baixo peso grave";
    return "Baixo peso muito grave";
}

async function main() {
    let repetir;
    do {
        const peso = parseFloat(await ask("Digite o peso (em kg): "));
        const altura = parseFloat(await ask("Digite a altura (em metros): "));
        const imc = calcularIMC(peso, altura);
        const classificacao = classificarIMC(imc);
        console.log(`Seu IMC é ${imc.toFixed(2)}: ${classificacao}`);

        repetir = (await ask("Deseja calcular outro IMC? (S/N): ")).toUpperCase();
    } while (repetir === "S");
    
    rl.close();
}

main();