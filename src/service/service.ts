import { Injectable, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: Http, @Inject('baseURL') private baseURL: string ,@Inject('image_load') private image_load: string) {}

  fetchdata(value): Observable<any>{

    return this.http.post(this.baseURL+'admin',value).map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
  }

  getUser(): Observable<any>{

    return this.http.get(this.baseURL+'usershow').map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
  }

  //image test

  getImage(): Observable<any>{

    return this.http.get(this.baseURL+'imageshow').map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
  }
//imagetest




  getSingleUser(value): Observable<any>{

    return this.http.get(this.baseURL+'usershow/'+value).map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
  }

  adduser(value): Observable<any>{

    return this.http.post(this.baseURL+'user',value).map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
  }


  deleteuser(value): Observable<any>{

    return this.http.post(this.baseURL+'userremove',value).map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
  }

  updateUserData(value): Observable<any> {
    console.log(value);
    return this.http.post(this.baseURL + 'userUpdate', value).map(response => response.json())
      .catch((err: Response | any) => {
        return Observable.throw(err.statusText);
      })
  }


  addimage(value): Observable<any>{

    return this.http.post(this.baseURL+'imagecreate',value).map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })

}

// uplode image user
uplodeImageUser(body): Observable<any> {
  console.log(body);
  return this.http.post(this.baseURL + 'uplodeImageUser', body).map(response => response.json())
    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })
}







//add image for user
// addImageUser(value): Observable<any>{
//
//   return this.http.post(this.baseURL+'uplodeImageUser',value).map(response => response.json())
//   .catch((err: Response | any) => {
//     return Observable.throw(err.statusText);
//   })
//
// }







  addPicture(value): Observable<any>{

    return this.http.post(this.baseURL+'uplodeImage',value).map(response => response.json())

    .catch((err: Response | any) => {
      return Observable.throw(err.statusText);
    })

}

//delete image service multer
picDelete(value): Observable<any>{

  return this.http.post(this.baseURL+'imageremove',value).map(response => response.json())
  .catch((err: Response | any) => {
    return Observable.throw(err.statusText);
  })
}








 // all category releted service function are implemented here..

// create category service
 createCategory(value): Observable<any>{

   return this.http.post(this.baseURL+'createCategory',value).map(response => response.json())
   .catch((err: Response | any) => {
     return Observable.throw(err.statusText);
   })
 }


 //category list show service

 showCategory(): Observable<any>{

   return this.http.get(this.baseURL+'showCategory').map(response => response.json())
   .catch((err: Response | any) => {
     return Observable.throw(err.statusText);
   })
 }

 //category remove service


   removeCategory(value): Observable<any>{

     return this.http.post(this.baseURL+'removeCategory',value).map(response => response.json())
     .catch((err: Response | any) => {
       return Observable.throw(err.statusText);
     })
   }


   //category update service
   updateCategory(value): Observable<any> {
     console.log(value);
     return this.http.post(this.baseURL + 'updateCategory', value).map(response => response.json())
       .catch((err: Response | any) => {
         return Observable.throw(err.statusText);
       })
   }

   //get single category service
   getSingleCategory(value): Observable<any>{


     return this.http.get(this.baseURL+'showCategory/'+value).map(response => response.json())
     .catch((err: Response | any) => {
       return Observable.throw(err.statusText);
     })
   }

   // uplode catimage
   uploadCateImage(body): Observable<any> {
     console.log(body);
     return this.http.post(this.baseURL + 'uploadCateImage', body).map(response => response.json())
       .catch((err: Response | any) => {
         return Observable.throw(err.statusText);
       })
   }






   // product releted service
// image product
   uploadProductImage(body): Observable<any> {
     console.log(body);
     return this.http.post(this.baseURL + 'uploadProductImage', body).map(response => response.json())
       .catch((err: Response | any) => {
         return Observable.throw(err.statusText);
       })
   }

   //product create
   createProduct(body): Observable<any> {
     console.log(body);
     return this.http.post(this.baseURL + 'createProduct', body).map(response => response.json())
       .catch((err: Response | any) => {
         return Observable.throw(err.statusText);
       })
   }

   // delete product service function
   deleteProduct(body): Observable<any> {
     console.log(body);
     return this.http.post(this.baseURL + 'deleteProduct', body).map(response => response.json())
       .catch((err: Response | any) => {
         return Observable.throw(err.statusText);
       })
   }
   // get single product
   getSingleProduct(value): Observable<any>{


     return this.http.get(this.baseURL+'showProduct/'+value).map(response => response.json())
     .catch((err: Response | any) => {
       return Observable.throw(err.statusText);
     })
   }


   //product update service
   updateProduct(value): Observable<any> {
     console.log(value);
     return this.http.post(this.baseURL + 'updateProduct', value).map(response => response.json())
       .catch((err: Response | any) => {
         return Observable.throw(err.statusText);
       })
   }




}
