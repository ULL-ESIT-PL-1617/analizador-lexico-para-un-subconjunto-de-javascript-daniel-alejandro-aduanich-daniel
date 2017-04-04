## GHPages
## ¿Qué es GH-Pages?

GH-Pages es una forma rápida de publicar tu propia página web desde github, utilizando sus herramientas.

## Utilización

Para utilizar gh-pages, hay varios métodos:

* Crear una rama gh-pages de forma local y dentro de la misma poner el contenido que deseas mostrar en tu página web. Github se encargará de forma automática de identificar el contenido de la rama.
Para crear la rama gh-pages y movernos a ella ejecutamos los comandos:

  ```bash
  $ git branch gh-pages  
  ```
  ```bash
  $ git checkout gh-pages
  ```

* Accediendo a la web de [GH-Pages](https://pages.github.com/) y siguiendo las instrucciones que se indican.

* Desde la web de github y dentro de tu repositorio vas a:
  1. La pestaña de Settings.
  ![Imagen](./../capturas/botonset.png)  
  2. La zona de GH-Pages y seleccionamos el Source:
  ![Imagen](./../capturas/gh-pages2.png)

Al final deberíamos tener una rama GH-Pages como esta:

  ![Imagen](./../capturas/gh-pages3.png)


> Se puede usar el plugin de gulp para automatizar la subida al gh-pages
