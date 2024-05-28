import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {JoindrejustifComponent} from "../joindrejustif/joindrejustif.component";


@Component({
  selector: 'app-timingalert',
  templateUrl: './timingalert.component.html',
  styleUrls: ['./timingalert.component.css']
})
export class TimingalertComponent {


  @Input() modalRef!: TimingalertComponent;
  private dialogRef: any;
  constructor(private dialog: MatDialog) {}

  open() {

      const dialogRef = this.dialog.open(TimingalertComponent, {
        width: '500px',
        height: '200px'

      });

  }

  onClose() {
    this.dialogRef.close();
  }
}
