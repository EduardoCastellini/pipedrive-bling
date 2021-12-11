export interface SendOrdersErp{
  send: (xml: string) => Promise<any>
}
