import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product.model';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  abrirModal(){
    throw new Error("Metodo não implementado");
  }

  title = 'frontTesteTecnico';

  product: any[] = []

  id: number = 0;
  nome: string = "";
  descricao: string = "";
  preco: number = 0;
  disponivel: boolean = false;

  constructor(private ProductService: ProductService){
    this.obterProdutosCadastrados();
  }

  obterProdutosCadastrados(){
    this.ProductService.obterProduto()
      .subscribe(products => {
        this.product = products.map(product => ({
          ...product,
          disponivel: product.disponivel ? 'Sim' : 'Não'
        }));
      });
}

  buttonClick(){
    if(!this.nome){
      return alert("Campo nome é obrigatório!");
    }
    if(this.id){
      this.atualizar();
      return;
    }
    if(this.preco < 0){
      this.verificaValorNegativo();
    }else{
      this.ProductService.cadastrarProduto({nome: this.nome, descricao: this.descricao ,preco: Number (this.preco), disponivel: this.disponivel})
      .subscribe(_ => this.obterProdutosCadastrados());
    }
  }

  verificaValorNegativo(){
      alert("Não existe produto com valor negativo!")
  }

  atualizar(){
    this.ProductService.editarProduto({id: this.id, nome: this.nome, descricao: this.descricao, preco: this.preco, disponivel: this.disponivel})
      .subscribe(_ => this.obterProdutosCadastrados())
  }

  editarProduto(product: Product){
    this.id = product.id;
    this.nome = product.nome;
    this.descricao = product.descricao;
    this.preco = product.preco;
    this.disponivel = product.disponivel;
  }

  deletarProduto(id: number){
    var confirmacao = confirm("Você quer deletar esse produto?")
    if(confirmacao){
      this.ProductService.deletarProduto(id)
      .subscribe(() => this.obterProdutosCadastrados())
      alert("O produto foi deletado!")
    }else{
      alert("O produto não foi deletado!")
    }

  }
}
