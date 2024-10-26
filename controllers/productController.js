
import Product from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


export const createProduct = async (req, res) => {
  const { 
    product_name, 
    product_description, 
    category, 
    seller_id, 
    product_type, 
    original_price, 
    sale_price 
  } = req.body;
  const file = req.file;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Create product in MongoDB
    const product = new Product({
      product_name,
      product_description,
      category,
      seller_id,
      product_type,
      original_price,
      sale_price,
      imageUrl: result.secure_url,
    });
    await product.save();

    // Delete local file after uploading to Cloudinary
    await fs.promises.unlink(file.path);

    res.status(201).json(product);
  } catch (error) {
    // Delete local file in case of error
    if (file) await fs.promises.unlink(file.path);
    res.status(500).json({ error: "Failed to create product", details: error.message });
  }
};


// Other CRUD functions: getAllProducts, getProductById, updateProduct, deleteProduct
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};



// import Product from '../models/productModel.js';
// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

// // Create Product
// export const createProduct = async (req, res) => {
//   const { name, price } = req.body;
//   const file = req.file;

//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path);
    
//   //  const result = await cloudinary.uploader.upload("uploads/9070206.png")
//   // .then(result => console.log(result))
//   // .catch(error => console.error(error));

    
//     // Create product in MongoDB
//     const product = new Product({
//       name,
//       price,
//       imageUrl: result.secure_url,
//     });
//     await product.save();

//     // Delete local file after uploading to Cloudinary
//     // fs.unlinkSync(file.path);

//      // Delete local file after uploading to Cloudinary
//      await fs.promises.unlink(file.path);

//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create product", details: error.message });
//   }
// };
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     console.log(products);  // Add this line to debug
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve products" });
//   }
// };


// // Other CRUD functions: getAllProducts, getProductById, updateProduct, deleteProduct
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve products" });
//   }
// };

// // Additional CRUD functions like getProductById, updateProduct, deleteProduct should be implemented similarly
