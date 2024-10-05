export class CreateTransactionCommand {
  constructor(
    public readonly customer_id: number,
    public readonly food_id: number,
    public readonly qty: number,
  ) {}
}
