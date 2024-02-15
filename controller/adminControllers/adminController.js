const Customers=require('../../models/userSchema')
const Category=require('../../models/categorySchema')





const adminLogin=(req,res)=>{
    res.render('admin/adminLogin.ejs')
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
    res.render('admin/addCategory')
}
const addCategory = async (req, res) => {
    try {
        const categoryname = req.body.categoryName;

        console.log(categoryname,'category name');
        const category = new Category({
            categoryName: categoryname
        });

        await category.save();

        console.log(category, 'category added');
        res.redirect('/admin/category');
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
       if(category){
           category.categoryName = req.body.categoryName;
           await category.save();
           res.redirect('/admin/category')
       } else{

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
    blockUser
};
