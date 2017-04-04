
#¿Que es una expresión regular?

Una expresión regular, también conocida como regex, regexp1 y a menudo llamada una expresión racional,2 3 es, en la ciencia computacional teórica y la teoría de lenguaje formal, una secuencia de caracteres que forma un patrón de búsqueda, principalmente utilizada para la búsqueda de patrones de cadenas de caracteres u operaciones de sustituciones. Por ejemplo, el grupo formado por las cadenas Handel, Händel y Haendel se describe con el patrón "H(a|ä|ae)ndel". La mayoría de las formalizaciones proporcionan los siguientes constructores: una expresión regular es una forma de representar los lenguajes regulares (finitos o infinitos) y se construye utilizando caracteres del alfabeto sobre el cual se define el lenguaje.


###Sintaxis.
Una expresión regular es un modelo de texto formado por caracteres ordinarios (por ejemplo, las letras de la a a la z) y caracteres especiales, conocidos como metacaracteres. El modelo describe una o varias cadenas que deben coincidir al buscar texto.
Ejemplos de expresiones regulares
```
/^\s*$/
```
Coincide con una línea en blanco.

```
/\d{2}-\d{5}/
```
Valida un número de identificador que se compone de 2 dígitos, un guión y otros 5 dígitos.
```
/<\s*(\S+)(\s[^>]*)?>[\s\S]*<\s*\/\1\s*>/
```
Coincide con una etiqueta HTML.

#### Patrones.

Se emplean corchetes para representar un único caracter con distintas opciones:

	[abcd] Encaja con cualquier carácter 'a', 'b', 'c' o 'd'.
	[a-z0-9] Detecta cualquier letra minúscula o dígito.

Los metacaracteres coinciden con un conjunto concreto de caracteres (hablaremos en profundidad de ellos más adelante). Simpre van precedidos de `\`.

    \d Coincide con cualquier dígito.
	\s Coincide con un espacio en blanco.

Los cuantificadores nos permiten especificar cuantas veces esperamos que se repite una secuencia.

    n* coincide con cualquier cadena que contenga 0 o más n.
	n+ coincide con cualquier cadena que contenga 1 o más n.

Los paréntesis se emplean para delimitar subexpresiones y aplicar los modificadores a conjuntos de caracteres.

	([a-z]0)+ coincide con una cadena compuesta por un conjunto de una letra seguida de 0 repetido una o más veces.
	(\d\s)*z coincide con una cadena compues por un conjuto de un dígito y un espacio en blanco repetida 0 o más veces y finalizada con una z.

A demás de los que ya hemos visto hay otros caracteres es peciales en las expresiones regulares como `|` o `?`. Si queremos detectar alguno de ellos dentro de una cadena tenemos que usar el caracter de escape: `\`.

	a+ coincide con una o más 'a'.
	a\+ coincide con 'a' seguida de '+'
	\d coincide con un dígito.
	\\d coincide con '\' seguido de 'd'.
	\\\d coincide con '\' seguido de un dígito.


#### Metacaracteres.

| Caracter | Significado |
|--------|-----------|
| \ | Indica que el siguiente caracter no debe interpretarse literalmente. O si se trata de un caracter especial, indica que debe tratarse literalmente. |
| ^ | Indica el principio de la entrada. |
| $ | Indica el final de la entrada. |
| * | Indica 0 o más repeticiones de la subexpresión anterior. |
| + | Indica 1 o más repeticiones de la subexpresión anterior. |
| ? | Indica 0 o 1 repetición de la subexpresión anterior. |
| . | Coincide con cualquier caracter. |
| {n} |Indica n repeticiones de la subexpresión anterior. |
| {n,} | Indica n o más repeticiones de la subexpresión anterior. |
| {n,m} | Indica entre n y m repeticiones de la subexpresión anterior. |
| [abc] | Coincide con cualquiera de los caracteres en el set. |
| [a-z] | Coincide con cualquiera de los caracteres dentro del rango. |
| [^abc] | Coincide con cualquier caracter que no esté en el set. |
| [^a-z] | Coincide con cualquier caracter que no esté dentro del rango. |
| x|y | Coincide con la subexpresión "x" o con la subexpresión "y". |
| \b | Coincide con el límite de la palabra, la posición entre el un caracter y un espacio. |
| \B | Coincide con cualquier cosa excepto con el límite de palabra. |
| \d | Coincide con cualquier dígito. |
| \D | Coincide con cualquier cosa excepto un dígito. |
| \w | Coincide con cualquier caracter de palabra: letras o "_". |
| \W | Coincide con cualquier cosa excepto un caracter de palabra. |
| \s | Coincide con cualquier caracter  de espacio: espacio, tabulador o salto de línea. |
| \S | Coincide con cualquier cosa excepto un caracter de espacio. |
| \t | Coincide con un tabulador. |
| \n | Coincide con un caracter de salto de línea. |
| \r | Coincide con un caracter de retorno de carro. |
| \uxxxx | Coincide con cualquier caracter cuyo código Unicode es "xxxx". |
