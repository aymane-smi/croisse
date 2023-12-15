import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competitions-com',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, DatePipe, MatButtonModule]
})
export class CompetitionsComponent {
  columns: String[] = ['Code', 'date', 'start', 'end', 'number', 'amount'];
  @Input() competitionType:String = '';
  CompetitionSize:number = 0;
  competitions:Competition[] = [];
  page:number = 0;
  Previous: boolean = false;
  Next: boolean = false;
  constructor(private competitionService:CompetitionService, public dialog: MatDialog){}

  ngOnInit(){
    if(this.competitionType === "ALL"){
      this.competitionService.getCompetitionNumber().subscribe(
      response => {
        console.log(response);
        this.CompetitionSize = response.number;
        this.competitionService.getCompetitions(0, 10).subscribe((response)=>{
          this.competitions = response;
        });
        if(Math.floor(this.CompetitionSize/10) == 0){
          this.Previous = true;
          this.Next = true;
        }else{
          this.Previous = true;
        }
      }
      );
    }else if(this.competitionType === "GOING"){
      this.competitionService.getGoingCompetitionNumber().subscribe(
        response => {
          this.CompetitionSize = response.number;
          this.competitionService.getCurrentCompetitions(0, 10).subscribe((response)=>{
            this.competitions = response;
          });
          if(Math.floor(this.CompetitionSize/10) == 0){
            this.Previous = true;
            this.Next = true;
          }else{
            this.Previous = true;
          }
        }
      );
    }else if(this.competitionType === "AFTER"){
      this.competitionService.getAfterCompetitionNumber().subscribe(
      response => {
        this.CompetitionSize = response.number;
        this.competitionService.getFutureCompetitions(0, 10).subscribe((response)=>{
          this.competitions = response;
        });
        if(Math.floor(this.CompetitionSize/10) == 0){
          this.Previous = true;
          this.Next = true;
        }else{
          this.Previous = true;
        }
      }
      );
    }else if(this.competitionType === "BEFORE"){
      this.competitionService.getBeforeCompetitionNumber().subscribe(
      response => {
        this.CompetitionSize = response.number;
        this.competitionService.getClosedCompetitions(0, 10).subscribe((response)=>{
          this.competitions = response;
        });
        if(Math.floor(this.CompetitionSize/10) == 0){
          this.Previous = true;
          this.Next = true;
        }else{
          this.Previous = true;
        }
      }
      );
    }
  }

  handlePrevious(){
    console.log("previous:", this.page, "size:", this.CompetitionSize);
    if(this.page >= 1){
      this.page--;
      if(this.competitionType === "ALL")
        this.competitionService.getCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "AFTER")
        this.competitionService.getFutureCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "BEFORE")
        this.competitionService.getClosedCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "GOING")
      this.competitionService.getCurrentCompetitions(this.page, 10).subscribe((response: Competition[]) => {
        this.competitions = response;
      });
      this.Next = false;
    }else if(this.page == 0){
      if(this.competitionType === "ALL")
        this.competitionService.getCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "AFTER")
        this.competitionService.getFutureCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "BEFORE")
        this.competitionService.getClosedCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "GOING")
      this.competitionService.getCurrentCompetitions(this.page, 10).subscribe((response: Competition[]) => {
        this.competitions = response;
      });
      this.Previous = true;
      this.Next = false;
    }
  }

  handleNext(){
    console.log("next:", this.page, "size:", this.CompetitionSize);
    if((this.page+1)*1 < this.CompetitionSize){
      this.page++;
      if(this.competitionType === "ALL")
        this.competitionService.getCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "AFTER")
        this.competitionService.getFutureCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "BEFORE")
        this.competitionService.getClosedCompetitions(this.page, 10).subscribe((response: Competition[]) => {
          this.competitions = response;
        });
      else if(this.competitionType === "GOING")
      this.competitionService.getCurrentCompetitions(this.page, 10).subscribe((response: Competition[]) => {
        this.competitions = response;
      });
      this.Previous = false;
    }else{
      this.Next = true;
    }
  }

  alae(){
    this.competitions.filter((competition)=>{
      competition.date === new Date();
    });
  }

}
