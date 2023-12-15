import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionsComponent } from './competitions/competitions.component';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from "@angular/material/tabs";
import { CompetitionDComponent } from '../shared/dialog/competition-d/competition-d.component';
import { RouterModule } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CompetitionsComponent as CompetitionsComponentCom } from "../components/competitions/competitions.component";



@NgModule({
    declarations: [
        CompetitionsComponent,
        CompetitionComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        CompetitionDComponent,
        RouterModule,
        MatBottomSheetModule,
        CompetitionsComponentCom
    ]
})
export class PagesModule { }
