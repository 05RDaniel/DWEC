class Edificio{
    calle
    num
    codP
    numPlantas
    numPuertas
    plantas = []
    constructor(calle,num,codP){
        this.calle = calle
        this.num = num
        this.codP = codP
    }
    agregar(numPlantas,puertas){
        this.numPlantas += numPlantas
        this.numPuertas += puertas*numPlantas
    }
}