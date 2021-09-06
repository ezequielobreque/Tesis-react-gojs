export const stringExample=`
COMPOSITE domicilio{
    ciudad,
    calle,
    numero
};

ENTITY persona COVERAGE (PARTIAL, OVERLAY){
    documento IDENTIFIER,
    cuil IDENTIFIER,
    nacimiento,
    edad CALCULATED BY 'HOY - nacimiento',
    apellido,
    nombre,
    celular (0,1),
    domicilio
};

ENTITY proveedor CHILD OF persona{
    cuit IDENTIFIER 
};

ENTITY proveedorr CHILD OF persona{
    cuit IDENTIFIER 
};

ENTITY empleado CHILD OF persona{
    legajo IDENTIFIER
};

ENTITY factura{
    tipo IDENTIFIER,
    numero,
    fecha,
    total CALCULATED BY 'SUM(linea.subtotal)'
};

RELTIONSHIP atendio{
    factura (1, 1),
    empleado (1, N)
};

RELTIONSHIP compro{
    factura (1, 1),
    persona (1, N)
};

ENTITY linea WEAK OF factura{
    numero IDENTIFIER,
    precio,
    cantidad,
    subtotal CALCULATED BY 'precio * cantidad'
};

ENTITY producto{
    codigo IDENTIFIER,
    descripcion
};

RELTIONSHIP tiene{
    linea (1, 1),
    producto (1, N)
};

RELTIONSHIP provee{
    producto (1, N),
    proveedor (1, N)
}`