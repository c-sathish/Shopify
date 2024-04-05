import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product-list';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  selectedProduct!: Product;

  constructor(
    private productService:
    ProductService,
    private router:Router){}

  productList = {};
  productArray:any;
  
  
editProduct(arg0: any) {
  this.selectedProduct = arg0;
  console.log(arg0);
  let finalJson:any = {};
  finalJson["value"]= JSON.stringify(arg0);
  finalJson["isEdit"] = true;
console.log(finalJson);


  let navigationExtras: NavigationExtras = {
    
    queryParams : finalJson
};
  this.router.navigate(['/products'],navigationExtras)
  
}
deleteProduct(arg0: any) {
  this.productService.deleteProduct(arg0).subscribe((res) => {
  this.loadData();
    
  })
}
 
  ngOnInit(): void  {
      this.loadData();
      this.selectedProduct = {title: "", price:"", description:"",imageUrl:""};
  }

  loadData(){
    this.productArray = [];
    this.productService.getAllProducts().subscribe((res) => {
      this.productList = res;
      console.log(this.productList);
  
      for (const [k, v] of Object.entries(this.productList)) {
        let temp: any = v;
        temp["id"] = k;
        this.productArray.push(temp)
        
      } 
      console.log(this.productArray);   
    })
    
  }
}
