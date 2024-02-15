const Products=require('../../models/productSchema')


const getAddProduct=(req,res)=>{
    res.render('admin/addProduct')
}

const addProduct=async(req,res)=>{
    try {
        const productData=req.body
        const {category,stock,discountPrice,actualPrice,productProccess,productStorage,productRam,description,productName}=req.body
        console.log(category,stock,discountPrice,actualPrice,productProccess,productStorage,productRam,description,productName);
        const product=await new Products(
        {
            ProductName:productName,
            ProductDescription:description,
            Ram:productRam,
            Storage:productStorage,
            Proccessor:productProccess,
            ActualPrice:actualPrice,
            DiscountPrice:discountPrice,
            StockQuantity:stock,
            ProductCategory:category,

        })
        product.save()
        res.send('success')
    } catch (error) {
        console.log(error);
    }
}
module.exports={
    getAddProduct,
    addProduct
}