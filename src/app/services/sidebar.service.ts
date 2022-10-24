import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Usuarios', url: '/' },
        { titulo: 'Crear Usuarios', url: 'crear' },
       
      ]
    },
  ];

  constructor() { }
}
