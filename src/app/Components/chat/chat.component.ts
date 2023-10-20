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
        this.chat.generateLearningPath(this.learningPathQuery).subscribe((params:any)=>{
          this.messages.push({ text: params.result, isUser: false });
        },(error)=>{

        });
    } else {
        if (this.message.query.trim() !== '') {
          this.messages.push({ text: this.message.query, isUser: true });
          // Simulate the chatbot's response (replace with actual bot logic)
          this.chat.bot(this.message).subscribe((data:any)=>{
          this.messages.push({ text: data.result, isUser: false });
        },(error)=>{
      
        });
       this.userMessage = '';
      }
    }
  }
  onLogout(){
    this.chat.logout().subscribe(()=>{
    })
    this.router.navigate(['/login']);
  }
  onProfile(){
    this.router.navigate(['/profile']);
  }
}
