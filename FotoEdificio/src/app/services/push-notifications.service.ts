import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { Capacitor } from '@capacitor/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Person } from '../classes/user/person';
import { INotification } from '../interfaces/iNotification';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
 
}
