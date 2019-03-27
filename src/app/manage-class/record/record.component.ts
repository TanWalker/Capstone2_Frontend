import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScheduleService } from 'src/app/share/services/schedule.service';
import { Result } from 'src/app/share/models/result';
import { Schedule } from 'src/app/share/models/schedule';
import * as _ from 'lodash';
import { Class } from 'src/app/share/models/class';
import { Exercise } from 'src/app/share/models/exercise';
import { Record } from 'src/app/share/models/record';
import { RecordService } from 'src/app/share/services/record.service';
import { LessonService } from 'src/app/share/services/lesson.service';
import { Lesson } from 'src/app/share/models/lesson';
import { TeamService } from 'src/app/share/services/team.service';
import { Member } from 'src/app/share/models/member';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Date } from 'src/app/share/models/date';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: [
    './record.component.css',
    './../manage-class.component.css',
    './../../app.component.css'
  ]
})
export class RecordComponent implements OnInit, OnDestroy {

  // sub variable
  public subSchedule: any;
  public subDefaultSchedule: any;
  public subLessons: any;
  public subFinalExercises: any;

  // main variable
  public isMobile = false;
  public schedules: Schedule[] = [];
  public lessons: Lesson[] = [];
  public members: Member[] = [];
  public FinalExercises: Exercise[] = [];
  public currentLesson: Lesson = new Lesson();
  public currentSchedule: Schedule = new Schedule();
  public currentTeam: Class = new Class();
  public currentFinalExercise: Exercise = new Exercise();
  public currentScheduledDate: NgbDateStruct;
  public currentDateValue: any;
  public selectedDate: Date = new Date();
  constructor(
    public deviceService: DeviceDetectorService,
    private scheduleService: ScheduleService,
    private lessonService: LessonService,
    private recordService: RecordService,
    private teamService: TeamService,
    private calendar: NgbCalendar
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
    this.getListLessonByDate(this.calendar.getToday(), true);
    this.getDefaultSchedule();
    this.currentScheduledDate = this.calendar.getToday();


    // this.getListLesson(this.calendar.getToday());
    // this.selectedDate = this.calendar.getToday();
  }
  ngOnDestroy() {
    if (this.subDefaultSchedule !== null) { this.subDefaultSchedule.unsubscribe(); }
    if (this.subLessons !== null) { this.subLessons.unsubscribe(); }
    if (this.subFinalExercises !== null) { this.subFinalExercises.unsubscribe(); }

  }
  // getListSchedule() {
  //   this.subSchedule = this.scheduleService
  //     .getScheduleByCoach()
  //     .subscribe((data: Result) => {
  //       this.schedules = data.success ? data.values : [];
  //       this.schedules = _.orderBy(this.schedules, ['time_start'], ['desc']);
  //       if (this.schedules !== []) {
  //         this.currentSchedule = this.schedules[0];
  //         this.currentTeam.id = this.schedules[0].team_id;
  //         this.currentTeam.name = this.schedules[0].team_name;
  //       }
  //       // console.log(this.schedules);
  //     });
  // }

