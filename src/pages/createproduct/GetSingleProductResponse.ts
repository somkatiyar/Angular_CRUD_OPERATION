

export interface GetSingleProduct {
  data?: (DataEntity)[] | null;
  status: boolean;
  status_code: string;
}
export interface DataEntity {
  product: ProductEntity[] ;
}
export interface ProductEntity {
  _productId: string;
  productName: string;
  productImage: string;
  productCount: string;
}
