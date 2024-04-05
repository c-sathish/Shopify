import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product-list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input("product")
  product: Product; 
  @Input("isEdit") isEdit:boolean = false;
  

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private productService:ProductService) {
    this.product = {title: "", price:"", description:"",imageUrl:""};
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.product = JSON.parse(params["value"]) as Product;
      console.log(this.product);
      
      this.isEdit = params["isEdit"];
      
  });
  }
  
  ngOnInit(): void {
   
  }

  save(products: {name:string,price:string,description:string}) {
    if(this.isEdit){
      console.log(this.product.id);
      console.log(products);
      
      this.productService.updateProduct(this.product.id, products).subscribe( (res) => {
        console.log(res);
        this.router.navigate(['/']);
      })
    }else
    {
      this.productService.createProduct(products);
      this.router.navigate(['/']);
    }  
    
  }

  addProduct(){
    this.product = {title: "", price:"", description:"",imageUrl:""};
    this.isEdit = false;
  }
}
