casillaUno = 0;

/* LEER Explicacion Ej4.txt */

function filasColumnasMinas(a, b) {
  /* Establece el numero de filas y columnas, de minas, detiene el contador y reinicia la casilla uno */
  stopit()
  document.getElementById("marcadas").innerHTML = "Número de minas  marcadas: 0";
  filasColumnas = a
  numMinas = b
  casillaUno = 0
}

function crearTabla() {
  /* Crea la tabla de juego */
  const tabla = document.createElement("table");
  for (let i = 0; i < filasColumnas; i++) {
    const fila = document.createElement("tr");
    for (let j = 0; j < filasColumnas; j++) {
      const celda = document.createElement("td");
      celda.id = "c-" + i + "-" + j;
      celda.className = "zero";
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  const container = document.getElementById("container");
  container.appendChild(tabla);
}

function crearCovertura() {
  /* Crea la tabla de covertura */
  const tabla = document.createElement("table");
  tabla.id = "covertura";
  for (let i = 0; i < filasColumnas; i++) {
    const fila = document.createElement("tr");
    for (let j = 0; j < filasColumnas; j++) {
      const celda = document.createElement("td");
      celda.id = "d-" + i + "-" + j;
      celda.className = "hidden";
      celda.addEventListener("click", function () {
        /* Evento para ocultar la covertura */
        mostrar(celda);
      });
      celda.addEventListener("contextmenu", function () {
        /* Evento para alternar entre oculto, marcado y desconocido */
        if (celda.className == "hidden") {
          celda.className = "marked";
        } else if (celda.className == "marked") {
          celda.className = "unknown";
        } else if (celda.className == "unknown") {
          celda.className = "hidden";
        }
        markCells();
      });
      celda.addEventListener("contextmenu", function inhabilitar(e) {
        /* Evento para evitar el menú contextual */
        e.preventDefault();
      });
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }

  const container = document.getElementById("container");
  container.appendChild(tabla);
}

function markCells() {
  /* Función para actualizar el número de celdas marcadas y comprobar si el juego se ha terminado */
  document.getElementById("marcadas").innerHTML = "Número de minas  marcadas: " + document.getElementsByClassName("marked").length;
  if (document.getElementsByClassName("marked").length + document.getElementsByClassName("shown").length == filasColumnas * filasColumnas) {
    /* Si el número de casillas marcadas + el número de casillas mostradas es igual al número total de casillas */
    document.getElementById("covertura").style.visibility = "hidden";
    Array.from(document.getElementsByClassName("mina")).forEach(element => {
      element.className = "minaDefused"
    });
  }
}

function mostrar(obj) {
  /* Función para mostrar la celda */
  if (obj.className != "marked") {
    obj.className = "shown";
    idN = obj.id.split("-");
    idF = "c-" + idN[1] + "-" + idN[2];
    if (casillaUno == 0) {
      primerClick(idF);
    } else {
      if (document.getElementById(idF).className == "mina") {
        document.getElementById(idF).className = "minaBum";
        document.getElementById("covertura").style.visibility = "hidden";
      }
    }
    mostrarAdyacentes(idF);
  }
}

function mostrarAdyacentes(idF) {
  /* Función para mostrar todas las c eldas adyacentes y comprobar a su vez si es necesario mostrar más */
  const stack = [idF]; /* Guarda idF en un array */
  while (stack.length > 0) { /* Hasta que el array que almacena id esté vacío */
    const currentId = stack.pop(); /* elimina del array el último id del array, almacenándolo al mismo tiempo */
    const currentCell = document.getElementById(currentId); /* obtiene la celda de el id actual */

    if (currentCell && currentCell.className === "zero") { /* Si la celda actual existe y tiene la clase zero (vacía) */
      const idN = currentId.split("-"); /* Separa las partes del id para obtener las coordenadas i y j */
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i !== 0 || j !== 0) {
            const adjRow = parseInt(idN[1]) + i; /* representa la coordenada i actual -1, +0 y +1 */
            const adjCol = parseInt(idN[2]) + j; /* representa la coordenada j actual -1, +0 y +1 */
            if (adjRow >= 0 && adjRow < filasColumnas && adjCol >= 0 && adjCol < filasColumnas) { /* comprobación rápida de que la celda a mostrar está dentro de la tabla */
              const adjId = "d-" + adjRow + "-" + adjCol; /* Forma  el id de la celda*/
              const adjCelda = document.getElementById(adjId); /* almacena la celda a partir del id formado */
              if (adjCelda && adjCelda.className != "shown") {  /* Si la celda existe y no está oculta */
                adjCelda.className = "shown"; /* Aplica la clase "hidden" */
                stack.push("c-" + adjRow + "-" + adjCol); /* Añade el id de la celda al array */
              }
            }
          }
        }
      }
    }
  }
}

