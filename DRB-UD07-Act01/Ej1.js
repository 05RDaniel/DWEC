var peticion = new XMLHttpRequest();
      function obtenerDatosServidor() {
        peticion.onreadystatechange = function () {
          if (peticion.readyState == 4 && peticion.status == 200) {
            var datosJson = JSON.parse(peticion.responseText);
            numempleados = datosJson.length;
            for (i = 0; i < datosJson.length; i++) {
              document.getElementById("caja").innerHTML +=
                "<tr><td>" +
                datosJson[i].id +
                "</td><td>" +
                datosJson[i].nombre +
                "</td><td>" +
                datosJson[i].edad +
                "</td><td>" +
                datosJson[i].cargo +
                "</td><td>" +
                datosJson[i].contratado +
                "</td><td><button onclick='borrarEmpleado(" +
                datosJson[i].id +
                ");'>Modificar</button><button onclick='borrarEmpleado(" +
                datosJson[i].id +
                ");'" +
                (numempleados == 1 ? "disabled" : "") +
                ">Eliminar</button></td></tr>";
            }
          }
        };
        peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
        peticion.send();
      }
      obtenerDatosServidor();
      function nuevoEmpleado(){
        document.getElementById("empleados").className="hidden"
        document.getElementById("formulario").className="shown"
      }