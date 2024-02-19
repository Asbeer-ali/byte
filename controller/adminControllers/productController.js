const Products = require('../../models/productSchema')
const Category = require('../../models/categorySchema')


const getAddProduct= async(req,res)=>{
    const categories = await Category.find({})
    res.render('admin/addProduct',{categories})
}

const addProduct=async(req,res)=>{
    try {
        const productData=req.body
        const {category,stock,discountPrice,actualPrice,productProccess,productStorage,productRam,description,productName}=req.body
        console.log(category,stock,discountPrice,actualPrice,productProccess,productStorage,productRam,description,productName);
        const images = req.files;
        let Images = [];
        for (const fieldImages of Object.values(images)) {        
            for (const image of fieldImages) {
                Images.push(image.filename);             
            }
        }
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
            Images
        })
        product.save()
        res.redirect('/admin/product')
    } catch (error) {
        console.log(error);
    }
}

const getEditProduct = async(req,res) => {
    const {id} = req.params
    console.log(id)
    const catogory = await Category.find({})
    const data = await Products.findById(id).populate('ProductCategory')
    console.log(data,'-----')
    res.render('admin/editProduct',{data,catogory})
}


const EditProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const productDetails = req.body;
        const files = req.files;

        const ProductData = await productUpload.findById(id);
        if (!ProductData) {
            return res.render('errorView/404admin')
        }

        const updateData = {
            ProductName: req.body.ProductName,
            ProductDescription: req.body.ProductDescription,
            Ram: req.body.Ram,
            Storage: req.body.Storage,
            Proccessor: req.body.Proccessor,
            ActualPrice: req.body.ActualPrice,
            DiscountPrice: req.body.DiscountPrice,
            StockQuantity: req.body.StockQuantity,
            ProductCategory: req.body.ProductCategory,
            BrandName: req.body.BrandName,
            images: []
        };

        // Handle main image
        if (files && files.main) {
            updateData.images[0] = files.main[0].filename;
        } else {
            updateData.images[0] = ProductData.images[0];
        }

        // Handle additional images (image1, image2, image3)
        for (let i = 1; i <= 3; i++) {
            const imageName = `image${i}`;
            if (files && files[imageName]) {
                updateData.images[i] = files[imageName][0].filename;
       
            } else {
                updateData.images[i] = ProductData.images[i]
        
            }
        }

        const uploaded = await productUpload.updateOne({ _id: id }, { $set: updateData });
      
        if (uploaded) {
      
            res.redirect('/admin/toproducts');
        } else {
           
        }
    } catch (error) {
      
        throw error;
    }
};


module.exports={
    getAddProduct,
    addProduct,
    getEditProduct,
    EditProduct
}