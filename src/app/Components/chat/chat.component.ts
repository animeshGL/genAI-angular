import { Component } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message:any = {
    query:''
  }
  messages: { text: string; isUser: boolean }[] = [];
  userMessage: string = '';
  username:any;
  profileData:any = {
    technologies:"",
    goals:""
  }
  learningPathQuery = {
    query:''
  }
  isLearningPath = false;
  isLoader = false;
  constructor(
    private router: Router,
    private chat: ChatService
    ){

  }
  ngOnInit(){
    this.username = this.chat.profileUsername;
    this.profileData.technologies = this.chat.profileData.technologies;
    this.learningPathQuery.query = this.chat.profileData.technologies
    this.profileData.goals = this.chat.profileData.goals;
  }
  learningPath(){
    this.isLearningPath = true;
    this.sendMessage();
  }
  generatePDF(){
    let pdfDocument = {
      content : [this.messages]
    };
    pdfMake.createPdf(pdfDocument).open();
  }
  sendMessage() {
    if(this.isLearningPath){
        this.onClear();
        this.messages.push({ text: 'Generating Learning Path...', isUser: true });
        this.isLoader = true;
        this.chat.generateLearningPath(this.learningPathQuery).subscribe((params:any)=>{
          this.messages.push({ text: params.result, isUser: false });
          this.isLoader = false;
        },(error)=>{
          this.isLoader = false;
        });
        this.isLearningPath = false;
    } else {
        if (this.message.query.trim() !== '') {
          this.messages.push({ text: this.message.query, isUser: true });
          this.isLoader = true;
          // Simulate the chatbot's response (replace with actual bot logic)
          this.chat.bot(this.message).subscribe((data:any)=>{
            this.message = [];
          this.messages.push({ text: data.result, isUser: false });
          this.isLoader = false;
        },(error)=>{
          this.isLoader = false;
        });
       this.userMessage = '';
      }
    }
  }
  onLogout(){
    this.chat.logout().subscribe(()=>{
    })
    localStorage.removeItem('authToken')
    this.router.navigate(['/login']);
  }
  onProfile(){
    this.router.navigate(['/profile']);
  }
  onClear(){
    this.messages = [];
    this.message = [];
    this.isLoader = false;
  }
}
