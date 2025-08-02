import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';


@Component({

  standalone: true,
  selector: 'app-documentation',
  imports: [CardModule, CommonModule, ButtonModule, DividerModule, PanelMenuModule],
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css'],
})



export class DocumentationComponent implements OnInit {

  isClicked = false;
  selected: string = 'Introduction';
  docuTitle: string = 'Introduction'
  iconoActual: string = 'pi pi-angle-left';
  opcionSeleccionada: string = 'Introduction';
  items: MenuItem[];

  itemActivo: string = 'Introduction';
  expandedItems = new Set<string>(['Introduction'])

  ngOnInit() {

    this.items = [
      {
        label: 'Introduction',
        icon: 'pi pi-book',
        command: () => this.filtrarDocu2('Introduction'),
        items: [
          {
            label: 'Subitem 1',
            icon: 'pi pi-info-circle',
            command: () => this.filtrarDocu2('Subitem 1'),
          }
        ]
      },
      {
        label: 'Supra Risk Data',
        icon: 'pi pi-upload',
        command: () => this.filtrarDocu2('Supra Risk Data'),
      },
      {
        label: 'Asset Control Forms',
        icon: 'pi pi-database',
        command: () => this.filtrarDocu2('Asset Control Forms'),
      },
      {
        label: 'Monitoring',
        icon: 'pi pi-desktop',
        command: () => this.filtrarDocu2('Monitoring'),
      },
      {
        label: 'Launch Process',
        icon: 'pi pi-cog',
        command: () => this.filtrarDocu2('Launch Process'),
      },
      {
        label: 'Process Visualization',
        icon: 'pi pi-sitemap',
        command: () => this.filtrarDocu2('Process Visualization'),
      },
      {
        label: 'Intermediate Results',
        icon: 'pi pi-chart-bar',
        command: () => this.filtrarDocu2('Intermediate Results'),
      },
      {
        label: 'View Results',
        icon: 'pi pi-chart-bar',
        command: () => this.filtrarDocu2('View Results'),
      },
    ]
  }

  filtrarDocu(opcion: string) { //borrar
    console.log('entro aqui');

    this.opcionSeleccionada = opcion;
    this.iconoActual = this.iconoActual === 'pi pi-angle-left' ? 'pi pi-angle-right' : 'pi pi-angle-left';
  }

  onItemClick(item: any, event:Event){
    if(item.items){
      this.toggleExpand(item, event);
      this.filtrarDocu2(item.label);
    }else{
      this.filtrarDocu2(item.label);
    }
    event.stopPropagation();
  }

  filtrarDocu2(opcion: string){
    this.opcionSeleccionada = opcion;
    this.docuTitle = opcion;
    this.itemActivo = opcion;
  }


  toggleExpand(item: any, event:Event){
    event.stopPropagation();
    if(this.expandedItems.has(item.label)){
      this.expandedItems.delete(item.label);
    }else{
      this.expandedItems.add(item.label);
    }
  }

  isExpanded(item: any): boolean {
    return this.expandedItems.has(item.label);
  }

  descargarPDF(){
    console.log('entro en la funcion');
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const año = ahora.getFullYear().toString();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');

    const url = 'assets/documentation/documentation.pdf';
    const link = document.createElement('a');
    link.href = url;
    link.download = `documentation_${dia}${mes}${año}_${hora}${minutos}.pdf`;
    link.click();
  }


}
