export class UpdateCustomerCommand {
  constructor(
    public readonly customer_id: number,
    public readonly name: string,
    public readonly phone: string,
    public readonly address: string,
  ) {}
}
