import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule }          from "@angular/common/http";
import { AgGridModule }              from "ag-grid-angular";
import { BrowserAnimationsModule }   from "@angular/platform-browser/animations";
import { provideAnimationsAsync }    from '@angular/platform-browser/animations/async';
import { MatInputModule }            from "@angular/material/input";
import { MatButtonModule }           from "@angular/material/button";
import { MatCheckboxModule }         from "@angular/material/checkbox";
import { ColumnConfigFormComponent } from './ag-grid/columns/form/column-config-form/column-config-form.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatBadgeModule }      from "@angular/material/badge";
import { MatCardModule }       from "@angular/material/card";
import { MatChipsModule }      from "@angular/material/chips";
import { MatDatepickerModule }  from "@angular/material/datepicker";
import { MatDialogModule }          from "@angular/material/dialog";
import { MatDividerModule }         from "@angular/material/divider";
import { MatExpansionModule }                   from "@angular/material/expansion";
import { MatFormFieldModule }                   from "@angular/material/form-field";
import { MatGridListModule }                    from "@angular/material/grid-list";
import { MatIconModule }                        from "@angular/material/icon";
import { MatListModule }                        from "@angular/material/list";
import { MatMenuModule }                        from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule }       from "@angular/material/paginator";
import { MatProgressBarModule }     from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule }       from "@angular/material/radio";
import { MatSelectModule }      from "@angular/material/select";
import { MatSidenavModule }     from "@angular/material/sidenav";
import { MatSliderModule }      from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule }    from "@angular/material/snack-bar";
import { MatSortModule }        from "@angular/material/sort";
import { MatStepperModule }     from "@angular/material/stepper";
import { MatTableModule }       from "@angular/material/table";
import { MatTabsModule }        from "@angular/material/tabs";
import { MatToolbarModule }     from "@angular/material/toolbar";
import { MatTooltipModule }     from "@angular/material/tooltip";
import { MatTreeModule }        from "@angular/material/tree";

@NgModule({
  declarations: [
    AppComponent,
    ColumnConfigFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    HttpClientModule,
    AgGridModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
