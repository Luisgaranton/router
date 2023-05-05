import  { Router }  from "express";
const router = Router();
import CarritoManager from "./manager/carrito.manager.js";

const carritotManager = new CarritoManager('./carrito.json');

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
    try {
        const {  id } = req.params;
       const product = await carritotManager.getcartByid(Number(id));
       if(product){
        res.status(200).json({message: 'Product found', product });
       }else {
        res.status(400).send('product not found')
       }
    } catch (error) {
     res.status(484).json({ message: error.message});
    } 
 })

 router.post('/carrito/:id/products/:id' , async(req, res)=>{

 })

export default router