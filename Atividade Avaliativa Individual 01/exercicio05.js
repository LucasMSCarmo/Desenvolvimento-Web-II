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

function calcularMediaPonderada(nota1, nota2, nota3) {
    return (nota1 * 2 + nota2 * 5 + nota3 * 3) / 10;
}

function classificarMedia(media) {
    if (media >= 9) return "A";
    if (media >= 8) return "B";
    if (media >= 7) return "C";
    if (media >= 6) return "D";
    if (media >= 5) return "E";
    return "F";
}

async function main() {
    let repetir;
    do {
        const nota1 = parseFloat(await ask("Atividade prática em laboratório: "));
        const nota2 = parseFloat(await ask("Prova do semestre: "));
        const nota3 = parseFloat(await ask("Trabalho teórico: "));

        const media = calcularMediaPonderada(nota1, nota2, nota3);
        const classificacao = classificarMedia(media);

        console.log(`A média do aluno é ${media.toFixed(2)} e a sua classificação é ${classificacao}\n`
        );

        repetir = (await ask("Deseja calcular outra média? (S/N): ")).toUpperCase();
    } while (repetir === "S");
    
    rl.close();
}

main();