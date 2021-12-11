import { Synchronize } from '../../domain/usecases/synchronize'
import { AddDealsRepository } from '../protocols/add-deals-repository'
import { FindDealsByDateRepository } from '../protocols/find-deals-by-date-repository'
import { SearchDeals } from '../protocols/search-deals'
import { SendOrdersErp } from '../protocols/send-orders-erp'
import { XmlBuilder } from '../protocols/xml-builder'

export class SynchronizeService implements Synchronize {
  constructor (
    private readonly searchDeals: SearchDeals,
    private readonly addDealsRepository: AddDealsRepository,
    private readonly findDealsByDateRepository: FindDealsByDateRepository,
    private readonly xmlBuilder: XmlBuilder,
    private readonly sendOrdersErp: SendOrdersErp
  ) {}

  async sync (): Promise<Object> {
    console.log('Iniciando processo de sincronização')
    const deals = await this.searchDeals.search()

    deals?.map(async deal => {
      const xml = await this.xmlBuilder.build(deal)
      const response = await this.sendOrdersErp.send(xml)
      if (response.status === 200) {
        console.log('Salvando registros no banco')
        const date = deal.won_time.split(' ')[0]
        const dealCurrent = await this.findDealsByDateRepository.find(date)
        if (dealCurrent) {
          dealCurrent.deals.push(deal)
          dealCurrent.total = dealCurrent.total + deal.value
          await this.addDealsRepository.add(dealCurrent)
        }
        console.log('dealCurrent: ', dealCurrent)

        await this.addDealsRepository.add({ date, deals: [deal], total: 0, orders: [] })
      }
    })

    return { success: true, message: 'Processo de sincronização concluido com sucesso' }
  }
}
