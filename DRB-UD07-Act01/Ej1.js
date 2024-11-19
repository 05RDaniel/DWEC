var datosJson = [];
var peticion = new XMLHttpRequest();

function obtenerDatosServidor() {
  peticion.onreadystatechange = function () {
    if (peticion.readyState === 4 && peticion.status === 200) {
      datosJson = JSON.parse(peticion.responseText);
      const caja = document.getElementById("caja");
      caja.innerHTML = "<tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Cargo</th><th>Contratado</th><th>Acciones</th></tr>";
      datosJson.forEach((empleado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${empleado.id}</td>
          <td>${empleado.nombre}</td>
          <td>${empleado.edad}</td>
          <td>${empleado.cargo}</td>
          <td>${empleado.contratado}</td>
          <td>
            <button onclick='modificarEmpleado(${empleado.id});'>Modificar</button>
            <button onclick='borrarEmpleado(${empleado.id});' ${
              datosJson.length === 1 ? "disabled" : ""
            }>Eliminar</button>
          </td>`;
        caja.appendChild(fila);
      });
    }
  };
  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
  peticion.send();
}

obtenerDatosServidor();

function nuevoEmpleado() {
  document.getElementById("empleados").className = "hidden";
  document.getElementById("formulario").className = "shown";
  document.getElementById("nuevoEmpleado").innerHTML = "<button onclick='nuevoEmpleado()' disabled>Nuevo empleado</button>";
}

function addEmpleado() {
  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);
  const cargo = document.getElementById("cargo").value.trim();
  const contratado = document.getElementById("contratado").checked ? 1 : 0;

  if (!nombre || isNaN(edad) || !cargo) {
    alert("Todos los campos deben ser llenados correctamente.");
    return;
  }

  const nuevoEmpleado = {
    nombre,
    edad,
    cargo,
    contratado,
  };

  const peticion = new XMLHttpRequest();
  peticion.open("POST", "http://test-api.jtarrega.es/api/empleados", true);
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.onreadystatechange = function () {
    if (peticion.readyState === 4 && peticion.status === 201) {
      obtenerDatosServidor();
      cerrarFormulario();
    } else if (peticion.readyState === 4) {
      alert("Error al agregar el empleado. Inténtalo de nuevo.");
    }
  };
  peticion.send(JSON.stringify(nuevoEmpleado));
}

function borrarEmpleado(id) {
  const confirmation = prompt("¿Seguro que desea eliminar? (S/N)").toUpperCase();
  if (confirmation === "S") {
    const peticion = new XMLHttpRequest();
    peticion.open("DELETE", `http://test-api.jtarrega.es/api/empleados/${id}`, true);
    peticion.onreadystatechange = function () {
      if (peticion.readyState === 4 && peticion.status === 200) {
        datosJson = datosJson.filter((empleado) => empleado.id !== id);
        obtenerDatosServidor();
      }
    };
    peticion.send();
  }
}

function cerrarFormulario() {
  document.getElementById("empleados").className = "shown";
  document.getElementById("formulario").className = "hidden";
  document.getElementById("nuevoEmpleado").innerHTML = "<button onclick='nuevoEmpleado()'>Nuevo empleado</button>";

}

function modificarEmpleado(id) {
  const empleado = datosJson.find((empleado) => empleado.id === id);
  if (empleado) {
    document.getElementById("nombre").value = empleado.nombre;
    document.getElementById("edad").value = empleado.edad;
    document.getElementById("cargo").value = empleado.cargo;
    document.getElementById("contratado").checked = empleado.contratado;
    nuevoEmpleado();
    const peticion = new XMLHttpRequest();
    peticion.open("DELETE", `http://test-api.jtarrega.es/api/empleados/${id}`, true);
    peticion.onreadystatechange = function () {
      if (peticion.readyState === 4 && peticion.status === 200) {
        datosJson = datosJson.filter((empleado) => empleado.id !== id);
        obtenerDatosServidor();
      }
    };
    peticion.send();
  }
}
