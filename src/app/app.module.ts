import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {Admin} from '../pages/admin/admin';
import {ShowData} from '../pages/showdata/showdata';
import {UserList} from '../pages/userlist/userlist';
import {AddUser} from '../pages/adduser/adduser';
import {Test} from '../pages/test/test';
import {ImageUplode} from '../pages/imageuplode/imageuplode';

import {CreateCategory} from '../pages/category/createcategory/createcategory';

import {ShowCategory} from '../pages/category/showcategory/showcategory';

import {Header} from '../pages/header/header';
import { RouterModule, Routes}  from '@angular/router';
import { DataService }  from '../service/service';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';


import { Footer } from '../pages/footer/footer';
import { CreateProduct } from '../pages/createproduct/createproduct';
import { MatSelectModule } from '@angular/material/select';
import { ShowProduct } from '../pages/showproduct/showproduct';





const appRoutes: Routes = [
  { path : '',component : Admin},
  { path : 'showdata',component : ShowData},
  { path : 'test',component : Test},
  { path : 'userlist',component : UserList},
  { path : 'adduser',component : AddUser},
  { path : 'adduser/:id',component : AddUser},
  { path : 'footer',component : Footer},
  { path : 'header',component : Header},
  { path : 'imageuplode',component : ImageUplode},
  { path : 'createcategory/:id',component : CreateCategory},
  { path : 'createcategory',component : CreateCategory},
  { path : 'showcategory',component : ShowCategory},
  { path : 'createproduct',component : CreateProduct},
  { path : 'showproduct',component : ShowProduct},
  { path : 'createproduct/:id',component : CreateProduct},



];

const baseURL = 'http://localhost:9000/api/';
const image_load = 'http://localhost:9000/image/';

@NgModule({
  declarations: [
    AppComponent,
    Admin,
    ShowData,
    UserList,
    AddUser,
    Footer,
    Header,
    Test,
    ImageUplode,
    CreateCategory,
    ShowCategory,
    CreateProduct,
    ShowProduct

  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,

    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService , { provide: 'baseURL', useValue: baseURL },{ provide: "image_load", useValue: image_load }],
  bootstrap: [AppComponent]
})
export class AppModule { }
