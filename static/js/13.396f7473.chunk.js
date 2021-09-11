(this["webpackJsonpgojs-react-basic"]=this["webpackJsonpgojs-react-basic"]||[]).push([[13,86,102],{115:function(e,t,n){!function(e){"use strict";function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var n=t(["and","or","not","is"]),a=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in"],r=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];function i(e){return e.scopes[e.scopes.length-1]}e.registerHelper("hintWords","python",a.concat(r)),e.defineMode("python",(function(o,c){for(var s="error",l=c.delimiters||c.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,u=[c.singleOperators,c.doubleOperators,c.doubleDelimiters,c.tripleDelimiters,c.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/],m=0;m<u.length;m++)u[m]||u.splice(m--,1);var f=c.hangingIndent||o.indentUnit,p=a,d=r;void 0!=c.extra_keywords&&(p=p.concat(c.extra_keywords)),void 0!=c.extra_builtins&&(d=d.concat(c.extra_builtins));var h=!(c.version&&Number(c.version)<3);if(h){var b=c.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;p=p.concat(["nonlocal","False","True","None","async","await"]),d=d.concat(["ascii","bytes","exec","print"]);var k=new RegExp("^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|\"{3}|['\"]))","i")}else b=c.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/,p=p.concat(["exec","print"]),d=d.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"]),k=new RegExp("^(([rubf]|(ur)|(br))?('{3}|\"{3}|['\"]))","i");var g=t(p),y=t(d);function x(e,t){var n=e.sol()&&"\\"!=t.lastToken;if(n&&(t.indent=e.indentation()),n&&"py"==i(t).type){var a=i(t).offset;if(e.eatSpace()){var r=e.indentation();return r>a?E(t):r<a&&R(e,t)&&"#"!=e.peek()&&(t.errorToken=!0),null}var o=v(e,t);return a>0&&R(e,t)&&(o+=" "+s),o}return v(e,t)}function v(e,t,a){if(e.eatSpace())return null;if(!a&&e.match(/^#.*/))return"comment";if(e.match(/^[0-9\.]/,!1)){var r=!1;if(e.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)&&(r=!0),e.match(/^[\d_]+\.\d*/)&&(r=!0),e.match(/^\.\d+/)&&(r=!0),r)return e.eat(/J/i),"number";var i=!1;if(e.match(/^0x[0-9a-f_]+/i)&&(i=!0),e.match(/^0b[01_]+/i)&&(i=!0),e.match(/^0o[0-7_]+/i)&&(i=!0),e.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)&&(e.eat(/J/i),i=!0),e.match(/^0(?![\dx])/i)&&(i=!0),i)return e.eat(/L/i),"number"}if(e.match(k))return-1!==e.current().toLowerCase().indexOf("f")?(t.tokenize=w(e.current(),t.tokenize),t.tokenize(e,t)):(t.tokenize=_(e.current(),t.tokenize),t.tokenize(e,t));for(var o=0;o<u.length;o++)if(e.match(u[o]))return"operator";return e.match(l)?"punctuation":"."==t.lastToken&&e.match(b)?"property":e.match(g)||e.match(n)?"keyword":e.match(y)?"builtin":e.match(/^(self|cls)\b/)?"variable-2":e.match(b)?"def"==t.lastToken||"class"==t.lastToken?"def":"variable":(e.next(),a?null:s)}function w(e,t){for(;"rubf".indexOf(e.charAt(0).toLowerCase())>=0;)e=e.substr(1);var n=1==e.length,a="string";function r(e){return function(t,n){var a=v(t,n,!0);return"punctuation"==a&&("{"==t.current()?n.tokenize=r(e+1):"}"==t.current()&&(n.tokenize=e>1?r(e-1):i)),a}}function i(i,o){for(;!i.eol();)if(i.eatWhile(/[^'"\{\}\\]/),i.eat("\\")){if(i.next(),n&&i.eol())return a}else{if(i.match(e))return o.tokenize=t,a;if(i.match("{{"))return a;if(i.match("{",!1))return o.tokenize=r(0),i.current()?a:o.tokenize(i,o);if(i.match("}}"))return a;if(i.match("}"))return s;i.eat(/['"]/)}if(n){if(c.singleLineStringErrors)return s;o.tokenize=t}return a}return i.isString=!0,i}function _(e,t){for(;"rubf".indexOf(e.charAt(0).toLowerCase())>=0;)e=e.substr(1);var n=1==e.length,a="string";function r(r,i){for(;!r.eol();)if(r.eatWhile(/[^'"\\]/),r.eat("\\")){if(r.next(),n&&r.eol())return a}else{if(r.match(e))return i.tokenize=t,a;r.eat(/['"]/)}if(n){if(c.singleLineStringErrors)return s;i.tokenize=t}return a}return r.isString=!0,r}function E(e){for(;"py"!=i(e).type;)e.scopes.pop();e.scopes.push({offset:i(e).offset+o.indentUnit,type:"py",align:null})}function S(e,t,n){var a=e.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:e.column()+1;t.scopes.push({offset:t.indent+f,type:n,align:a})}function R(e,t){for(var n=e.indentation();t.scopes.length>1&&i(t).offset>n;){if("py"!=i(t).type)return!0;t.scopes.pop()}return i(t).offset!=n}function z(e,t){e.sol()&&(t.beginningOfLine=!0,t.dedent=!1);var n=t.tokenize(e,t),a=e.current();if(t.beginningOfLine&&"@"==a)return e.match(b,!1)?"meta":h?"operator":s;if(/\S/.test(a)&&(t.beginningOfLine=!1),"variable"!=n&&"builtin"!=n||"meta"!=t.lastToken||(n="meta"),"pass"!=a&&"return"!=a||(t.dedent=!0),"lambda"==a&&(t.lambda=!0),":"==a&&!t.lambda&&"py"==i(t).type&&e.match(/^\s*(?:#|$)/,!1)&&E(t),1==a.length&&!/string|comment/.test(n)){var r="[({".indexOf(a);if(-1!=r&&S(e,t,"])}".slice(r,r+1)),-1!=(r="])}".indexOf(a))){if(i(t).type!=a)return s;t.indent=t.scopes.pop().offset-f}}return t.dedent&&e.eol()&&"py"==i(t).type&&t.scopes.length>1&&t.scopes.pop(),n}return{startState:function(e){return{tokenize:x,scopes:[{offset:e||0,type:"py",align:null}],indent:e||0,lastToken:null,lambda:!1,dedent:0}},token:function(e,t){var n=t.errorToken;n&&(t.errorToken=!1);var a=z(e,t);return a&&"comment"!=a&&(t.lastToken="keyword"==a||"punctuation"==a?e.current():a),"punctuation"==a&&(a=null),e.eol()&&t.lambda&&(t.lambda=!1),n?a+" "+s:a},indent:function(t,n){if(t.tokenize!=x)return t.tokenize.isString?e.Pass:0;var a=i(t),r=a.type==n.charAt(0)||"py"==a.type&&!t.dedent&&/^(else:|elif |except |finally:)/.test(n);return null!=a.align?a.align-(r?1:0):a.offset-(r?f:0)},electricInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"}})),e.defineMIME("text/x-python","python");var o=function(e){return e.split(" ")};e.defineMIME("text/x-cython",{name:"python",extra_keywords:o("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")})}(n(12))},116:function(e,t,n){!function(e){"use strict";e.defineMode("stex",(function(e,t){function n(e,t){e.cmdState.push(t)}function a(e){return e.cmdState.length>0?e.cmdState[e.cmdState.length-1]:null}function r(e){var t=e.cmdState.pop();t&&t.closeBracket()}function i(e){for(var t=e.cmdState,n=t.length-1;n>=0;n--){var a=t[n];if("DEFAULT"!=a.name)return a}return{styleIdentifier:function(){return null}}}function o(e,t,n){return function(){this.name=e,this.bracketNo=0,this.style=t,this.styles=n,this.argument=null,this.styleIdentifier=function(){return this.styles[this.bracketNo-1]||null},this.openBracket=function(){return this.bracketNo++,"bracket"},this.closeBracket=function(){}}}var c={};function s(e,t){e.f=t}function l(e,t){var r;if(e.match(/^\\[a-zA-Z@]+/)){var o=e.current().slice(1);return n(t,r=new(r=c.hasOwnProperty(o)?c[o]:c.DEFAULT)),s(t,m),r.style}if(e.match(/^\\[$&%#{}_]/))return"tag";if(e.match(/^\\[,;!\/\\]/))return"tag";if(e.match("\\["))return s(t,(function(e,t){return u(e,t,"\\]")})),"keyword";if(e.match("\\("))return s(t,(function(e,t){return u(e,t,"\\)")})),"keyword";if(e.match("$$"))return s(t,(function(e,t){return u(e,t,"$$")})),"keyword";if(e.match("$"))return s(t,(function(e,t){return u(e,t,"$")})),"keyword";var l=e.next();return"%"==l?(e.skipToEnd(),"comment"):"}"==l||"]"==l?(r=a(t))?(r.closeBracket(l),s(t,m),"bracket"):"error":"{"==l||"["==l?(n(t,r=new(r=c.DEFAULT)),"bracket"):/\d/.test(l)?(e.eatWhile(/[\w.%]/),"atom"):(e.eatWhile(/[\w\-_]/),"begin"==(r=i(t)).name&&(r.argument=e.current()),r.styleIdentifier())}function u(e,t,n){if(e.eatSpace())return null;if(n&&e.match(n))return s(t,l),"keyword";if(e.match(/^\\[a-zA-Z@]+/))return"tag";if(e.match(/^[a-zA-Z]+/))return"variable-2";if(e.match(/^\\[$&%#{}_]/))return"tag";if(e.match(/^\\[,;!\/]/))return"tag";if(e.match(/^[\^_&]/))return"tag";if(e.match(/^[+\-<>|=,\/@!*:;'"`~#?]/))return null;if(e.match(/^(\d+\.\d*|\d*\.\d+|\d+)/))return"number";var a=e.next();return"{"==a||"}"==a||"["==a||"]"==a||"("==a||")"==a?"bracket":"%"==a?(e.skipToEnd(),"comment"):"error"}function m(e,t){var n=e.peek();return"{"==n||"["==n?(a(t).openBracket(n),e.eat(n),s(t,l),"bracket"):/[ \t\r]/.test(n)?(e.eat(n),null):(s(t,l),r(t),l(e,t))}return c.importmodule=o("importmodule","tag",["string","builtin"]),c.documentclass=o("documentclass","tag",["","atom"]),c.usepackage=o("usepackage","tag",["atom"]),c.begin=o("begin","tag",["atom"]),c.end=o("end","tag",["atom"]),c.label=o("label","tag",["atom"]),c.ref=o("ref","tag",["atom"]),c.eqref=o("eqref","tag",["atom"]),c.cite=o("cite","tag",["atom"]),c.bibitem=o("bibitem","tag",["atom"]),c.Bibitem=o("Bibitem","tag",["atom"]),c.RBibitem=o("RBibitem","tag",["atom"]),c.DEFAULT=function(){this.name="DEFAULT",this.style="tag",this.styleIdentifier=this.openBracket=this.closeBracket=function(){}},{startState:function(){return{cmdState:[],f:t.inMathMode?function(e,t){return u(e,t)}:l}},copyState:function(e){return{cmdState:e.cmdState.slice(),f:e.f}},token:function(e,t){return t.f(e,t)},blankLine:function(e){e.f=l,e.cmdState.length=0},lineComment:"%"}})),e.defineMIME("text/x-stex","stex"),e.defineMIME("text/x-latex","stex")}(n(12))},189:function(e,t,n){!function(e){"use strict";e.defineMode("rst",(function(t,n){var a=/^\*\*[^\*\s](?:[^\*]*[^\*\s])?\*\*/,r=/^\*[^\*\s](?:[^\*]*[^\*\s])?\*/,i=/^``[^`\s](?:[^`]*[^`\s])``/,o=/^(?:[\d]+(?:[\.,]\d+)*)/,c=/^(?:\s\+[\d]+(?:[\.,]\d+)*)/,s=/^(?:\s\-[\d]+(?:[\.,]\d+)*)/,l=new RegExp("^[Hh][Tt][Tt][Pp][Ss]?://(?:[\\d\\w.-]+)\\.(?:\\w{2,6})(?:/[\\d\\w\\#\\%\\&\\-\\.\\,\\/\\:\\=\\?\\~]+)*"),u={token:function(e){if(e.match(a)&&e.match(/\W+|$/,!1))return"strong";if(e.match(r)&&e.match(/\W+|$/,!1))return"em";if(e.match(i)&&e.match(/\W+|$/,!1))return"string-2";if(e.match(o))return"number";if(e.match(c))return"positive";if(e.match(s))return"negative";if(e.match(l))return"link";for(;null!=e.next()&&!e.match(a,!1)&&!e.match(r,!1)&&!e.match(i,!1)&&!e.match(o,!1)&&!e.match(c,!1)&&!e.match(s,!1)&&!e.match(l,!1););return null}},m=e.getMode(t,n.backdrop||"rst-base");return e.overlayMode(m,u,!0)}),"python","stex"),e.defineMode("rst-base",(function(t){function n(e){var t=Array.prototype.slice.call(arguments,1);return e.replace(/{(\d+)}/g,(function(e,n){return"undefined"!=typeof t[n]?t[n]:e}))}var a=e.getMode(t,"python"),r=e.getMode(t,"stex"),i="\\s+",o="(?:\\s*|\\W|$)",c=new RegExp(n("^{0}",o)),s="(?:[^\\W\\d_](?:[\\w!\"#$%&'()\\*\\+,\\-\\./:;<=>\\?]*[^\\W_])?)",l=new RegExp(n("^{0}",s)),u=n("(?:{0}|`{1}`)",s,"(?:[^\\W\\d_](?:[\\w\\s!\"#$%&'()\\*\\+,\\-\\./:;<=>\\?]*[^\\W_])?)"),m="(?:[^\\s\\|](?:[^\\|]*[^\\s\\|])?)",f="(?:[^\\`]+)",p=new RegExp(n("^{0}",f)),d=new RegExp("^([!'#$%&\"()*+,-./:;<=>?@\\[\\\\\\]^_`{|}~])\\1{3,}\\s*$"),h=new RegExp(n("^\\.\\.{0}",i)),b=new RegExp(n("^_{0}:{1}|^__:{1}",u,o)),k=new RegExp(n("^{0}::{1}",u,o)),g=new RegExp(n("^\\|{0}\\|{1}{2}::{3}",m,i,u,o)),y=new RegExp(n("^\\[(?:\\d+|#{0}?|\\*)]{1}",u,o)),x=new RegExp(n("^\\[{0}\\]{1}",u,o)),v=new RegExp(n("^\\|{0}\\|",m)),w=new RegExp(n("^\\[(?:\\d+|#{0}?|\\*)]_",u)),_=new RegExp(n("^\\[{0}\\]_",u)),E=new RegExp(n("^{0}__?",u)),S=new RegExp(n("^`{0}`_",f)),R=new RegExp(n("^:{0}:`{1}`{2}",s,f,o)),z=new RegExp(n("^`{1}`:{0}:{2}",s,f,o)),M=new RegExp(n("^:{0}:{1}",s,o)),T=new RegExp(n("^{0}",u)),$=new RegExp(n("^::{0}",o)),L=new RegExp(n("^\\|{0}\\|",m)),C=new RegExp(n("^{0}",i)),P=new RegExp(n("^{0}",u)),A=new RegExp(n("^::{0}",o)),F=new RegExp("^_"),I=new RegExp(n("^{0}|_",u)),W=new RegExp(n("^:{0}",o)),B=new RegExp("^::\\s*$"),O=new RegExp("^\\s+(?:>>>|In \\[\\d+\\]:)\\s");function D(t,n){var i=null;if(t.sol()&&t.match(O,!1))H(n,j,{mode:a,local:e.startState(a)});else if(t.sol()&&t.match(h))H(n,N),i="meta";else if(t.sol()&&t.match(d))H(n,D),i="header";else if(K(n)==R||t.match(R,!1))switch(G(n)){case 0:H(n,D,J(R,1)),t.match(/^:/),i="meta";break;case 1:H(n,D,J(R,2)),t.match(l),i="keyword",t.current().match(/^(?:math|latex)/)&&(n.tmp_stex=!0);break;case 2:H(n,D,J(R,3)),t.match(/^:`/),i="meta";break;case 3:if(n.tmp_stex&&(n.tmp_stex=void 0,n.tmp={mode:r,local:e.startState(r)}),n.tmp){if("`"==t.peek()){H(n,D,J(R,4)),n.tmp=void 0;break}i=n.tmp.mode.token(t,n.tmp.local);break}H(n,D,J(R,4)),t.match(p),i="string";break;case 4:H(n,D,J(R,5)),t.match(/^`/),i="meta";break;case 5:H(n,D,J(R,6)),t.match(c);break;default:H(n,D)}else if(K(n)==z||t.match(z,!1))switch(G(n)){case 0:H(n,D,J(z,1)),t.match(/^`/),i="meta";break;case 1:H(n,D,J(z,2)),t.match(p),i="string";break;case 2:H(n,D,J(z,3)),t.match(/^`:/),i="meta";break;case 3:H(n,D,J(z,4)),t.match(l),i="keyword";break;case 4:H(n,D,J(z,5)),t.match(/^:/),i="meta";break;case 5:H(n,D,J(z,6)),t.match(c);break;default:H(n,D)}else if(K(n)==M||t.match(M,!1))switch(G(n)){case 0:H(n,D,J(M,1)),t.match(/^:/),i="meta";break;case 1:H(n,D,J(M,2)),t.match(l),i="keyword";break;case 2:H(n,D,J(M,3)),t.match(/^:/),i="meta";break;case 3:H(n,D,J(M,4)),t.match(c);break;default:H(n,D)}else if(K(n)==v||t.match(v,!1))switch(G(n)){case 0:H(n,D,J(v,1)),t.match(L),i="variable-2";break;case 1:H(n,D,J(v,2)),t.match(/^_?_?/)&&(i="link");break;default:H(n,D)}else if(t.match(w))H(n,D),i="quote";else if(t.match(_))H(n,D),i="quote";else if(t.match(E))H(n,D),t.peek()&&!t.peek().match(/^\W$/)||(i="link");else if(K(n)==S||t.match(S,!1))switch(G(n)){case 0:!t.peek()||t.peek().match(/^\W$/)?H(n,D,J(S,1)):t.match(S);break;case 1:H(n,D,J(S,2)),t.match(/^`/),i="link";break;case 2:H(n,D,J(S,3)),t.match(p);break;case 3:H(n,D,J(S,4)),t.match(/^`_/),i="link";break;default:H(n,D)}else t.match(B)?H(n,Z):t.next()&&H(n,D);return i}function N(t,n){var i=null;if(K(n)==g||t.match(g,!1))switch(G(n)){case 0:H(n,N,J(g,1)),t.match(L),i="variable-2";break;case 1:H(n,N,J(g,2)),t.match(C);break;case 2:H(n,N,J(g,3)),t.match(P),i="keyword";break;case 3:H(n,N,J(g,4)),t.match(A),i="meta";break;default:H(n,D)}else if(K(n)==k||t.match(k,!1))switch(G(n)){case 0:H(n,N,J(k,1)),t.match(T),i="keyword",t.current().match(/^(?:math|latex)/)?n.tmp_stex=!0:t.current().match(/^python/)&&(n.tmp_py=!0);break;case 1:H(n,N,J(k,2)),t.match($),i="meta",(t.match(/^latex\s*$/)||n.tmp_stex)&&(n.tmp_stex=void 0,H(n,j,{mode:r,local:e.startState(r)}));break;case 2:H(n,N,J(k,3)),(t.match(/^python\s*$/)||n.tmp_py)&&(n.tmp_py=void 0,H(n,j,{mode:a,local:e.startState(a)}));break;default:H(n,D)}else if(K(n)==b||t.match(b,!1))switch(G(n)){case 0:H(n,N,J(b,1)),t.match(F),t.match(I),i="link";break;case 1:H(n,N,J(b,2)),t.match(W),i="meta";break;default:H(n,D)}else t.match(y)||t.match(x)?(H(n,D),i="quote"):(t.eatSpace(),t.eol()?H(n,D):(t.skipToEnd(),H(n,U),i="comment"));return i}function U(e,t){return q(e,t,"comment")}function Z(e,t){return q(e,t,"meta")}function q(e,t,n){return e.eol()||e.eatSpace()?(e.skipToEnd(),n):(H(t,D),null)}function j(e,t){return t.ctx.mode&&t.ctx.local?e.sol()?(e.eatSpace()||H(t,D),null):t.ctx.mode.token(e,t.ctx.local):(H(t,D),null)}function J(e,t,n,a){return{phase:e,stage:t,mode:n,local:a}}function H(e,t,n){e.tok=t,e.ctx=n||{}}function G(e){return e.ctx.stage||0}function K(e){return e.ctx.phase}return{startState:function(){return{tok:D,ctx:J(void 0,0)}},copyState:function(t){var n=t.ctx,a=t.tmp;return n.local&&(n={mode:n.mode,local:e.copyState(n.mode,n.local)}),a&&(a={mode:a.mode,local:e.copyState(a.mode,a.local)}),{tok:t.tok,ctx:n,tmp:a}},innerMode:function(e){return e.tmp?{state:e.tmp.local,mode:e.tmp.mode}:e.ctx.mode?{state:e.ctx.local,mode:e.ctx.mode}:null},token:function(e,t){return t.tok(e,t)}}}),"python","stex"),e.defineMIME("text/x-rst","rst")}(n(12),n(115),n(116),n(230))},230:function(e,t,n){!function(e){"use strict";e.overlayMode=function(t,n,a){return{startState:function(){return{base:e.startState(t),overlay:e.startState(n),basePos:0,baseCur:null,overlayPos:0,overlayCur:null,streamSeen:null}},copyState:function(a){return{base:e.copyState(t,a.base),overlay:e.copyState(n,a.overlay),basePos:a.basePos,baseCur:null,overlayPos:a.overlayPos,overlayCur:null}},token:function(e,r){return(e!=r.streamSeen||Math.min(r.basePos,r.overlayPos)<e.start)&&(r.streamSeen=e,r.basePos=r.overlayPos=e.start),e.start==r.basePos&&(r.baseCur=t.token(e,r.base),r.basePos=e.pos),e.start==r.overlayPos&&(e.pos=e.start,r.overlayCur=n.token(e,r.overlay),r.overlayPos=e.pos),e.pos=Math.min(r.basePos,r.overlayPos),null==r.overlayCur?r.baseCur:null!=r.baseCur&&r.overlay.combineTokens||a&&null==r.overlay.combineTokens?r.baseCur+" "+r.overlayCur:r.overlayCur},indent:t.indent&&function(e,n,a){return t.indent(e.base,n,a)},electricChars:t.electricChars,innerMode:function(e){return{state:e.base,mode:t}},blankLine:function(e){var r,i;return t.blankLine&&(r=t.blankLine(e.base)),n.blankLine&&(i=n.blankLine(e.overlay)),null==i?r:a&&null!=r?r+" "+i:i}}}}(n(12))}}]);
//# sourceMappingURL=13.396f7473.chunk.js.map