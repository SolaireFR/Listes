import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        ToastModule,
        ConfirmDialogModule,
        RouterModule,
    ],
    template: `
        <router-outlet />
        <p-toast />
        <p-confirmdialog />
    `,
})
export class AppComponent {}
