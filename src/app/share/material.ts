import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatGridListModule,
        MatRippleModule,
        MatDialogModule,
        MatToolbarModule,
        MatInputModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDividerModule,
        MatListModule,
        MatCardModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatGridListModule,
        MatRippleModule,
        MatDialogModule,
        MatToolbarModule,
        MatInputModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatSelectModule,
        MatDividerModule,
        MatListModule,
        MatCardModule
    ],
})
export class MaterialModule { }
