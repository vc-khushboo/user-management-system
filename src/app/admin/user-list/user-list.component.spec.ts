import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './user-list.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

describe('Component: UserList', () => {

    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule,
                        RouterTestingModule,
                        CommonModule,
                        SharedModule,
                        MatTableModule
                    ],
            declarations: [UserListComponent]
        });

        fixture = TestBed.createComponent(UserListComponent);

        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create userlist component', () => {
      expect(component).toBeTruthy();
    });

    // it('form invalid when empty', () => {
    //     expect(component.ProfileForm.valid).toBeFalsy();
    // });

    it('should delete user by id', () => {
        component.deleteUser(3);
    });

});
