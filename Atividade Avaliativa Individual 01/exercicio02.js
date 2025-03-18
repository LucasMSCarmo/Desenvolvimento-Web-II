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

function classificarFaixaEtaria(idade) {
    if (idade >= 0 && idade <= 14) return "Criança";
    if (idade <= 24) return "Jovem";
    if (idade <= 64) return "Adulto";
    return "Idoso";
}

async function main() {
    const contador = { Criança: 0, Jovem: 0, Adulto: 0, Idoso: 0 };
    let repetir;

    do {
        const idade = parseInt(await ask("Digite a idade: "));
        const faixa = classificarFaixaEtaria(idade);
        contador[faixa]++;
        console.log(`Faixa etária: ${faixa}`);
        for (const [faixa, quantidade] of Object.entries(contador)) {
            console.log(`${faixa}: ${quantidade}`);
        }
        repetir = (await ask("Deseja classificar outra idade? (S/N): ")).toUpperCase();
    } while (repetir === "S");

    console.log("Contagem final:");
    for (const [faixa, quantidade] of Object.entries(contador)) {
        console.log(`${faixa}: ${quantidade}`);
    }
    
    rl.close();
}

main();