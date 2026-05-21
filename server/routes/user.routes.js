const router=require('express').Router()
const authMiddleware=require('../middlewares/auth.middleware');
const {getParticularUser,updateParticularUser}=require('../controller/user.controller');

router.get('/',authMiddleware,getParticularUser);
router.put('/',authMiddleware,updateParticularUser)
module.exports=router