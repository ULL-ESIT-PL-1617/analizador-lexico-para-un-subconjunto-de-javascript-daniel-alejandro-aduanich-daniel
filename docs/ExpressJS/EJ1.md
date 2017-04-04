## ¿Qué es una cookie?

Las cookies son pequeños pedazos de datos enviados desde una web y son almacenados en el navegador del usuario en cuestión mientras este se encuentra navegando por dicho sitio.
Cada vez que un usuario carga de nuevo una página anterior, el navegador la envia los datos a la web o servidor para distinguir que se trata de este usuario en cuestión y de cuál fue su actividad.

## ¿Qué es Express?

Es una aplicación minimalista, flexible y web del entorno de desarrollo de Node.js que nos proporcionar una serie de opciones robustas determinadas para webs y aplicaciones de móviles.

###### ¿Cuál es el aspecto de Express?

```bash
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

```

## Instalación y uso de Cookies es Express

###### Instalación

Para instalar las dependencias necesarias:
    1. Abre una terminal.
    2. Colócate en la carpeta de la aplicación.
    3. Ejecuta: 
    
    ```bash
    npm install cookie-parser
    ```
###### Uso

Debes importar "cookie-parser" a tu aplicación de la siguiente forma:

```bash
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
```

En cuanto a sus sintaxis tiene el siguiente aspecto:

```bash
app.get('/cookie',function(req, res){
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});
```
Así cada vez que accedas a una dirección (En el caso del ejemplo a continuación será "/") el navegador devolverá la cookie indicada anteriormente:

```bash
app.get('/', function(req, res) {
  console.log("Cookies :  ", req.cookies);
});
```

###### Cookie Expiration Time

Se define de la siguiente forma:

```bash
res.cookie(name , 'value', {expire : new Date() + 9999});
```

(Otra forma):

```bash
res.cookie(name, 'value', {maxAge : 9999});
```

###### ¿Cómo puedo borrar un cookie ya existente?

Es bastante simple haciendo uso del método "clearCookie":

```bash
app.get('/clearcookie', function(req,res){
     clearCookie('cookie_name');
     res.send('Cookie deleted');
});
```
