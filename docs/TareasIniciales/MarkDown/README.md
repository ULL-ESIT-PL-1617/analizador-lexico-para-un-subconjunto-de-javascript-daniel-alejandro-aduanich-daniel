# Markdown

## ¿Qué es MarkDown?
Atendiendo a [wikipedia](https://es.wikipedia.org/wiki/Markdown#/media/File:Markdown_Syntax_in_gedit.png):

>Markdown es un lenguaje de marcado ligero creado por John Gruber que trata de conseguir la máxima legibilidad y facilidad de publicación tanto en su forma de entrada como de salida, inspirándose en muchas convenciones existentes para marcar mensajes de correo electrónico usando texto plano.

En la práctica esto se traduce en un lenguaje de dominio específico que nos permite escribir texto y especificar su formato empleando únicamente texto plano. Es importante señalar que markdown **no** es un estándar, por lo que sus capacidades y sintaxis completa dependen del intérprete / traductor que empleemos. Sin embargo, existen una serie de elementos comunes:

## ¿Qué permite markdown?

### Encabezados
Pueden especificarse hasta 6 niveles, mediante dos formas distintas:

    # Encabezado 1
    ## Encabezado 2
    ### Encabezado 3
    #### Encabezado 4
    ##### Encabezado 5
    ###### Encabezado 6

También es posible generar el encabezado 1 y 2 _subrayando_ el texto con un mínimo de dos = / -

    Encabezado 1
    ==

    Encabezado 2
    --

Produciendo:

# Encabezado 1
## Encabezado 2
### Encabezado 3
#### Encabezado 4
##### Encabezado 5
###### Encabezado 6


### Texto plano
Se escribe de forma normal, con la particularidad de que para conseguir un salto de línea deben insertarse o bien dos espacios en blanco antes del salto en sí o bien dos saltos seguidos.

Por ejemplo este texto  
se consigue así

    Por ejemplo este texto  
    se consigue así

    Por ejemplo este texto

    se consigue así

### Negrita, cursiva, tachado y monoespaciado
- __negrita__ y **negrita**
- _cursiva_ y *cursiva*
- ~~tachado~~
- `monoespaciado`

      __negrita__ y **negrita**
      _cursiva_ y *cursiva*
      ~~tachado~~
      `monoespaciado`

### Vínculos
[esto es un hipervínculo a nuestro repositorio](https://github.com/ULL-ESIT-PL-1617/tareas-iniciales-daniel-alejandro-aduanich)

![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1024px-Markdown-mark.svg.png)


      [esto es un hipervínculo a nuestro repositorio](https://github.com/ULL-ESIT-PL-1617/tareas-iniciales-daniel-alejandro-aduanich)

      ![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1024px-Markdown-mark.svg.png)

### Listas
Se distingue entre listas numerdas y no numeradas. Ambas se pueden combinar teniendo por ejemplo una lista numerada anidada dentro de una no numerada.

- elemento A
- elemento B
  1. Subelemento 1
  1. Subelemento 2
  1. Subelemento 3
- elemento C

#### No numeradas
    - Elemento A
    - Elemento B
    - Elemento C

#### Numeradas       
    1. Subelemento 1
    2. Subelemento 2
    3. Subelemento 3

La anidación se consigue simplemente tabulando elementos en la lista. Además, dependiendo del intérprete puede ocurrir (como es el caso del que contiene atom) que no sea necesario especificar en una lista numerada cual es el índice del elemento, tan solo que es un elemento numerado. El ejemplo anterior aprovecha esta particularidad y su sintais es:

    - elemento A
    - elemento B
      1. Subelemento 1
      1. Subelemento 2
      1. Subelemento 3
    - elemento C

### Citas

> No tengo miedo a los ordenadores. A lo que tengo miedo es a la falta de ellos  

>Isaac Asimov

Basta con añadir el símbol `>` antes del texto

      > No tengo miedo a los ordenadores. A lo que tengo miedo es a la falta de ellos  

      >Isaac Asimov

### Bloques de texto monoespaciado
Si bien ya explicamos anteriormente como conseguir una palabra o frase con tipografía monoespaciada, para grandes fragmentos de texto
con sus correspondientes saltos de línea existen dos formas más sencillas:

- Tabulando 3 o más veces el texto.

      Este texto está tabulado 3 veces
- Encerrando el texto entre bloques de 3 veces el símbolo "\`"


      ```
      Este texto está encerrado
      ```


### Fragmentos de código
Aprovechando el modo anterior, podemos especificar el resaltado
de sintaxis de un lenguaje para que se aplique al bloque texto.
Esta característica no es tan ubicua como las nombradas anteriormente pero es de gran relevancia a la hora de mostrar _snippets_ y si está admitida en el markdown de _GitHub_

```c++
#include <iostream>

int main (void) {
  std::cout << "c++" << std::endl;
}
```

Se consigue mediante:


    ```c++
    #include <iostream>

    int main (void) {
      std::cout << "c++" << std::endl;
    }
    ```

### Tablas
Otra característica con grandes variaciones entre diferentes intérpretes, la sintaxis aceptada por github es:

| Tabla | Columna 1 | Columna 2 |
|-------|-----------|-----------|
|Fila 1| Contenido 1 | Contenido 2 |
|Fila 2| Contenido 3 | Contenido 4 |
|Fila 3| Contenido 5 | Contenido 6


    | Tabla | Columna 1 | Columna 2 |
    |-------|-----------|-----------|
    |Fila 1| Contenido 1 | Contenido 2 |
    |Fila 2| Contenido 3 | Contenido 4 |
    |Fila 3| Contenido 5 | Contenido 6

### Líneas divisorias
Tan solo hace falta repetir tres veces cualquiera de los símbols `-`, `_`, `*`

---
***
___

      ---
      ***
      ___
