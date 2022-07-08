import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Classroom } from './model/classroom';
import { ClassroomService } from './service/classroom/classroom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  first = 0;
  rows = 10;
  classrooms: Classroom[] = [];
  display: boolean = false;
  classroomForm = new FormGroup({
    room: new FormControl(''),
    capacity: new FormControl(''),
    building: new FormControl('')
  })

  constructor(
    private classroomService: ClassroomService) {
  }

  ngOnInit() {
    this.getAllClassrooms();
  }

  getAllClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe(res => {
      console.log("Result: " + JSON.stringify(res));
      this.classrooms = res;
      console.log("classrooms Result: " + JSON.stringify(this.classrooms));
    });
  }

  addClassroom(): void {
    this.classroomService.addClassroom(this.classroomForm?.value).subscribe(res => {
      this.getAllClassrooms();
    });
  }

  updateClassroom(classroom: any): void{
    // Call service
  }

  showDialog() {
    this.display = true;
}

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.classrooms ? this.first === (this.classrooms.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.classrooms ? this.first === 0 : true;
  }
}
