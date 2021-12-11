import { Deals } from '../../domain/models/deals'

export interface XmlBuilder{
  build: (deals: Deals) => Promise<any>
}
