/*
 *  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
 */

import * as go from "gojs";
import { produce } from "immer";
import * as React from "react";

import { DiagramWrapper } from "./components/DiagramWrapper";
import { SelectionInspector } from "./components/SelectionInspector";

import "./App.css";
import { useState } from "react";
import { ParserGenerator } from "./parser/ParserGenerator";
import "./text";
import { DataOfNodes } from "./text";
import { saveAs } from "file-saver";
/**
 * Use a linkDataArray since we'll be using a GraphLinksModel,
 * and modelData for demonstration purposes. Note, though, that
 * both are optional props in ReactDiagram.
 */
interface AppState {
	nodeDataArray: Array<go.ObjectData>;
	linkDataArray: Array<go.ObjectData>;
	modelData: go.ObjectData;
	selectedData: go.ObjectData | null;
	skipsDiagramUpdate: boolean;
}

const App = (props: object) => {
	// Maps to store key -> arr index for quick lookups
	const mapNodeKeyIdx: Map<go.Key, number> = new Map<go.Key, number>();
	const mapLinkKeyIdx: Map<go.Key, number> = new Map<go.Key, number>();

	const IniState = {
		nodeDataArray: [],
		linkDataArray: [
			// { key: -1, from: 0, to: 1, },
			// { key: -2, from: 0, to: 2 },
			// { key: -3, from: 1, to: 1 },
			// { key: -4, from: 2, to: 3 },
			// { key: -5, from: 3, to: 0 }//text: "( T , S )",align: new go.Spot(1, 0, 5, 5),
		],
		modelData: {
			canRelink: true,
		},
		selectedData: null,
		skipsDiagramUpdate: false,
	};
	const example = {
		nodeDataArray: [
			{
				key: 0,
				text: "Entity",
				color: "lightblue",
				fig: "RoundedRectangle",
				loc: "-200 0",
			},
			{
				key: 1,
				text: "Suppliers",
				color: "orange",
				fig: "RoundedRectangle",
				loc: "200 0",
				isGroup: true,
			},
			{
				key: 2,
				text: "Gamma",
				color: "transparent",
				fig: "Diamond",
				margin: 2,
				loc: "0 0",
			},
			//  { key: 3, text: 'Delta', color: 'pink' ,fig:"RoundedRectangle"},
			{
				key: 4,
				type: "H",
				text: "Id",
				margin: 5,
				color: "transparent",
				loc: "200 50",
				group: 1,
				fig: "Ellipse",
				height: 15,
				width: 15,
			},
			{
				key: 5,
				text: "( T , S )",
				color: "Green",
				margin: 0,
				fig: "TriangleUp",
				loc: "0 200",
			},
			{
				key: 6,
				text: "Entity",
				color: "lightblue",
				fig: "RoundedRectangle",
				loc: "0 200",
			},
			{
				key: 7,
				text: "Suppliers",
				color: "orange",
				fig: "RoundedRectangle",
				loc: "-400 200",
			},
			{
				key: 8,
				text: "Suppliers",
				color: "orange",
				fig: "RoundedRectangle",
				loc: "-600 200",
			},
		],
		linkDataArray: [
			// { key: -1, from: 0, to: 1, },
			// { key: -2, from: 0, to: 2 },
			// { key: -3, from: 1, to: 1 },
			// { key: -4, from: 2, to: 3 },
			// { key: -5, from: 3, to: 0 }//text: "( T , S )",align: new go.Spot(1, 0, 5, 5),
			{ Key: -1, from: 0, to: 2, text: "0..N", toText: "1" },
			{ Key: -2, from: 1, to: 2, text: "1", toText: "1" },
			{
				key: -3,
				from: 1,
				to: 4,
				text: "(0,N)",
				arrow: "Standard",
				routing: "N",
			},
			{ Key: -4, from: 0, to: 5, fromSpot: "Bottom", toSpot: "Top" },
			{ Key: -5, from: 5, to: 6, fromSpot: "Bottom", toSpot: "Top" },
			{ key: -6, from: 5, to: 7, fromSpot: "Bottom", toSpot: "Top" },
			{ key: -7, from: 5, to: 8, fromSpot: "Bottom", toSpot: "Top" },
		],
		modelData: {
			canRelink: true,
		},
		selectedData: null,
		skipsDiagramUpdate: false,
	};

	const [state, setState] = useState<any>(DataOfNodes);
	const [textoState, setTextoState] = useState<string>("");
	// init maps
	// bind handler methods

	/**
	 * Update map of node keys to their index in the array.
	 */
	const refreshNodeIndex = (nodeArr: Array<go.ObjectData>) => {
		mapNodeKeyIdx.clear();
		nodeArr.forEach((n: go.ObjectData, idx: number) => {
			mapNodeKeyIdx.set(n.key, idx);
		});
	};

	/**
	 * Update map of link keys to their index in the array.
	 */
	const refreshLinkIndex = (linkArr: Array<go.ObjectData>) => {
		mapLinkKeyIdx.clear();
		linkArr.forEach((l: go.ObjectData, idx: number) => {
			mapLinkKeyIdx.set(l.key, idx);
		});
	};

	/**
	 * Handle any relevant DiagramEvents, in case just selection changes.
	 * On ChangedSelection, find the corresponding data and set the selectedData state.
	 * @param e a GoJS DiagramEvent
	 */
	const handleDiagramEvent = (e: go.DiagramEvent) => {
		const name = e.name;

		switch (name) {
			case "ChangedSelection": {
				const sel = e.subject.first();
				setState(
					produce((draft: AppState) => {
						if (sel) {
							if (sel instanceof go.Node) {
								console.log("cambie");
								const idx = mapNodeKeyIdx.get(sel.key);
								if (idx !== undefined && idx >= 0) {
									const nd = draft.nodeDataArray[idx];

									draft.selectedData = nd;
								}
							} else if (sel instanceof go.Link) {
								const idx = mapLinkKeyIdx.get(sel.key);

								if (idx !== undefined && idx >= 0) {
									const ld = draft.linkDataArray[idx];
									draft.selectedData = ld;
								}
							}
						} else {
							draft.selectedData = null;
						}
					})
				);
				break;
			}
			default:
				break;
		}
	};

	/**
	 * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
	 * method iterates over those changes and updates state to keep in sync with the GoJS model.
	 * @param obj a JSON-formatted string
	 */

	const handleModelChange = (obj: go.IncrementalData) => {
		const insertedNodeKeys = obj.insertedNodeKeys;
		const modifiedNodeData = obj.modifiedNodeData;
		const removedNodeKeys = obj.removedNodeKeys;
		const insertedLinkKeys = obj.insertedLinkKeys;
		const modifiedLinkData = obj.modifiedLinkData;
		const removedLinkKeys = obj.removedLinkKeys;
		const modifiedModelData = obj.modelData;

		// maintain maps of modified data so insertions don't need slow lookups
		const modifiedNodeMap = new Map<go.Key, go.ObjectData>();
		const modifiedLinkMap = new Map<go.Key, go.ObjectData>();
		setState(
			produce((draft: AppState) => {
				let narr = draft.nodeDataArray;

				if (modifiedNodeData) {
					modifiedNodeData.forEach((nd: go.ObjectData) => {
						modifiedNodeMap.set(nd.key, nd);
						const idx = mapNodeKeyIdx.get(nd.key);
						if (idx !== undefined && idx >= 0) {
							narr[idx] = nd;
							if (draft.selectedData && draft.selectedData.key === nd.key) {
								draft.selectedData = nd;
							}
						}
					});
				}
				if (insertedNodeKeys) {
					insertedNodeKeys.forEach((key: go.Key) => {
						const nd = modifiedNodeMap.get(key);
						const idx = mapNodeKeyIdx.get(key);
						if (nd && idx === undefined) {
							// nodes won't be added if they already exist
							mapNodeKeyIdx.set(nd.key, narr.length);
							narr.push(nd);
						}
					});
				}
				if (removedNodeKeys) {
					narr = narr.filter((nd: go.ObjectData) => {
						if (removedNodeKeys.includes(nd.key)) {
							return false;
						}
						return true;
					});
					draft.nodeDataArray = narr;
					refreshNodeIndex(narr);
				}

				let larr = draft.linkDataArray;
				if (modifiedLinkData) {
					modifiedLinkData.forEach((ld: go.ObjectData) => {
						modifiedLinkMap.set(ld.key, ld);
						const idx = mapLinkKeyIdx.get(ld.key);
						if (idx !== undefined && idx >= 0) {
							larr[idx] = ld;
							if (draft.selectedData && draft.selectedData.key === ld.key) {
								draft.selectedData = ld;
							}
						}
					});
				}
				if (insertedLinkKeys) {
					/*insertedLinkKeys.forEach((key: go.Key) => {
            const ld = modifiedLinkMap.get(key);
            const idx = mapLinkKeyIdx.get(key);
            if (ld && idx === undefined) {  // links won't be added if they already exist
              mapLinkKeyIdx.set(ld.key, larr.length);
              larr.push(ld);
            }
          });*/
				}
				if (removedLinkKeys) {
					larr = larr.filter((ld: go.ObjectData) => {
						if (removedLinkKeys.includes(ld.key)) {
							return false;
						}
						return true;
					});
					draft.linkDataArray = larr;
					refreshLinkIndex(larr);
				}
				// handle model data changes, for now just replacing with the supplied object
				if (modifiedModelData) {
					draft.modelData = modifiedModelData;
				}
				draft.skipsDiagramUpdate = true; // the GoJS model already knows about these updates
			})
		);
	};

	/**
	 * Handle inspector changes, and on input field blurs, update node/link data state.
	 * @param path the path to the property being modified
	 * @param value the new value of that property
	 * @param isBlur whether the input event was a blur, indicating the edit is complete
	 */
	const handleInputChange = (path: string, value: string, isBlur: boolean) => {
		setState(
			produce((draft: AppState) => {
				const data = draft.selectedData as go.ObjectData; // only reached if selectedData isn't null
				data[path] = value;
				if (isBlur) {
					const key = data.key;
					if (key < 0) {
						// negative keys are links
						const idx = mapLinkKeyIdx.get(key);
						if (idx !== undefined && idx >= 0) {
							draft.linkDataArray[idx] = data;
							draft.skipsDiagramUpdate = false;
						}
					} else {
						const idx = mapNodeKeyIdx.get(key);
						if (idx !== undefined && idx >= 0) {
							draft.nodeDataArray[idx] = data;
							draft.skipsDiagramUpdate = false;
						}
					}
				}
			})
		);
	};

	/**
	 * Handle changes to the checkbox on whether to allow relinking.
	 * @param e a change event from the checkbox
	 */
	const handleRelinkChange = (e: any) => {
		const target = e.target;
		const value = target.checked;
		setState({
			...state,
			modelData: { canRelink: value },
			skipsDiagramUpdate: false,
		});
	};

	refreshNodeIndex(state.nodeDataArray);
	refreshLinkIndex(state.linkDataArray);
	const changeStateCallback = React.useCallback(async (childData: any,texto:string) => {
		setState(IniState);
		setTimeout(() => {
			refreshNodeIndex(childData.nodeDataArray);
			refreshLinkIndex(childData.linkDataArray);
			setState(childData);
			setTextoState(texto);
		}, 10);
	}, []);
	const guardarTodo = () => {
		const bloc = new Blob([JSON.stringify(state),textoState], { type: "text/plain;charset=utf-8" });
		saveAs(bloc, "myArchivo.txt");
	};
	const selectedData = state.selectedData;
	React.useEffect(() => {
		console.log(state);
	}, [selectedData]);
	let inspector;
	if (selectedData !== null) {
		inspector = <SelectionInspector selectedData={state.selectedData} onInputChange={handleInputChange} />;
	}
	  // Create a reference to the hidden file input element
	  const hiddenFileInput:any = React.useRef(null);
  
	  // Programatically click the hidden file input element
	  // when the Button component is clicked
	  const handleClick = (event: any) => {
		hiddenFileInput.current.click();
	  };
	const readFile=(e:any)=>{
		const file= e.target.files[0];
		const filereader = new FileReader();
		filereader.readAsText(file);
		filereader.onload=()=>{
			console.log(filereader.result)
		}
		filereader.onerror=()=>{
			console.log(filereader.error)
		}
	}

	return (
		<div className="w-screen h-screen">
			<nav className="bg-gray-800 z-50 w-full flex p-2 gap-8">
				<div className="text-gray-200 text-2xl"> BDD </div>
				<button
					className="bg-red-500 shadow-md hover:bg-red-700 
				text-white text-center py-1 px-4 rounded-full"
				>
					Nuevo
				</button>
				<input type="file"
				name="Importar"
				onChange={readFile}
				ref={hiddenFileInput}
				multiple={false}
					className="hidden"
				/>
				<button
					onClick={handleClick}
					className="bg-blue-500 shadow-md hover:bg-blue-700 
				text-white text-center py-1 px-4 rounded-full"
				>
					Importar
				</button>
				<button
					onClick={guardarTodo}
					className="bg-green-500 shadow-md hover:bg-green-700 
				text-white text-center py-1 px-4 rounded-full"
				>
					Guardar
				</button>
			</nav>
			<div className="relative" style={{ height: "97vh", width: "100vw" }}>
				<div className="absolute z-10" style={{ height: "100%", width: "25%" }}>
					<ParserGenerator changeStateCallback={changeStateCallback} stateData={state} />
				</div>
				<div className="w-full h-full">
					<DiagramWrapper
						nodeDataArray={state.nodeDataArray}
						linkDataArray={state.linkDataArray}
						modelData={state.modelData}
						skipsDiagramUpdate={state.skipsDiagramUpdate}
						onDiagramEvent={handleDiagramEvent}
						onModelChange={handleModelChange}
					/>
				</div>

				{/* <label>
          Allow Relinking?
          <input
            type="checkbox"
            id="relink"
            checked={state.modelData.canRelink}
            onChange={handleRelinkChange}
          />
        </label> */}
				{inspector}
			</div>
		</div>
	);
};

export default App;
