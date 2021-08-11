import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  //SERVER_URL: string = "http://localhost:3000/";
  SERVER_URL: string = "https://mahalaxmi.talliballi.com/";
  constructor(private httpClient: HttpClient) { }

  public upload(formData): Promise<any> {
    return new Promise(resolve => {
      this.httpClient.post(this.SERVER_URL + 'uploadfile', formData).subscribe(
        (val) => {
          console.log(val);
          resolve(val);
        },
        response => {
          console.log('POST call in error', response);
          resolve(response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
    });
  }

  async readFile() {
    return this.httpClient.get(this.SERVER_URL + 'readfile').subscribe((val) => {
      console.log('POST call successful value returned in body',
        val);

    },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');

      });

  }
}
