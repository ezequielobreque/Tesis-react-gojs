(this["webpackJsonpgojs-react-basic"]=this["webpackJsonpgojs-react-basic"]||[]).push([[84],{184:function(e,t,n){!function(e){"use strict";function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b","i")}var n=["package","message","import","syntax","required","optional","repeated","reserved","default","extensions","packed","bool","bytes","double","enum","float","string","int32","int64","uint32","uint64","sint32","sint64","fixed32","fixed64","sfixed32","sfixed64","option","service","rpc","returns"],r=t(n);e.registerHelper("hintWords","protobuf",n);var i=new RegExp("^[_A-Za-z\xa1-\uffff][_A-Za-z0-9\xa1-\uffff]*");function o(e){if(e.eatSpace())return null;if(e.match("//"))return e.skipToEnd(),"comment";if(e.match(/^[0-9\.+-]/,!1)){if(e.match(/^[+-]?0x[0-9a-fA-F]+/))return"number";if(e.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/))return"number";if(e.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))return"number"}return e.match(/^"([^"]|(""))*"/)||e.match(/^'([^']|(''))*'/)?"string":e.match(r)?"keyword":e.match(i)?"variable":(e.next(),null)}e.defineMode("protobuf",(function(){return{token:o,fold:"brace"}})),e.defineMIME("text/x-protobuf","protobuf")}(n(12))}}]);
//# sourceMappingURL=84.c808237f.chunk.js.map