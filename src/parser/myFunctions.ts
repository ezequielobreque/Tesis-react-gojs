import CodeMirror from "codemirror";
import * as go from "gojs";
import _, { xor } from "lodash";
import { type } from "os";
import { Children } from "react";
import { Children6, Children9, Composite, Entity, PropertyEntity, Relation, Relationship, RootObject } from "./IParse";
interface ArrayOfComposites {
	nombre: string;
	atributes: string[];
}

interface EntidadVisualisacion {
	key: number;
	nombre: string;
	parent: number | null;
	atributes: AtributesVisualisacion[];
}
interface CompositeVisualisacion {
	atributes: AtributesVisualisacion[];
}
interface AtributesVisualisacion {
	key: number;
	nombre: string;
	identity: boolean;
	composite?: CompositeVisualisacion;
}
interface LinkVisualisacion {
	key: number;
	from: number;
	to: number;
}

interface VisualisacionDeNodos {
	Entities: EntidadVisualisacion[];
	links: LinkVisualisacion[];
}
interface InitialStateOfData {
	nodeDataArray: INodeDataArray[];
	linkDataArray: IlinkDataArray[];
	modelData: object;
	selectedData: any;
	skipsDiagramUpdate: boolean;
}
interface INodeDataArray {
	key: number;
	text: string;
	color: string;
	type?: string;
	group?: number;
	isGroup?: boolean;
	margin?: number;
	loc?: string;
	fig?: string;
	height?: number;
	width?: number;
}
interface IlinkDataArray {
	Key: number;
	from: number;
	to: number;
	//arrow?: string;
	routing?: string;
	text?: string;
	//toText?: string;
	fromSpot?: string;
	toSpot?: string;
	align?: object;
}

export class ActionsFunctionsClass {
	Keys = 0;
	KeysLink = 0;
	location = { H: 0, W: 0 };
	stateData: InitialStateOfData = undefined as any;

	totalLocation = 0;
	arrayOfComposites: ArrayOfComposites[] = [];
	FinalDataNodes: InitialStateOfData = this.initialData();
	ArrayOfNodes: VisualisacionDeNodos = {
		Entities: [],
		links: [],
	};

	constructor() {}

	GetLocation = () => {};
	getAnCompositeOnArray(data: string) {
		let returnData;
		returnData = this.arrayOfComposites.find((element) => element.nombre === data);
		return returnData;
	}
	TotalLocation = (number: number) => {
		this.totalLocation = number * 200;
	};
	GetKey = (): number => {
		return (this.Keys = this.Keys + 1);
	};
	GetKeyForLink = (): number => {
		return (this.KeysLink = this.KeysLink + -1);
	};

	initialData() {
		return (this.FinalDataNodes = {
			nodeDataArray: [],
			linkDataArray: [],
			modelData: {
				canRelink: true,
			},
			selectedData: true,
			skipsDiagramUpdate: false,
		});
	}

	createNodeGo = (node: INodeDataArray) => {
		return {
			key: node.key,
			text: node.text,
			color: node.color,
			type: node.type || "A",
			margin: node.margin || 8,
			loc: node.loc,
			isGroup: node.isGroup || undefined,
			fig: node.fig || "RoundedRectangle",
			height: node.height || 50,
			width: node.width || 100,
		};
	};
	handleChild = (data: Children9) => {};
	handleCoverage = (data: Children9) => {};
	handleWeak = (data: Children9, key: number) => {
		const entiNode = this.ArrayOfNodes.Entities.find((x) => x.key == key);
		const atributeNode = entiNode?.atributes?.find((x) => x.identity === true);
		const entiNumber = this.searchEntityNodeInArrayOfNodes(data.Weak![0].children.StringEntity[0].image) as number;
		const enti = this.ArrayOfNodes.Entities.find((x) => x.key == entiNumber);
		const atribute = enti?.atributes?.find((x) => x.identity === true);
		//console.log(enti);
		this.FinalDataNodes.linkDataArray.push(
			this.createPropertiesGo({
				Key: this.GetKeyForLink(),
				to: atributeNode?.key!,
				from: atribute?.key!,
				//arrow: "Standard",
				routing: "N",
			})
		);
	};

