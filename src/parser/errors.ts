import _ from "lodash";
import { Children6, Children9, Composite, Entity, PropertyEntity, Relation, Relationship, RootObject } from "./IParse";
export function markInputErrors(lexErrors: any, parseErrors: any, inputEditor: any, inputEditorMark: any[], setInputMarket: any) {
	try {
		var start, end, marker;
		let inputEditorMarkers: any[] = inputEditorMark;
		_.forEach(inputEditorMarkers, function (currMarker) {
			currMarker.clear();
		});
		inputEditorMarkers = [];
		_.forEach(lexErrors, function (currLexError) {
			start = { line: currLexError.line - 1, ch: currLexError.column - 1 };
			end = {
				line: currLexError.line - 1,
				ch: currLexError.column - 1 + currLexError.length,
			};
			marker = inputEditor.markText(start, end, {
				className: "markTextError",
				title: currLexError.message,
			});
			inputEditorMarkers.push(marker);
		});
		_.forEach(parseErrors, function (currParserError) {
			if (!isNaN(currParserError.token.startLine) 
			&& !isNaN(currParserError.token.startOffset) 
			&& !isNaN(currParserError.token.endOffset) 
			&& !isNaN(currParserError.token.endLine)){
				start = {
					line: currParserError.token.startLine - 1,
					ch: currParserError.token.startColumn - 1,
				};

			var lastToken = currParserError.token;
			if (!_.isEmpty(currParserError.resyncedTokens)) {
				const x: any = _.max(currParserError.resyncedTokens);
				lastToken = x.startOffset;
			}

			end = {
				line: lastToken.endLine
					? lastToken.endLine - 1
					: // assume startLine === endLine if we endLine is not tracked
					  lastToken.startLine - 1,
				ch: lastToken.endColumn
					? lastToken.endColumn
					: // compute the endColumn ourselves
					  lastToken.startColumn + lastToken.image.length,
			};
			marker = inputEditor.markText(start, end, {
				className: "markTextError",
				title: currParserError?.message,
			});

			inputEditorMarkers.push(marker);
		}
		});

		//console.log(inputEditorMarkers);
		setInputMarket(inputEditorMarkers);
	} catch (e) {
		console.log(e);
	}
}
//inputEditor.on("change", _.debounce(onInputEditorContentChange, 250))
export function onInputEditorContentChange(inputEditor: any, inputEditorMarkers: any, setInputMarket: any, lex: any) {
	var parseResult, printResult;

	// function lex(text) {
	//     var lexResult = lexer.tokenize(text)
	//     return lexResult
	// }

	// function parse(lexResult, startRuleName) {
	//     parser.reset()
	//     parser.input = lexResult.tokens
	//     var value = parser[startRuleName]()
	//     return {value: value, parseErrors: parser.errors}
	// }

	// parserOutput.setValue("")
	// var lexResult = lex(inputEditor.getValue())
	// may be falsy if the example is for the lexer only

	markInputErrors(lex.lexErrors, lex.parseErrors, inputEditor, inputEditorMarkers, setInputMarket);
}
export function FindErrors(codemirror: any, inputEditorMark: any[], setInputMarket: any, datafind: any) {
	let inputEditorMarkers: any[] = inputEditorMark;
	_.forEach(inputEditorMarkers, function (currMarker) {
		currMarker.clear();
	});
	inputEditorMarkers = [];
	const data: RootObject = datafind;
	console.log(data);
	let Entity = data.Entity;
	const Relationship = data.Relationship || [];
	const Composite = data.Composite || [];
	let mapOfObjects = new Map<string, object>();
	let mapOfRepeatsObjects = new Map<string, object>();
	let repeat = 0;
	Composite?.map((x: Composite) => {
		if (mapOfObjects.has(x.children.StringEntity[0].image)) {
			mapOfRepeatsObjects.set(x.children.StringEntity[0].image, x);
		} else {
			mapOfObjects.set(x.children.StringEntity[0].image, x);
		}
	});
	Entity?.map((x: Entity) => {
		if (mapOfObjects.has(x.children.StringEntity[0].image)) {
			mapOfRepeatsObjects.set(x.children.StringEntity[0].image, x);
		} else {
			mapOfObjects.set(x.children.StringEntity[0].image, x);
		}
	});
	Relationship?.map((x: Relationship) => {
		if (mapOfObjects.has(x.children.StringEntity[0].image)) {
			mapOfRepeatsObjects.set(x.children.StringEntity[0].image, x);
		} else {
			mapOfObjects.set(x.children.StringEntity[0].image, x);
		}
	});
	mapOfRepeatsObjects?.forEach((x: any) => {
		repeat = repeat + 1;
		const start = {
			line: x.children.StringEntity[0].startLine - 1,
			ch: x.children.StringEntity[0].startColumn - 1,
		};

		const end = {
			line: x.children.StringEntity[0].endLine - 1,
			ch: x.children.StringEntity[0].endColumn,
		};

		const marker = codemirror.markText(start, end, {
			className: "markTextError",
			title: "Elemento repetido",
		});
		inputEditorMarkers.push(marker);
	});

	setInputMarket(inputEditorMarkers);
	return repeat;
}
