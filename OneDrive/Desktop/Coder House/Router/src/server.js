import express from 'express';
import routerProducts from './router.products.js';
import  routerCarrito	 from './router.carrito.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/', routerProducts)
app.use('/', routerCarrito)
const PORT = 8088

app.listen(PORT, () => {
  console.log(`server ok en puerto: ${PORT}`);
});