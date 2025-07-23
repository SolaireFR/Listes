import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { List } from '../models/list.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Icons, ButtonTexts } from '../shared/ui-constants';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-lists',
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule,
        ButtonModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        ToastModule
    ],
    templateUrl: './lists.component.html',
    providers: [MessageService]
})
export class ListsComponent implements OnInit {
    @Input() indexList?: string;
    
    lists: List[] = [];
    editingIndex: number | null = null;
    editTitle = '';
    newListTitle = '';

    // UI Constants
    readonly Icons = Icons;
    readonly ButtonTexts = ButtonTexts;

    constructor(
        private readonly listsService: ListsService,
        private readonly router: Router,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadLists();
    }

    loadLists(): void {
        this.listsService.getAll().subscribe({
            next: (lists) => {
                this.lists = lists;
            },
            error: (error) => {
                console.error('Error loading lists:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les listes'
                });
            }
        });
    }

    navigateToList(listIndex: number): void {
        if (this.editingIndex === null) {
            this.router.navigate(['/lists', listIndex]);
        }
    }

    addList(): void {
        if (this.newListTitle.trim()) {
            const newList: Partial<List> = { 
                title: this.newListTitle,
                items: [] 
            };
            this.listsService.create(newList).subscribe({
                next: () => {
                    this.loadLists();
                    this.newListTitle = '';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Liste créée'
                    });
                },
                error: (error) => {
                    console.error('Error creating list:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Impossible de créer la liste'
                    });
                }
            });
        }
    }

    startEdit(index: number, list: List): void {
        this.editingIndex = index;
        this.editTitle = list.title || '';
    }

    cancelEdit(): void {
        this.editingIndex = null;
        this.editTitle = '';
    }

    saveEdit(list: List): void {
        if (this.editTitle.trim()) {
            const updatedList = { ...list, title: this.editTitle };
            this.listsService.update(list._id, updatedList).subscribe({
                next: () => {
                    this.loadLists();
                    this.editingIndex = null;
                    this.editTitle = '';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Liste modifiée'
                    });
                },
                error: (error) => {
                    console.error('Error updating list:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Impossible de modifier la liste'
                    });
                }
            });
        }
    }

    deleteList(listId: string): void {
        this.listsService.delete(listId).subscribe({
            next: () => {
                this.loadLists();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Liste supprimée'
                });
            },
            error: (error) => {
                console.error('Error deleting list:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de supprimer la liste'
                });
            }
        });
    }
}
