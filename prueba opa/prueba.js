

// Función para saber si un número es perfecto o no
function esPerfecto(num) {
  if (num === 1) return false;
  let suma = 1; // 1 es divisor de todos excepto el mismo
  const raiz = Math.sqrt(num);

  for (let i = 2; i <= raiz; i++) {
    if (num % i === 0) {
      suma += i;
      const otroDivisor = num / i;
      if (otroDivisor !== i) suma += otroDivisor;
    }
  }
  return suma === num;
}

// aquí se calcula el ramgo de los numeros perfectos
function calcularPerfectos(min, max) {
  const perfectos = [];
  for (let n = min; n <= max; n++) {
    if (esPerfecto(n)) perfectos.push(n);
  }
  return perfectos;
}

// Muestra resultados en el DOM
function mostrarResultados(perfectos) {
  const lista = document.getElementById('perfectNumbersList');
  lista.innerHTML = '';
  if (perfectos.length === 0) {
    lista.innerHTML = '<li class="list-group-item">No se encontraron números perfectos en este rango.</li>';
  } else {
    perfectos.forEach(num => {
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-success';
      li.textContent = num;
      lista.appendChild(li);
    });
  }
}

// Guardar resultados y rango en localStorage para persistencia
function guardarEnLocalStorage(min, max, perfectos) {
  const data = {
    min,
    max,
    perfectos,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('numerosPerfectosData', JSON.stringify(data));
}


// Evento submit del formulario
document.getElementById('rangeForm').addEventListener('submit', e => {
  e.preventDefault();
  const min = parseInt(document.getElementById('minNumber').value);
  const max = parseInt(document.getElementById('maxNumber').value);
  if (min > max) {
    alert('El número mínimo debe ser menor o igual que el máximo.');
    return;
  }
  const perfectos = calcularPerfectos(min, max);
  mostrarResultados(perfectos);
  guardarEnLocalStorage(min, max, perfectos);
});
