import {dibujarCirculoCuadrado, dibujarRectanguloDiagonalesRombo, dibujarTrianguloTrapezoideEscaleno} from "./shapes.js";

let historialPerimetros = [];
let historialLados = [];

document.getElementById('shapeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const lado1 = parseFloat(document.getElementById('lado1').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);

    // Validar si los lados son números válidos
    if (!isNaN(lado1) && !isNaN(lado2) && !isNaN(lado3)) {
        // Verificar si los lados forman un triángulo
        if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
            // Guardar valores en el historial
            const perimetro = calcularPerimetro(lado1, lado2, lado3);
            historialPerimetros.push(perimetro);

            // Guardar los lados en el historial
            const lados = [lado1, lado2, lado3];
            historialLados.push(lados);

            let resultado = '';

            if (lado1 === lado2 && lado2 === lado3) {
                // Triángulo equilátero o cuadrado
                const areaCuadrado = (lado1 * lado1).toFixed(2);
                const perimetroCuadrado = lado1 * 3;
                resultado = `Radio de un círculo y lado de un cuadrado detectados:\nÁrea cuadrado: ${areaCuadrado} unidades\nPerímetro cuadrado: ${perimetroCuadrado} unidades\nRadio Círculo: ${lado1} unidades`;
                dibujarCirculoCuadrado(lado1)
            } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
                // Triángulo isósceles o rectángulo
                const areaRectangulo = ((lado1 === lado2 ? lado1 * lado3 : lado1 * lado2)).toFixed(2);
                const perimetroRectangulo = (lado1 + lado2 + lado3);
                resultado = `Lados de un rectángulo y diagonales de un rombo detectados:\nÁrea: ${areaRectangulo} unidades\nPerímetro: ${perimetroRectangulo} unidades`;
                dibujarRectanguloDiagonalesRombo(lado1, lado2, lado3)
            } else {
                // Triángulo escaleno o trapecio
                const areaTrapecio = calcularArea(lado1, lado2, lado3).toFixed(2);
                resultado = `Triángulo escaleno o trapecio detectado:\nÁrea: ${areaTrapecio} unidades\nPerímetro: ${perimetro} unidades`;
                dibujarTrianguloTrapezoideEscaleno(lado1,lado2,lado3)
            }

            document.getElementById('resultado').innerText = resultado;

            // Limpiar valores de entrada
            document.getElementById('lado1').value = '';
            document.getElementById('lado2').value = '';
            document.getElementById('lado3').value = '';

            // Mostrar opciones adicionales
            mostrarOpciones();

            // Actualizar historial
            actualizarHistorial(perimetro);
        } else {
            alert('Los lados no forman un triángulo válido. Verifique los valores ingresados e intente con intervalos más cercanos. Ejemplo: Entre 50 y 100');
        }
    } else {
        alert('Por favor ingrese valores numéricos válidos para los lados.');
    }
});


document.getElementById('borrarBtn').addEventListener('click', function() {
    location.reload();
});



function mostrarOpciones() {
    const opciones = document.createElement('div');
    opciones.classList.add('options');

    const opcionesHtml = `
        <button id="totalDosIgualesBtn">Total de ternas con dos números iguales</button>
        <button id="totalTresIgualesBtn">Total de ternas con tres números iguales</button>
        <button id="areasOrdenadasBtn">Ordenar áreas en orden ascendente</button>
        <button id="perimetrosOrdenadosBtn">Ordenar perímetros en orden descendente</button>
        <button id="promedioAreasBtn">Promedio de las áreas</button>
        <button id="medianaPerimetrosBtn">Mediana de los perímetros</button>
    `;

    opciones.innerHTML = opcionesHtml;
    document.getElementById('resultado').appendChild(opciones);

    // Agregar eventos a los botones
    document.getElementById('totalDosIgualesBtn').addEventListener('click', mostrarTotalDosIguales);
    document.getElementById('totalTresIgualesBtn').addEventListener('click', mostrarTotalTresIguales);
    document.getElementById('areasOrdenadasBtn').addEventListener('click', mostrarAreasOrdenadas);
    document.getElementById('perimetrosOrdenadosBtn').addEventListener('click', mostrarPerimetrosOrdenados);
    document.getElementById('promedioAreasBtn').addEventListener('click', mostrarPromedioAreas);
    document.getElementById('medianaPerimetrosBtn').addEventListener('click', mostrarMedianaPerimetros);
}

