import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import { ToastrModule } from 'ngx-toastr';

import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    exports: [
        CommonModule,
        NavbarComponent,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule,
        LoaderComponent,
        MatInputModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            maxOpened: 1
        }),
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule
    ],
    declarations: [
        NavbarComponent,
        LoaderComponent
    ],
    providers: []
})
export class SharedModule { }
