import { Deals } from '../../domain/models/deals'

export interface PipedriveResponse {
  success: boolean
  data: Deals[]
}

export interface SearchDeals{
  search: () => Promise<Deals[]|undefined>
}
