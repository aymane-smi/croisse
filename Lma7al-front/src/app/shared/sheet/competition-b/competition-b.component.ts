import { Component, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import { Competition } from 'src/app/model/interfaces/competition.model';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competition-b',
  templateUrl: './competition-b.component.html',
  styleUrls: ['./competition-b.component.css'],
  standalone: true,
  imports: [MatListModule, MatDividerModule, CommonModule]
})
export class CompetitionBComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<CompetitionBComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Competition) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
