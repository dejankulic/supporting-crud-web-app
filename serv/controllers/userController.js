const mysql = require('mysql');

///Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    database: 'skriptjezici'
});

//view users
exports.view = (req,res) =>{
///db connect
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        ///user the connection
        connection.query('SELECT * FROM application_customer',(err,rows) =>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });
}
exports.find = (req,res) => {
///db connect
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
        console.log(searchTerm);

        connection.query('SELECT * FROM application_customer WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows) =>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });

}

exports.form = (req,res) => {
    res.render('add-customer');
}
//add new user
exports.create = (req,res) =>{

    const {first_name,last_name,email,phone,comments} = req.body;

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        console.log(searchTerm);

        connection.query('INSERT INTO application_customer SET first_name = ?, last_name = ?, email=?, phone = ?',[first_name, last_name,email, phone],(err,rows) =>{
            connection.release();
            if(!err){
                res.render('add-customer',{alert: 'Customer added successfully.'});
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });

}


exports.productform = (req,res) => {
    res.render('add-product');
}
//add new user
exports.productcreate = (req,res) =>{

    const {name,price,category,description} = req.body;

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        console.log(searchTerm);

        connection.query('INSERT INTO application_product SET name = ?, price = ?, category=?, description = ?',[name, price,category, description],(err,rows) =>{
            connection.release();
            if(!err){
                res.render('add-product',{alert: 'Product added successfully.'});
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });

}
exports.edit =(req,res)=>{

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        ///user the connection
        connection.query('SELECT * FROM application_customer WHERE id = ?',[req.params.id],(err,rows) =>{
            connection.release();
            if(!err){
                res.render('edit-customer',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });


}
///update
exports.update =(req,res)=>{

    const {first_name, last_name,email,phone,comments} = req.body;

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        ///user the connection
        connection.query('UPDATE application_customer SET first_name = ?, last_name = ?, email = ?, phone = ?, where id = ?',[first_name,last_name,email,phone, req.params.id],(err,rows) =>{
            connection.release();
            if(!err){
                pool.getConnection((err,connection) => {
                    if(err) throw err; //not connected
                    console.log('connected as ID ' + connection.threadId);
                    ///user the connection
                    connection.query('SELECT * FROM customer WHERE id = ?',[req.params.id],(err,rows) =>{
                        connection.release();
                        if(!err){
                            res.render('edit-customer',{rows});
                        }else{
                            console.log(err);
                        }
                        console.log('The data from db: \n',rows )


                    });
                });
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });


}


exports.delete =(req,res)=>{

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        ///user the connection
        connection.query('DELETE FROM application_customer WHERE id = ?',[req.params.id],(err,rows) =>{
            connection.release();
            if(!err){
                res.redirect('/');
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });
}

exports.viewCustomer = (req,res) =>{
///db connect
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);
        ///user the connection
        connection.query('SELECT * FROM application_customer WHERE id = ?',[req.params.id],(err,rows) =>{
            connection.release();
            if(!err){
                res.render('view-customer',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from db: \n',rows )


        });
    });
}