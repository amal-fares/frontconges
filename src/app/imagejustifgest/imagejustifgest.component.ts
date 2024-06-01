import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Image_justificatif} from "../Models/Image_justificatif";

@Component({
  selector: 'app-imagejustifgest',
  templateUrl: './imagejustifgest.component.html',
  styleUrls: ['./imagejustifgest.component.css']
})
export class ImagejustifgestComponent  implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: Image_justificatif[] }) {
  }
  ngOnInit(): void {
  }

}
