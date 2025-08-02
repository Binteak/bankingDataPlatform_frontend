import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  // template: `
   
  //     <h2>Mi App - Header</h2>
   
  // `
})
export class HeaderComponent {
 
  titulo: string = 'Dashboard' ;

  constructor(private router: Router) {

this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    this.actualizarTitulo(event.urlAfterRedirects);
  }

});

  }

  showMenu = false;
  
  visible: boolean = false;
  
//   ngOnInit() {

// const url  = this.router.url;
// this.actualizarTitulo(url);
    
//   }

  actualizarTitulo(url: string) {
    if (url.includes('/dashboard')){ this.titulo = 'Dashboard';}
    else if (url.includes('/documentation')){ this.titulo = 'Documentation';}
    else if (url.includes('/asset-control-forms')){ this.titulo = 'Asset Control Forms';}
    else {}
  }

  onMenuToggle(): void {
    this.showMenu = !this.showMenu;
  }

   

  
  logout() {
    // Aquí limpia sesión o token si hay
    this.router.navigate(['/login']);
  }

  

}
