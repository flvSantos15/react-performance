import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults"

type Results = {
  totalPrice: number
  data: any[]
}

type Product = {
  id: number
  price: number
  title: string
}

export function Home() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState<Results | null>(null)

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const product = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice: number = data.reduce((total: number, product: Product) => {
      return total + product.price
    }, 0)

    setResult({ totalPrice, data: product })
  }

  const addToWishList = useCallback((id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={result?.data as []}
        totalPrice={result?.totalPrice as number}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}

export default Home


/**
 *quando tenho uma fn com dropdealing(fn sendo passada pra filho),
 quando o component pai é chamado a função é recriada e onde ela é chamada
 é recriada tbm, quando tenho um useCallback, evito essa recriação se a fn não mudar
 */

/**
 * fazer calculos ou formatações no momento da chamada é bem melhor dq fzr 
 * no render, ou dentro do component, evita fazer calculos mais de 1 vez
 */