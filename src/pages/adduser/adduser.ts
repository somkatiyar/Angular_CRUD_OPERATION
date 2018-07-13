//import statement
import { Component,ElementRef, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { DataService } from '../../service/service';
import { Router ,ActivatedRoute } from '@angular/router';

//component declaration
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.html',
  styleUrls: ['./adduser.css']
})

//class declaration
export class AddUser {
singleUser : String = "";
user : any ={};
btnTitle = "Add";

image : any;

isTrue: boolean = true;


details : any= {  "image": "" };

file: File;
imageData : any;
isImageSelected =false;
imageload = 'http://localhost:9000/image/';

constructor(private myservice : DataService,private router: Router,private activatedRoute: ActivatedRoute,private http: Http, private element :ElementRef,@Inject('image_load') private image_load: string){
      this.singleUser = this.activatedRoute.snapshot.params['id'];

      if ( !this.singleUser ) {
          this.isTrue = false;
      } else {
        this.btnTitle = "Update";
        this.myservice.getSingleUser(this.singleUser).subscribe((data) => {

          if ( data["status"] ) {

            this.user = data["data"][0];
              // console.log(this.user);
              this.imageload=this.imageload+"/"+"user/"+this.user.image;
              // console.log(this.image_load);

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

  update() {

    if (this.isImageSelected) {
      this.uploadFile().then(res => {
        if (res) {
          alert("uploaded")

        }
      })
    } else {
      var newEntry = { "_id": this.activatedRoute.snapshot.params['id'], "username": this.user.username , "password": this.user.password , "email": this.user.email };

      this.user = newEntry;
      console.log(this.user);
      this.myservice.updateUserData(this.user).subscribe((data) => {


      });
    }
  }



  uploadFile(): Promise<any> {
    var formData = new FormData();
    formData.append("image", this.file);
    console.log(this.file);
    //formData.append("cateName", this.details.cateName);
    return new Promise((resolve, reject) => {
      this.myservice.uplodeImageUser(formData).subscribe((data) => {
        console.log(data);
        if (data.status == 1) {
          var newEntry = { "_id": this.activatedRoute.snapshot.params['id'], "username": this.user.username,"password": this.user.password,"email": this.user.email, "image": data.contents, "oldImageName": this.user.image};
          this.user = newEntry;
          console.log(this.user + "i am details");
          this.myservice.updateUserData(this.user).subscribe((data) => {
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
    this.myservice.uplodeImageUser(formData).subscribe((data) => {
     console.log(data);
      if ( data["status"] ) {
        if (data.status == 1) {
          var newEntry = {  "image": data.contents };
          this.details = newEntry;
          console.log(this.details);
           this.addUser();

        }

      }
    });

  }

addUser(){



    // console.log(this.details.image);
    // console.log(this.us);er);
    this.user["image"]=this.details.image;


    console.log(this.user);

    this.myservice.adduser(this.user).subscribe((data) => {
        console.log(data);
      if ( !data["status"] ) {
        console.log("user inserted");
      }
    });
  }

}
