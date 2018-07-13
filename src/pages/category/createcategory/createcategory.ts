//import statement
import { Component,ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { DataService } from '../../../service/service';
import { Router ,ActivatedRoute } from '@angular/router';

//component declaration
@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.html',
  styleUrls: ['./createcategory.css']
})

//class declaration
export class CreateCategory {
singleCategory : String = "";
category : any={};
btnTitle = "Add";

singleUser : String = "";
isImageSelected =false;



image : any;

isTrue: boolean = true;


details : any= { "catName" : "" ,"image": "" };


file: File;
imageload = 'http://localhost:9000/image/';



constructor(private myservice : DataService,private router: Router,private activatedRoute: ActivatedRoute,private http: Http, private element :ElementRef){
      this.singleCategory = this.activatedRoute.snapshot.params['id'];


      if ( !this.singleCategory ) {
          this.isTrue = false;
      } else {
        this.btnTitle = "Update";
        this.myservice.getSingleCategory(this.singleCategory).subscribe((data) => {

          if ( data["status"] ) {

            this.category = data["data"][0];
              console.log(this.category);

              this.imageload=this.imageload+"/"+"category/"+this.category.image;



          }
        });
      }


  }



  Register(){
    if ( this.btnTitle == "Add" ) {
      this.create();
    } else {
      this.update();
    }
  }

  // updateCategory() {
  //
  //   console.log(this.details)Mi;
  //   this.category["image"]=this.details.image;
  //   console.log("toUpdate:",this.category);
  //   this.myservice.updateCategory(this.category).subscribe((data) => {
  //
  //   });
  // }  console.log(data);




  update() {

    if (this.isImageSelected) {
      this.uploadFile().then(res => {
        if (res) {
          alert("uploaded")

        }
      })
    } else {
      var newEntry = { "_id": this.activatedRoute.snapshot.params['id'], "catName": this.category.catName };

      this.category = newEntry;
      console.log(this.category);
      this.myservice.updateCategory(this.category).subscribe((data) => {


      });
    }
  }

  uploadFile(): Promise<any> {
    var formData = new FormData();
    formData.append("image", this.file);
    console.log(this.file);
    //formData.append("cateName", this.details.cateName);
    return new Promise((resolve, reject) => {
      this.myservice.uploadCateImage(formData).subscribe((data) => {
        console.log(data);
        if (data.status == 1) {
          var newEntry = { "_id": this.activatedRoute.snapshot.params['id'], "catName": this.category.catName, "image": data.contents, "oldImageName": this.category.image};
          this.category = newEntry;
          console.log(this.category + "i am details");
          this.myservice.updateCategory(this.category).subscribe((data) => {
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

    reader.onload = (e =>{
      var src = reader.result;

      this.image =src;
    });


    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
  }




    create() {



      var formData = new FormData();
      formData.append("image", this.file);
      this.myservice.uploadCateImage(formData).subscribe((data) => {
       console.log(data);
        if ( data["status"] ) {
          if (data.status == 1) {
            var newEntry = {  "image": data.contents };
            this.details = newEntry;
            console.log(this.details);
            this.  addCategory();


          }

        }
      });

    }




  addCategory(){
    this.category["image"]=this.details.image;


    console.log(this.category);
    this.myservice.createCategory(this.category).subscribe((data) => {

      if ( !data["status"] ) {
        console.log("category inserted");
      }
    });
  }
}
