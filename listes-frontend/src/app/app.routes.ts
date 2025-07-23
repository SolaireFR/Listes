import { Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { ItemsComponent } from './items/items.component';
import { ItemDescriptionComponent } from './item-description/item-description.component';

export const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  { path: 'lists/:indexList', component: ItemsComponent },
  { path: 'lists/:indexList/:indexItem', component: ItemDescriptionComponent },
  { path: '', redirectTo: 'lists', pathMatch: 'full' }
];
