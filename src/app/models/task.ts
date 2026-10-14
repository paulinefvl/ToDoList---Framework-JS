/** Structure persistée et partagée par les pages de l'application. */
export interface Task {
  id: string;        // UUID généré à la création
  title: string;     // au moins 3 caractères
  description?: string;
  dueDate?: string;  // format ISO YYYY-MM-DD pour faciliter les comparaisons
  done: boolean;     // false à la création
  createdAt: string;  // date ISO de création
  updatedAt: string;  // date ISO de la dernière modification
}
