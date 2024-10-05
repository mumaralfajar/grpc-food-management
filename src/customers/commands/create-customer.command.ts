export class CreateCustomerCommand {
  constructor(
    public readonly name: string,
    public readonly phone: string,
    public readonly address: string,
  ) {}
}
