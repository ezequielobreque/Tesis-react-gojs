(this["webpackJsonpgojs-react-basic"]=this["webpackJsonpgojs-react-basic"]||[]).push([[121],{224:function(e,t,n){!function(e){"use strict";e.defineMode("yacas",(function(t,n){function r(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}var o=r("Assert BackQuote D Defun Deriv For ForEach FromFile FromString Function Integrate InverseTaylor Limit LocalSymbols Macro MacroRule MacroRulePattern NIntegrate Rule RulePattern Subst TD TExplicitSum TSum Taylor Taylor1 Taylor2 Taylor3 ToFile ToStdout ToString TraceRule Until While"),a="(?:[a-zA-Z\\$'][a-zA-Z0-9\\$']*)",i=new RegExp("(?:(?:\\.\\d+|\\d+\\.\\d*|\\d+)(?:[eE][+-]?\\d+)?)"),c=new RegExp(a),s=new RegExp(a+"?_"+a),u=new RegExp(a+"\\s*\\(");function l(e,t){var n;if('"'===(n=e.next()))return t.tokenize=p,t.tokenize(e,t);if("/"===n){if(e.eat("*"))return t.tokenize=f,t.tokenize(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}e.backUp(1);var r=e.match(/^(\w+)\s*\(/,!1);null!==r&&o.hasOwnProperty(r[1])&&t.scopes.push("bodied");var a=m(t);if("bodied"===a&&"["===n&&t.scopes.pop(),"["!==n&&"{"!==n&&"("!==n||t.scopes.push(n),("["===(a=m(t))&&"]"===n||"{"===a&&"}"===n||"("===a&&")"===n)&&t.scopes.pop(),";"===n)for(;"bodied"===a;)t.scopes.pop(),a=m(t);return e.match(/\d+ *#/,!0,!1)?"qualifier":e.match(i,!0,!1)?"number":e.match(s,!0,!1)?"variable-3":e.match(/(?:\[|\]|{|}|\(|\))/,!0,!1)?"bracket":e.match(u,!0,!1)?(e.backUp(1),"variable"):e.match(c,!0,!1)?"variable-2":e.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%|#)/,!0,!1)?"operator":"error"}function p(e,t){for(var n,r=!1,o=!1;null!=(n=e.next());){if('"'===n&&!o){r=!0;break}o=!o&&"\\"===n}return r&&!o&&(t.tokenize=l),"string"}function f(e,t){for(var n,r;null!=(r=e.next());){if("*"===n&&"/"===r){t.tokenize=l;break}n=r}return"comment"}function m(e){var t=null;return e.scopes.length>0&&(t=e.scopes[e.scopes.length-1]),t}return{startState:function(){return{tokenize:l,scopes:[]}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)},indent:function(n,r){if(n.tokenize!==l&&null!==n.tokenize)return e.Pass;var o=0;return"]"!==r&&"];"!==r&&"}"!==r&&"};"!==r&&");"!==r||(o=-1),(n.scopes.length+o)*t.indentUnit},electricChars:"{}[]();",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}})),e.defineMIME("text/x-yacas",{name:"yacas"})}(n(12))}}]);
//# sourceMappingURL=121.e9340b69.chunk.js.map