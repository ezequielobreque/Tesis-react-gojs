import { parseJson } from "./MyLex";
import assert from "assert";
import { useEffect, useState } from "react";
import './parser.css';
import {ActionsFunctions} from './myFunctions'
import {stringExample} from './example'
/*interface IParserGenerator {
  text: string;
}*/

export const ParserGenerator = ({changeStateCallback}:any) => {
  
  /*const createDataNodes=()=>{
    changeStateCallback();
  }*/
  const [state, setState] = useState<any>();
  // const [texto, setTexto] = useState<string>("COMPOSITE domicilio {ciudad,calle,numero};"
  // +" RELTIONSHIP compro{    factura (1, 1),    persona (1, N)};"
  // +"ENTITY proveedor CHILD OF persona{cuit IDENTIFIER };"
  // +"ENTITY persona COVERAGE (PARTIAL, OVERLAY){documento IDENTIFIER, cuil IDENTIFIER,nacimiento,apellido,nombre,    celular (0,1),   domicilio  }");
  const [texto, setTexto] = useState<string>(stringExample)

//{ "arr": [1,2,3], "obj": {"num":666}}
  const handleChange=(event:any)=>{
    setTexto( event.target.value);
  }
  useEffect(() => {
    console.log(state)
  }, [state])

 
  const handleSubmit = (event:any) => {
    event.preventDefault();
    
    
    const lexAndParseResult = parseJson(texto);
    try{
    console.log("🚀 ~ file: ParserGenerator.tsx ~ line 27 ~ handleSubmit ~ ñexAndParseResult.lexErrors.length", lexAndParseResult.lexErrors.length)
    assert.strictEqual(lexAndParseResult.lexErrors.length, 0);
    console.log("🚀 ~ file: ParserGenerator.tsx ~ line 29 ~ handleSubmit ~ lexAndParseResult.parseErrors", lexAndParseResult.parseErrors)
    
    assert.strictEqual(lexAndParseResult.parseErrors.length, 0);
    console.log("🚀 ~ file: ParserGenerator.tsx ~ line 32 ~ handleSubmit ~ lexAndParseResult", lexAndParseResult)
    }
    catch(e){
    console.log(e);
    }
    if(lexAndParseResult.cst){
     setState( lexAndParseResult.cst.children);
     ActionsFunctions(lexAndParseResult.cst.children)
    }
    
   
  };
  return (
    <div> 
      <label className="col-12">
        Name:
    
      </label>
      <form  className="parser-div" onSubmit={handleSubmit}>
       
          <textarea
            style={{width:'100%'}}
            value={texto}
            onChange={handleChange}
          />
        <input type="submit" value="Submit" className="submit-btn"/>
      </form>
    </div>
  );
};
