import Joi from "joi";

class ProductModel {

    // The exact data we want to return to the frontend:
    public id: number;
    public name: string;
    public price: number;
    public stock: number;

    public constructor(product: ProductModel) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        name: Joi.string().required().min(2).max(100),
        price: Joi.number().required().min(0).max(1000),
        stock: Joi.number().required().min(0).max(10000)
    });

    public validate(): string {
        const result = ProductModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default ProductModel;
