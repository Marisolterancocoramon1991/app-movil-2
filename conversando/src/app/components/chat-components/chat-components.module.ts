import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatDatePipe, ChatMessageList } from 'src/app/pipes/chat-date.pipe';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';


@NgModule({
  declarations: [    
    ChatAreaComponent,
    ChatBoxComponent,
    
    ChatDatePipe,
    ChatMessageList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    
    ChatAreaComponent
  ]
})
export class ChatComponentsModule { }
