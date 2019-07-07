const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



app.get('/GetHistorial', function (req, res) {
   
   
    var sql = require("mssql");

    // configuración de la base de datos
    var config = {
        user: 'sa',
        password: 'Virtualizacion1.',
        server: 'database-1.calagsqqt5ca.us-east-1.rds.amazonaws.com', 
        database: 'Virtualizacion' 
    };

    // conexión con la base de datos
    
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // Se crea el Request Object
        var request = new sql.Request();
		var EmailHead = req.header('Email');
        
        // Se realiza la query
        var query = 'select * from HISTORIAL where Email ='+'\''+EmailHead+'\'';
        request.query(query, function (err, recordset) {
            
         if (err) console.log(err)
            // Se manda la respuesta
            if (recordset.recordset.length >= 0) {
                res.send(recordset.recordset);   
            }else{

                res.send("No");
            }
            sql.close();
        });
    });
});

app.post('/PostHistorial', function (req, res) {
    var sql = require("mssql");

    // configuramos la base de datos
    var config = {
        user: 'sa',
        password: 'Virtualizacion1.',
        server: 'database-1.calagsqqt5ca.us-east-1.rds.amazonaws.com', 
        database: 'Virtualizacion' 
    };

    // se conecta a la base de datos
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // se crea el Request Object
        var request = new sql.Request();
        var UsuarioHeader = req.header('Usuario');
        var NombreHeader = req.header('NombreCancion');
		var AlbumHeader = req.header('NombreAlbum');
        var NombreArtistaHeader = req.header('NombreArtista');
        var DuracionHeader = req.header('Duracion');
        var LinkReproduccionHeader = req.header('LinkReproduccion');
        // Se insertan los datos en la base
        var query = 'INSERT INTO HISTORIAL(Usuario,NombreCancion,NombreAlbum,NombreArtista,Duracion,LinkReproduccion) VALUES (\''+UsuarioHeader+'\',\''+
        NombreHeader+'\',\''+AlbumHeader+'\',\''+NombreArtistaHeader+'\',\''+DuracionHeader+'\',\''+LinkReproduccionHeader+'\');';

        request.query(query, function (err, recordset) {
            if (err){
                res.send(no);
            }    else  {
                res.send("1");
            }                      
            sql.close();    
        });
        
    });
});