	createPropertiesGo(data: IlinkDataArray): IlinkDataArray {
		return {
			Key: data.Key,
			align: data.align || undefined,
			//arrow: data.arrow || undefined,
			from: data.from,
			routing: data.routing || undefined,
			fromSpot: data.fromSpot || undefined,
			text: data.text || undefined,
			// toText: data.toText || undefined
			to: data.to,
			toSpot: data.toSpot || undefined,
		};
	}
	handlePropertiesOfComposite(data: string, key: number) {
		let c: INodeDataArray = {
			key: this.GetKey(),
			text: data,
			margin: 15,
			type: "H",
			color: "transparent",
			fig: "Ellipse",
			height: 15,
			group: key,
			width: 15,
		};
		this.FinalDataNodes.nodeDataArray.push(c);
		this.FinalDataNodes.linkDataArray.push(
			this.createPropertiesGo({
				Key: this.GetKeyForLink(),
				to: c.key,
				from: key,
				//arrow: "Standard",
				routing: "N",
			})
		);
	}

	handleProperties(data: PropertyEntity[], key: number) {
		console.log(data);
		if (data) {
			data.map((x) => {
				let c: INodeDataArray = {
					key: this.GetKey(),
					text: x.children.StringEntity[0].image,
					margin: 15,
					type: "H",
					color: x.children.IDENTIFIER ? "black" : "transparent",
					fig: "Ellipse",
					height: 15,
					group: key,
					width: 15,
				};
				// const resultado = this.nodeIsExistinInPropertyOfNode(c, this.FinalDataNodes);

				// if (resultado) {
				// 	console.log(resultado);
				// 	console.log(c);
				// 	c.loc = resultado.loc;
				// }
				const compositeInfo = this.getAnCompositeOnArray(c.text);
				if (compositeInfo !== undefined) {
					c.margin = undefined;
					c.type = undefined;
					c.isGroup = true;
					c.height = undefined;
					c.width = undefined;
				}
				this.FinalDataNodes.nodeDataArray.push(c);
				if (compositeInfo) {
					compositeInfo.atributes.map((element) => {
						this.handlePropertiesOfComposite(element, c.key);
					});
				}
				let enti = this.ArrayOfNodes.Entities.find((x) => x.key == key);
				enti!.atributes.push({
					key: c.key,
					nombre: c.text,
					identity: x.children.IDENTIFIER ? true : false,
				});
				this.FinalDataNodes.linkDataArray.push(
					this.createPropertiesGo({
						Key: this.GetKeyForLink(),
						to: c.key,
						from: key,
						//arrow: "Standard",
						routing: "N",
						text: this.handleCardinality(x.children),
					})
				);
			});
		}
	}
	handleCardinality(child: Children6): string | undefined {
		if (child.Manys) {
			return `(${child.Manys[0].children.RelationNumber[0].image} , ${child.Manys[0].children.RelationNumber[1].image})`;
		}
		return undefined;
	}

