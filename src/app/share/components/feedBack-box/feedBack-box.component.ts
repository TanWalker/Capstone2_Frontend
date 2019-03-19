import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../models/feedBack';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FeedBackService } from '../../services/feedBack.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-feedBack-box',
  templateUrl: './feedBack-box.component.html',
  styleUrls: ['./feedBack-box.component.css'
  , './../version-box/version-box.component.css'
]
})
export class FeedBackBoxComponent implements OnInit {

  public feedBack: FeedBack = new FeedBack();
  public fbForm: FormGroup;
  public title = new FormControl('', [Validators.required]);
  public content = new FormControl('', [Validators.required]);
  public isSubmit = false;
  constructor(
    private formBuilder: FormBuilder,
    private refDialog: MatDialogRef<FeedBackBoxComponent>,
    private feedBackService: FeedBackService
  ) { }

  ngOnInit() {
    this.initialValidation();
  }

  initialValidation() {
    this.fbForm = this.formBuilder.group({});
    this.fbForm.addControl('title', this.title);
    this.fbForm.addControl('content', this.content);
  }
  sendFeedBack() {
    this.feedBackService.sendFeedBack(this.feedBack).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
  cancel() {
    this.refDialog.close();
  }
}
