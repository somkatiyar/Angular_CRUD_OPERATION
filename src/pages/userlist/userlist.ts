//import statement
import { Component, ElementRef, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { DataService }  from '../../service/service';
import 'rxjs/add/operator/toPromise';

//component declaration
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.html',
  styleUrls: ['./userlist.css']
})

//class declaration
export class UserList {
userData = [];
details = {};
imageData =[]



constructor(private myservice : DataService,private router: Router,private element: ElementRef, @Inject('image_load') private image_load: string){}

ngOnInit(){

  this.myservice.getUser().subscribe((data) => {

    if ( data["status"] ) {
      this.userData = data["data"];

       for (var i=0; i<this.userData.length;i++) {
           this.userData[i].image = this.image_load +'user/'+ this.userData[i].image;
           console.log(this.userData);
       }

    }
  });



}
delete(id){
  console.log(id);
  for (var i =0; i < this.userData.length; i++) {
    if ( this.userData[i]["_id"]==id ) {
      this.userData.splice(i,1);
    }
  }

var passValue = {"_id":id};
console.log(passValue);


  this.myservice.deleteuser(passValue).subscribe((data) => {


    if (data["status"] ) {
      console.log("user delete",data);

    }


  });

}


update(x) {

// this.details={username,password,email};
this.router.navigate(['/adduser',x]);



}




}
