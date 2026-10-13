# Ma To-Do List — Angular

Application de gestion de tâches réalisée en Angular dans le cadre du module **Framework JS** (TP 2).

## Fonctionnalités

- **Créer une tâche** : titre obligatoire (3 caractères minimum hors espaces), description et échéance facultatives.
- **Valider l'échéance** : une date passée est refusée (comparaison avec la date locale du jour).
- **Lister les tâches** avec leur titre, statut, échéance et description.
- **Marquer une tâche** comme faite / à faire (case à cocher).
- **Modifier une tâche** : titre, description et échéance, avec les mêmes règles de validation.
- **Supprimer une tâche**, avec confirmation.
- **Filtrer** par statut (toutes / faites / non terminées), **rechercher** par titre, **trier** par échéance puis par titre.
- **Compteur** : total, tâches faites et non terminées.
- **Persistance** : les tâches sont sauvegardées dans le `localStorage` et conservées après rechargement.
- **Routing** : deux pages, `/` (liste) et `/stats` (statistiques avec pourcentage de tâches terminées), sans rechargement de page.

## Technologies

- Angular (composants standalone, signals, `computed`, `effect`)
- TypeScript
- FormsModule (`ngModel`) pour les formulaires
- Angular Router
- CSS

## Prérequis

- [Node.js](https://nodejs.org/) (version LTS)
- npm (installé avec Node.js)
- Angular CLI : `npm install -g @angular/cli`

## Installation

```bash
git clone <https://github.com/paulinefvl/ToDoList---Framework-JS.git>
cd ToDoList---Framework-JS
npm install
```

## Scripts

| Commande | Description |
| --- | --- |
| `npm start` | Lance le serveur de développement sur http://localhost:4200 |
| `npm run build` | Compile l'application pour la production (dossier `dist/`) |
| `npm test` | Lance les tests unitaires |

## Structure du projet

```
src/app/
├── models/
│   └── task.ts            # Interface Task (modèle de données)
├── services/
│   └── task.ts            # TaskService : état des tâches, actions et persistance
├── pages/
│   ├── task-list/         # Page liste : formulaire, filtres, liste des tâches
│   └── stats/             # Page statistiques
├── app.ts / app.html      # Composant racine : titre, navigation, router-outlet
└── app.routes.ts          # Déclaration des routes
```

## Choix techniques

- **Un service partagé** (`TaskService`, `providedIn: 'root'`) centralise la liste des tâches. Les deux pages utilisent la même instance, donc les mêmes données.
- **État en signal privé** exposé en lecture seule (`asReadonly()`) : les composants ne peuvent modifier la liste qu'en passant par les méthodes du service (`add`, `update`, `toggle`, `remove`).
- **Mises à jour immuables** : chaque modification crée un nouveau tableau (`[...list]`, `map`, `filter`) pour que les signals détectent le changement.
- **Valeurs dérivées avec `computed`** : total, tâches faites, non terminées et pourcentage sont recalculés automatiquement.
- **Persistance avec `effect`** : la liste est sauvegardée dans le `localStorage` à chaque changement. Le chargement initial est protégé par un `try/catch` (repli sur une liste vide si les données sont invalides).
- **Filtres non destructifs** : le filtre, la recherche et le tri produisent une copie pour l'affichage, sans modifier les tâches stockées.

## Accessibilité

- Chaque champ du formulaire d'ajout a un `<label>` associé ; les champs d'édition et les cases à cocher ont un `aria-label`.
- Contour visible au focus (`:focus-visible`) pour la navigation au clavier.
- Boutons désactivés et messages d'erreur visibles quand les données sont invalides.

## Auteure

Pauline Fauvel — Sup de Vinci Rennes