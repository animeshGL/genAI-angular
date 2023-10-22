import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http'

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
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get("http://localhost:8000/logout/",{headers})
  }
  bot(data:any){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post("http://localhost:8000/bot/",data,{headers})
  }
  profile(data:any){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put("http://localhost:8000/user/",data,{headers})
  }
  profileDetails(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get("http://localhost:8000/user/",{headers})
  }
  generateLearningPath(data:any){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post("http://localhost:8000/generate_learning_path/",data,{headers})
  }
}
