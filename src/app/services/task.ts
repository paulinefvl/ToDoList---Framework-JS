import { effect, Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task';

type editionTache = Partial<Pick<Task, 'title' | 'description' | 'dueDate' | 'done'>>;

@Injectable({ providedIn: 'root' }) 
export class TaskService {
    // Le signal reste privé afin que toutes les modifications passent par le service.
    private readonly state = signal<Task[]>(this.load());
    readonly tasks = this.state.asReadonly();

    // Ces valeurs sont recalculées automatiquement quand la liste change.
    readonly total = computed(() => this.state().length);
    readonly doneTasks = computed(() => this.state().filter(t => t.done).length);
    readonly pendingTasks = computed(() => this.state().filter(t => !t.done).length);
    readonly percentDone = computed(() =>
    this.total() === 0 ? 0 : Math.round(100 * this.doneTasks() / this.total()));

    constructor() {
        // L'effet suit le signal et synchronise chaque changement avec le stockage local.
        effect(() => {
            const tasks = this.state();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    }

    private load() : Task[] {
        try {
            const value = JSON.parse(localStorage.getItem('tasks') ?? '[]');
            // Une donnée absente ou mal formée ne doit pas empêcher l'application de démarrer.
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }
    
    add(data: { title: string; dueDate?: string; description?: string}) {
        const now = new Date().toISOString();
        const task: Task = { ...data, id: crypto.randomUUID(), done: false, createdAt: now, updatedAt: now };
        // Créer un nouveau tableau garantit que le signal détecte la modification.
        this.state.update(list => [...list, task]);
    }

    update(id: string, data: editionTache) {
        // Seule la tâche ciblée est remplacée ; les autres conservent leur référence.
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

