"use strict";

// Produce un array de objetos simples del tipo token a partir de una cadena

RegExp.prototype.bexec = function(str) {
  var i = this.lastIndex;
  var m = this.exec(str);
  if (m && m.index == i) return m;
  return null;
}

String.prototype.tokens = function () {
    var from;
    var i = 0;
    var n;
    var m;
    var result = [];

// Funcionan todas (Ya corregido)
    var WHITES              = /\s+/g;
    var ID                  = /[a-zA-Z_]\w*/g;
    var NUM                 = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g;
    var STRING              = /('(\\.|[^'])*'|"(\\.|[^"])*")/g;
    var ONELINECOMMENT      = /\/\/.*/g;
    var MULTIPLELINECOMMENT = /\/[*](.|\n)*?[*]\//g; // Funciona correctamente 
    var TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/g;
    var ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\]])/g;
    var tokens = [WHITES, ID, NUM, STRING, ONELINECOMMENT, MULTIPLELINECOMMENT, TWOCHAROPERATORS, ONECHAROPERATORS];
    
// Make a token object.

    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    var getTok = function() {
        var str = m[0];
        i += str.length;
        return str;
    };

// Comenzamos la transformacion a tokens. Si la cadena es vacia, no devuelve nada.
    if (!this) return;

// Bucle de lectura

    while (i < this.length) {
        tokens.forEach( function(t) { t.lastIndex = i;});
        from = i;
        // Para ignorar comentarios y espacios en blanco
        if (m = WHITES.bexec(this) || (m = ONELINECOMMENT.bexec(this))  || (m = MULTIPLELINECOMMENT.bexec(this))) { 
            getTok();
        }
        // Nombres
        else if (m = ID.bexec(this)) {
            result.push(make('name', getTok()));
        } 
        // Numeros
        else if (m = NUM.bexec(this)) {
            n = +getTok();

            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', m[0]).error("Bad number");
            }
        }
        // Cadenas
        else if (m = STRING.bexec(this)) {
            result.push(make('string', getTok().replace(/^["']|["']$/g,'')));
        } 
        // Operadores de 2 caracteres
        else if (m = TWOCHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        // Operadores de 1 caracter
        } else if (m = ONECHAROPERATORS.bexec(this)){
            result.push(make('operator', getTok()));
        } else {
          throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

