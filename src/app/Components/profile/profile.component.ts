import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileUsername:any;
  profileEmail:any;
  profileData:any = {
    technologies:"",
    goals:""
  }
  constructor(private chat:ChatService,
    private router:Router){}

  ngOnInit(){
    this.getProfileDetails();
  }
  getProfileDetails(){
    this.chat.profileDetails().subscribe((params:any)=>{
      this.profileUsername = params.username;
      this.profileEmail = params.email;
      this.profileData.technologies = params.technologies;
      this.profileData.goals = params.goals;
    })
  }
  onSave(){
    this.chat.profile(this.profileData).subscribe((param:any)=>{
    this.chat.profileUsername = this.profileUsername;
    this.chat.profileEmail = this.profileEmail;
    this.chat.profileData.technologies = this.profileData.technologies;
    this.chat.profileData.goals = this.profileData.goals;
    this.router.navigate(['/chat']);
    },(error)=>{
    
    });
  }
  profile(){
    this.chat.profile(this.profileData).subscribe((param:any)=>{
      
    },(error)=>{
    
    });
  }
}
