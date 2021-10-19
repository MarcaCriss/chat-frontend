import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-frontend';

  ngOnInit(): void {
    Pusher.logToConsole = true;

    var pusher = new Pusher(environment.pusher_id!, {
      cluster: environment.pusher_cluster
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data: any) => {
      alert(JSON.stringify(data));
    });
  }
}
