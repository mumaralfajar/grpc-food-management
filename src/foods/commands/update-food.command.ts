export class UpdateFoodCommand {
  constructor(
    public readonly food_id: number,
    public readonly food_name: string,
    public readonly price: number,
    public readonly stock: number,
  ) {}
}
