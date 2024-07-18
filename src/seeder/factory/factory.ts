export interface Factory {
  model: string;
  count: number;
  definition(): object;
}
