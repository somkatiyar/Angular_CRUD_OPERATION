//import statement
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/service';

//component declaration
@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})

//class declaration
export class Footer {

details ={};

constructor(private myservice : DataService,private router: Router){}


  ngOnInit(){}



}
