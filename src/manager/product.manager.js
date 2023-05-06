import fs from 'fs';

export default class ProductManager{
  constructor(path){
    this.path = path;
  }
        async #getMaxId(){
            let maxId = 0;
            const products = await this.getALLProducts();
            products.map((prod) => {
            if (prod.id > maxId) maxId = prod.id;
            });
            return maxId;
            }
    

        async getALLProducts() {
            try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf8');
                const productsJS = JSON.parse(products);
                return productsJS;
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

        async createProduct(obj){
            try {
                console.log("createProduct", obj);
                const product = {
                id: await this.#getMaxId() + 1,
                ...obj
                };
                const productsFile = await this.getALLProducts();
                productsFile.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return product;
            } catch (error) {
                console.log(error);
            }
        }

        async updateProduct(obj, id){
            try{
                const productsFile = await this.getALLProducts();
                const index = productsFile.findIndex(prod => prod.id === id);
                console.log('index:::', index);
                if(index === -1){
                    throw new Error(`Id ${id} not found`)
                }else {
                    productsFile[index] = { ...obj, id}
                }
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                } catch (error){
                    console.log(error);
                }
            }
 



            async deleteProductById(id){
                try{
                    const productsFile = await this.getALLProducts();
                    if(productsFile.length > 0){
                        const newArray = productsFile.filter(prod => prod.id !== id);
                        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                    } else {
                        throw new Error(`Product id: ${id} not found`);
                    }
                } catch (error){
                    console.log(error);
                }
            }
        }


       
