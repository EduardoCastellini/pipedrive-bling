export interface Deals {
  title: string
  value: number
  status: string
  org_name: string
  won_time: string
}

export interface AddDeals {
  deals: Deals[]
  orders: object
  date: string
  total: number
}

export interface DealsModel {
  _id: string
  deals: Deals[]
  orders: object
  date: string
  total: number
}
