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
  selector: 'app-item-description',
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
  templateUrl: './item-description.component.html',
  providers: [MessageService]
})
export class ItemDescriptionComponent implements OnInit {
  @Input() indexList!: string;
  @Input() indexItem!: string;
  
  readonly Icons = Icons;
  readonly ButtonTexts = ButtonTexts;
  
  currentList?: List;
  currentItem?: Item;
  isEditing = false;
  editDescription = '';

  constructor(
    private readonly listsService: ListsService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem(): void {
    this.listsService.getAll().subscribe({
      next: (lists) => {
        const listIndex = parseInt(this.indexList);
        const itemIndex = parseInt(this.indexItem);
        
        if (listIndex >= 0 && listIndex < lists.length) {
          this.currentList = lists[listIndex];
          const items = this.currentList.items || [];

          if (itemIndex >= 0 && itemIndex < items.length) {
            this.currentItem = items[itemIndex];
            this.editDescription = this.currentItem.description || '';
          } else {
            this.router.navigate(['/lists', this.indexList]);
          }
        } else {
          this.router.navigate(['/lists']);
        }
      },
      error: (error) => {
        console.error('Error loading item:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger l\'élément'
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/lists', this.indexList]);
  }

  startEdit(): void {
    this.isEditing = true;
    this.editDescription = this.currentItem?.description || '';
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editDescription = this.currentItem?.description || '';
  }

  saveChanges(): void {
    if (this.currentList && this.currentItem) {
      const itemIndex = parseInt(this.indexItem);
      
      const updatedList = { ...this.currentList };
      updatedList.items = [...updatedList.items];
      updatedList.items[itemIndex] = {
        ...updatedList.items[itemIndex],
        description: this.editDescription
      };

      this.listsService.update(this.currentList._id, updatedList).subscribe({
        next: () => {
          this.loadItem();
          this.isEditing = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Description modifiée'
          });
        },
        error: (error) => {
          console.error('Error updating item:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de modifier la description'
          });
        }
      });
    }
  }
}
