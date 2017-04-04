## Ejemplo de una sesión "auth" básica en NodeJS

La autentificación es el proceso de verificar que un usuario es de hecho quién él o ella dice ser.
Autorización es el proceso de determinar si el usuario tiene o no los privilegios de acceso a los recursos que él o ella pide.

A continuación se mostrará un ejemplo de uso de ambos conceptos en las sesiones de ExpressJS:

###### session_auth.js

```bash
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
 
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");
```
Todo esto se ejecuta empleando los siguientes comandos:
```bash
npm install express
npm install express-session
node session_auth.js &
```
Con esto se puede acceder a las siguientes URL's dentro del navegador web:

```
localhost:3000/content
localhost:3000/login?username=amy&password=amyspassword
localhost:3000/content
localhost:3000/logout
localhost:3000/content
```
#### Explicación del código

```bash
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
```
Sirve para importar los módulos de express y de las sesiones de express (express-session). Crea una app de express y añade una sesión a la misma como si fuese un middleware.

```bash
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
```
Son las funciones de autentificación y autorización del middleware. Concede acceso al siguiente paso si un usuario se valida correctamente.

```bash
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
```

__localhost:3000/login?username=amy&password=amyspassword:__

```bash
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
```
Es la url de acceso y de comprobación de acceso de usuario que guarda lo antes dicho y el nivel de acceso de dicha sesion.
La sesion será completamente diferente para cada usuario y será única para cada uno según el navegador desde el que se acceda.

__localhost:3000/logout:__

```bash
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
```
Se encarga de la desconexión de sesión mediante la destrucción de la misma. Una vez destruida el usuario tendrá que realizar de nuevo los pasos de autentificación y autorización para que se le concedan permisos otra vez.

__localhost:3000/content:__

```bash
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
```
Obtiene el contenido protegido. La función "auth" de autentificación es pasada como parámetros como un middleware antes de que se proceda a servir el contenido al usuario. Si la función "auth" determina que el usuario no es válido, no pasará al contenido de la siguiente función, restringiendo el acceso.