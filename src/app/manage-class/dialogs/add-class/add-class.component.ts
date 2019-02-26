import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Class } from 'src/app/share/models/class';
import { Constants } from 'src/app/share/constants';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css', '../../../app.component.css']
})
export class AddClassComponent implements OnInit {

  public classForm: FormGroup;
  public class: Class = new Class();
  public name = new FormControl('', [Validators.required]);
  public age = new FormControl('', [Validators.required]);
  public numberal = new FormControl('', [Validators.required]);
  public isSubmit = false;
  public message: {name , age , numberal};
  constructor(
    public dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,

  ) {}
  ngOnInit() {
    this.initialValidation();

    // get list message from constant file
    this.message = Constants.error.create_team;
  }

  initialValidation() {
    this.classForm = this.formBuilder.group({});
    this.classForm.addControl('name', this.name);
    this.classForm.addControl('age', this.age);
    this.classForm.addControl('numberal', this.numberal);
  }
  createTeam(): void {
   // set isSubmit
   this.isSubmit = true;
   // check validation
   if (this.classForm.invalid) {
     return;
   }


    this.router.navigate(['/class/classes/edit']);
    this.dialogRef.close();
  }
}
