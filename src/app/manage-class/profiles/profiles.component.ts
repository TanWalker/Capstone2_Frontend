import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/share/services/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/share/models/user';
import { UserService } from 'src/app/share/services/user.service';
import { Result } from 'src/app/share/models/result';
import { Constants } from 'src/app/share/constants';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MessageBoxComponent } from 'src/app/share/components/message-box/message-box.component';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
export interface Gender {
  value: boolean;
  viewValue: string;
}
const message = {
  box: {
    title: Constants.box.profile.title,
    message: Constants.box.profile.message,
    confirm: Constants.box.profile.confirm
  },
  error: {
    first_name: Constants.error.profile.first_name,
    last_name: Constants.error.profile.last_name,
    email: Constants.error.profile.email,
    phone: Constants.error.profile.phone,
    height: Constants.error.profile.height,
    weight: Constants.error.profile.weight
  },
  message: {
    verify: Constants.message.profile.verify
  }
};
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: [
    './profiles.component.scss',
    './../manage-class.component.css',
    './../../app.component.css'
  ]
})
export class ProfilesComponent implements OnInit {
  public isMobile = null;
  public user: User = new User();
  public message = message;
  public date: Date;
  public model: NgbDateStruct;
  // validation
  public isSubmit = false;
  public userForm: FormGroup;
  public first_name = new FormControl('', [Validators.required]);
  public last_name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public phone = new FormControl('', [Validators.required]);
  public height = new FormControl('', [Validators.required]);
  public weight = new FormControl('', [Validators.required]);
  constructor(
    private deviceService: DeviceDetectorService,
    private userService: UserService,
    public calendar: NgbCalendar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  genders: Gender[] = [
    { value: false, viewValue: 'Nam' },
    { value: true, viewValue: 'Nữ' }
  ];
  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.model = this.calendar.getToday();
    this.init();
  }
  init() {
    // init validation
    this.userForm = this.formBuilder.group({});
    this.userForm.addControl('first_name', this.first_name);
    this.userForm.addControl('last_name', this.last_name);
    this.userForm.addControl('email', this.email);
    this.userForm.addControl('phone', this.phone);
    this.userForm.addControl('height', this.height);
    this.userForm.addControl('weight', this.weight);

    // assign current user
    this.user = this.authService.getCurrentUser();
    // set date
    this.date = new Date(this.user.dob);
    this.model.day = this.date.getDate();
    this.model.month = this.date.getMonth() + 1;
    this.model.year = this.date.getFullYear();
  }
  updateAvatar($info) {
    // new avatar for user on front-end
    this.user.avatar = $info.cdnUrl;
  }
  logout() {
    this.authService.logout();
  }
  getKey() {
    return environment.urls.upload_care_key;
  }
  save() {
    // set isSubmit
    this.isSubmit = true;
    // check validation
    if (this.userForm.invalid) {
      return;
    }

    const messageDialogRef = this.dialog.open(MessageBoxComponent, {
      data: {
        title: this.message.box.title,
        message: this.message.box.message,
        confirm: this.message.box.confirm
      },
      panelClass: 'alert-bg'
    });
    messageDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.user.dob = new Date();
        this.user.dob.setDate(this.model.day);
        this.user.dob.setMonth(this.model.month - 1);
        this.user.dob.setFullYear(this.model.year);
        this.userService.updateUser(this.user).subscribe((response: Result) => {
          if (response.success) {
            this.isSubmit = false;
            this.snackBar.open('Lưu thông tin thành công!', 'Đóng', {
              duration: 6000
            });
          } else {
            // console.log(response);
          }
          this.user.is_verified = true;
          this.authService.setOnlyUser(this.user);
        });
      }
    });
  }
}
