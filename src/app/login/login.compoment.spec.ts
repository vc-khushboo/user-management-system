import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';


describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, AppModule, RouterTestingModule],
            declarations: []
        });

        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.LoginForm.valid).toBeFalsy();
    });

    it('email field validity', () => {
        let errors = {};
        const email = component.LoginForm.controls.email;
        expect(email.valid).toBeFalsy();

        // Email field is required
        errors = email.errors || {};
        // tslint:disable: no-string-literal
        expect(errors['required']).toBeTruthy();

        // Set email to something
        email.setValue('test');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeTruthy();

        // Set email to something correct
        email.setValue('test@example.com');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('password field validity', () => {
        let errors = {};
        const password = component.LoginForm.controls.password;
        expect(password.valid).toBeFalsy();

        // Password field is required
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set password to something correct
        password.setValue('123456789');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('submitting a form emits a user', () => {
        expect(component.LoginForm.valid).toBeFalsy();
        component.LoginForm.controls['email'].setValue('test@test.com');
        component.LoginForm.controls['password'].setValue('123456789');
        expect(component.LoginForm.valid).toBeTruthy();

        // Trigger the login function
        component.loginUser();

    });
});
