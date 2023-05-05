import  { Router }  from "express";
const router = Router();
import ProductManager from './manager/product.manager.js'

const productManager = new ProductManager('./products.json');

router.get('/products', async(req, res) =>{
   try {
      const products = await productManager.getALLProducts()
      res.status(200).json(products);
   } catch (error) {
    res.status(404).json({ message: error.message});
    console.log(error);
   } 
})

router.get('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductByid(Number(id));
        if (product) {
            res.status(200).json({message: 'Product found', product });
        } else {
            res.status(400).json({message: 'product not found'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    } 
})

 router.post('/products', async (req, res) =>{
    try {
        console.log("post /product", req.body);
        const product = req.body;
       const newProduct = await productManager.createProduct(product);
       res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
 })


router.put('/products/:id', async ( req, res) =>{
    try {
        const product = req.body;
        const { id } = req.params;
        const productFile = await productManager.getProductByid(Number(id));
        if(productFile){
            await productManager.updateProduct(product, Number(id));
            res.send(`product update successfully!`);
        } else{
            res.status(404).send('product not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})

router.delete('/products/:id', async (req, res)=>{
    try {
        const {id } = req.params;
        const products = await productManager.getALLProducts();
        if(products.length > 0){
            await productManager.deleteProductById(Number(id));
            res.send(`product id: ${id} delete successfully`);
        }else{
            res.send(`product id: ${id} not found`)
        }
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})

































 
export default  router;