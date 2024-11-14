import {Component, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {DataProcService} from "@services/data-proc.service";
import {FormsModule, NgForm} from "@angular/forms";
import {RegisterDataModel} from "@models/registerdata.models";
import { IUserRequestDto, RetobackendService } from '@services/retobackend.service';
import { registerDataToUserRequestDto } from '../../mapper/user.mapper';
import { IResponseDto } from '@models/responseDto.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordDoNotMatch = signal<boolean>(false);
  invalidSurname = signal<boolean>(false);
  invalidBusinessName = signal<boolean>(false)
  invalidId = signal<boolean>(false)
  invalidName = signal<boolean>(false);
  router!: Router;
  dataproc!: DataProcService;

  constructor(router: Router, dataproc: DataProcService, private retobackendServices: RetobackendService) {
    this.router = router;
    this.dataproc = dataproc;
  }

  navigateTo(path: string) {
    this.router.navigate([path])
  }

  ngAfterContentInit() {
    if (sessionStorage.getItem('TOKEN')) this.navigateTo("")
  }

  _checkName(value: string) {
    this.invalidName.set(true)
    return value.trim().length > 0;
  }

  _checkSurname(value: string) {
    this.invalidSurname.set(true)
    return value.trim().length > 0;
  }

  _checkBusinessName(value: string) {
    this.invalidBusinessName.set(true)
    return value.trim().length > 0;
  }

  _checkId(value: number) {
    this.invalidId.set(true)
    return Number(value) > 0;
  }


  onSubmit(form: NgForm) {
    if (!form.valid) return;
    
    const values = form.value as RegisterDataModel
    if (values.password !== values.confirmPassword) {
      this.passwordDoNotMatch.set(true);
      return;
    }
    const userToRegister: IUserRequestDto = registerDataToUserRequestDto(values);

    this.retobackendServices.userRegister(userToRegister).subscribe({
      next: (response: IResponseDto<boolean>) => {
        if (response.data) {
          this.router.navigate(['/login'])
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
