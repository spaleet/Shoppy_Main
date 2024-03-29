import { ProductModel } from '@app_models/shop/product/product';
export class ProductCategoryModel {
    constructor(
         public id: string,
         public title: string,
         public imagePath: string,
         public imageAlt: string,
         public imageTitle: string,
         public slug: string,
         public metaKeywords:string,
         public metaDescription:string,
         public products: ProductModel[],
     ){}
 }