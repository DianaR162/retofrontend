import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { DataProcService } from "@services/data-proc.service";
import { RegisterDataModel } from "@models/registerdata.models";
import { GlobalProviderService } from "@services/global-provider.service";
import { HttpClient } from '@angular/common/http'; // Importar HttpClient correctamente
import { CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // No necesitas HttpClientModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corregido el nombre a styleUrls
})
export class LoginComponent {
  errorMessage: string | null = null; // Variable para almacenar el mensaje de error

  constructor(
    private router: Router,
    private dataproc: DataProcService,
    private globalProvider: GlobalProviderService,
    private http: HttpClient
  ) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const values = form.value as RegisterDataModel;
    const url = `http://localhost:8080/api/v1/user/login`;

    const postData = {
      mail: values.email,
      password: values.password
    };

    this.http.post(url, postData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.errorMessage = null; // Limpiar el mensaje de error si la solicitud es exitosa
        this.globalProvider.setLogging(true);
        this.navigateTo(""); // Navegar después de loguearse
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Error en el login. Por favor, intente de nuevo.'; // Asignar mensaje de error
      }
    });
  }
}

