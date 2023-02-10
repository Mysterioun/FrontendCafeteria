import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ContaService } from 'src/app/services/conta.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-administrar-pedido',
  templateUrl: './administrar-pedido.component.html',
  styleUrls: ['./administrar-pedido.component.scss']
})
export class AdministrarPedidoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'categoria', 'preco', 'quantidade', 'total', 'edit'];
  dataSource:any = [];
  administrarPedidoForm:any = FormGroup;
  categorias:any = [];
  produtos:any = [];
  preco:any;
  totalAmount:number = 0;
  responseMessage:any;

  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private snackbarService: SnackbarService,
    private contaService: ContaService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategorias();
    this.administrarPedidoForm = this.formBuilder.group({
      nome:[null, [Validators.required,Validators.pattern(GlobalConstants.nomeRegex)]],
      email: [null, [Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      numeroContato: [null, [Validators.required,Validators.pattern(GlobalConstants.numeroContatoRegex)]],
      metodoPagamento:[null,[Validators.required]],
      produto: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      total: [0, [Validators.required]]
    });
  }

  getCategorias(){
    this.categoriaService.getFiltrandoCategorias().subscribe((response:any)=>{
      this.ngxService.stop();
      this.categorias = response;
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProdutosPelaCategoria(value:any){ 
    this.produtoService.getProdutosPelaCategoria(value.id).subscribe((response:any)=>{
      this.produtos = response;
      this.administrarPedidoForm.controls['preco'].setValue('');
      this.administrarPedidoForm.controls['quantidade'].setValue('');
      this.administrarPedidoForm.controls['total'].setValue(0);
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProdutoDetalhes(value:any){
    this.produtoService.getPeloId(value.id).subscribe((response:any)=>{
      this.preco = response.preco;
      this.administrarPedidoForm.controls['preco'].setValue(response.preco);
      this.administrarPedidoForm.controls['quantidade'].setValue('1');
      this.administrarPedidoForm.controls['total'].setValue(this.preco * 1);    
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  setQuantidade(value:any){
    var temp = this.administrarPedidoForm.controls['quantidade'].value;
    if(temp > 0){
      this.administrarPedidoForm.controls['total'].setValue(this.administrarPedidoForm.controls['quantidade'].value * this.administrarPedidoForm.controls['preco'].value);
    }
    else if(temp != ''){
      this.administrarPedidoForm.controls['quantidade'].setValue('1');
      this.administrarPedidoForm.controls['total'].setValue(this.administrarPedidoForm.controls['quantidade'].value * 
        this.administrarPedidoForm.controls['preco'].value);
    }
  }

  validateProdutoAdd(){
    if(this.administrarPedidoForm.controls['total'].value === 0 || this.administrarPedidoForm.controls['total'].value === null || 
      this.administrarPedidoForm.controls['quantidade'].value <= 0){
        return true;
    }
    else{
      return false;
    }
  }

  validateSubmit(){
   if(this.totalAmount === 0 || this.administrarPedidoForm.controls['nome'].value === null || this.administrarPedidoForm.controls['email'].value === null || 
   this.administrarPedidoForm.controls['numeroContato'].value === null || this.administrarPedidoForm.controls['metodoPagamento'].value === null){
    return true;
   }   
   else{
    return false;
   }
  }

  add(){
    var formData = this.administrarPedidoForm.value;
    var produtoNome = this.dataSource.find((e: {id:number}) => e.id === formData.produto.id);
    if(produtoNome === undefined){
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({id:formData.produto.id, nome:formData.produto.nome, categoria:formData.categoria.nome, quantidade:formData.quantidade, preco:formData.preco, total:formData.total});
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded,"success");
    }
    else{
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }

  handleExcluirAction(value:any, element:any){
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction(){
    var formData = this.administrarPedidoForm.value;
    var data = {
      nome: formData.nome,
      email: formData.email,
      numeroContato: formData.numeroContato,
      metodoPagamento: formData.metodoPagamento,
      totalAmount: this.totalAmount.toString(),
      produtoDetalhes: JSON.stringify(this.dataSource) 
    }

    this.ngxService.start();
    this.contaService.gerarReport(data).subscribe((response:any)=>{
      this.downloadFile(response?.uuid);
      this.administrarPedidoForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  downloadFile(fileName: string){
    var data = {
      uuid: fileName
    }
    this.contaService.getPdf(data).subscribe((response:any)=>{
      saveAs(response,fileName + '.pdf');
      this.ngxService.stop();
    })
  }

}
