(this["webpackJsonpgojs-react-basic"]=this["webpackJsonpgojs-react-basic"]||[]).push([[98],{198:function(t,e,n){!function(t){"use strict";t.defineMode("solr",(function(){var t=/[^\s\|\!\+\-\*\?\~\^\&\:\(\)\[\]\{\}\"\\]/,e=/[\|\!\+\-\*\?\~\^\&]/,n=/^(OR|AND|NOT|TO)$/i;function r(t){return parseFloat(t).toString()===t}function o(t){return function(e,n){for(var r,o=!1;null!=(r=e.next())&&(r!=t||o);)o=!o&&"\\"==r;return o||(n.tokenize=s),"string"}}function i(t){return function(e,n){var r="operator";return"+"==t?r+=" positive":"-"==t?r+=" negative":"|"==t?e.eat(/\|/):"&"==t?e.eat(/\&/):"^"==t&&(r+=" boost"),n.tokenize=s,r}}function u(e){return function(o,i){for(var u=e;(e=o.peek())&&null!=e.match(t);)u+=o.next();return i.tokenize=s,n.test(u)?"operator":r(u)?"number":":"==o.peek()?"field":"string"}}function s(n,r){var a=n.next();return'"'==a?r.tokenize=o(a):e.test(a)?r.tokenize=i(a):t.test(a)&&(r.tokenize=u(a)),r.tokenize!=s?r.tokenize(n,r):null}return{startState:function(){return{tokenize:s}},token:function(t,e){return t.eatSpace()?null:e.tokenize(t,e)}}})),t.defineMIME("text/x-solr","solr")}(n(12))}}]);
//# sourceMappingURL=98.14457be8.chunk.js.map