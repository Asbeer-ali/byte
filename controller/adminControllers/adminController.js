const Customers=require('../../models/userSchema')
const Category=require('../../models/categorySchema')
const products=require('../../models/productSchema')
require("dotenv").config();

  const {ADMIN_EMAIL,ADMIN_PASS}=process.env;
   



const adminLogin=(req,res)=>{
    res.render('admin/adminLogin.ejs')
}

const loginPost=(req,res)=>{
    try {
        const {username,password}=req.body
        if(ADMIN_EMAIL===username&&ADMIN_PASS===password){
            res.redirect('/admin/home')
        }
        
    } catch (error) {
        console.error('error while admin login',error)
        
    }
}

const home=(req,res)=>{
    res.render('admin/dashBoard')
}

const toCategory= async(req,res)=>{
    try {
        let categoryData= await Category.find()
        let i=1
        res.render('admin/categoryManagement',{categoryData,i})
    } catch (error) {
        
    }
}

//..........................................CATEGORY............................................
const toAddCategory=(req,res)=>{
    res.render('admin/addCategory',{error:false})
}
const addCategory = async (req, res) => {
    try {
        let category = req.body.categoryName;
        let categoryname=category.toUpperCase()
        console.log(categoryname,'upper cased name');
        const categoryChecking=await Category.find({categoryName:categoryname})

        console.log(categoryname,categoryChecking,'category name');
        if(categoryChecking.length>0){
            res.render('admin/addCategory',{error:'Already Existing'})
            console.log('inside of the chcking');
            
        }else{
            console.log('inside of the else');
            const category = new Category({
                categoryName: categoryname
            });
            await category.save();
            res.redirect('/admin/category');
        }

       
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const editCategory=async(req,res)=>{
    try {
        const categoryId=req.params.id
        const categoryData= await Category.findOne({_id:categoryId})
        console.log(categoryData);
        res.render('admin/editCategory',{categoryData})
    } catch (error) {
        console.log(error);
    }
}

const postEditCategory=async(req,res)=>{
    try {
        const categoryId=req.body.id
        const category = await Category.findById(categoryId);
        const categoryname=category.categoryName
        categoryname.toUpperCase()
        const categoryChecking=await Category.find({categoryName:categoryname})

        console.log(categoryname,'category name');
        if(!categoryChecking){
       if(category){
           category.categoryName = req.body.categoryName;
           await category.save();
           res.redirect('/admin/category')
       } else{
        res.render('admin/addCategory',{error:'Already Existing',categoryData:category})
       }
    }else{

    }
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory=async (req,res)=>{
    try {
        const categoryId=req.params.id
        const category = await Category.findOneAndDelete({ _id: categoryId })
        res.redirect('/admin/category')
    } catch (error) {
        console.error(error);
    }
}

//...................................User Management.........................................

const toUser=async(req,res)=>{
    try {
        const customerData= await Customers.find()
        
        res.render('admin/customers',{customerData})
    } catch (error) {
        console.log(error);
    }
}

const blockUser=async(req,res)=>{
    try {
       const customerId=req.params.id
      const customer= await Customers.findById(customerId) 
      customer.Status = !customer.Status;
      await customer.save();
      res.redirect('/admin/customers')
    } catch (error) {
        console.log(error);
    }
}

//PRODUCTS...............
const product=async(req,res)=>{
    try {
        const productData=await products.find()
        var i=1
        
        console.log(productData,'----------------');
        res.render('admin/product',{productData,i})
    } catch (error) {
        console.error('error while rendering product page',error)
        
    }
   
}


module.exports = {
    adminLogin,
    home,
    toCategory,
    toAddCategory,
    addCategory,
    editCategory,
    postEditCategory,
    deleteCategory,
    toUser,
    blockUser,
    loginPost,
    product
};
