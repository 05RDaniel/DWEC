class Edificio{
    calle
    num
    codP
    plantas = []
    constructor(calle,num,codP){
        this.calle = calle
        this.num = num
        this.codP = codP
    }
    agregar(numPlantas,puertas){
        for (let i = 1; i < numPlantas+1; i++) {
            this.plantas[i]= new Array()
            for (let j = 1; j < puertas+1; j++) {
                this.plantas[i][j]=j
            }
            
        }
    }
    mostrar(){
        for (let i = 1; i < this.plantas.length; i++) {
            document.write("<h3>Planta "+i+":</h3>")
            for (let j = 1; j < this.plantas[i].length; j++) {
                document.write("Puerta "+j+"<br>")
            }
            document.write("<br>")
        }
    }
}