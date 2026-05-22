const router=require('express').Router();
const authMiddleware=require('../middlewares/auth.middleware');
const {createCategory,getAllCategory,deleteParticularCategory}=require('../controller/category.controller');

router.post('/',authMiddleware,createCategory);
router.get('/',authMiddleware,getAllCategory);
router.delete('/:id',authMiddleware,deleteParticularCategory);

module.exports=router