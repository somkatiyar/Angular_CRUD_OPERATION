//import statement
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { DataService }  from '../../service/service';
import {  ActivatedRoute,Router} from '@angular/router';

//component declaration

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})

//class declaration
export class Admin {



  // user = [];
   details = {};

 


//constructor of the class
constructor(private myservice : DataService,private router: Router){}



// method invoke when the component lode
  ngOnInit(){



  }




  validateAdmin(){
    // alert("pp");
  //  console.log(this.details);return;

    this.myservice.fetchdata(this.details).subscribe((data) => {

      console.log(data);

      if ( !data["status"] ) {
        console.log("invalid data");

      } else {


           this.router.navigate(['/showdata']);
      }

    });

  }






// //page navigate with id
//   navigateShowData(x){
//     this.router.navigate(['/showdata',x.id]);
//
//   }
}
