import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Message {
  username: string,
  message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-frontend';
  username = 'username';
  form!: FormGroup;
  messages: Message[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    Pusher.logToConsole = true;
    const pusher = new Pusher(environment.pusher_id!, {
      cluster: environment.pusher_cluster
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
    this.form = this.fb.group({
      message: new FormControl('', [Validators.required])
    })
  }

  submit() {
    this.http.post('http://localhost:3000/messages',{
      username: this.username,
      message: this.form.value.message
    }).subscribe(
      () => {
        this.form.setValue({
          message: ''
        })
      }
    )
  }
}
