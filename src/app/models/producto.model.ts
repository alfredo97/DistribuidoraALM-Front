export interface Producto {
    id: number;
    nombre: string;
    tipoProducto : number;
    esActivo: boolean;
    precio: number; 
    costoProveedor: number; 
    claveProductoProveedor: string;
    idProveedor: number
}