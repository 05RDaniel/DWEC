class Factura{
    constructor(empresa,cliente,detalle,totales){
        this.empresa = empresa;
        this.cliente = cliente;
        this.detalle = detalle;
        this.totalesFactura = totales;
    }

    /* Calcula el total mediante la base imponible y el IVA */
    calculaTotal(){
        let base = this.totalesFactura.baseImponible
        let IVA = this.totalesFactura.tipoIva
        this.totalesFactura.importeTotal= base + (base*(IVA/100))
    }

    /* Muestra el impote total, el tipo de IVA y la forma de pago */
    MuestraTotal(){
        document.write(this.totalesFactura.importeTotal+"<br>"+
        this.totalesFactura.tipoIva+"<br>"+this.totalesFactura.formaPago)
    }

    /* Imprime una factura detallada */
    imprimirFactura(){
        document.write("Factura de "+this.empresa.nombreEmpresa+"<br>"+
        "Cliente: "+this.cliente.nombreCliente+"<br>"+
        "Detalle: "+this.detalle.mostrar()+"<br>"+
        "Total: "+this.totalesFactura.importeTotal+"<br>"+
        "Tipo IVA: "+this.totalesFactura.tipoIva+"<br>"+
        "Forma de pago: "+this.totalesFactura.formaPago)
    }
}

class Empresa{
    constructor(nomE,dir,tel,NiF){
        this.nombreEmpresa=nomE;
        this.direccion=dir;
        this.telefono=tel;
        this.NIF=NiF;
    }
}
class Cliente{
    constructor(nomC,dir,tel,NiF){
        this.nombreCliente=nomC;
        this.direccion=dir;
        this.telefono=tel;
        this.NIF=NiF;
    }
}
class DetalleFactura{
    constructor(des,pre,can){
        this.descripcion=des;
        this.precio=pre;
        this.cantidad=can;
    }
    mostrar(){
        return this.descripcion+", "+this.precio+"€, "+this.cantidad;
    }
}
class TotalesFactura{
    constructor(basI,tipI,forP){
        this.baseImponible=basI;
        this.importeTotal;
        this.tipoIva=tipI;
        this.formaPago=forP;
    }
}