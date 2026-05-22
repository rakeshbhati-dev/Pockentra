const router=require('express').Router();

const authMiddleware=require('../middlewares/auth.middleware');
const {getStats}=require('../controller/dashboard.controller');

router.get('/',authMiddleware,getStats);

module.exports=router