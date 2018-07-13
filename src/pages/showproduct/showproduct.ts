import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material';
// import {ParseJson} from '../../service/jsonParsePipe';
import { DataService } from '../../service/service';
import {  ActivatedRoute} from '@angular/router';

@Component({
  selector: 'product-child-show',
  templateUrl: './showproduct.html',
  styleUrls: ['./showproduct.css'],

})

export class ShowProduct implements OnInit {
  category =[];
  // imageload = 'http://localhost:9000/image/';
  constructor(private myservice : DataService,private router: Router,private element: ElementRef, @Inject('image_load') private image_load: string) { }

  private imagePath = "https://vignette.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552";



  ngOnInit() {
    this.show();
  }

  show() {
    this.myservice.showCategory().subscribe((data) => {
      if (data.status == 1) {
        this.category = data["data"];
        // this.imageload=this.imageload+"/"+"category/"+this.category[0].image;

        for (var i=0; i<this.category.length;i++) {
            this.category[i].image = this.image_load + 'category/'+ this.category[i].image;
        }

      }
    });
  }

  fetchImage(imageName) {

    if (imageName != undefined) {
  return "http://localhost:9000/image/product/" + imageName;

    }
    return this.imagePath;
  }

  deleteProduct(id, childId) {
    var body = { "_id": id, "_productId": childId };
    console.log(id+" "+childId);

    for (var i =0; i < this.category.length; i++) {
      if ( this.category[i]["_productId"]==childId ) {
        this.category.splice(i,1);
      }
    }


    this.myservice.deleteProduct(body).subscribe((data) => {
      console.log(data);
      if (data.status == 1) {
        alert("yy");
        this.show();
      }
    });
  }

  //navigate for edit/view
  update(id) {

    this.router.navigate(['/createproduct', id]);
  }
  //
  // //open snack bar
  // openSnackBar() {
  //   this.snackBar.open('Deleted Successfully', 'Close', { duration: 1000 });
  // }



}
