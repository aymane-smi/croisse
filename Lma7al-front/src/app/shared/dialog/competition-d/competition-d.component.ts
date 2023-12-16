import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition-d',
  templateUrl: './competition-d.component.html',
  styleUrls: ['./competition-d.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class CompetitionDComponent {


  constructor(public dialogRef: MatDialogRef<CompetitionDComponent>,
    private competitionService: CompetitionService,
    @Inject(MAT_DIALOG_DATA) public data: Competition,
    private _snackBar: MatSnackBar){}
  formDialog = new FormGroup({
    code: new FormControl(),
    date: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    location: new FormControl(),
    numberOfParticipants: new FormControl(),
    amount: new FormControl()
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void{
    const dateObject = new Date(this.formDialog.controls["date"].value);
    if (dateObject instanceof Date) {
      console.log("inside the onSubmit");
      const day = ('0' + dateObject.getDate()).slice(-2);
      const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
      const year = dateObject.getFullYear().toString().slice(-2);

      const locationValue = this.formDialog.controls["location"].value;
      const locationCode = locationValue ? locationValue.replace(/\s/g, '').substring(0, 3) : '';

      const costumeCode = `${locationCode}-${day}-${month}-${year}`;
      this.formDialog.controls["code"].setValue(costumeCode);

      this.competitionService.addCompetition(this.formDialog.getRawValue()).subscribe(response => {
        this.dialogRef.close(response);
      }, err => this._snackBar.open(err));
    }
  }

}