function primerClick(idF) {
  /* Función para controlar el primer click, iniciar el contador, establecer la casilla uno como la clicada y colocar minas y números */
  startTime = new Date();
  intervalo = setInterval(hora, 1000);
  document.getElementById(idF).className = "zero";
  casillaUno = idF;
  colocarMinas();
  colocarNumeros();
}

function colocarMinas() {
  /* Función para colocar minas en la tabla, comprobando los bordes, las casillas en la que ya hay una mina y la primera casilla clicada y sus adyacentes */
  let minasColocadas = 0;
  const initial = casillaUno.split("-");
  const primeraFila = parseInt(initial[1]);
  const primeraColumna = parseInt(initial[2]);

  while (minasColocadas < numMinas) {
    const n1 = Math.floor(Math.random() * filasColumnas);
    const n2 = Math.floor(Math.random() * filasColumnas);
    const celda = document.getElementById("c-" + n1 + "-" + n2);

    if (
      !celda.classList.contains("mina") &&
      !(n1 == primeraFila && n2 == primeraColumna) &&
      !(
        n1 >= primeraFila - 1 &&
        n1 <= primeraFila + 1 &&
        n2 >= primeraColumna - 1 &&
        n2 <= primeraColumna + 1
      )
    ) {
      celda.className = "mina";
      minasColocadas++;
    }
  }
}

function comprobarMinas(i, j) {
  /* Función para comprobar si la casilla especificada contien una mina */
  const cell = document.getElementById("c-" + i + "-" + j);
  return cell && cell.className == "mina";
}

function colocarNumeros() {
  /* Función para colocar números según la cantidad de minas adyacentes */
  for (let i = 0; i < filasColumnas; i++) {
    for (let j = 0; j < filasColumnas; j++) {
      let minas = 0;
      if (document.getElementById("c-" + i + "-" + j).className !== "mina") {
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            const x2 = i + x;
            const y2 = j + y;
            if (
              x2 >= 0 &&
              y2 >= 0 &&
              x2 < filasColumnas &&
              y2 < filasColumnas &&
              comprobarMinas(x2, y2)
            ) {
              minas++;
            }
          }
        }
      }

      let num;
      switch (minas) {
        /* Switch para  colocar el número según la cantidad de minas adyacentes */
        case 1:
          num = "one";
          break;
        case 2:
          num = "two";
          break;
        case 3:
          num = "three";
          break;
        case 4:
          num = "four";
          break;
        case 5:
          num = "five";
          break;
        case 6:
          num = "six";
          break;
        case 7:
          num = "seven";
          break;
        case 8:
          num = "eight";
          break;
        default:
          num = "zero";
          break;
      }
      if (minas !== 0) {
        document.getElementById("c-" + i + "-" + j).className = num;
      }
    }
  }
}


function hora() {
  /* Función para crear el temporizador e imprimirlo */
  currentTime = new Date();
  elapsedTime = currentTime - startTime;
  timePassed = new Date(elapsedTime);
  hours = timePassed.getUTCHours().toString().padStart(2, '0');
  minutes = timePassed.getUTCMinutes().toString().padStart(2, '0');
  seconds = timePassed.getUTCSeconds().toString().padStart(2, '0');


  document.getElementById("tiempo").innerHTML = "Tiempo: "+`${hours}:${minutes}:${seconds}`;
}
function stopit() {
  /* Función para reiniciar el temporizador */
  clearInterval(intervalo)
  document.getElementById("tiempo").innerHTML = "Tiempo: 00:00:00";
}

intervalo = setInterval(hora, 1000);