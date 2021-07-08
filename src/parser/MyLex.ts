import { createToken, Lexer, CstParser } from "chevrotain"

const True = createToken({ name: "True", pattern: /true/ })
const False = createToken({ name: "False", pattern: /false/ })
// const Null = createToken({ name: "Null", pattern: /null/ })
const LCurly = createToken({ name: "LCurly", pattern: /{/ })
const RCurly = createToken({ name: "RCurly", pattern: /}/ })
const LSquare = createToken({ name: "LSquare", pattern: /\[/ })
const RSquare = createToken({ name: "RSquare", pattern: /]/ })
const LRound = createToken({ name: "LRound", pattern: /\(/ })
const RRound = createToken({ name: "RRound", pattern: /\)/ })
const Comma = createToken({ name: "Comma", pattern: /,/ })
const Colon = createToken({ name: "Colon", pattern: /:/ })
const SemiColon = createToken({ name: "SemiColon", pattern: /;/ })
const ENTITY = createToken({ name: "ENTITY", pattern: /ENTITY/ })
const COVERAGE = createToken({ name: "COVERAGE", pattern: /COVERAGE/ })
const CHILD = createToken({ name: "CHILD", pattern: /CHILD/ })
const COMPOSITE = createToken({ name: "COMPOSITE", pattern: /COMPOSITE/ })
const WEAK = createToken({ name: "WEAK", pattern: /WEAK/ })
const RELTIONSHIP = createToken({ name: "RELTIONSHIP", pattern: /RELTIONSHIP/ })
const CALCULATED = createToken({ name: "CALCULATED", pattern: /CALCULATED/ })

const IDENTIFIER = createToken({ name: "IDENTIFIER", pattern: /IDENTIFIER/ })
const BY = createToken({ name: "BY", pattern: /BY/ })

// const StringLiteral = createToken({
//   name: "StringLiteral",
//   pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
// })
const StringEntity = createToken({
  name: "StringEntity",
  pattern: /[a-zA-Z]\w*/
})
const sqlExpretion = createToken({
  name: "sqlExpretion",
  pattern: /'.*?'/
})
// const NumberLiteral = createToken({
//   name: "NumberLiteral",
//   pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
// })

const RelationNumber = createToken({
  name: "RelationNumber",
  pattern: /0|1|\bn\b|\bN\b/
})
const JERARQUIA = createToken({
  name: "JERARQUIA",
  pattern: /\bTOTAL\b|\bPARTIAL\b/
})
const OF = createToken({
  name: "OF",
  pattern: /OF/
})
const COVERTURA = createToken({
  name: "COVERTURA",
  pattern: /\bTOTAL\b|\bOVERLAY\b/
})

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[ \t\n\r]+/,
  group: Lexer.SKIPPED
})


const allTokens = [ 
  LCurly,
  RCurly,
  LSquare,
  RSquare,
  Comma,
  Colon,
  True,
  False,
  LRound,
  RRound,
  SemiColon,
  ENTITY,
  COVERAGE,
  CHILD,
  WEAK,
  BY,
  IDENTIFIER,
  COMPOSITE,
  RELTIONSHIP,
  CALCULATED,
  JERARQUIA,
  OF,
  COVERTURA,
  sqlExpretion,
  WhiteSpace,
  RelationNumber,
  StringEntity,
]
const JsonLexer = new Lexer(allTokens)

export class JsonParserTypeScript extends CstParser {
  constructor() {
    super(allTokens)
    this.performSelfAnalysis()
  }


  //Empezando con las reglas
  public TypeOfObject = this.RULE("TypeOfObject", () => {
    this.MANY_SEP({
      SEP: SemiColon,
      DEF: () => {
        this.OR([
          { ALT: () => this.SUBRULE(this.entity) },
          { ALT: () => this.SUBRULE(this.composite) },
          { ALT: () => this.SUBRULE(this.relationship) }
        ])
      }
    })
  })

