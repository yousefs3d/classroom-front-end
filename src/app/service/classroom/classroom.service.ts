import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const CLASSROOM_URL: string = '/api/school/class';
const ALL_CLASSROOMS_URL: string = '/all';
const ADD_CLASSROOM_URL: string = '/add';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllClassrooms(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}`+CLASSROOM_URL + ALL_CLASSROOMS_URL);
  }

  public addClassroom(classroomVM: any): Observable<any>{
    return this.http.post(`${this.apiServerUrl}`+CLASSROOM_URL + ADD_CLASSROOM_URL, classroomVM)
  }

}
