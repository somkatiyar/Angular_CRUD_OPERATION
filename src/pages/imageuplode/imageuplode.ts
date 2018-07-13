import { Component, OnInit, ElementRef, Inject} from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../service/service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-imageUplode',
  templateUrl: './imageuplode.html',
  styleUrls: ['./imageuplode.css'],

})
export class ImageUplode implements OnInit {
  image:any;
   details : any= {  "image": "" };

   file: File;
   imageData =[];





  constructor(private myservice : DataService, private element: ElementRef, @Inject('image_load') private image_load: string) { }

  // else {
  //   this.details.image = this.image_load + this.details.image
  // }

  ngOnInit() {
    this.myservice.getImage().subscribe((data) => {

      if ( data["status"] ) {
        this.details = data["data"];
        this.imageData=this.details;
        for (var i=0; i<this.imageData.length; i++) {

        this.imageData[i].image = this.image_load + this.imageData[i].image;
       }
        console.log(this.details);
        }


    });



  }




  changeListner(event) {
    var reader = new FileReader();
    var img = this.element.nativeElement.querySelector('.image');

    reader.onload = (e =>{
      var src = reader.result;
      // img.src = src;
      this.image =src;
    });


    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
  }



  create() {



    var formData = new FormData();
    formData.append("image", this.file);
    this.myservice.addPicture(formData).subscribe((data) => {
     console.log(data);
      if ( data["status"] ) {
        if (data.status == 1) {
          var newEntry = {  "image": data.contents };
          this.details = newEntry;
          this.myservice.addimage(this.details).subscribe((data) => {
            console.log(data);
          });
        }

      }
    });

  }



//delete image function


deleteImage(id){
    confirm("R u sure..! Do you wana delete this image");
    for (var i =0; i < this.imageData.length; i++) {
      if ( this.imageData[i]["_id"]==id ) {
        this.imageData.splice(i,1);
      }
    }




var passValue = {"_id":id};
console.log(passValue);

  this.myservice.picDelete(passValue).subscribe((data) => {


    if (data["status"] ) {
      console.log("image delete",data);

    }


  });

}


findWithAttr(array, attr, value) {
    for(var i = 0; i < this.imageData.length-1; i += 1) {
        if(this.imageData[i][attr] === value) {
            return i;
        }
    }
    return -1;
}






}
