//import statement
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router ,ActivatedRoute } from '@angular/router';

//component declaration
@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.html',
  styleUrls: ['./showdata.css']
})

//class declaration
export class ShowData {

  // timeInfo :any;
  today:any;


//constructor of the class
  constructor(private router: Router,private activatedRoute: ActivatedRoute){

  //id data hold by local var ,(id data come from other page)
     // this.timeInfo = this.activatedRoute.snapshot.params['today'];
     // console.log(this.timeInfo);
     this.today=new Date();
   console.log("ll"+this.today);


}
}
