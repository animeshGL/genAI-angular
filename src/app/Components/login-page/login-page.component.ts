import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  signupUsers: any[] = [];
  loginUsers: any[] = [];
  signupObj: any = {
    username: '',
    email: '',
    password: ''
  }
  loginObj: any = {
    username: '',
    password: ''
  }
  constructor(
    private router: Router,
    private chat: ChatService
    ){

  }
  
  onLogin(){
    this.chat.login(this.loginObj).subscribe((data:any)=>{
      this.chat.username = this.loginObj.username;
      this.chat.email = this.loginObj.email;
      this.router.navigate(['/profile']);
      
    },(error)=>{
    
    });
  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    this.chat.signUp(this.signupObj).subscribe((data:any)=>{
      this.chat.username = this.signupObj.username;
      this.chat.email = this.signupObj.email;
      this.router.navigate(['/profile']);
    })
  }
}
