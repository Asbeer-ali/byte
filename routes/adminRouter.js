const express=require('express')
const router=express.Router()
const adminController=require('../controller/adminControllers/adminController')
const productController=require('../controller/adminControllers/productController')
const upload=require('../middleWares/productMulter')
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

const uploadFields = [
    { name: "main", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount:1},
  ];
router.get('/addProduct',productController.getAddProduct)
router.post('/addProduct',upload.fields(uploadFields),productController.addProduct)

module.exports = router;
