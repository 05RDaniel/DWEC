    /* Clase Hospital */
    class Hospital{
    constructor(cH,nH,dir,tel,pob,cP){
        this.codHospital = cH
        this.nombreHospital = nH
        this.direccion = dir
        this.telefono = tel
        this.poblacion = pob
        this.codPostal = cP
    }
}

/* Clase Medico */
class Medico{
    constructor(cM,nom,ape,dni,dir,tel,pob,cP,fN,esp,sue,H){
        this.codMedico = cM
        this.nombre = nom
        this.apellidos = ape
        this.dni = dni
        this.direccion = dir
        this.telefono = tel
        this.poblacion = pob
        this.codPostal = cP
        this.fechaNacimiento = fN
        this.especialidad = esp
        this.sueldo = sue
        this.hospital = H
    }

    /* Método para modificar el sueldo de un médico */
    cambiarSueldo(nSue){
        this.sueldo = nSue
    }

    /* Método para calcular y asignar retenciones sobre el sueldo de un médico */
    retencionMedico(ret){
        this.sueldo-=this.sueldo*ret
    }

    /* Método para mostrar los atributos de un médico */
    mostrarDatos(){
        return "Código: "+this.codMedico+
        "<br>Nombre: "+this.nombre+
        "<br>Apellidos: "+this.apellidos+
        "<br>DNI: "+this.dni+
        "<br>Dirección: "+this.direccion+
        "<br>Teléfono: "+this.telefono+
        "<br>Población: "+this.poblacion+
        "<br>Código Postal: "+this.codPostal+
        "<br>Fecha de Nacimiento: "+this.fechaNacimiento+
        "<br>Especialidad: "+this.especialidad+
        "<br>Sueldo: "+this.sueldo+
        "€<br>Hospital: "+this.hospital.nombreHospital
    }
}