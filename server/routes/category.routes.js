const router=require('express').Router();
const authMiddleware=require('../middlewares/auth.middleware');
const {createCategory,getAllCategory}=require('../controller/category.controller');

router.post('/',authMiddleware,createCategory);
router.get('/list',authMiddleware,getAllCategory);

module.exports=router