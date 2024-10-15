<script>
    
class Hospital{
    contructor(cH,nH,dir,tel,pob,cP){
        this.codHospital = cH
        this.nombreHospital = nH
        this.direccion = dir
        this.telefono = tel
        this.poblacion = pob
        this.codPostal = cP
    }
}

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

    cambiarSueldo(nSue){
        this.sueldo = nSue
    }

    retencionMedico(sue,ret){
        this.sue-=this.sue*ret
    }

    mostrarDatos(){
        return "Código: "+this.codMedico+
        "\nNombre: "+this.nombre+
        "\nApellidos: "+this.apellidos+
        "\nDNI: "+this.dni+
        "\nDirección: "+this.direccion+
        "\nTeléfono: "+this.telefono+
        "\nPoblación: "+this.poblacion+
        "\nCódigo Postal: "+this.codPostal+
        "\nFecha de Nacimiento: "+this.fechaNacimiento+
        "\nEspecialidad: "+this.especialidad+
        "\nSueldo: "+this.sueldo+
        "\nHospital: "+this.hospital.nombreHospital
    }
}
</script>