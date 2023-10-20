import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  username:any;
  email:any;
  profileUsername:any;
  profileEmail:any;
  profileData:any = {
    technologies:"",
    goals:""
  }
  constructor(private http:HttpClient) { }
  signUp(data:any){
    return this.http.post("http://localhost:8000/signup/",data)
  }
  login(data:any){
    return this.http.post("http://localhost:8000/login/",data)
  }
  logout(){
    return this.http.get("http://localhost:8000/logout/")
  }
  bot(data:any){
    return this.http.post("http://localhost:8000/bot/",data)
  }
  profile(){
    return this.http.get("http://localhost:8000/profile/")
  }
  generateLearningPath(data:any){
    return this.http.post("http://localhost:8000/bot/",data)
  }
}
