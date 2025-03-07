export type Product = {
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    disponivel: boolean
}

export type ProductCadastrar = Omit<Product, "id">;