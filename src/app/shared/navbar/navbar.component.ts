import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnDestroy, OnInit {

    user: User;
    userSubscription: Subscription;
    constructor(public service: UserService) {
    }

    ngOnInit() {
        this.userSubscription = this.service.currentUser.subscribe((value) => {
            this.user = value;
        });
    }

    logout() {
        this.service.logout();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
