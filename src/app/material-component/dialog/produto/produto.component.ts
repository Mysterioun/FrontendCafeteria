import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  onAddProduto = new EventEmitter();
  onEditProduto = new EventEmitter();
  produtoForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;
  categorias:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private produtoService: ProdutoService,
  public dialogRef: MatDialogRef<ProdutoComponent>,
  private categoriaService: CategoriaService,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      nome: [null,[Validators.required, Validators.pattern(GlobalConstants.nomeRegex)]],
      categoriaId: [null,[Validators.required]],
      preco: [null,[Validators.required]],
      descricao: [null,Validators.required]
    });

    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit";
      this.action = "Editar";
      this.produtoForm.patchValue(this.dialogData.data);
    }
    this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe((response:any)=>{
      this.categorias = response;
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.produtoForm.value;
    var data = {
      nome: formData.nome,
      categoriaId: formData.categoriaId,
      preco: formData.preco,
      descricao: formData.descricao
    }

    this.produtoService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddProduto.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    },(error)=>{
      this.dialogRef.close();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
    //  this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.produtoForm.value;
    var data = {
      id: this.dialogData.data.id,
      nome: formData.nome,
      categoriaId: formData.categoriaId,
      preco: formData.preco,
      descricao: formData.descricao
    }

    this.produtoService.editar(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditProduto.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    },(error)=>{
      this.dialogRef.close();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
    //  this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  refresh(): void {
    window.location.reload();
}
}