  // onChangeLesson(lesson: Lesson) {
  //   this.currentLesson = lesson;
  //   if (lesson !== undefined) {
  //     this.lessonService
  //       .getFinalExerciseByLessonID(lesson.id)
  //       .subscribe((data: Result) => {
  //         // console.log(data.values);
  //         this.FinalExercises = data.values;
  //         console.log('final ex');
  //         console.log(this.FinalExercises);
  //         if (this.FinalExercises !== []) {
  //           this.currentFinalExercise = this.FinalExercises[0];
  //         }
  //       });
  //   }
  //   if (lesson === undefined) {
  //     this.FinalExercises = [];
  //     this.currentFinalExercise = null;
  //   }
  //   // change team on change lesson
  //   if (this.currentLesson !== undefined) {
  //     this.lessonService
  //       .getScheduleByDateLesson(
  //         this.selectedDate.day,
  //         this.selectedDate.month,
  //         this.selectedDate.year,
  //         this.currentLesson.id
  //       )
  //       .subscribe((result: Result) => {
  //         this.currentSchedule = result.values;
  //         const get_team_id = result.values[0].team_id;
  //         this.teamService
  //           .getMemberByTeam(get_team_id)
  //           .subscribe((team_result: Result) => {
  //             console.log('lesson: ' + this.currentLesson.id);
  //             console.log('team: ' + get_team_id);
  //             this.members = team_result.values;
  //           });
  //       });
  //   }
  //   if (this.currentLesson === undefined) {
  //     this.members = [];
  //   }
  // }
  // onChangeFinalSet(finalExercise: Exercise) {
  //   this.currentFinalExercise = finalExercise;
  //   console.log(this.currentFinalExercise.id);
  //   // reload list record
  //   this.lessonService
  //       .getScheduleByDateLesson(
  //         this.selectedDate.day,
  //         this.selectedDate.month,
  //         this.selectedDate.year,
  //         this.currentLesson.id
  //       )
  //       .subscribe((result: Result) => {
  //         this.currentSchedule = result.values;
  //         const get_team_id = result.values[0].team_id;
  //         this.teamService
  //           .getMemberByTeam(get_team_id)
  //           .subscribe((team_result: Result) => {
  //             console.log('lesson: ' + this.currentLesson.id);
  //             console.log('team: ' + get_team_id);
  //             this.members = team_result.values;
  //           });
  //       });
  // }



//  should delete
  // getListLesson(date: Date) {
  //   this.lessonService.getLessonByDateCoach(date).subscribe((data: Result) => {
  //     this.lessons = data.values;
  //     console.log(data.values);
  //     if (this.lessons !== []) {
  //    //   this.currentLesson = this.lessons[0];
  //     }
  //     // change final set follows current
  //   //  this.onChangeLesson(this.currentLesson);
  //   });
  // }

  // onChangeSchedule(schedule: Schedule) {
  //   this.currentSchedule = schedule;
  //   this.recordService.getRecord().subscribe((data: Result) => {
  //   });
  // }

  onChangeDate($event) {
    // console.log($event);
    this.getListLessonByDate($event);
    this.selectedDate = $event;
  }
  getListLessonByDate(date: Date , isDefault: boolean = false) {
     this.subLessons = this.lessonService.getLessonByDateCoach(date).subscribe(
      (data: Result) => {
        this.lessons = data.values;

       // tslint:disable-next-line:no-unused-expression
       !isDefault ? this.currentLesson = this.lessons[0] : 0;

       // get list final exercise default ( base on lesson index = 0)
       this.getListFinalExerciseByLessonID(this.lessons[0].id);
      }
    );
  }
  getListFinalExerciseByLessonID(lessonID: String) {
   this.subFinalExercises = this.lessonService.getFinalExerciseByLessonID(lessonID).subscribe(
     (data: Result) => {
       console.log(data);
          if (data.success && data.total > 0) {
            this.FinalExercises = data.values;
            this.currentFinalExercise = this.FinalExercises[0];
          }
    });
  }
  getDefaultSchedule() {
    this.subDefaultSchedule = this.scheduleService.getDefaultScheduleByCurrentDate().subscribe(
      (data: Result) => {
        if ( data.success ) {
          this.currentLesson.id = data.value.id;
          this.currentLesson.name = data.value.lesson_name;
        }
      }
    );
  }
  addRecord(record: Record) {
    this.recordService.addRecord(record).subscribe((res: Result) => {
      console.log(res);
    });
  }
  testAddRecord() {
    const record = new Record();
    record.min_hr = 60;
    record.max_hr = 80;
    record.min_time = 12.4;
    record.max_time = 15.6;
    record.heart_rate = 65;
    record.exercise_id = '14';
    record.schedule_id = '2';
    record.user_id = '10';
    record.time_swim = 14;
    record.errors = 'thực hiện lỗi';
    record.result = 'good';
    record.note = ' aaaaaannnnnncccccccc';
    record.attitude = ' khá tốt ';
    this.addRecord(record);
  }
}
