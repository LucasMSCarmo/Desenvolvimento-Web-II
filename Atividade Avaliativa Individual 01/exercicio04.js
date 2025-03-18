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

class Trabalhador {
    valorHora;
    beneficio;
    salarioInicial;
    constructor(codigo, horas, turno, categoria, salarioMinimo) {
        this.codigo = codigo;
        this.horas = horas;
        this.turno = turno.toUpperCase();
        this.categoria = categoria.toUpperCase();
        this.salarioMinimo = salarioMinimo;
    }

    calcularValorHora() {
        switch (this.categoria) {
            case 'F':
                switch (this.turno) {
                    case 'M':
                        this.valorHora = 0.1 * this.salarioMinimo / 100;
                        break;
                    case 'V':
                        this.valorHora = 0.15 * this.salarioMinimo / 100;
                        break;
                    case 'N':
                        this.valorHora = 0.2 * this.salarioMinimo / 100;
                        break;
                    default:
                        return "\nTurno Inválido\n";
                }
                break;
            case 'G':
                switch (this.turno) {
                    case 'M':
                        this.valorHora = 0.3 * this.salarioMinimo / 100;
                        break;
                    case 'V':
                        this.valorHora = 0.35 * this.salarioMinimo / 100;
                        break;
                    case 'N':
                        this.valorHora = 0.4 * this.salarioMinimo / 100;
                        break;
                    default:
                        return "\nTurno Inválido\n";
                }
                break;
            default:
                return "\nCategoria Inválida\n";
        }
    }

    calcularSalarioInicial() {
        this.salarioInicial = this.valorHora * this.horas;
    }

    calcularBeneficio() {
        if (this.salarioInicial <= 800) {
            this.beneficio = this.salarioInicial * 0.25;
        } else if (this.salarioInicial <= 1200) {
            this.beneficio = this.salarioInicial * 0.2;
        } else {
            this.beneficio = this.salarioInicial * 0.15;
        }
    }

    calcularSalarioFinal() {
        return this.salarioInicial + this.beneficio;
    }
}

async function main() {
    let repetir;
    do {
        const codigo = await ask("Código do funcionário: ");
        const horas = parseFloat(await ask("Horas trabalhadas: "));
        const turno = await ask("Turno (M/V/N): ");
        const categoria = await ask("Categoria (F/G): ");
        const salarioMinimo = parseFloat(await ask("Salário mínimo: "));

        const trabalhador = new Trabalhador(codigo, horas, turno, categoria, salarioMinimo);
        const valorHora = trabalhador.calcularValorHora();
        console.log(valorHora === undefined ? '\n' : valorHora);
        if (trabalhador.valorHora === undefined){
            repetir = "S"
            continue;
        }
        trabalhador.calcularSalarioInicial();
        trabalhador.calcularBeneficio();
        const salarioFinal = trabalhador.calcularSalarioFinal();

        console.log(
            `Código: ${trabalhador.codigo}\n`+
            `Horas Trabalhadas: ${trabalhador.horas}\n`+
            `Turno: ${trabalhador.turno}\n`+
            `Categoria: ${trabalhador.categoria}\n`+
            `Valor da Hora: R$ ${trabalhador.valorHora.toFixed(2)}\n`+
            `Salário Inicial: R$ ${trabalhador.salarioInicial.toFixed(2)}\n`+
            `Benefício: R$ ${trabalhador.beneficio.toFixed(2)}\n`+
            `Salário Final: R$ ${salarioFinal.toFixed(2)}\n`
        );

        repetir = (await ask("Deseja cadastrar outro funcionário? (S/N): ")).toUpperCase();
    } while (repetir === "S");
    
    rl.close();
}

main();