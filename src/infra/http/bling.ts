import { SendOrdersErp } from '../../data/protocols/send-orders-erp'
import { ClientHttp } from './client-http'
import { stringify } from 'qs'

export class Bling implements SendOrdersErp {
  constructor (
    protected blingUrl: string,
    protected apiKey: string,
    protected client = new ClientHttp()
  ) {}

  async send (xml: string): Promise<any> {
    console.log('Enviando pedido para o Bling')
    const data = stringify({ apikey: this.apiKey, xml })
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const { data: body, status } = await this.client.post(`${this.blingUrl}/pedido/json/`, data, config)
    return { status, body }
  }
}
