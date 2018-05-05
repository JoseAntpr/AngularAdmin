import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar, MatDialog } from '@angular/material';
import { User } from '../../user';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  users: User[];
  subscription: Subscription[] = [];

  constructor(public userService:  UserService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.forEach( observable => {
      observable.unsubscribe();
    });
  }

  openDeleteDialog(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.delete(result);
    });
  }

  delete(user: User) {
    console.log(user);
    if ( user.own) {
      this.subscription.push(this.userService.deleteUser(user.id).subscribe(()  => {
        this.snackBar.open(`User ${user.first_name} deleted `, 'Close', {duration: 2000});
        this.getUsers();
      }));
    } else {
      this.snackBar.open(`You can't delete User ${user.first_name} `, 'Close', {duration: 2000});
    }
  }

  getUsers() {
    this.subscription.push(this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }));
  }

}
