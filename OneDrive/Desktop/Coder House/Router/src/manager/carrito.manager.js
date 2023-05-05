import fs from 'fs';

export default class CarritoManager{
  constructor(carritoPath, productsPath){
    this.carritoPath = carritoPath;
    this.productsPath = productsPath;
    }

    async #getMaxId(){
        let maxId = 0;
        const products = await this.getALLcart();
        products.map((prod) => {
            if (prod.id > maxId) maxId = prod.id;
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
            const product  = products.find((prod) => prod.id === id);
            if(product) {
                return product
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(obj){
        try {
            console.log("createcart", obj);
            const cartJson = await this.getALLcart();
            const product = await this.getProductByid(obj.product);

            if (product) {
                
                const cart = {
                    id: await this.#getMaxId() + 1,
                    products: [obj]
                };
                
                cartJson.push(cart);
                await fs.promises.writeFile(this.carritoPath, JSON.stringify(cartJson));
                return cart;

            } else {
                throw new Error(`Product ${obj.product} not found`)
            }
        } catch (error) {
            throw new Error(`Error creating cart`)
        }
    }

    async getcartByid(id){
        try {
            const products = await this.getALLcart();
            const product  = products.find((prod) => prod.id === id);
            if(product) {
            return product
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(obj, id) {
        try {
            const carritoFile = await this.getALLcart();
            const index = carritoFile.findIndex((cart) => cart.id === id);
            console.log('index:::', index);

            if(index === -1) {
                throw new Error(`Id ${id} not found`);
            } else {
                carritoFile[index] = { ...obj, id}
                existingProduct.quantity += 1;
                selectedCart
            }
            
            return selectedCart;
        } catch (error) {
            console.log(error)
        }
    }

}


    

   
    

    


 