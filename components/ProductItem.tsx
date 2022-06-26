import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number
    price: number
    title: string
  }
}

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // peço á ele para fazer uma comparação do valor anterior e do prox
  // se for igual não renderiza, se não renderiza
  return Object.is(prevProps.product, nextProps.product)
})
