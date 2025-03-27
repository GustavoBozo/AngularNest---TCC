import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserState {
  name: string | null;
  team: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private initialState: UserState = {
    name: null,
    team: null
  };

   private userStateSource = new BehaviorSubject<UserState>(this.initialState);
  userState$ = this.userStateSource.asObservable();

  updateUserState(state: Partial<UserState>) {
    const currentState = this.userStateSource.getValue();
    this.userStateSource.next({
      ...currentState,
      ...state
    });
  }

  

  updateUserName(name: string) {
    this.updateUserState({ name });
  }
  
  updateUserTeam(team?: string) {
    this.updateUserState({ team });
  }
}