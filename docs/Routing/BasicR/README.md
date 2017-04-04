# Direccionamiento Básico
## Introducción

El __direccionamiento__ hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

Cada ruta puede tener una o varias funciones de manejador, que se excluyen cuando se correlaciona la ruta.

La definición de ruta tiene la siguiente estructura:

```bash
    app.METHOD(PATH, HANDLER)
```

Donde:

* app es una instancia de express.
* METHOD es un método de solicitud HTTP.
* PATH es una vía de acceso en el servidor.
* HANDLER es la función que se ejecuta cuando se correlaciona la ruta.

### El siguiente ejemplo ilustra la definición de rutas simples.

1. Responda con Hello World! en la página inicial:

```bash
app.get('/', function (req, res) {
  res.send('Hello World!');
});
```

2. Responda a la solicitud POST en la ruta raíz (/), la página de inicio de la aplicación:

```bash
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
```

3. Responda a una solicitud PUT en la ruta /user:

```bash
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
```
4. Responda a una solicitud DELETE en la ruta /user:

```bash
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```