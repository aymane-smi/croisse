import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Member } from 'src/app/model/interfaces/member.model';
import { MemberService } from 'src/app/services/member.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-member-associate-d',
  templateUrl: './member-associate-d.component.html',
  styleUrls: ['./member-associate-d.component.css'],
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, CommonModule]
})
export class MemberAssociateDComponent {

  form!:FormGroup;

  members:Member[] = [];

  constructor(public dialogRef: MatDialogRef<MemberAssociateDComponent>,
    private memberService: MemberService,
    private rankingService: RankingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar){}

  ngOnInit(){
    console.log(this.data);

    this.form = new FormGroup({
      competitionCode: new FormControl<String>(this.data),
      memberNum: new FormControl()
    });
    this.memberService.getMembers().subscribe(response => {
      this.members = response;
    }, err => this._snackBar.open(err));
  }

  onSubmit(){
    this.rankingService.addRanking({id:this.form.getRawValue()}).subscribe(response => {
      this.dialogRef.close(this.members.find(member => member.num === this.form.controls["memberNum"].value));
    }, err => this._snackBar.open(err));
  }

}
