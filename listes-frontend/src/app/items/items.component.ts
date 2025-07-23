import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListsService } from '../services/lists.service';
import { List, Item } from '../models/list.model';
import { Icons, ButtonTexts } from '../shared/ui-constants';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule
  ],
  templateUrl: './items.component.html',
  providers: [MessageService]
})
export class ItemsComponent implements OnInit {
  @Input() indexList!: string;
  
  currentList?: List;
  items: Item[] = [];
  editingIndex: number | null = null;
  editTitle = '';
  newItemTitle = '';

  // UI Constants
  readonly Icons = Icons;
  readonly ButtonTexts = ButtonTexts;

  constructor(
    private readonly listsService: ListsService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.listsService.getAll().subscribe({
      next: (lists: List[]) => {
        const listIndex = parseInt(this.indexList);
        if (listIndex >= 0 && listIndex < lists.length) {
          this.currentList = lists[listIndex];
          this.items = this.currentList.items || [];
        } else {
          this.router.navigate(['/lists']);
        }
      },
      error: (error: unknown) => {
        console.error('Error loading list:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger la liste'
        });
      }
    });
  }

  navigateToItem(itemIndex: number): void {
    if (this.editingIndex === null) {
      this.router.navigate(['/lists', this.indexList, itemIndex]);
    }
  }

  goBack(): void {
    this.router.navigate(['/lists']);
  }

  addItem(): void {
    if (this.newItemTitle.trim() && this.currentList) {
      const newItem: Item = {
        title: this.newItemTitle,
        description: ''
      };

      const updatedList = { ...this.currentList };
      updatedList.items = [...updatedList.items, newItem];

      this.listsService.update(this.currentList._id, updatedList).subscribe({
        next: () => {
          this.loadList();
          this.newItemTitle = '';
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Élément ajouté'
          });
        },
        error: (error: unknown) => {
          console.error('Error adding item:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible d\'ajouter l\'élément'
          });
        }
      });
    }
  }

  startEdit(index: number, item: Item): void {
    this.editingIndex = index;
    this.editTitle = item.title;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editTitle = '';
  }

  saveEdit(itemIndex: number): void {
    if (this.editTitle.trim() && this.currentList) {
      const updatedList = { ...this.currentList };
      updatedList.items = [...updatedList.items];
      updatedList.items[itemIndex] = {
        ...updatedList.items[itemIndex],
        title: this.editTitle
      };

      this.listsService.update(this.currentList._id, updatedList).subscribe({
        next: (): void => {
          this.loadList();
          this.editingIndex = null;
          this.editTitle = '';
          this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Élément modifié'
          });
        },
        error: (error: unknown): void => {
          console.error('Error updating item:', error);
          this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de modifier l\'élément'
          });
        }
      });
    }
  }

  deleteItem(itemIndex: number): void {
    if (!this.currentList) return;

    const updatedList = { ...this.currentList };
    updatedList.items = [...updatedList.items];
    updatedList.items.splice(itemIndex, 1);

    this.listsService.update(this.currentList._id, updatedList).subscribe({
      next: (): void => {
        this.loadList();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Élément supprimé'
        });
      },
      error: (error: unknown): void => {
        console.error('Error deleting item:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer l\'élément'
        });
      }
    });
  }
}
