export class CreateFoodCommand {
  constructor(
    public readonly food_name: string,
    public readonly price: number,
    public readonly stock: number,
  ) {}
}
