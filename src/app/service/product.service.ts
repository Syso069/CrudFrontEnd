import { Injectable } from "@angular/core";
import { enviroment } from "../../environments/environments.development";
import { HttpClient } from "@angular/common/http";
import { Product, ProductCadastrar } from "../models/product.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class ProductService{
    private url = enviroment.api;

    constructor(private httpClient: HttpClient){
    }

    obterProduto(){
        return this.httpClient.get<Product[]>(this.url)
    }

    cadastrarProduto(product: ProductCadastrar){
        return this.httpClient.post<Product>(this.url, product)
    }

    editarProduto(product: Product){
        return this.httpClient.put<Product>(`${this.url}/${product.id}`, product)
    }

    deletarProduto(id: number){
        return this.httpClient.delete<void>(`${this.url}/${id}`)
    }
}
