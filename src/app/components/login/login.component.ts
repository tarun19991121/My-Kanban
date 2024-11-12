import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Short } from '../../model/interface/short';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userobj: Short = {
    username: '',
    password: '',
  };

  userlist: any[] = []; //array to hold api response.

  constructor(private http: HttpClient) {
    //dependancy injection
    this.http.get('write api here').subscribe((res: any) => {
      //get api call
      this.userlist = res;
    });
  }

  // welcome(){
  //   alert("welcome user");
  // }

  getusername() { }
}
