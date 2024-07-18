export interface Factory {
  model: string; //valide prisma client model name
  count: number; //number of rows to seed
  definition(): object; //must return valid prisma clientCreateInput
}
