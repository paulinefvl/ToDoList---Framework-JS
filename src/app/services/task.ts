import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

type editionTache = Partial<Pick<Task, 'title' | 'description' | 'dueDate' | 'done'>>;

@Injectable({ providedIn: 'root' }) 

export class TaskService {

    private readonly state = signal<Task[]>([]);
    readonly tasks = this.state.asReadonly();
    
    add(data: { title: string; dueDate?: string; description?: string}) {
        const now = new Date().toISOString();
        const task: Task = { ...data, id: crypto.randomUUID(), done: false, createdAt: now, updatedAt: now };
        this.state.update(list => [...list, task]);
    }

    update(id: string, data: editionTache) {
        this.state.update(list => list.map(t =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t));
    }

    toggle(id: string) {
        this.state.update(list => list.map(t =>
        t.id === id ? { ...t, done: !t.done,
        updatedAt: new Date().toISOString() } : t));
    }

    remove(id: string) {
        this.state.update(list =>
            list.filter(t => t.id !== id)
        );
    }
}


