## Ejemplo de la utilizacion de cookies y el metodo Post para la creacion de persistencia.

Las cookies junto con el metodo Post son una buena manera de crear persistencia en el usuario.

A continuación se mostrará un ejemplo donde se podra ver lo anteriormente mencionado:

```bash

var express = require('express')
  , app = module.exports = express();
  
//Clave del usuario en cuestion
app.use(express.cookieParser('my secret here'));

//decodifica la informacion recibida
app.use(express.bodyParser());

//Inicia en la raiz
app.get('/', function(req, res){
  //Si estan guardadas las cookies te manda a un HTML donde puedes borrar tus cookies
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
   //En caso de que no recuerde tus cookies te manda a otro html donde te pregunta si deseas guardar tu sesion
  } else {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
  }
});

//Funcion que borra las cookies
app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('back');
});

app.post('/', function(req, res){
  var minute = 60 * 1000;
  //Si ha sido pulsado el botom remeber se creara una cookie de sesion que durara 1 minuto
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});

//usa el puerto 80
app.listen(80);
console.log('Express started on port %d', 80);
```

Un ejemplo visual de este ejemplo es este [link](code.runnable.com/WMmPSCgdePFr1_Js/output)




