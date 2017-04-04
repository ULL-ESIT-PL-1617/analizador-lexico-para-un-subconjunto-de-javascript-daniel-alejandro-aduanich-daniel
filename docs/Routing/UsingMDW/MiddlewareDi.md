## Middleware de nivel de direccionador

El middleware de nivel de direccionador funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de express.Router().

```bash
var router = express.Router();
```
Cargue el middleware de nivel de direccionador utilizando las funciones router.use() y router.METHOD().

El siguiente código de ejemplo replica el sistema de middleware que se ha mostrado anteriormente para el middleware de nivel de aplicación, utilizando el middleware de nivel de direccionador:

```bash
var app = express();
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

router.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route');
  else next(); //
}, function (req, res, next) {
  res.render('regular');
});

router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

app.use('/', router);

```