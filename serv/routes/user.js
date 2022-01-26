const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//create,find,update,delete


router.get('/',userController.view);
router.post('/',userController.find);
router.get('/addcustomer',userController.form);
router.post('/addcustomer',userController.create);
router.get('/editcustomer/:id',userController.edit);
router.post('/editcustomer/:id',userController.update);


router.get('/addproduct',userController.productform);
router.post('/addproduct',userController.productcreate);

router.get('/:id',userController.delete);
router.get('/viewcustomer/:id',userController.viewCustomer);

module.exports = router;