import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UsuarioService } from '../services/usuario.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  password = true;
  confirmPassword = true;
  cadastrarForm: any = FormGroup;
  responseMessage: any; 
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<CadastrarComponent>,
    private ngxService: NgxUiLoaderService
    ) { }

  ngOnInit(): void {
      this.cadastrarForm = this.formBuilder.group({
        nome:[null,[Validators.required, Validators.pattern(GlobalConstants.nomeRegex)]],
        email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        numeroContato:[null,[Validators.required, Validators.pattern(GlobalConstants.numeroContatoRegex)]],
        senha: [null,[Validators.required]],
        confirmarSenha: [null,[Validators.required]]

      })
  }

  validateSubmit(){
    if(this.cadastrarForm.controls['senha'].value != this.cadastrarForm.controls['confirmarSenha'].value){
      return true;

    }else{
      return false;
    }
  }

  handleSubmit(){
      this.ngxService.start();
      var formData = this.cadastrarForm.value;
      var data = {
        nome: formData.nome,
        email: formData.email,
        numeroContato: formData.numeroContato,
        senha: formData.senha
      }

      this.usuarioService.cadastrar(data).subscribe((response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"");
        this.router.navigate(['/']);
      },(error)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
       // this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);

      })
  }
  refresh(): void {
    window.location.reload();
}
}