function mostrarTotalDosIguales() {
    const totalDosIguales = contarDosIguales(historialLados);
    mostrarResultado(`Total de ternas con dos números iguales: ${totalDosIguales}`);
}

function mostrarTotalTresIguales() {
    const totalTresIguales = contarTresIguales(historialLados);
    mostrarResultado(`Total de ternas con tres números iguales: ${totalTresIguales}`);
}

function contarDosIguales(arr) {
    let count = 0;
    arr.forEach(lados => {
        if (tieneDosIguales(lados)) {
            count++;
        }
    });
    return count;
}

function contarTresIguales(arr) {
    let count = 0;
    arr.forEach(lados => {
        if (tieneTresIguales(lados)) {
            count++;
        }
    });
    return count;
}

function tieneDosIguales(lados) {
    return new Set(lados).size === 2;
}

function tieneTresIguales(lados) {
    return new Set(lados).size === 1;
}

function mostrarAreasOrdenadas() {
    const areasOrdenadas = historialPerimetros.slice().sort((a, b) => a - b);
    mostrarResultado(`Áreas ordenadas en orden ascendente: ${areasOrdenadas}`);
}

function mostrarPerimetrosOrdenados() {
    const perimetrosOrdenados = historialPerimetros.slice().sort((a, b) => b - a);
    mostrarResultado(`Perímetros ordenados en orden descendente: ${perimetrosOrdenados}`);
}

function mostrarPromedioAreas() {
    const promedioAreas = calcularPromedio(historialPerimetros);
    mostrarResultado(`Promedio de las áreas: ${promedioAreas}`);
}

function mostrarMedianaPerimetros() {
    const medianaPerimetros = calcularMediana(historialPerimetros);
    mostrarResultado(`Mediana de los perímetros: ${medianaPerimetros}`);
}

function contarRepetidos(arr, num) {
    return arr.filter(item => item === num).length;
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.createElement('div');
    resultadoDiv.innerText = resultado;
    document.getElementById('resultado').appendChild(resultadoDiv);
}

function calcularArea(lado1, lado2, lado3) {
    const s = (lado1 + lado2 + lado3) / 2;
    return Math.sqrt(s * (s - lado1) * (s - lado2) * (s - lado3));
}

function calcularPerimetro(lado1, lado2, lado3) {
    return lado1 + lado2 + lado3;
}

function calcularPromedio(arr) {
    const sum = arr.reduce((acc, curr) => acc + parseFloat(curr), 0);
    return (sum / arr.length).toFixed(2);
}

function calcularMediana(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);
    return sortedArr.length % 2 !== 0 ? sortedArr[mid] : ((parseFloat(sortedArr[mid - 1]) + parseFloat(sortedArr[mid])) / 2).toFixed(2);
}

function actualizarHistorial() {
    const historialList = document.getElementById('historialList');
    const lado1 = parseFloat(document.getElementById('lado1').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);

    historialLados.push([lado1, lado2, lado3]);

    historialList.innerHTML = ''; // Limpiar el historial antes de actualizarlo

    historialLados.forEach((lados, index) => {
        const area = calcularArea(lados[0], lados[1], lados[2]).toFixed(2);
        if (!isNaN(area)) {
            const perimetro = historialPerimetros[index];
            const listItem = document.createElement('li');
            listItem.textContent = `Área: ${area}, Perímetro: ${perimetro.toFixed(2)}`;
            historialList.appendChild(listItem);
        }
    });
}
