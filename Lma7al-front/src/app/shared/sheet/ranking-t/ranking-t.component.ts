import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-ranking-t',
  standalone: true,
  templateUrl: './ranking-t.component.html',
  imports: [MatListModule, MatDividerModule, CommonModule]
})
export class RankingTComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<RankingTComponent>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
}
