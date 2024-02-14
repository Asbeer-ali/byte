const express=require('express')
const router=express.Router()
const adminController=require('../controller/adminControllers/adminController')


// adminrouter.get('/Dashboard',(req,res)=>{
//     res.render('adminLogin')
// })

router.get('/', adminController.home);

router.get('/category',adminController.toCategory)
router.get('/addCategory',adminController.toAddCategory)
router.post('/addCategory',adminController.addCategory)
router.get('/editCategory/:id',adminController.editCategory)
router.post('/editCategory',adminController.postEditCategory)
router.get('/deleteCategory/:id',adminController.deleteCategory)


router.get('/customers',adminController.toUser)
router.get('/blockUser/:id',adminController.blockUser)

module.exports = router;
