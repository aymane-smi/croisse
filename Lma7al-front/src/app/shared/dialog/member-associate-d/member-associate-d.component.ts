import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Member } from 'src/app/model/interfaces/member.model';
import { MemberService } from 'src/app/services/member.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-member-associate-d',
  templateUrl: './member-associate-d.component.html',
  styleUrls: ['./member-associate-d.component.css'],
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule]
})
export class MemberAssociateDComponent {

  form!:FormGroup;

  members:Member[] = [];

  constructor(public dialogRef: MatDialogRef<MemberAssociateDComponent>,
    private memberService: MemberService,
    private rankingService: RankingService,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    this.form = new FormGroup({
      competitionCode: new FormControl<String>(this.data.code),
      memberNum: new FormControl()
    });
    this.memberService.getMembers().subscribe(response => {
      this.members = response;
    });
  }

  onSubmit(){

  }

}
