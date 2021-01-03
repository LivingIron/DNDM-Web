
const express=require('express');
const router = express.Router();
const formController=require('../controllers/formController.js');


//==============Form routes=====================


router.get('/',formController.form_index);

router.get('/create',formController.form_create_get);

router.get('/:id',formController.form_details);

router.post('/',formController.form_create_post);

router.delete('/:id',formController.form_create_delete);

 module.exports = router;
 
