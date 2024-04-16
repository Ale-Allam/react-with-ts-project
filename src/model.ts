export interface Todo {
  id: string;
  mission: string;
  isDone: boolean;
  background: string;
  created: Date;
  edited?: Date; // Optional property for last edit timestamp
}
