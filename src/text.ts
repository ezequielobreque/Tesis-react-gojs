export const TextOfNodes=`

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
}
`
export const DataOfNodes:any={
    "nodeDataArray": [
        {
            "key": 1,
            "text": "persona",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "-47.47583758193743 -318.1800043156512",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 2,
            "text": "documento",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "-63.23462664443743 -369.51631681782146"
        },
        {
            "key": 3,
            "text": "cuil",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "-146.7170485194374 -364.0694574406512"
        },
        {
            "key": 4,
            "text": "nacimiento",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "100.21772673210864 -387.1800043156512"
        },
        {
            "key": 5,
            "text": "edad",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "-149.4758375819374 -302.1800043156512"
        },
        {
            "key": 6,
            "text": "apellido",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "49.34740460556258 -248.18000431565122"
        },
        {
            "key": 7,
            "text": "nombre",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "164.3063889805626 -248.18000431565122"
        },
        {
            "key": 8,
            "text": "celular",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 1,
            "width": 15,
            "loc": "-93.47583758193743 -208.1800043156512"
        },
        {
            "key": 9,
            "text": "domicilio",
            "color": "transparent",
            "fig": "Ellipse",
            "group": 1,
            "isGroup": true,
            "loc": "196.37951059967406 -327.1800043156512"
        },
        {
            "key": 10,
            "text": "ciudad",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 9,
            "width": 15,
            "loc": "290.76915903717406 -423.1800043156512"
        },
        {
            "key": 11,
            "text": "calle",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 9,
            "width": 15,
            "loc": "366.51362516960864 -375.1800043156512"
        },
        {
            "key": 12,
            "text": "numero",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 9,
            "width": 15,
            "loc": "196.37951059967406 -257.1800043156513"
        },
        {
            "key": 13,
            "text": "(OVER, PART)",
            "color": "green",
            "type": "A",
            "margin": 5,
            "loc": "215.51362516960864 33.179764502298276",
            "isGroup": true,
            "fig": "TriangleUp",
            "height": 50,
            "width": 150
        },
        {
            "key": 14,
            "text": "proveedor",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "398.37951059967406 175.33528549779209",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 15,
            "text": "cuit",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 14,
            "width": 15,
            "loc": "568.5136251696086 92.13330387201597"
        },
        {
            "key": 16,
            "text": "proveedorr",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "538.4521977560798 152.0625650687513",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 17,
            "text": "cuit",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 16,
            "width": 15,
            "loc": "538.4521977560798 152.0625650687514"
        },
        {
            "key": 18,
            "text": "empleado",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "-120.18667279964832 184.10408203686734",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 19,
            "text": "legajo",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 18,
            "width": 15,
            "loc": "-120.18667279964832 184.10408203686734"
        },
        {
            "key": 20,
            "text": "factura",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "-357.39206162031843 282.1490941198025",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 21,
            "text": "tipo",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 20,
            "width": 15,
            "loc": "-247.3563248737071 213.54446419922732"
        },
        {
            "key": 22,
            "text": "numero",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 20,
            "width": 15,
            "loc": "-267.5824913078184 282.14909411980244"
        },
        {
            "key": 23,
            "text": "fecha",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 20,
            "width": 15,
            "loc": "-357.3920616203183 352.1490941198025"
        },
        {
            "key": 24,
            "text": "total",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 20,
            "width": 15,
            "loc": "-256.6244834953184 352.1490941198025"
        },
        {
            "key": 25,
            "text": "linea",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "-53.66097105848446 301.67365741184767",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 26,
            "text": "numero",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 25,
            "width": 15,
            "loc": "-168.66097105848445 291.9323631953318"
        },
        {
            "key": 27,
            "text": "precio",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 25,
            "width": 15,
            "loc": "60.053872691515465 301.67365741184767"
        },
        {
            "key": 28,
            "text": "cantidad",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 25,
            "width": 15,
            "loc": "-53.66097105848446 371.67365741184767"
        },
        {
            "key": 29,
            "text": "subtotal",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 25,
            "width": 15,
            "loc": "66.38395081651554 371.67365741184767"
        },
        {
            "key": 30,
            "text": "producto",
            "color": "red",
            "type": "A",
            "margin": 8,
            "loc": "224.6170243202763 352.67365741184767",
            "isGroup": true,
            "fig": "RoundedRectangle",
            "height": 50,
            "width": 100
        },
        {
            "key": 31,
            "text": "codigo",
            "margin": 15,
            "type": "H",
            "color": "black",
            "fig": "Ellipse",
            "height": 15,
            "group": 30,
            "width": 15,
            "loc": "203.82774252616275 286.1479556706839"
        },
        {
            "key": 32,
            "text": "descripcion",
            "margin": 15,
            "type": "H",
            "color": "transparent",
            "fig": "Ellipse",
            "height": 15,
            "group": 30,
            "width": 15,
            "loc": "224.6170243202762 426.40934817652965"
        },
        {
            "key": 33,
            "text": "atendio",
            "color": "blue",
            "type": "A",
            "margin": 8,
            "loc": "-231.7676170262865 124.33528549779214",
            "fig": "Diamond",
            "height": 50,
            "width": 100
        },
        {
            "key": 34,
            "text": "compro",
            "color": "blue",
            "type": "A",
            "margin": 8,
            "loc": "-231.76761702628667 -221.29075000399033",
            "fig": "Diamond",
            "height": 50,
            "width": 100
        },
        {
            "key": 35,
            "text": "tiene",
            "color": "blue",
            "type": "A",
            "margin": 8,
            "loc": "114.5136251696087 268.4006475635282",
            "fig": "Diamond",
            "height": 50,
            "width": 100
        },
        {
            "key": 36,
            "text": "provee",
            "color": "blue",
            "type": "A",
            "margin": 8,
            "loc": "279.6094716920177 282.14909411980256",
            "fig": "Diamond",
            "height": 50,
            "width": 100
        }
    ],
    "linkDataArray": [
        {
            "Key": -1,
            "from": 1,
            "routing": "N",
            "to": 2
        },
        {
            "Key": -2,
            "from": 1,
            "routing": "N",
            "to": 3
        },
        {
            "Key": -3,
            "from": 1,
            "routing": "N",
            "to": 4
        },
        {
            "Key": -4,
            "from": 1,
            "routing": "N",
            "to": 5
        },
        {
            "Key": -5,
            "from": 1,
            "routing": "N",
            "to": 6
        },
        {
            "Key": -6,
            "from": 1,
            "routing": "N",
            "to": 7
        },
        {
            "Key": -7,
            "from": 1,
            "routing": "N",
            "text": "(0 , 1)",
            "to": 8
        },
        {
            "Key": -8,
            "from": 9,
            "routing": "N",
            "to": 10
        },
        {
            "Key": -9,
            "from": 9,
            "routing": "N",
            "to": 11
        },
        {
            "Key": -10,
            "from": 9,
            "routing": "N",
            "to": 12
        },
        {
            "Key": -11,
            "from": 1,
            "routing": "N",
            "to": 9
        },
        {
            "Key": -12,
            "from": 13,
            "fromSpot": "Top",
            "to": 1,
            "toSpot": "Bottom"
        },
        {
            "Key": -13,
            "from": 14,
            "routing": "N",
            "to": 15
        },
        {
            "Key": -14,
            "from": 14,
            "fromSpot": "Top",
            "to": 13,
            "toSpot": "Bottom"
        },
        {
            "Key": -15,
            "from": 16,
            "routing": "N",
            "to": 17
        },
        {
            "Key": -16,
            "from": 16,
            "fromSpot": "Top",
            "to": 13,
            "toSpot": "Bottom"
        },
        {
            "Key": -17,
            "from": 18,
            "routing": "N",
            "to": 19
        },
        {
            "Key": -18,
            "from": 18,
            "fromSpot": "Top",
            "to": 13,
            "toSpot": "Bottom"
        },
        {
            "Key": -19,
            "from": 20,
            "routing": "N",
            "to": 21
        },
        {
            "Key": -20,
            "from": 20,
            "routing": "N",
            "to": 22
        },
        {
            "Key": -21,
            "from": 20,
            "routing": "N",
            "to": 23
        },
        {
            "Key": -22,
            "from": 20,
            "routing": "N",
            "to": 24
        },
        {
            "Key": -23,
            "from": 25,
            "routing": "N",
            "to": 26
        },
        {
            "Key": -24,
            "from": 25,
            "routing": "N",
            "to": 27
        },
        {
            "Key": -25,
            "from": 25,
            "routing": "N",
            "to": 28
        },
        {
            "Key": -26,
            "from": 25,
            "routing": "N",
            "to": 29
        },
        {
            "Key": -27,
            "from": 21,
            "routing": "N",
            "to": 26
        },
        {
            "Key": -28,
            "from": 30,
            "routing": "N",
            "to": 31
        },
        {
            "Key": -29,
            "from": 30,
            "routing": "N",
            "to": 32
        },
        {
            "Key": -30,
            "from": 20,
            "routing": "N",
            "text": "(1 , 1)",
            "to": 33
        },
        {
            "Key": -31,
            "from": 18,
            "routing": "N",
            "text": "(1 , N)",
            "to": 33
        },
        {
            "Key": -32,
            "from": 20,
            "routing": "N",
            "text": "(1 , 1)",
            "to": 34
        },
        {
            "Key": -33,
            "from": 1,
            "routing": "N",
            "text": "(1 , N)",
            "to": 34
        },
        {
            "Key": -34,
            "from": 25,
            "routing": "N",
            "text": "(1 , 1)",
            "to": 35
        },
        {
            "Key": -35,
            "from": 30,
            "routing": "N",
            "text": "(1 , N)",
            "to": 35
        },
        {
            "Key": -36,
            "from": 30,
            "routing": "N",
            "text": "(1 , N)",
            "to": 36
        },
        {
            "Key": -37,
            "from": 14,
            "routing": "N",
            "text": "(1 , N)",
            "to": 36
        }
    ],
    "modelData": {
        "canRelink": true
    },
    "selectedData": {
        "key": 36,
        "text": "provee",
        "color": "blue",
        "type": "A",
        "margin": 8,
        "loc": "279.6094716920177 282.14909411980256",
        "fig": "Diamond",
        "height": 50,
        "width": 100
    },
    "skipsDiagramUpdate": true
}