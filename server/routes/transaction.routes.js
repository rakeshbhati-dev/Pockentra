const router=require('express').Router()
const authMiddleware=require('../middlewares/auth.middleware');
const {createTransaction,getParticularTransaction,getParticularUserTransaction,updateTransaction, deleteParticularTransaction}=require('../controller/transaction.controller');

router.post('/',authMiddleware,createTransaction);
router.get('/',authMiddleware,getParticularUserTransaction);
router.get('/:id',authMiddleware,getParticularTransaction);
router.put('/:id',authMiddleware,updateTransaction);
router.delete('/:id',authMiddleware,deleteParticularTransaction);
module.exports=router
