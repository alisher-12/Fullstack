import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import ProductModel from "../4-models/product-model";

// Get all products: 
async function getAllProducts(): Promise<ProductModel[]> {

    // Create sql: 
    const sql = `SELECT
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock 
                    FROM products`;

    // Get data from database: 
    const products = await dal.execute(sql);

    // Return it:
    return products;
}

// Get one product: 
async function getOneProduct(id: number): Promise<ProductModel> {
    const sql = `SELECT
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock 
                    FROM products
                    WHERE ProductID = ${id}`;

    const products = await dal.execute(sql); // returns empty array if not found

    const product = products[0];

    if (!product) throw new IdNotFoundError(id);

    return product;
}

// Add new product: 
async function addProduct(product: ProductModel): Promise<ProductModel> {

    const error = product.validate();
    if (error) throw new ValidationError(error);

    const sql = `INSERT INTO products(ProductName, UnitPrice, UnitsInStock)
                 VALUES('${product.name}', ${product.price}, ${product.stock})`;

    const result: OkPacket = await dal.execute(sql);

    product.id = result.insertId;

    return product;
}

// Update product: 
async function updateProduct(product: ProductModel): Promise<ProductModel> {

    const error = product.validate();
    if (error) throw new ValidationError(error);

    const sql = `UPDATE products SET
                    ProductName = '${product.name}',
                    UnitPrice = ${product.price},
                    UnitsInStock = ${product.stock}
                    WHERE ProductID = ${product.id}`;

    const result: OkPacket = await dal.execute(sql);

    if (result.affectedRows === 0) throw new IdNotFoundError(product.id);

    return product;
}

// Delete product: 
async function deleteProduct(id: number): Promise<void> {

    const sql = `DELETE FROM products WHERE ProductID = ${id}`;

    const result: OkPacket = await dal.execute(sql);

    if (result.affectedRows === 0) throw new IdNotFoundError(id);
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
}
