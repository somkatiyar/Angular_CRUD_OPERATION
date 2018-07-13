
import { Component , ElementRef  } from '@angular/core';
import {  ActivatedRoute,Router} from '@angular/router';

import { Http, Headers } from '@angular/http';

import { DataService }  from '../../service/service';

//component declaration

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})


export class Test {
private file: File;
image: any;
userData=[];


  constructor(private element :ElementRef,private myservice : DataService,private router: Router ){}




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



ngOnInit(){
// this.myservice.getImage().subscribe((data) => {
//
//   if ( data["status"] ) {
//     this.userData = data["data"];
//     console.log(this.userData);
//
//   }
// });
}

addimage(){
  // var img = this.element.nativeElement.querySelector('.image');
  console.log("Base64:",this.image);
  this.myservice.addimage({'image':this.image}).subscribe((data) => {

    if ( !data["status"] ) {
      console.log("image inserted");
    }
  });
}



}
