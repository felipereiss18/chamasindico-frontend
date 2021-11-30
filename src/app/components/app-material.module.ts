import {NgModule} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CustomPaginator} from "../shared/custom-material/CustomPaginatorConfiguration";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatRadioModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressBarModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue:'pt-BR' },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],

  declarations: [

  ]
})
export class AppMaterialModule {
}
