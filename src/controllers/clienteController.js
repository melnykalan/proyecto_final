const controller = {};

let getClientes = (conn, res, mensaje) => {
    conn.query('SELECT * FROM cliente', (err, clientes) => {
        if (err) {
            res.json(err);
        }
        res.render('clientes', {
            mensaje: mensaje,
            data: clientes
        });
    });
};

controller.list = (req, res) => {
    if(req.session.usuario){
        req.getConnection((err, conn) => { 
            getClientes(conn, res, "");
        });
    } else {
        res.redirect(301, '/');
    }
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
       conn.query('INSERT INTO cliente set ?', [data], (err, cliente)=> {
            getClientes(conn, res, "cliente agregado exitosamente");
       });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM cliente WHERE id = ?', [id], (err, cliente) => {
            res.render('cliente_edit', {
                data: cliente[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCliente = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE cliente set ? WHERE id= ?', [newCliente, id], (err, rows)=> {
            getClientes(conn, res, "cliente editado exitosamente");
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;  
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM cliente WHERE id = ?', [id], (err, rows)=> {
            getClientes(conn, res, "cliente eliminado exitosamente");
        });
    });
};

module.exports = controller;