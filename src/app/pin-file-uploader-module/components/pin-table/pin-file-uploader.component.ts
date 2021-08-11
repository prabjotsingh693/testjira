import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { PIN_UPLOAD_API_CONSTANTS, PIN_UPLOAD_EVENT_CONSTANTS } from '../../constants/pin-file-uploader.constants';
import { FileUploadConfig } from './pin-file-uploader.interface';



@Component({
  selector: 'pin-file-uploader',
  templateUrl: './pin-file-uploader.component.html',
  styleUrls: ['./pin-file-uploader.component.scss']
})
export class PinFileUploaderComponent implements OnInit {

  @Output() onEvent = new EventEmitter();

  @Input() data: any[];

   _config: FileUploadConfig;
  @Input()
  get config(): FileUploadConfig {
    return this._config;
  }
  set config(value: FileUploadConfig) {
    this._config = value;
    this.prepareUploadUrl();
  }
  
  
  uploadUrl:any;


  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
  }

  private prepareUploadUrl(){
    this.uploadUrl = `${environment.FILE_API_BASE}${PIN_UPLOAD_API_CONSTANTS.UPLOAD}${this._config.uniqueId}`
  }

  onSuccessUpload($event){
    this.onEvent.emit(
      {
        name: PIN_UPLOAD_EVENT_CONSTANTS.SUCCESS,
        data: $event.originalEvent.body,
        event: $event
      }      
    )
  }

  onErrorUpload($event){
    this.onEvent.emit(
      {
        name: PIN_UPLOAD_EVENT_CONSTANTS.SUCCESS,
        data: "",
        event: $event
      }      
    )
  }

}