  private entity = this.RULE("Entity", () => {
    this.CONSUME(ENTITY)
    this.CONSUME(StringEntity)
    this.OPTION(()=>
      this.OR([
        { ALT: () => this.SUBRULE(this.child) },
        { ALT: () => this.SUBRULE(this.coverage) },
        { ALT: () => this.SUBRULE(this.weak) },
      ]))
    this.CONSUME(LCurly)
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.propertyEntity)
      }
    })
    this.CONSUME(RCurly)
  })

  private propertyEntity = this.RULE("PropertyEntity", () => {
    this.CONSUME(StringEntity)
    this.OPTION(()=>
    this.OR([
      { ALT: () => this.CONSUME(IDENTIFIER) },
      { ALT: () => this.SUBRULE(this.manys) },
      {ALT : () => this.SUBRULE(this.calculated)}
    ]))
  })
  // private Calculated = this.RULE("propertyEntity", () => {
  //   this.CONSUME(CALCULATED)
  //   this.CONSUME(BY)
  //   // this.OR([
  //   //   { ALT: () => this.CONSUME(IDENTIFIER) },
  //   // ])
  // })
  

  private relationship = this.RULE("Relationship", () => {
    this.CONSUME(RELTIONSHIP)
    this.CONSUME(StringEntity)
    this.CONSUME(LCurly)
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.relation)
      }
    })
    this.CONSUME(RCurly)
  })

  private relation = this.RULE("Relation", () => {
    
    this.CONSUME(StringEntity)
    this.CONSUME(LRound)
    this.CONSUME1(RelationNumber)
    this.CONSUME(Comma)
    this.CONSUME2(RelationNumber)
    this.CONSUME(RRound)
  })

  private manys = this.RULE("Manys", () => {    
    this.CONSUME(LRound)
    this.CONSUME1(RelationNumber)
    this.CONSUME(Comma)
    this.CONSUME2(RelationNumber)
    this.CONSUME(RRound)
  })

  private child = this.RULE("Child", () => {
    
    this.CONSUME(CHILD)
    this.CONSUME(OF)
    this.CONSUME(StringEntity)
  })
  private weak = this.RULE("Weak", () => {
    
    this.CONSUME(WEAK)
    this.CONSUME(OF)
    this.CONSUME(StringEntity)
  })
  private coverage = this.RULE("Coverage", () => {
    
    this.CONSUME(COVERAGE)
    this.CONSUME(LRound)
    this.CONSUME(JERARQUIA)
    this.CONSUME(Comma)
    this.CONSUME(COVERTURA)
    this.CONSUME(RRound)
  })

  
  //Compuesto
  private composite= this.RULE("Composite", () => {
    this.CONSUME(COMPOSITE)
    this.CONSUME(StringEntity)
    this.CONSUME(LCurly)
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.propierties);
      }
    })
    this.CONSUME(RCurly)
  })
  private calculated=this.RULE("Calculated", () => {
    this.CONSUME(CALCULATED)
    this.CONSUME(BY)
    this.CONSUME(sqlExpretion)
  })


  private propierties=this.RULE("Propierties", () => {
    this.CONSUME(StringEntity)
  })

  /*private objectItem = this.RULE("objectItem", () => {
    this.CONSUME(StringLiteral)
    this.CONSUME(Colon)
    this.SUBRULE(this.value)
  })

  private array = this.RULE("array", () => {
    this.CONSUME(LSquare)
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.value)
      }
    })
    this.CONSUME(RSquare)
  })

  private value = this.RULE("value", () => {
    this.OR([
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.SUBRULE(this.object) },
      { ALT: () => this.SUBRULE(this.array) },
      { ALT: () => this.CONSUME(True) },
      { ALT: () => this.CONSUME(False) },
      { ALT: () => this.CONSUME(Null) }
    ])
  })*/
}

// reuse the same parser instance.
export const parser = new JsonParserTypeScript()

export function parseJson(text:any) {
  const lexResult = JsonLexer.tokenize(text)
  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens
  // any top level rule may be used as an entry point
  const cst = parser.TypeOfObject()

  // this would be a TypeScript compilation error because our parser now has a clear API.
  // let value = parser.json_OopsTypo()

  return {
    // This is a pure grammar, the value will be undefined until we add embedded actions
    // or enable automatic CST creation.
    cst: cst,
    lexErrors: lexResult.errors,
    parseErrors: parser.errors
  }
}
