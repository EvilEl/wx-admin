export const groupProduct = Object.freeze({
  candles: 'candles',
  diffusers: 'diffusers',
  sachets: 'sachets',
})

export interface IProductBase {
  id: number
  name: string
  count: number
  price: number
}

export interface IProduct extends Omit<IProductBase, 'id'> { }

export type keyGroupProduct = keyof typeof groupProduct

export interface ICreateProduct extends IProduct {
  group: keyGroupProduct
}


export interface IProductSelect {
  id: keyGroupProduct
  text: string
}
