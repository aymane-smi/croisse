import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CommonModule } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';

import { Member } from 'src/app/model/interfaces/member.model';
import { MemberService } from 'src/app/services/member.service';
import { IdentityDocumentType } from 'src/app/model/enums/identityDocumentType.enum';
import { HuntingService } from 'src/app/services/hunting.service';
import { FishService } from 'src/app/services/fish.service';
import { Fish } from 'src/app/model/interfaces/fish';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-member-d',
  templateUrl: './hunt-d.component.html',
  standalone: true,
  imports: [MatDividerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, CommonModule, MatAutocompleteModule]
})
export class HuntDComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HuntDComponent>,
    private huntService: HuntingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fishService: FishService,
  ) {}

  filteredOptions: Observable<string[]> | undefined;
  filteredOptionsMember!: Observable<Member[]>;
  form!: FormGroup; // Initialize in ngOnInit

  fishes: Fish[] = [];
  selectedMembers:Member[] = [];

  enumIdentity = Object.values(IdentityDocumentType).slice(0, 3);

  ngOnInit() {
    this.form = new FormGroup({
      numberOfFish: new FormControl(),
      fish_name: new FormControl(),
      member_num: new FormControl(),
      competition_code: new FormControl(this.data.code),
      memberControl: new FormControl()
    });

    this.fishService.getFishes().subscribe(response => {
      this.fishes = response;
    });

    this.form.controls["memberControl"].valueChanges.subscribe(value => {
      if(value === "")
        this.selectedMembers = [];
      else
        this.selectedMembers = this.data.members.filter((member: { familyName: string | any[]; name: string | any[]; }) => member.familyName.includes(value) || member.name.includes(value));
    });
  }

  onSubmit(): void {
    this.huntService.addHunting(this.form.getRawValue()).subscribe(response => {
      this.dialogRef.close(response);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
