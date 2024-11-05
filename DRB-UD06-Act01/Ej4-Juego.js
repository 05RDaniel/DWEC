    casillaUno = 0;
    function crearTabla() {
      const tabla = document.createElement("table");
      for (let i = 0; i < 100; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < 100; j++) {
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
      const tabla = document.createElement("table");
      tabla.id = "covertura";
      for (let i = 0; i < 100; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < 100; j++) {
          const celda = document.createElement("td");
          celda.id = "d-" + i + "-" + j;
          celda.style.backgroundImage = "url('hidden.png')";
          celda.addEventListener("click", function () {
            mostrar(celda);
          });
          fila.appendChild(celda);
        }
        tabla.appendChild(fila);
      }

      const container = document.getElementById("container");
      container.appendChild(tabla);
    }

    function mostrar(obj) {
      obj.style.visibility = "hidden";
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

    function mostrarAdyacentes(idF) {
      if (document.getElementById(idF).className == "zero") {
        let idN = idF.split("-");
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) {
              let adjId =
                "d-" + (parseInt(idN[1]) + i) + "-" + (parseInt(idN[2]) + j);
              let adjCelda = document.getElementById(adjId);
              if (adjCelda && adjCelda.style.visibility !== "hidden") {
                adjCelda.style.visibility = "hidden";
                mostrarAdyacentes(
                  "c-" + (parseInt(idN[1]) + i) + "-" + (parseInt(idN[2]) + j)
                );
              }
            }
          }
        }
      }
    }

    function primerClick(idF) {
      document.getElementById(idF).className = "zero";
      casillaUno = idF;
      colocarMinas();
      colocarNumeros();
    }

    function colocarMinas() {
      let minasColocadas = 0;
      const initial = casillaUno.split("-");
      const primeraFila = parseInt(initial[1]);
      const primeraColumna = parseInt(initial[2]);
      const idList = [];

      while (minasColocadas < 1250) {
        const n1 = Math.floor(Math.random() * 100);
        const n2 = Math.floor(Math.random() * 100);
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
      return document.getElementById("c-" + i + "-" + j);
    }

    function colocarNumeros() {
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          let minas = 0;
          if (document.getElementById("c-" + i + "-" + j).className != "mina") {
            for (let x = -1; x < 2; x++) {
              for (let y = -1; y < 2; y++) {
                let x2 = i + x;
                let y2 = j + y;
                if (
                  x2 >= 0 &&
                  y2 >= 0 &&
                  x2 < 100 &&
                  y2 < 100 &&
                  comprobarMinas(x2, y2).className == "mina"
                ) {
                  minas++;
                }
              }
            }
          }
          switch (minas) {
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
          if (minas != 0) {
            document.getElementById("c-" + i + "-" + j).className = num;
          }
        }
      }
    }

