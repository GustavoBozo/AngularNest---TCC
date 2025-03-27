import { Component, Input, SimpleChanges } from '@angular/core';
import { UserService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private subscription?: Subscription;

  constructor(private userService: UserService) {}


  @Input() recebeNome?: string
  @Input() recebeEquipe?: string

  ngOnInit() {
    this.subscription = this.userService.userState$.subscribe(state => {
      if (state.name) {
        this.recebeNome = state.name;
      }
      
      if (state.team) {
        this.recebeEquipe = state.team;
      }
      
      // Agora você tem acesso a ambas as informações para atualizar a UI
    });


   
  }
}
