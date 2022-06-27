import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  totalPrice: number
  results: Array<{
    id: number
    price: number
    priceFormatted: string
    title: string
  }>
  onAddToWishList: (id: number) => void
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice
}: SearchResultsProps) {
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price
  //   }, 0)
  // }, [results])
  return (
    <div>
      <h2>{totalPrice}</h2>
      {results?.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        )
      })}
    </div>
  )
}

/**
 * Cases of memo's use
 * 1. Pure Functional components - text, buttons, formularios, listas
 * 2. Renders too often - componentes que renderizam muito
 * 3. Re-renders with same props - msm quq poucas vezes mas mesmas props
 * 4. Medium to big size - components muito grande
 */

/**
 * Cases of useMemo's use
 * 1. Calculos pesados
 * 2. igualdade referencial (
 *  quando agente passa uma informação a uma componet filho, quando o 
 * calculo não é grande, mas preciso passar o calculo/resultado p filho
 * )
 * Guardo valores
 */

/**
 * Cases of useCallBack's use
 * 1. 
 * Guardo funções
 */