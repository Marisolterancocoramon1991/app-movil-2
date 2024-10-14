import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {  
  form!: FormGroup;

  errorMessage: string = '';
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();
  // @Output() onFocusText: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {    
    this.form = new FormGroup({      
      message: new FormControl('', {validators: Validators.required,updateOn: 'change'}),
    });
  }

  get message() { return this.form.get('message'); }

  send(){    
      if(this.form.valid)
      { 
        this.onSendMessage.emit(this.form.value.message as string);
        this.message!.reset();       
      }      
  }

  // focusText() {
  //   this.onFocusText.emit(true);
  // }

}
