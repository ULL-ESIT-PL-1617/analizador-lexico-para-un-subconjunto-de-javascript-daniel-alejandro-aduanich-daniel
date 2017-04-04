## Router

Un objeto router es una instancia aislada de middleware y rutas. Usted puede pensar en él como un "mini-aplicación," sólo capaz de realizar funciones de middleware y de instalación. Cada aplicación Express tiene una aplicación router incorporada.

Un router se comporta como middleware en sí, por lo que se puede utilizar como argumento para app.use () o como el argumento del otro router () el uso del método.


Una vez que haya creado un objeto router, se puede añadir middleware y el método HTTP vías (por ejemplo get, put, post, etc.) para que al igual que una aplicación. Por ejemplo:

```Bash
router.use(function(req, res, next) {
  next();
});
router.get('/events', function(req, res, next) {
});
```
A continuación, puede utilizar un router para una dirección URL determinada raíz de esta manera la separación de sus rutas en archivos o incluso mini-aplicaciones.

```Bash
app.use('/calendar', router);
```

### Métodos

router.all (camino, [de devolución de llamada, ...] devolución de llamada)
Este método es igual que los router.METHOD()métodos, excepto que coincide con todos los métodos HTTP (verbos).

Este método es muy útil para el mapeo lógico "global" para los prefijos de ruta específicas o partidos arbitrarias. Por ejemplo, si se coloca la siguiente ruta en la parte superior de todas las otras definiciones de ruta, que requeriría que todas las rutas desde ese punto en requerirían autenticación y cargar automáticamente un usuario. Tenga en cuenta que estas devoluciones de llamada no tienen que actuar como puntos finales; loadUser puede realizar una tarea, a continuación, llamar next()a continuar búsqueda de rutas posteriores.
```Bash
router.all('*', requireAuthentication, loadUser);
```
O el equivalente:

```Bash
router.all('*', requireAuthentication)
router.all('*', loadUser);
```

Otro ejemplo de esto es la lista blanca funcionalidad "global". Aquí el ejemplo es mucho más que antes, pero sólo restringe caminos con el prefijo "/ api":
```Bash
router.all('/api/*', requireAuthentication);
```

router.METHOD (camino, [de devolución de llamada, ...] devolución de llamada)

Los router.METHOD()métodos proporcionan la funcionalidad de enrutamiento en Express, donde método es uno de los métodos HTTP, como GET, PUT, POST, y así sucesivamente, en minúsculas. Por lo tanto, los métodos actuales son router.get(), router.post(), router.put(), y así sucesivamente.
La router.get()función se llama automáticamente para el HTTP HEADmétodo además del GETmétodo si router.head()no fue llamado por el camino antes router.get().
Puede proporcionar múltiples servicios repetidos, y todos son tratados por igual, y se comportan igual que el middleware, excepto que estas devoluciones de llamada pueden invocar next('route') para eludir la devolución de llamada ruta restante (s). Puede utilizar este mecanismo para llevar a cabo precondiciones en una ruta a continuación, pasar el control a rutas posteriores, cuando no hay ninguna razón para continuar con la ruta buscada.

