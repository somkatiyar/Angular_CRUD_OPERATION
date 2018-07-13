//import statement
import { Component, ElementRef, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { DataService }  from '../../../service/service';
import 'rxjs/add/operator/toPromise';
//component declaration
@Component({
  selector: 'app-showcategory',
  templateUrl: './showcategory.html',
  styleUrls: ['./showcategory.css']
})

//class declaration
export class ShowCategory {
categoryData = [];
details = {};
// imageload = 'http://localhost:9000/image/';



constructor(private myservice : DataService,private router: Router, private element: ElementRef, @Inject('image_load') private image_load: string){}

ngOnInit(){

  this.myservice.showCategory().subscribe((data) => {

    if ( data["status"] ) {
      this.categoryData = data["data"];
      console.log(this.categoryData);
      // this.imageload=this.imageload+"/"+"category/"+this.categoryData.image;

      for (var i=0; i<this.categoryData.length;i++) {
          this.categoryData[i].image = this.image_load + 'category/'+ this.categoryData[i].image;
      }


    }
  });





}
delete(id){
console.log(id);
for (var i =0; i < this.categoryData.length; i++) {
  if ( this.categoryData[i]["_id"]==id ) {
    this.categoryData.splice(i,1);
  }
}

var passValue = {"_id":id};

  this.myservice.removeCategory(passValue).subscribe((data) => {


    if (data["status"] ) {
      console.log("category delete",data);

    }


  });

}


update(x) {

// this.details={username,password,email};
this.router.navigate(['/createcategory',x]);



}







}
