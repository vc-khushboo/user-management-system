import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileUpdateComponent } from './profile-update.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutes } from '../profile.routing';

describe('Component: ProfileUpdate', () => {
  let component: ProfileUpdateComponent;
  let fixture: ComponentFixture<ProfileUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ProfileRoutes,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ProfileUpdateComponent],
    });

    fixture = TestBed.createComponent(ProfileUpdateComponent);
    const user = {
      id: 1,
      username: 'test@test.com',
      userrole: '1',
    };
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    component = fixture.componentInstance;
    component.user = window.localStorage.getItem('currentUser');
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.ProfileForm.valid).toBeFalsy();
  });

  it('submitting a form to update user profile', () => {
    expect(component.ProfileForm.valid).toBeFalsy();
    // tslint:disable: no-string-literal
    component.ProfileForm.controls['username'].setValue('test@gmail.com');
    component.ProfileForm.controls['password'].setValue('123456789');
    component.ProfileForm.controls['name'].setValue('test');
    component.ProfileForm.controls['phone'].setValue(9965854578);
    component.ProfileForm.controls['address'].setValue('ahmedabad');
    component.ProfileForm.controls['age'].setValue(12);
    expect(component.ProfileForm.valid).toBeTruthy();

    component.updateProfile();
  });

  it('submitting an invalid form', () => {
    expect(component.ProfileForm.valid).toBeFalsy();
    component.ProfileForm.controls['username'].setValue('test@gmail.com');
    component.ProfileForm.controls['password'].setValue('123456789');
    component.ProfileForm.controls['name'].setValue('test');
    component.ProfileForm.controls['phone'].setValue('23523423');
    component.ProfileForm.controls['address'].setValue('ahmedabad');
    component.ProfileForm.controls['age'].setValue('12');
    expect(component.ProfileForm.valid).toBeFalsy();

    component.updateProfile();
  });
});
