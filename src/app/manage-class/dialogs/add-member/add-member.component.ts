import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { UserService } from 'src/app/share/services/user.service';
import { Result } from 'src/app/share/models/result';
import { User } from 'src/app/share/models/user';
import { Constants } from 'src/app/share/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


const message = {
  default: {
    user: {
      phone: Constants.default.member.phone,
      address: Constants.default.member.address,
      height: Constants.default.member.height,
      weight: Constants.default.member.weight,
      avatar: Constants.default.member.avatar,
    },
    message: Constants.message.add_member.have_not_member
  }
};
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit, OnDestroy {

  // public
  public subUsers: any;
  public users: User [] = [];
  public message = message;
  public usersSearch: User[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddMemberComponent>
  ) { }

  ngOnInit() {
   this.getListUsers();
  }

  ngOnDestroy() {
    if (this.subUsers !== null) { this.subUsers.unsubscribe(); }
  }
  getListUsers() {
    this.subUsers = this.userService.getAllExistingTrainee().subscribe(
      (data: Result) => {
        console.log(data.values);
            this.users =  data.success ? data.values : [];
            // setup for search
            this.usersSearch = this.users;

      }
   );
  }
  cancel() {
      this.dialogRef.close();
  }

  onChange(newValue) {
    if ( newValue === '') {
      this.users = this.usersSearch;
    } else {
      // if don't find any user
      if (  this.users.length === 0 ) {     this.users = this.usersSearch; }
      this.users = this.users.filter(v => {
        // check brand and title is exist
          return ( ( v.display_name.toLowerCase().indexOf(newValue.toLowerCase()) > -1 ));
        });
    }
}
}
