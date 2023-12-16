import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Member } from 'src/app/model/interfaces/member.model';
import { MemberService } from 'src/app/services/member.service';
import {MatSelectModule} from "@angular/material/select";
import { IdentityDocumentType } from 'src/app/model/enums/identityDocumentType.enum';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { RankingService } from 'src/app/services/ranking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-d',
  templateUrl: './member-d.component.html',
  styleUrls: ['./member-d.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, CommonModule]
})
export class MemberDComponent {
  constructor(public dialogRef: MatDialogRef<MemberDComponent>,
    private memberService: MemberService,
    private rankingService:RankingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar){}

  form = new FormGroup({
    name: new FormControl(),
    familyName: new FormControl(),
    accessionDate: new FormControl(),
    nationality: new FormControl(),
    identityDocument: new FormControl(),
    identityNumber: new FormControl()
  });

  enumIdentity = Object.values(IdentityDocumentType).slice(0, 3);

  onSubmit(): void{
    this.memberService.addMember(this.form.getRawValue()).subscribe(response => {
      this.rankingService.addRanking({
        id: {
          competitionCode: this.data.code,
          memberNum: response.num
        }
      }).subscribe(response => {
        console.log(response);
      }, err => this._snackBar.open(err));
      this.dialogRef.close(response);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
