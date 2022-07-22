import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Classroom } from '../model/classroom';
import { ClassroomService } from '../service/classroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  first = 0;
  rows = 10;
  classrooms: Classroom[] = [];
  display: boolean = false;
  classroomForm = new FormGroup({
    room: new FormControl(''),
    capacity: new FormControl(''),
    building: new FormControl('')
  });
  updateClassroomForm = new FormGroup({
    id: new FormControl(),
    room: new FormControl(''),
    capacity: new FormControl(''),
    building: new FormControl('')
  })
  
  readonly ID: string = 'id';
  readonly ROOM: string = 'room';
  readonly CAPACITY: string = 'capacity';
  readonly BUILDING: string = 'building';


  constructor(
    private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.getAllClassrooms();
  }

  getAllClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe(res => {
      this.classrooms = res;
    });
  }
  getClassroomFormControl(formControlName: string): any{
    return this.classroomForm.get(formControlName);
  }

  getUpdateClassroomFormControl(formControlName: string): any{
    return this.updateClassroomForm.get(formControlName);
  }

  clearForm(): void{
    this.getClassroomFormControl(this.ROOM).setValue(null);
    this.getClassroomFormControl(this.CAPACITY).setValue(null);
    this.getClassroomFormControl(this.BUILDING).setValue(null);
  }

  addClassroom(): void {
    this.classroomService.addClassroom(this.classroomForm?.value).subscribe(res => {
      this.getAllClassrooms();
      this.clearForm();
    });
  }

  updateClassroom(): void{
    this.classroomService.updateClassroom(this.updateClassroomForm?.value).subscribe(res =>{
      this.getAllClassrooms();
      this.display = false;
    })
  }

  deleteClassroom(id: number): void{
    this.classroomService.deleteClassroom(id).subscribe(res =>{
      this.getAllClassrooms();
    })
  }

  showDialog(classroom: any): void {
    // console.log("Inside show dialog: "+ JSON.stringify(classroom));
    this.getUpdateClassroomFormControl(this.ID).setValue(classroom.id);
    this.getUpdateClassroomFormControl(this.ROOM).setValue(classroom.room);
    this.getUpdateClassroomFormControl(this.CAPACITY).setValue(classroom.capacity);
    this.getUpdateClassroomFormControl(this.BUILDING).setValue(classroom.building);
    this.display = true;
}

  next(): void {
    this.first = this.first + this.rows;
  }

  prev(): void {
    this.first = this.first - this.rows;
  }

  reset(): void {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.classrooms ? this.first === (this.classrooms.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.classrooms ? this.first === 0 : true;
  }

}
