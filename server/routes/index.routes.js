const router=require('express').Router()
const authRoute=require('./auth.routes');
const userRoute=require('./user.routes');
const categoryRoute=require('./category.routes');
const transactionRoute=require('./transaction.routes');

router.use('/auth',authRoute);
router.use('/user',userRoute);
router.use('/category',categoryRoute);
router.use('/transaction',transactionRoute);

module.exports=router
