import { Component, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { UploadService } from '../service/upload.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import _ from "lodash";
import { ToastrService } from 'ngx-toastr';

const URL = "https://mahalaxmi.talliballi.com/uploadfile";

@Component({
  selector: 'app-service-slip',
  templateUrl: './service-slip.component.html',
  styleUrls: ['./service-slip.component.css']
})
export class ServiceSlipComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  public uploader: FileUploader = new FileUploader({ url: URL });
  tableData: any;
  keysData = [];
  partNo = '';
  verifiedQty = '';

  // SERVER_URL: string = "http://localhost:3000/";
  SERVER_URL: string = "https://mahalaxmi.talliballi.com/";
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private uploadService: UploadService,
    private toastr: ToastrService) { }

  logout() {
    localStorage.setItem('user', '');
    localStorage.setItem('fileData', '');
    this.router.navigate(['/']);
  }

  exportAsPDF() {
    let printContents = document.getElementById('slip').innerHTML;
    let popupWin = window.open('', '_blank', 'width=595,height=300');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }

  ngOnInit() {
    if (localStorage.getItem('fileData') !== null && localStorage.getItem('fileData') !== '') {
      this.setFileDataToTable(JSON.parse(localStorage.getItem('fileData')));
    }
  }

  partNumberChanged() {
    if (this.partNo.includes('tvs.com')) {
      this.partNo = (this.partNo.split(/[/]+/).pop()).substring(4);
      console.log(this.partNo.split(/[/]+/).pop());
    }
  }

  onClick() {
    let csvdata: any;

    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = async () => {
      const fileData = new FormData();
      fileData.set('file', fileUpload.files[0]);
      this.uploadService.upload(fileData).then((res) => {
        console.log(res);
        if (res.status === 'error') {
          this.toastr.error(res.message, 'Error!');
          return false;
        }
        if (res.data.header[0][0] !== "PICK SLIP") {
          this.toastr.error('Invalid Excel File Uploaded', 'Error!');
          return false;
        }
        csvdata = res.data;
        localStorage.setItem('fileData', JSON.stringify(csvdata));
        this.setFileDataToTable(csvdata);
      });
    };
    fileUpload.click();
  }

  async readfile() {
    let csvdata: any;
    this.httpClient.get(this.SERVER_URL + 'readfile').subscribe((val) => {
      csvdata = val;
      this.tableData = csvdata;
      this.keysData = Object.keys(this.tableData.table[0]);
    },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');

      });

  }

  resetQty(data) {
    data['Verified Qty'] = 0;
    data['Status'] = false;
    localStorage.setItem('fileData', JSON.stringify(this.tableData));
  }

  setFileDataToTable(csvdata) {
    this.tableData = csvdata;
    this.keysData = Object.keys(this.tableData.table[0]);
  }

  addressProcess(address) {
    return address.replace(/_x000d__x000a_/g, '<br>');
  }

  updateQty() {
    const partNoVal = this.partNo
    if (isNaN(parseInt(this.verifiedQty))) {
      this.toastr.error('Please Enter Valid Quantity', 'Error!');
      return false;
    }

    let fil = _.find(this.tableData.table, function (o) { console.log(partNoVal); return o['Part No'] == partNoVal; });

    if (fil) {
      fil['Verified Qty'] = parseInt(fil['Verified Qty']) + parseInt(this.verifiedQty);
      if (parseInt(fil['Verified Qty']) === parseInt(fil['Qty']))
        fil['Status'] = true;
      else
        fil['Status'] = false;
      this.toastr.success('Verified Quantity Updated', 'Success!');
      localStorage.setItem('fileData', JSON.stringify(this.tableData));
    }
    else {
      this.toastr.error('Part Number Not Found', 'Error!');
    }
  }
}

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}
