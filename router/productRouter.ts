
import express, { response } from 'express';
import { IProduct } from '../models/IProduct';
import productTable from '../models/product';

const productRouter: express.Router = express.Router();

/*
    1) Read all the Information 
       
       URL:- http://127.0.0.1:5000/api/products
       METHOD :- GET
       FIELDS :- no-fields
*/

productRouter.get('/products', async(request: express.Request, response: express.Response) => {
    try {
        let products=await productTable.find();
        response.status(200).json({products: products});
    }catch (err) {
        response.status(500).json({ err: err.message })
    }
})

/*
    2) Read single  Information 
       
       URL:- http://127.0.0.1:5000/api/products/productId
       METHOD :- GET
       FIELDS :- no-fields
*/

productRouter.get('/products/:productId',async (request: express.Request, response: express.Response) => {
    let productId: string = request.params.productId;
    try {
        let product =await productTable.findById(productId);
        response.status(200).json({ product: product})
    }catch (err) {
        response.status(500).json({err: err.message})
    }
})


/*
    3) create  Information 
       
       URL:- http://127.0.0.1:5000/api/products
       METHOD :- POST
       FIELDS :- no-fields
*/

productRouter.post('/products', async(request: express.Request, response: express.Response) => {
    let newProduct: IProduct = {
        name: request.body.name,
        image: request.body.image,
        price: request.body.price,
        qty: request.body.qty,
        info: request.body.info
    }
    try {
        let product=await productTable.findOne({name:newProduct.name})
        
        if(product){
            return response.status(401).json({ msg: 'Product already exist' })
        }
        // insert(if product is not there)
        product=new productTable(newProduct)
        product=await product.save();
        response.status(200).json({ msg: 'Created A New Product', product:product })
    }catch(err){
        response.status(500).json({ err: err.message})
    }
})

/*
    3) Update single  Information 
       
       URL:- http://127.0.0.1:5000/api/products/productId
       METHOD :- put
       FIELDS :- no-fields
*/

productRouter.put('/products/:productId',async (req: express.Request, res:express.Response) => {
    let productId = req.params.productId;
    let UpdatedProduct: IProduct={
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info
    }
    try{ 
        // check whether product is existing or not
        let product = await productTable.findById(productId);
        if(!product){
            res.status(401).json({message:'Product is not available'});
        }
        // update if product is available
        product=await productTable.findByIdAndUpdate(productId,{
            $set:UpdatedProduct
        },{new:true});
        res.status(200).json({msg:'Product updated successfully',product:product});
    }catch(err){
          res.status(500).json({err:err.message});
    }

})


/*
    4)Delete  Information 
       
       URL:- http://127.0.0.1:5000/api/products/productId
       METHOD :- delete
       FIELDS :- no-fields
*/

productRouter.delete('/products/:productId', async (request: express.Request, response: express.Response)=>{
    let productId =request.params.productId;
    try {
        // check for product is available or not
        let product=await productTable.findById(productId);
        if(!product) {
            response.status(401).json({message:'Product not found'})
        }
        // if available dn delete product
        product=await productTable.findByIdAndDelete(productId)
        response.status(200).json({message:'Product deleted',product:product})
    }catch(err) {
        response.status(500).json({err: err.message})
    }
})






export default productRouter;