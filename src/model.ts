export interface Todo {
  id: string;
  mission: string;
  isDone: boolean;
  background1: string;
  background2: string;
  created: Date;
  edited?: Date; // Optional property for last edit timestamp
}
