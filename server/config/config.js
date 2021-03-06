 // ==========
 // Puerto
 // ==========

 process.env.PORT = process.env.PORT || 3000;



 // ==========
 // Entorno
 // ==========
 process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



 // ==========
 // Base de datos
 // ==========

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/comutel';
} else {
    urlBD = 'mongodb://comutel-user:123456a@ds139883.mlab.com:39883/comutel';
}

process.env.URLBD = urlBD;


