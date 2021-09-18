import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {

  @Output() imageSelected = new EventEmitter<File>();
  @Input() currentImage: string;
  imgTemp: any = null;
  labelInputFile = 'Choose file...';

  constructor() { }

  ngOnInit(): void {
  }

  // On change
  changeImage(file: File): void {
    this.labelInputFile = file ? file.name : 'Choose file...';
    if (!file) {
      this.imgTemp = null;
      return;
    }
    // Vista previa de la imagen
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    // Emit
    this.imageSelected.emit(file);
  }

}
