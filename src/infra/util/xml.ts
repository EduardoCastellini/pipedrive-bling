import builder from 'xmlbuilder'
import { XmlBuilder } from '../../data/protocols/xml-builder'
import { Deals } from '../../domain/models/deals'

export class Builder implements XmlBuilder {
  async build (deal: Deals): Promise<any> {
    console.log('Buildando XML')
    return builder.create('pedido', { encoding: 'utf-8' })
      .ele('cliente')
      .ele('nome', deal.org_name).up()
      .ele('itens')
      .ele('item')
      .ele('descricao', 'Softwares para gestão').up()
      .ele('codigo', 10010).up()
      .ele('qtde', 1).up()
      .ele('vlr_unit', deal.value).up()
      .up()
      .up()
      .end({ pretty: true })
  }
}
