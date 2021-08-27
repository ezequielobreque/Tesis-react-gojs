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
import _ from "lodash";
/*interface IParserGenerator {
  text: string;
}*/

export const ParserGenerator = ({ changeStateCallback, nodeData }: any) => {
	/*const createDataNodes=()=>{
    changeStateCallback();
  }*/
	let action: ActionsFunctionsClass = useMemo(() => new ActionsFunctionsClass(), []);

	//let action:ActionsFunctionsClass=new ActionsFunctionsClass()
	/* console.log(changeStateCallback);
  console.log(nodeData);*/
	const [state, setState] = useState<any>();
	const [stateResult, setStateResult] = useState<any>();
	const [inputEditorMarker, setInputEditorMarker] = useState<any[]>([]);
	// const [texto, setTexto] = useState<string>("COMPOSITE domicilio {ciudad,calle,numero};"
	// +" RELTIONSHIP compro{    factura (1, 1),    persona (1, N)};"
	// +"ENTITY proveedor CHILD OF persona{cuit IDENTIFIER };"
	// +"ENTITY persona COVERAGE (PARTIAL, OVERLAY){documento IDENTIFIER, cuil IDENTIFIER,nacimiento,apellido,nombre,    celular (0,1),   domicilio  }");
	const [texto, setTexto] = useState<string>(stringExample);
	const handleSubmit = (lexAndParseResult: any, instance: CodeMirror.Editor) => {
		try {
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 27 ~ handleSubmit ~ ñexAndParseResult.lexErrors.length", lexAndParseResult.lexErrors.length);
			assert.strictEqual(lexAndParseResult.lexErrors.length, 0);
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 29 ~ handleSubmit ~ lexAndParseResult.parseErrors", lexAndParseResult.parseErrors);

			assert.strictEqual(lexAndParseResult.parseErrors.length, 0);
			console.log("🚀 ~ file: ParserGenerator.tsx ~ line 32 ~ handleSubmit ~ lexAndParseResult", lexAndParseResult);
		} catch (e) {
			console.log(e);
		}
		if (lexAndParseResult.cst) {
			const FindRepeatsWords = FindErrors(instance, inputEditorMarker, setInputEditorMarker, lexAndParseResult.cst.children);
			if (FindRepeatsWords===0) {
				const result = action.ActionsFunctions(lexAndParseResult.cst.children);
				if (result) {
					//setState(lexAndParseResult.cst.children);
					setStateResult(result);
				}
			}
		}
	};

	const debo = useRef(_.debounce(handleSubmit, 2000));
	//{ "arr": [1,2,3], "obj": {"num":666}}
	const handleChange = (instance: CodeMirror.Editor, change: any) => {
		const lexAndParseResult = parseJson(instance.getValue());
		onInputEditorContentChange(instance, inputEditorMarker, setInputEditorMarker, lexAndParseResult);
		debo.current(lexAndParseResult, instance);
	};
	useEffect(() => {
		if (stateResult) {
			changeStateCallback(stateResult);
		}
	}, [stateResult]);
	// const ref = useRef(initialValue)

	return (
		<div>
			<label className="col-12">Name:</label>
			<div className="parser-div">
				{/* <textarea
            style={{width:'100%'}}
            value={texto}
            
            onChange={handleChange}
          /> */}
				<CodeMirror
					value={texto}
					onChange={handleChange}
					options={{
						mode: "text",
						lineNumbers: true,
						theme: "dracula",
						tabSize: 1,
					}}
				/>
				{/* <input type="submit" value="Submit" className="submit-btn"/> */}
			</div>
		</div>
	);
};
