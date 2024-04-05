import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product-list';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

allProducts: Product[] = [];

  constructor(private http:HttpClient) { }

  createProduct(products: {name:string,price:string,description:string}) {
    this.http.post('https://shopify-3882f-default-rtdb.asia-southeast1.firebasedatabase.app/produxts.json',
    products)
    .subscribe((res) => {
      console.log(res);
    });
  }


  getAllProducts(){
    return this.http.get('https://shopify-3882f-default-rtdb.asia-southeast1.firebasedatabase.app/produxts.json')
  }

  deleteProduct(id:string){
    return this.http.delete(`https://shopify-3882f-default-rtdb.asia-southeast1.firebasedatabase.app/produxts/${id}.json`)
  }

  updateProduct(id:any,product:any){
    return this.http.put(`https://shopify-3882f-default-rtdb.asia-southeast1.firebasedatabase.app/produxts/${id}.json`,product)
  }

  getProductId(productId: number) {
    
    const apiUrl = `https://shopify-3882f-default-rtdb.asia-southeast1.firebasedatabase.app/produxts/${productId}.json`;
      return this.http.get(apiUrl);
  }
}