El siguiente fragmento ilustra posible la definición de la ruta más sencilla. Expresa traduce las cadenas de ruta a las expresiones regulares, que se utiliza internamente para que coincida con las peticiones entrantes. Las cadenas de consulta se no cuenta a la hora de realizar estos partidos, por ejemplo "GET /" se correspondería con la siguiente ruta, como sería "GET /? Name = tobi".
```Bash
router.get('/', function(req, res){
  res.send('hello world');
});
```
También puede utilizar expresiones útiles-regulares si tiene limitaciones muy específicas, por ejemplo, lo siguiente sería igualar "GET / cometa / 71dbb9c", así como "GET /commits/71dbb9c..4c084f9".
```Bash
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

router.param (nombre, devolución de llamada)

Agrega devolución de llamada activa a parámetros de la ruta, donde namees el nombre del parámetro y callbackes la función de devolución de llamada. Aunque nametécnicamente es opcional, utilizando este método sin ella está en desuso empezando con expreso v4.11.0 (véase más adelante).

Los parámetros de la función de devolución de llamada son:

req, La solicitud de objeto.
res, El objeto respuesta.
next, Lo que indica la siguiente función de middleware.
El valor del nameparámetro.
El nombre del parámetro.
A diferencia app.param(), router.param()no acepta una gran variedad de parámetros de la ruta.
Por ejemplo, cuando :userestá presente en una ruta de ruta, es posible asignar la lógica de carga del usuario para proporcionar automáticamente req.usera la ruta, o realizar validaciones sobre la introducción de parámetros.
```Bash
router.param('user', function(req, res, next, id) {

  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

Param funciones de devolución de llamada son locales al router en el que están definidas. Ellos no son heredados por aplicaciones o routers montados. Por lo tanto, las devoluciones de llamada param definidos en routerse activarán solamente por parámetros de ruta definidos en routerlas rutas.

Una devolución de llamada param será llamado sólo una vez en un ciclo de petición-respuesta, incluso si el parámetro se corresponde en múltiples rutas, como se muestra en los siguientes ejemplos.
```Bash

router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```

En GET /user/42, se imprime la siguiente:
```Bash
CALLED ONLY ONCE
although this matches
and this matches too
```

El comportamiento del router.param(name, callback)método se puede alterar por completo al pasar sólo una función a router.param(). Esta función es una implementación personalizada de cómo router.param(name, callback)debe comportarse - acepta dos parámetros y debe devolver un middleware.

El primer parámetro de esta función es el nombre del parámetro de URL que debe ser capturado, el segundo parámetro puede ser cualquier objeto JavaScript que pudieran utilizarse para el retorno de la aplicación de middleware.

El middleware devuelto por la función decide el comportamiento de lo que sucede cuando se captura un parámetro de URL.

En este ejemplo, la router.param(name, callback)firma se modifica para router.param(name, accessId). En lugar de aceptar un nombre y una devolución de llamada, router.param()ahora aceptará un nombre y un número.

```Bash

var express = require('express');
var app = express();
var router = express.Router();

router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

router.param('id', 1337);

router.get('/user/:id', function (req, res) {
  res.send('OK');
});

app.use(router);

app.listen(3000, function () {
  console.log('Ready');
});
```

En este ejemplo, la router.param(name, callback)firma sigue siendo el mismo, pero en vez de una devolución de llamada de middleware, una función de verificación de tipos de datos personalizados se ha definido para validar el tipo de datos de la identificación del usuario.

```Bash
router.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});
router.route (ruta)
```

Devuelve una instancia de una sola ruta que luego se puede utilizar para manejar los verbos HTTP con el middleware opcional. Utilizar router.route()para evitar la nomenclatura ruta duplicada y por lo tanto los errores de escritura.

Basándose en el router.param()ejemplo anterior, el código siguiente muestra cómo utilizar  router.route()para especificar varios manipuladores método HTTP.
```Bash
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  req.user.name = req.params.name;
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});
```

Este enfoque vuelve a utilizar la única /users/:user_idvía de acceso y añade manejadores para diversos métodos HTTP.

router.use ([ruta], [función, ...] función)
Utiliza la función especificada middleware o funciones, con la ruta de montaje opcional path, que por defecto es "/".

Este método es similar a app.use () . Un ejemplo sencillo y el uso caso se describe a continuación. Ver app.use () para obtener más información.

Middleware es como un tubo de fontanería: peticiones comienzan a partir de la primera función de middleware definido y se abren camino a la transformación pila de middleware "hacia abajo" para cada ruta que coinciden.
```
var express = require('express');
var app = express();
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.use('/bar', function(req, res, next) {
  next();
});

router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```

La ruta de "montaje" se desnudó y es no visible para la función de middleware. El principal efecto de esta característica es que una función montada middleware puede funcionar sin cambios en el código, independientemente de su ruta "prefijo".

El orden en el que se define con el middleware router.use()es muy importante. Se invocan de forma secuencial, por tanto, el orden de precedencia define middleware. Por ejemplo, por lo general un registrador es el primer middleware que utilizaría, por lo que cada solicitud se registra.
```Bash
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
```

Ahora suponga que desea ignorar las solicitudes de registro de archivos estáticos, pero para seguir las rutas de registro y middleware definidos después logger(). Sólo tendría que mover la llamada a express.static()la parte superior, antes de añadir el middleware registrador:

```
router.use(express.static(__dirname + '/public'));
router.use(logger());
router.use(function(req, res){
  res.send('Hello');
});
```
Otro ejemplo está sirviendo archivos de varios directorios, dando prioridad a "./public" sobre los demás:

```
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```

El router.use()método también es compatible con los parámetros nombrado para que sus puntos de montaje para otros routers pueden beneficiarse de precarga utilizando los parámetros con nombre.

```Bash
var authRouter = express.Router();
var openRouter = express.Router();

authRouter.use(require('./authenticate').basic(usersdb));

authRouter.get('/:user_id/edit', function(req, res, next) { 
});

openRouter.get('/', function(req, res, next) { 
})

openRouter.get('/:user_id', function(req, res, next) { 
})

app.use('/users', authRouter);
app.use('/users', openRouter);
```

A pesar de que el middleware de autenticación se añadió a través de la authRouterque se ejecutará en las rutas definidas por el openRoutertambién puesto que ambos routers se montaron sobre /users. Para evitar este comportamiento, utilice diferentes rutas para cada router.