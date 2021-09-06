import { parseJson } from "./MyLex";
import assert from "assert";
import { useEffect, useMemo, useRef, useState } from "react";
import "./parser.css";
import { ActionsFunctionsClass } from "./myFunctions";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/keymap/sublime";
import "codemirror/theme/dracula.css";
import { stringExample } from "./example";
import { FindErrors, onInputEditorContentChange } from "./errors";
import _, { initial } from "lodash";
import { DataOfNodes } from "../text";
import React from "react";
/*interface IParserGenerator {
  text: string;
}*/

export const ParserGenerator = ({ changeStateCallback, stateData }: any) => {
	/*const createDataNodes=()=>{
    changeStateCallback();
  }*/
	let action: ActionsFunctionsClass = useMemo(() => new ActionsFunctionsClass(), []);

	//let action:ActionsFunctionsClass=new ActionsFunctionsClass()
	/* console.log(changeStateCallback);
  console.log(nodeData);*/
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

	const [inputEditorMarker, setInputEditorMarker] = useState<any[]>([]);
	// const [texto, setTexto] = useState<string>("COMPOSITE domicilio {ciudad,calle,numero};"
	// +" RELTIONSHIP compro{    factura (1, 1),    persona (1, N)};"
	// +"ENTITY proveedor CHILD OF persona{cuit IDENTIFIER };"
	// +"ENTITY persona COVERAGE (PARTIAL, OVERLAY){documento IDENTIFIER, cuil IDENTIFIER,nacimiento,apellido,nombre,    celular (0,1),   domicilio  }");
	const [texto, setTexto] = useState<string>(stringExample);
	const handleSubmit = (lexAndParseResult: any, instance: CodeMirror.Editor) => {
		try {
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 60 ~ useEffect ~ stateData", stateData);
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 27 ~ handleSubmit ~ ñexAndParseResult.lexErrors.length", lexAndParseResult.lexErrors.length);
			assert.strictEqual(lexAndParseResult.lexErrors.length, 0);
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 29 ~ handleSubmit ~ lexAndParseResult.parseErrors", lexAndParseResult.parseErrors);

			assert.strictEqual(lexAndParseResult.parseErrors.length, 0);
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 32 ~ handleSubmit ~ lexAndParseResult", lexAndParseResult);
		} catch (e) {
			console.log(e);
		}
		if (lexAndParseResult.cst &&(lexAndParseResult?.parseErrors?.length === 0) && (lexAndParseResult?.lexErrors?.length === 0)) {
			const FindRepeatsWords = FindErrors(instance, inputEditorMarker, setInputEditorMarker, lexAndParseResult.cst.children);
			console.log(FindRepeatsWords);
			if (FindRepeatsWords === 0) {
				return lexAndParseResult.cst.children;
			} else {
				return null;
			}
		}

		return null;
	};
	const CreateTree = (children: any, stateData: any,textoo:string) => {
		const result = action.ActionsFunctions(children, stateData);

		if (result) {
			//setState(lexAndParseResult.cst.children);
			changeStateCallback(result,textoo);
		}
	};
	useEffect(() => {
		console.log(inputEditorMarker);
	}, [inputEditorMarker]);

	//{ "arr": [1,2,3], "obj": {"num":666}}
	const handleChange = React.useCallback(
		(instance: CodeMirror.Editor, change: any) => {
			setTexto(instance.getValue())
			const lexAndParseResult = parseJson(instance.getValue());
		    onInputEditorContentChange(instance, inputEditorMarker, setInputEditorMarker, lexAndParseResult);
			const children = handleSubmit(lexAndParseResult, instance);
			if (children) {
				CreateTree(children, stateData,instance.getValue());
			}
		},
		[stateData, inputEditorMarker, handleSubmit]
	);
	const debo = useMemo(() => _.debounce(handleChange, 2000), [handleChange]);

	// const ref = useRef(initialValue)

	return (
		<div className="w-full h-full">
			{/* <textarea
            style={{width:'100%'}}
            value={texto}
            
            onChange={handleChange}
          /> */}
			<CodeMirror
				value={texto}
				onChange={debo}
				options={{
					mode: "text",
					lineNumbers: true,
					theme: "dracula",
					tabSize: 1,
				}}
			/>
			{/* <input type="submit" value="Submit" className="submit-btn"/> */}
		</div>
	);
};
