import { PipedriveResponse, SearchDeals } from '../../data/protocols/search-deals'
import { Deals } from '../../domain/models/deals'
import { ClientHttp } from './client-http'

export class Pipedrive implements SearchDeals {
  constructor (
    protected pipedriveUrl: string,
    protected pipedriveToken: string,
    protected client = new ClientHttp()
  ) {}

  async search (): Promise<Deals[]|undefined> {
    try {
      console.log('Bucando dados no pipedrive')
      const response = await this.client.get<PipedriveResponse>(`${this.pipedriveUrl}/deals?api_token=${this.pipedriveToken}&status=won`)
      if (response.status === 200) return this.normalizeResponse(response?.data)
    } catch (error) {
      console.log('status: ', error?.response?.status)
      console.log('config: ', error?.response?.config)
      console.log('data: ', error?.response?.data?.erros)
    }
  }

  private normalizeResponse (
    pipedriveResponse: PipedriveResponse
  ): Deals[] {
    return pipedriveResponse.data.map((deal) => ({
      title: deal.title,
      value: deal.value,
      status: deal.status,
      org_name: deal.org_name,
      won_time: deal.won_time
    }))
  }
}
