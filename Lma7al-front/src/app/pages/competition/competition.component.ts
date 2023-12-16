import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { Hunting } from 'src/app/model/interfaces/hunting';
import { Member } from 'src/app/model/interfaces/member.model';
import { CompetitionService } from 'src/app/services/competition.service';
import { HuntingService } from 'src/app/services/hunting.service';
import { MemberService } from 'src/app/services/member.service';
import { RankingService } from 'src/app/services/ranking.service';
import { HuntDComponent } from 'src/app/shared/dialog/hunt-d/hunt-d.component';
import { MemberAssociateDComponent } from 'src/app/shared/dialog/member-associate-d/member-associate-d.component';
import { MemberDComponent } from 'src/app/shared/dialog/member-d/member-d.component';
import { CompetitionBComponent } from 'src/app/shared/sheet/competition-b/competition-b.component';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent {
  public image = "https://maghreb.simplonline.co/_next/image?url=https%3A%2F%2Fsimplonline-v3-prod.s3.eu-west-3.amazonaws.com%2Fmedia%2Fimage%2Fjpg%2Fchasse-sous-marine-sous-eau-950002-169315-657215df5fd58614044589.jpg&w=1280&q=75";
  members: Member[] = [];
  competition: Competition | undefined;
  columns = ["id", "numberOfFish", "fish", "member", "actions"];
  huntings: Hunting[] = [];
  code:String = '';
  constructor(public dialog: MatDialog,
    private competitionService: CompetitionService,
    private memberService: MemberService,
    private huntingService: HuntingService,
    private router: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
    private rankingService:RankingService,
    private _snackBar: MatSnackBar){}

  ngOnInit(): void{
    this.code = this.router.snapshot.paramMap.get("code")||'';
    this.competitionService.findCompetition(this.code).subscribe(competition => {
      this.competition = <Competition|undefined>competition;
      this.huntings = competition?.huntings!;
    }, err => this._snackBar.open(err));
    this.memberService.getMembers().subscribe(response => {
      this.members = response;
    }, err => this._snackBar.open(err));
  }

  toggleCreate(){
    let dialogRef = this.dialog.open(MemberDComponent, {width: "300px", enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false, data: {code :this.code}	});
    dialogRef.afterClosed().subscribe((data) => {
      this.members.push(data);
      this.members = [...this.members];
    });
  }

  toogleAssociate(){
    let dialogRef = this.dialog.open(MemberAssociateDComponent, {width: "300px", enterAnimationDuration:"400ms", exitAnimationDuration: "400ms", autoFocus: false, data: this.code});
    dialogRef.afterClosed().subscribe(data=>{
      let index = this.members.findIndex(member => member.num === data.num);
      if(index !== -1)
        this.huntings.push(data);
    });
  }

  toggleHunt(){
    let dialogRef = this.dialog.open(HuntDComponent, {width: "300px", enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	, data:{members: this.members, code: this.router.snapshot.paramMap.get("code")}});
    dialogRef.afterClosed().subscribe((data) => {
      if(data != undefined || null){
        let index = this.huntings.findIndex( obj => obj.id == data.id);
        console.log(index);
        if(index == -1)
          this.huntings.push(data);
        else
          this.huntings[index] = data;
        this.huntings = [...this.huntings];
      }
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CompetitionBComponent, {
      data: this.competition
    });
  }

  generateRanking(): void{
    this.rankingService.getCompetitionRankings(this.code).subscribe(response => console.log(response), err => this._snackBar.open(err));
  }
}
