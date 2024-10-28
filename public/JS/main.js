$(document).ready(() => {
    $('#inputOperacion').on('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9+\-*/()]/g, '').replace(/--/g, '-');
    });

    const mostrarAlerta = (mensaje) => $('#alertaError').text(mensaje).removeClass('d-none');
    const ocultarAlerta = () => $('#alertaError').addClass('d-none');

    const validarOperacion = (operacion) => {
        if (/-[0-9]/.test(operacion)) return mostrarAlerta('No se permiten números negativos.'), false;
        if (!/^[0-9+\-*/\s()]+$/.test(operacion)) return mostrarAlerta('Operación inválida.'), false;
        ocultarAlerta(); return true;
    };

    const generarCuadruplos = (operacion) => {
        const partes = operacion.match(/[0-9]+|[+*/-]/g), cuadruplos = [];
        let acumulador = parseFloat(partes[0]), temporal = acumulador;

        for (let i = 1; i < partes.length; i += 2) {
            const [operador, operando] = [partes[i], parseFloat(partes[i + 1])];
            let resultadoParcial = operador === '+' ? acumulador + operando
                                : operador === '-' ? acumulador - operando
                                : operador === '*' ? acumulador * operando
                                : acumulador / operando;
            cuadruplos.push({ operador, temporal, operando, resultado: resultadoParcial });
            acumulador = resultadoParcial; temporal = `T${cuadruplos.length}`;
        }
        return cuadruplos;
    };

    const mostrarCuadruplos = (cuadruplos) => {
        $('#cuadruplosLista').empty();
        cuadruplos.forEach((c, i) => {
            $('#cuadruplosLista').append(`<li class="list-group-item">${i + 1}: (${c.operador}, ${c.temporal}, ${c.operando}, ${c.resultado})</li>`);
        });
    };

    $('#btnCalcular').on('click', () => {
        const operacion = $('#inputOperacion').val();
        if (validarOperacion(operacion)) {
            const cuadruplos = generarCuadruplos(operacion);
            mostrarCuadruplos(cuadruplos);
            $('#resultado').text(`Resultado: ${cuadruplos.at(-1).resultado}`);
        }
    });
});
