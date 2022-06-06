import { faArrowLeft, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const MainHelp = () => {
	const informacion = ["Entidades", "Atributos", "Interrelaciones", "Herencia"];
	const [openInfo, setopenInfo] = useState("");

	const Back = () => {
		return (
			<div>
				<button
					onClick={() => {
						setopenInfo("");
					}}
					className="border-gray-200 rounded-md border-2 p-1"
				>
					<FontAwesomeIcon icon={faArrowLeft} /> VOLVER
				</button>
			</div>
		);
	};
	const informationOfHelp = (elemento: any) => {
		switch (elemento) {
			case "Entidades":
				return (
					<div>
						<Back />
						<div className="text-2xl text-center py-2">Entidades</div>
						<div className="py-2">Las entidades representan clases de objetos de la realidad</div>
						<div className="py-2">El siguiente es un ejemplo de la entidad Producto con </div>
						<div className="py-2 whitespace-pre-line">
							{`ENTITY producto{
							codigo IDENTIFIER,
							descripcion
							}`}
						</div>
					</div>
				);
			case "Interrelaciones":
				return (
					<div>
						<Back />
						<div className="text-2xl text-center py-2">Interrelaciones</div>
						<div className="py-2">Las interrelaciones representan agregaciones de dos o más entidades</div>
						<div className="py-2">El siguiente es un ejemplo de una relacion entre producto y linea </div>
						<div className="py-2 whitespace-pre-line">
							{`ENTITY producto{
							codigo IDENTIFIER,
							descripcion
							}
							RELATIONSHIP tiene{
								linea (1, 1),
								producto (1, N)
							};
							ENTITY linea{
								numero IDENTIFIER,
								precio,
								cantidad,
								subtotal CALCULATED BY 'precio * cantidad'
							};							
							`}
						</div>
					</div>
				);
			case "Atributos":
				return (
					<div>
						<Back />
						<div className="text-2xl text-center py-2">Atributos</div>
						<div className="py-2">representan las propiedades básicas de las entidades o interrelaciones</div>
						<div className="py-2">El siguiente es un ejemplo de persona con atributos simples calculados y compuestos</div>
						<div className="py-2 whitespace-pre-line">
							{`
							COMPOSITE domicilio{
								ciudad,
								calle,
								numero
							};
                            ENTITY persona{
                                documento IDENTIFIER,
                                cuil IDENTIFIER,
                                nacimiento,
                                edad CALCULATED BY 'HOY - nacimiento',
                                nombre,
                                celular (0,1),
                                domicilio
                            };
                            `}
						</div>
					</div>
				);
			case "Herencia":
				return (
					<div>
						<Back />
						<div className="text-2xl text-center py-2">Herencia</div>
						<div className="py-2">Una abstracción de generalización establece una correspondencia entre la clase genérica "(raíz)" y las clases subconjunto.</div>
						<div className="py-2">El siguiente es un ejemplo de herencia para la clase persona.</div>
						<div className="py-2 whitespace-pre-line">
							{`
                            ENTITY persona COVERAGE (PARTIAL, OVERLAPPING){
                                documento IDENTIFIER,
                                cuil IDENTIFIER,
                                nacimiento,
                                edad CALCULATED BY 'HOY - nacimiento',
                                nombre,
                                celular (0,1),
                                domicilio
                            };
                            
                            ENTITY proveedor CHILD OF persona{
                                cuit IDENTIFIER 
                            };
                            ENTITY proveedorer CHILD OF persona{
                                cuit IDENTIFIER 
                            };
                            `}
						</div>
					</div>
				);

			default:
				break;
		}
	};
	return (
		<div className="w-full">
			{!!!openInfo &&
				informacion.map((element) => (
					<div
						className="text-2xl text-gray-200 py-2 px-4 cursor-pointer"
						key={element}
						onClick={() => {
							setopenInfo(element);
						}}
					>
						<div>{element}</div>
					</div>
				))}
			{!!openInfo && <div className="text-gray-200 p-2">{informationOfHelp(openInfo)}</div>}
		</div>
	);
};
