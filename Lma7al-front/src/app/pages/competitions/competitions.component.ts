import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { CompetitionService } from 'src/app/services/competition.service';
import { CompetitionDComponent } from 'src/app/shared/dialog/competition-d/competition-d.component';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent {
  @Output() competitions: Competition[] = [];
  going:String = "GOING";
  all:String = "ALL";
  before:String = "BEFORE";
  after:String = "AFTER";
  constructor(private competitionService:CompetitionService, public dialog: MatDialog){}

  toggleCreate(){
    let dialogRef = this.dialog.open(CompetitionDComponent, {width: "300px", enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	});
    dialogRef.afterClosed().subscribe((data) => {
      if(data != undefined || null){
        this.competitions.push(data);
        this.competitions = [...this.competitions];
      }
    });
  }

}
