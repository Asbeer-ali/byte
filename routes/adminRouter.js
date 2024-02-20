const express=require('express')
const router=express.Router()
const adminController=require('../controller/adminControllers/adminController')
const productController=require('../controller/adminControllers/productController')
const upload=require('../middleWares/productMulter')
// adminrouter.get('/Dashboard',(req,res)=>{
//     res.render('adminLogin')
// })

//admin login
router.get('/',adminController.adminLogin)
router.post('/login',adminController.loginPost)


router.get('/home', adminController.home);


router.get('/category',adminController.toCategory)
router.get('/addCategory',adminController.toAddCategory)
router.post('/addCategory',adminController.addCategory)
router.get('/editCategory/:id',adminController.editCategory)
router.post('/editCategory',adminController.postEditCategory)
router.get('/deleteCategory/:id',adminController.deleteCategory)
router.get('/product',adminController.product)


router.get('/customers',adminController.toUser)
router.get('/blockUser/:id',adminController.blockUser)

const uploadFields = [
    { name: "main", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount:1},
  ];
router.get('/addProduct',productController.getAddProduct)
router.post('/addProduct',upload.fields(uploadFields),productController.addProduct)

router.get('/editProduct/:id',productController.getEditProduct)
router.post('/postEdit-product/:id',upload.fields(uploadFields),productController.EditProduct)
module.exports = router;
