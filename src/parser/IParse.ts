export interface RootObject {
    Composite: Composite[];
    SemiColon: COMPOSITE[];
    Entitiy: Entitiy[];
    Relationship: Relationship[];
  }
  
  interface Relationship {
    name: string;
    children: Children11;
  }
  
  interface Children11 {
    RELTIONSHIP: COMPOSITE[];
    StringEntity: COMPOSITE[];
    LCurly: COMPOSITE[];
    Relation: Relation[];
    Comma: COMPOSITE[];
    RCurly: COMPOSITE[];
  }
  
  interface Relation {
    name: string;
    children: Children10;
  }
  
  interface Children10 {
    StringEntity: COMPOSITE[];
    LRound: COMPOSITE[];
    RelationNumber: COMPOSITE[];
    Comma: COMPOSITE[];
    RRound: COMPOSITE[];
  }
  
  interface Entitiy {
    name: string;
    children: Children9;
  }
  
  interface Children9 {
    ENTITY: COMPOSITE[];
    StringEntity: COMPOSITE[];
    Coverage?: Coverage[];
    LCurly: COMPOSITE[];
    PropertyEntity: PropertyEntity[];
    Comma?: COMPOSITE[];
    RCurly: COMPOSITE[];
    Child?: Child[];
    Weak?: Weak[];
  }
  
  interface Weak {
    name: string;
    children: Children8;
  }
  
  interface Children8 {
    WEAK: COMPOSITE[];
    OF: COMPOSITE[];
    StringEntity: COMPOSITE[];
  }
  
  interface Child {
    name: string;
    children: Children7;
  }
  
  interface Children7 {
    CHILD: COMPOSITE[];
    OF: COMPOSITE[];
    StringEntity: COMPOSITE[];
  }
  
  interface PropertyEntity {
    name: string;
    children: Children6;
  }
  
  interface Children6 {
    StringEntity: COMPOSITE[];
    IDENTIFIER?: COMPOSITE[];
    Calculated?: Calculated[];
    Manys?: Many[];
  }
  
  interface Many {
    name: string;
    children: Children5;
  }
  
  interface Children5 {
    LRound: COMPOSITE[];
    RelationNumber: COMPOSITE[];
    Comma: COMPOSITE[];
    RRound: COMPOSITE[];
  }
  
  interface Calculated {
    name: string;
    children: Children4;
  }
  
  interface Children4 {
    CALCULATED: COMPOSITE[];
    BY: COMPOSITE[];
    sqlExpretion: COMPOSITE[];
  }
  
  interface Coverage {
    name: string;
    children: Children3;
  }
  
  interface Children3 {
    COVERAGE: COMPOSITE[];
    LRound: COMPOSITE[];
    JERARQUIA: COMPOSITE[];
    Comma: COMPOSITE[];
    COVERTURA: COMPOSITE[];
    RRound: COMPOSITE[];
  }
  
  interface Composite {
    name: string;
    children: Children2;
  }
  
  interface Children2 {
    COMPOSITE: COMPOSITE[];
    StringEntity: COMPOSITE[];
    LCurly: COMPOSITE[];
    Propierties: Propierty[];
    Comma: COMPOSITE[];
    RCurly: COMPOSITE[];
  }
  
  interface Propierty {
    name: string;
    children: Children;
  }
  
  interface Children {
    StringEntity: COMPOSITE[];
  }
  
  interface COMPOSITE {
    image: string;
    startOffset: number;
    endOffset: number;
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
    tokenTypeIdx: number;
    tokenType: TokenType;
  }
  
  interface TokenType {
    name: string;
    PATTERN: PATTERN;
    tokenTypeIdx: number;
    CATEGORIES: any[];
    categoryMatches: any[];
    categoryMatchesMap: PATTERN;
    isParent: boolean;
  }
  
  interface PATTERN {
  }