	handleRelations(data: Relation[], key: number) {
		data.map((x) => {
			const linking: IlinkDataArray = {
				Key: this.GetKeyForLink(),
				to: key,
				from: this.searchEntityNodeInArrayOfNodes(x.children.StringEntity[0].image) as number,
				routing: "N",
				text: `(${x.children.RelationNumber[0].image} , ${x.children.RelationNumber[1].image})`,
				//toText: ,
			};
			this.FinalDataNodes.linkDataArray.push(this.createPropertiesGo(linking));
			this.ArrayOfNodes.links.push({
				key: linking.Key,
				to: key,
				from: this.searchEntityNodeInArrayOfNodes(x.children.StringEntity[0].image) as number,
			});
		});
	}
	searchEntityNodeInArrayOfNodes = (buscar: string) => {
		const entity = this.ArrayOfNodes.Entities.find((x) => x.nombre == buscar);
		return entity?.key;
	};
	searchParentNodeInArrayOfNodes = (buscar: string) => {
		const search = this.searchEntityNodeInArrayOfNodes(buscar);
		const entity = this.ArrayOfNodes.Entities.find((x) => x.parent == search);
		return entity?.key;
	};
	createTriangle(parent: number, coverage: string) {
		let x: INodeDataArray | null = {
			key: this.GetKey(),
			text: coverage,
			color: "green",
			isGroup: true,
			height: 50,
			width: 150,
			type: "A",
			margin: 5,
			fig: "TriangleUp",
		};
		//creo el nodo padre para despues darle sus propiedades que tambien van a ser nodos hijos
		// const resultado = this.nodeIsExistinInDataNode(x, this.FinalDataNodes);

		// if (resultado) {
		// 	x.loc = resultado.loc;
		// }
		this.FinalDataNodes.nodeDataArray.push(this.createNodeGo(x));
		this.ArrayOfNodes.Entities.push({
			key: x.key,
			nombre: x.text,
			parent: parent,
			atributes: [],
		});
		return x;
	}
	entityAction = (entities: Entity) => {
		let x: INodeDataArray | null = null;
		if (entities.children) {
			x = {
				key: this.GetKey(),
				text: entities.children.StringEntity[0].image,
				color: "red",
				isGroup: true,
			};
			// const resultado = this.nodeIsExistinInDataNode(x, this.FinalDataNodes);
			// if (resultado) {
			// 	x.loc = resultado.loc;
			// }
			this.FinalDataNodes.nodeDataArray.push(this.createNodeGo(x));

			this.ArrayOfNodes.Entities.push({
				key: x.key,
				nombre: x.text,
				parent: null,
				atributes: [],
			});

			if (x !== null) {
				//nnodos hijos del nodo padre x
				this.handleProperties(entities?.children?.PropertyEntity, x!.key);
			}
			if (entities.children.Coverage) {
				const triangle = this.createTriangle(
					x.key,
					`(${entities.children.Coverage[0].children.COVERTURA[0].image.substring(0, 4)}, ${entities.children.Coverage[0].children.JERARQUIA[0].image.substring(0, 4)})`
				);
				const linkToChildren: IlinkDataArray = {
					Key: this.GetKeyForLink(),
					to: x.key,
					from: triangle.key,
					fromSpot: "Top",
					toSpot: "Bottom",
				};
				this.FinalDataNodes.linkDataArray.push(this.createPropertiesGo(linkToChildren));
			}
			if (entities.children.Child) {
				const linkingToParent: IlinkDataArray = {
					Key: this.GetKeyForLink(),
					to: this.searchParentNodeInArrayOfNodes(entities.children.Child[0].children.StringEntity[0].image) as number,
					from: x.key,
					fromSpot: "Top",
					toSpot: "Bottom",
				};
				this.FinalDataNodes.linkDataArray.push(this.createPropertiesGo(linkingToParent));
			} else if (entities.children.Coverage) {
				//  this.handleCoverage(entities.children);
			} else if (entities.children.Weak) {
				this.handleWeak(entities.children, x.key);
			}
		}
	};

	RelationshipAction = (relationship: Relationship) => {
		let x: INodeDataArray | null = null;
		if (relationship.children) {
			x = {
				key: this.GetKey(),
				text: relationship.children.StringEntity[0].image,
				color: "blue",
				fig: "Diamond",
			};
			// const resultado = this.nodeIsExistinInDataNode(x, this.FinalDataNodes);
			// if (resultado) {
			// 	x.loc = resultado.loc;
			// }
			this.FinalDataNodes.nodeDataArray.push(this.createNodeGo(x));
		}
		if (relationship.children && x !== null) {
			this.handleRelations(relationship.children.Relation, x!.key);
		}
	};

