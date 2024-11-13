import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { RegisterDataModel } from "@models/registerdata.models";
import { GlobalProviderService } from "@services/global-provider.service";
import { CommonModule} from "@angular/common";
import { IUserAuthenticationDto, IUserResponseDto, RetobackendService } from '@services/retobackend.service';
import { IResponseDto } from '@models/responseDto.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private globalProvider: GlobalProviderService,
    private retobackendService: RetobackendService
  ) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngAfterContentInit() {
    if (sessionStorage.getItem('TOKEN')) this.navigateTo("")
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const { email: mail, password } = form.value as RegisterDataModel;

    const postData: IUserAuthenticationDto = {
      mail: mail,
      password: password
    };

    this.retobackendService.userLogin(postData).subscribe({
      next: (response: IResponseDto<IUserResponseDto>) => {
        const token = response.data?.token;
        
        if (token) {
          sessionStorage.setItem('TOKEN', token)
          this.errorMessage = null;
          this.globalProvider.setLogging(true);
          this.navigateTo("");
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Error en el login. Por favor, intente de nuevo.';
      }
    });
  }
}

