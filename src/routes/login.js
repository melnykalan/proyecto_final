const express = require('express');
const router = express.Router();

router.get('/',function(req,res,next){
    res.render('login',{mensaje:""});
});

router.post('/loguearse', (req,res)=> {
    var datos = {
        usuario: req.body.usuario,
        password: req.body.password
    }
    req.getConnection((err, conn) => {
        conn.query("select nombre from usuarios where nombre='"+ datos.usuario + "' and password='" + datos.password + "'",(err,rows)=>{
            if(err){
                console.log(err);
                res.render('login', { mensaje: "Error" });
            } else {
                if(rows.length > 0){
                    req.session.usuario = rows[0].nombre;
                    res.redirect('clientes/');
                } else {
                    res.render('login',{mensaje:"Usuario o contraseña incorrecto"});
                }
            }
        });
    });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;