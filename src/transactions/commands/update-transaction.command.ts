export class UpdateTransactionCommand {
  constructor(
    public readonly transaction_id: number,
    public readonly customer_id: number,
    public readonly food_id: number,
    public readonly qty: number,
  ) {}
}
