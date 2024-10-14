import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private route:ActivatedRoute) { }

  class= ''

  ngOnInit() {
    if(this.sala === "")
    {      
      this.sala = (this.route.snapshot.paramMap.get('sala')!);           
    }

    if(this.sala === 'PPS-4A'){
      this.class = 'a'
    }else{
      this.class = 'b'
    }
  }

  @Input() sala: string = ''  

  @ViewChild(IonContent) content!: IonContent;

  goToButtom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(500);
  }
}
