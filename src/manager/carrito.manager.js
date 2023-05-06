import fs from 'fs';

export default class CarritoManager{
  constructor(carritoPath, productsPath){
    this.carritoPath = carritoPath;
    this.productsPath = productsPath;
    }

    async #getMaxId(){
        let maxId = 0;
        const cartsJson = await this.getALLcart();
        cartsJson.map((cartItem) => {
            if (cartItem.id > maxId) maxId = cartItem.id;
        });
        return maxId;
    }

    async getALLcart() {
        try {
            if (fs.existsSync(this.carritoPath)) {
                const carritoFile = await fs.promises.readFile(this.carritoPath, 'utf8');
                const carritoJson = JSON.parse(carritoFile);
                return carritoJson;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getALLProducts() {
        try {
            if (fs.existsSync(this.productsPath)) {
                const productsFile = await fs.promises.readFile(this.productsPath, 'utf8');
                const productsJson = JSON.parse(productsFile);
                return productsJson;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductByid(id){
        try {
            const products = await this.getALLProducts();
            console.log(products)
            const product  = products.find((prod) => prod.id === id);
            if(product) {
                return product
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(objRequest) {
        try {
            console.log("createcart", objRequest);
            if (!Array.isArray(objRequest)) {
                const cartJson = await this.getALLcart();
                const product = await this.getProductByid(objRequest.product);

                if (product) {
                    
                    const cart = {
                        id: await this.#getMaxId() + 1,
                        products: [product]
                    };
                    
                    cartJson.push(cart);
                    await fs.promises.writeFile(this.carritoPath, JSON.stringify(cartJson));
                    return cart;

                } else {
                    throw new Error(`Product ${objRequest.product} not found`);
                }
            } else {
                throw new Error(`Bad structure, should send an object with product id`);
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getcartByid(id){
        try {
            const carts = await this.getALLcart();
            const cartFound = carts.find((cart) => cart.id === id);
            if(cartFound) {
                return cartFound
            }
            throw new Error(`Cart ${id} not found`);
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cartId, productId) {
        if (typeof cartId == 'number' && typeof productId == 'number') {
            try {
                const carts = await this.getALLcart();
                const cartIndexFound = carts.findIndex((cart) => cart.id === cartId);
                
                if(cartIndexFound === -1) {
                    throw new Error(`Cart Id ${cartId} not found`);
                } else {
    
                    const products = await this.getALLProducts();
                    const productFound = products.find((product) => product.id === productId);
                    
                    if (productFound) {
                        console.log("cartIndexFound", cartIndexFound);
                        console.log("cartItem", carts[cartIndexFound]);
                        carts[cartIndexFound].products.push(productFound);
                    } else {
                        throw new Error(`Product Id ${productId} not found`);
                    }
    
                    await fs.promises.writeFile(this.carritoPath, JSON.stringify(carts));

                    return carts[cartIndexFound];
                }
            } catch (error) {
                throw new Error(error.message);
            }
        } else {
            throw new Error(`CartId && ProductId should be number`);
        }
    }
}