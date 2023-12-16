import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hunting } from 'src/app/model/interfaces/hunting';
import { HuntingService } from 'src/app/services/hunting.service';

@Component({
  selector: 'app-huntedit',
  templateUrl: './huntedit.component.html',
  styleUrls: ['./huntedit.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class HunteditComponent {

  form!:FormGroup;
  constructor(public dialogRef: MatDialogRef<HunteditComponent>,
    private huntService:HuntingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.form = new FormGroup({
      numberOfFish: new FormControl<Number>(this.data.number)
    });
  }

  onSubmit(){
    let hunt:Hunting = {
      numberOfFish: this.form.controls['numberOfFish'].value
    }
    this.huntService.updateHunting(this.data.id, hunt).subscribe(response => {
      this.dialogRef.close(response);
      this._snackBar.open("hunt edited");
    }, err => this._snackBar.open(err));
  }
}
