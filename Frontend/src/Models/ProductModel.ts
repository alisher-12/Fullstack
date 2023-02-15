class ProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageName: string;
    public image: FileList; // <input type="file" /> can select multiple files
}

export default ProductModel;
