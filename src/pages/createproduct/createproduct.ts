import { Component, OnInit, ElementRef, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { DataService }  from '../../service/service';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'createproduct',
  templateUrl: './createproduct.html',
  styleUrls: ['./createproduct.css'],

})
export class CreateProduct implements OnInit {
  singleProduct : string="";
 details :any= { "_id": "", "productName": "",  "productCount": "", "productImage": "",};
 done = false;
file: File;
category = [];
isImageSelected =false;

isTrue : boolean=true;
btnTitle="Add";
productData : string;
value = {};
imageload = 'http://localhost:9000/image/';


  constructor(private myservice : DataService,private router: Router,private activatedRoute: ActivatedRoute,private element: ElementRef, @Inject('image_load') private image_load: string) {
   this.singleProduct = this.activatedRoute.snapshot.params['id'];


         if ( !this.singleProduct ) {
             this.isTrue = false;
         } else {

           this.btnTitle = "Update";

         }

 }

 Register(){
   if ( this.btnTitle == "Add" ) {
     this.create();
   } else {
     this.update();
   }
 }




  ngOnInit() {
    this.showCategory();

  }

  showCategory() {

    this.myservice.showCategory().subscribe((data) => {

      if ( data["status"] ) {

        this.category=data['data'];
    

            var x = data['data'];

                for(var i = 0;i<x.length;i++)
                  {
                      var y = x[i]['product'];
                      for(var j = 0;j<y.length;j++){
                        this.productData=y[j];

                          if(this.singleProduct==y[j]._productId){
                          this.details=this.productData;
                          // console.log(this.details);
                          }


                        }
                    }
                    this.imageload=this.imageload+"/"+"product/"+this.details.productImage;
                    // console.log(this.imageload);

          }
    });
  }





// update function

update() {

  if (this.isImageSelected) {
    alert("image selected");
    this.uploadFile().then(res => {
      if (res) {
        alert("uploaded")

      }
    })
  } else {
    var newEntry = { "_productId": this.activatedRoute.snapshot.params['id'], "productName": this.details.productName,"productCount": this.details.productCount };

    this.details = newEntry;
    console.log(this.details);
    this.myservice.updateProduct(this.details).subscribe((data) => {

alert("update data without image");
    });
  }
}

uploadFile(): Promise<any> {
  var formData = new FormData();
  formData.append("productImage", this.file);
  // console.log(this.file);
  //formData.append("cateName", this.details.cateName);
  return new Promise((resolve, reject) => {
    this.myservice.uploadProductImage(formData).subscribe((data) => {
      // console.log(data);
      if (data.status == 1) {
        var newEntry = { "_productId": this.activatedRoute.snapshot.params['id'], "productName": this.details.productName,"productCount" : this.details.productCount, "productImage": data.contents, "oldImageName": this.details.productImage};
        this.details = newEntry;
        // console.log(this.details + "i am details");
        this.myservice.updateProduct(this.details).subscribe((data) => {
          if (data.status == 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  });
}




























  changeListner(event) {
    var reader = new FileReader();
    var img = this.element.nativeElement.querySelector('.image');
    this.isImageSelected = true;
    reader.onload = function(e) {
      var src = reader.result;
      img.src = src;
    };
    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
  }

  create() {

    var formData = new FormData();
    formData.append("productImage", this.file);

    //formData.append("cateName", this.details.cateName);
    this.myservice.uploadProductImage(formData).subscribe((data) => {
      console.log(data);
      if (data.status == 1) {
        var newEntry = { "_id": this.details._id, "productName": this.details.productName, "productCount" : this.details.productCount, "productImage": data.contents };
        this.details = newEntry;
        this.myservice.createProduct(this.details).subscribe((data) => {
          console.log(data);
        });
      }

    });
  }
}
