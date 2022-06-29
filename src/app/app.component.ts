import { Component, OnInit } from '@angular/core';
import { ClassroomService } from './service/classroom/classroom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'classroom-front-end';
  cars = [{'':''}];

  constructor(private classroomService: ClassroomService){
  }

  ngOnInit() {
    this.getAllClassrooms();
  }

  getAllClassrooms(): void{
    this.classroomService.getAllClassrooms().subscribe(res => {
      console.log("Result: "+res);
    });
  }


}