	compositeAction = (datos: Composite) => {
		const variables = datos.children.Propierties.map((x) => {
			return x.children.StringEntity[0].image;
		});
		if (variables) {
			const variable: ArrayOfComposites = {
				nombre: datos.children.StringEntity[0].image,
				atributes: variables,
			};
			this.arrayOfComposites.push(variable);
		}
	};
	addNodeData = () => {};
	// nodeIsExistinInDataNode(node: INodeDataArray, finalDataNodes: InitialStateOfData) {
	// 	if (this.stateData) {
	// 		const resul = this.stateData.nodeDataArray.find((f) => node.text === f.text || node.key === f.key);
	// 		_.remove(this.stateData.nodeDataArray, (x) => x.key === resul?.key);
	// 		if (resul) {
	// 			return resul;
	// 		}
	// 	}
	// 	return false;
	// }
	nodeIsExistinInDataNode() {
		if (this.stateData) {
			if (this.stateData?.nodeDataArray?.length == this.FinalDataNodes?.nodeDataArray?.length) {
				this.FinalDataNodes.nodeDataArray.map((nodoNuevo) => {
					const nodoViejo = this.stateData.nodeDataArray.find((x) => nodoNuevo.text == x.text);
					if (nodoViejo) {
						nodoNuevo.loc = nodoViejo.loc;

						_.remove(this.stateData.nodeDataArray, (f) => f.key === nodoViejo.key);
					}
				});
				this.FinalDataNodes.nodeDataArray.map((nodoNuevo) => {
					if (nodoNuevo.loc === undefined) {
						const nodoViejo = this.stateData.nodeDataArray.splice(0, 1);
						nodoNuevo.loc = nodoViejo?.[0]?.loc;
					}
				});
			} else if (this.stateData.nodeDataArray.length > this.FinalDataNodes.nodeDataArray.length) {
				this.FinalDataNodes.nodeDataArray.map((nodoNuevo) => {
					const nodoViejo = this.stateData.nodeDataArray.find((x) => nodoNuevo.text == x.text);
					if (nodoViejo) {
						nodoNuevo.loc = nodoViejo.loc;

						_.remove(this.stateData.nodeDataArray, (f) => f.key === nodoViejo.key);
					}
				});
			} else if (this.stateData.nodeDataArray.length < this.FinalDataNodes.nodeDataArray.length) {
				this.FinalDataNodes.nodeDataArray.map((nodoNuevo) => {
					const nodoViejo = this.stateData.nodeDataArray.find((x) => nodoNuevo.text == x.text);
					if (nodoViejo) {
						nodoNuevo.loc = nodoViejo.loc;

						_.remove(this.stateData.nodeDataArray, (f) => f.key === nodoViejo.key);
					}
				});
			}
		}
	}
	// nodeIsExistinInPropertyOfNode(node: INodeDataArray, finalDataNodes: InitialStateOfData) {
	// 	if (this.stateData) {
	// 		const resul = this.stateData.nodeDataArray.find((f) => node.text === f.text || node.key === f.key);
	// 		_.remove(this.stateData.nodeDataArray, (x) => x.key === resul?.key);
	// 		if (resul) {
	// 			return resul;
	// 		}
	// 	}
	// 	return false;
	// }
	// relationIsExistinInOfRelations(node: IlinkDataArray, finalDataNodes: InitialStateOfData) {
	// 	const result = finalDataNodes.linkDataArray.some((f) => (node.Key === f.Key || node.text === f.text) && node.from === f.from && node.to === f.to);
	// 	if (result) {
	// 		return result;
	// 	}
	// 	return false;
	// }

	ActionsFunctions(x: any, stateData: any) {
		console.log("🚀 ~ file: myFunctions.ts ~ line 418 ~ ActionsFunctionsClass ~ ActionsFunctions ~ stateData", stateData);
		this.FinalDataNodes = this.initialData();

		this.stateData = JSON.parse(JSON.stringify(stateData));

		this.Keys = 0;
		this.KeysLink = 0;
		this.totalLocation = 0;
		this.arrayOfComposites = [];
		//this.initialData();
		// const resul = this.stateData.nodeDataArray.find((f) => f.group! > 0 && f.isGroup === true);
		// if (resul) {
		// 	_.remove(this.stateData.nodeDataArray, (x) => x.group === resul.key);
		// }
		this.ArrayOfNodes = {
			Entities: [],
			links: [],
		};
		if (x) {
			const data: RootObject = x;

			let Entity = data.Entity;
			const Relationship = data.Relationship || [];
			const Composite = data.Composite || [];
			Composite?.map((x: Composite) => {
				this.compositeAction(x);
			});
			Entity?.map((x: Entity) => {
				this.entityAction(x);
			});
			Relationship?.map((x: Relationship) => {
				this.RelationshipAction(x);
			});
		}
		this.nodeIsExistinInDataNode();
		//console.log(this.FinalDataNodes);
		return this.FinalDataNodes;
	}
}
