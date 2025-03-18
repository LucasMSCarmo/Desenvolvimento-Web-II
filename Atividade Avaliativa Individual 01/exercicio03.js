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

function calcularFrete(km, litro, qtd, regiao, rastreamento) {
    let valorPorPeca;
    switch (regiao) {
        case "SUDESTE":
            valorPorPeca = 1.2;
            break;
        case "SUL":
            valorPorPeca = 1.3;
            break;
        case "CENTRO-OESTE":
            valorPorPeca = 1.5;
            break;
        default:
            break;
    }

    let valorFrete;
    if (qtd > 1000) {
        valorFrete = 1000 * valorPorPeca + (qtd - 1000) * valorPorPeca * 0.88;
    } else {
        valorFrete = qtd * valorPorPeca;
    }

    const valorKm = km * litro;
    const valorRastreamento = rastreamento ? 200 : 0;
    const total = valorFrete + valorKm + valorRastreamento;

    return {
        valorFrete: valorFrete.toFixed(2),
        valorKm: valorKm.toFixed(2),
        valorRastreamento: valorRastreamento.toFixed(2),
        total: total.toFixed(2),
    };
}

async function main() {
    let repetir;
    do {
        const km = parseFloat(await ask("Distância (em km): "));
        const litro = parseFloat(await ask("Valor do litro de combustível: "));
        const qtd = parseInt(await ask("Quantidade de peças: "));
        let regiao;
        do{
            regiao = String(await ask("Região (Sudeste, Sul, Centro-Oeste): ")).toUpperCase();
        }while (!["SUDESTE", "SUL", "CENTRO-OESTE"].includes(regiao));
        const rastreamento = (await ask("Deseja rastreamento? (S/N): ")).toUpperCase() === "S";

        const resultado = calcularFrete(km, litro, qtd, regiao, rastreamento);
        console.log(
            `Valor do frete pelas peças: R$ ${resultado.valorFrete}\n`+
            `Valor do frete por km: R$ ${resultado.valorKm}\n`+
            `Taxa de rastreamento: R$ ${resultado.valorRastreamento}\n`+
            `Total do frete: R$ ${resultado.total}\n`
        );

        repetir = (await ask("Deseja calcular outro frete? (S/N): ")).toUpperCase();
    } while (repetir === "S");
    
    rl.close();
}

main();