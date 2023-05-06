import  { Router }  from "express";
const router = Router();
import CarritoManager from "./manager/carrito.manager.js";

const carritotManager = new CarritoManager('./carrito.json', './products.json');

router.post('/carrito', async (req, res) =>{
    try {
        console.log("/", req.body);
        const product = req.body;
        const newcart = await carritotManager.createCart(product);
        res.json(newcart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 })

 router.get('/carrito/:id', async(req, res) =>{
    const { id } = req.params;
    try {
        const product = await carritotManager.getcartByid(Number(id));
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
 })

 router.put('/carrito/:cartId/products/:productId' , async(req, res)=>{
    try {
        const { cartId, productId } = req.params;
        const cartFound = await carritotManager.addProductToCart(parseInt(cartId), parseInt(productId));
        res.status(200).json(cartFound);
    } catch (error) {
        res.status(503).json({ message: error.message});
    }
 })

export default router