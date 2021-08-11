import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import { PinFileUploaderComponent } from './components/pin-table/pin-file-uploader.component';



@NgModule({
  declarations: [PinFileUploaderComponent],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports:[PinFileUploaderComponent]
})
export class PinFileUploaderModule { }
