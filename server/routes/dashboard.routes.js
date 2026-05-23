const router=require('express').Router();

const authMiddleware=require('../middlewares/auth.middleware');
const {getStats,getExpenseBreakdown}=require('../controller/dashboard.controller');

router.get('/',authMiddleware,getStats);
router.get('/expense-breakdown',authMiddleware,getExpenseBreakdown);

module.exports=router