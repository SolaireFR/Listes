import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ListsService {
    private readonly apiUrl = `${environment.apiUrl}/lists`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<List[]> {
        return this.http.get<List[]>(this.apiUrl);
    }

    create(list: Partial<List>): Observable<List> {
        return this.http.post<List>(this.apiUrl, list);
    }

    update(id: string, list: Partial<List>): Observable<List> {
        return this.http.patch<List>(`${this.apiUrl}/${id}`, list);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
