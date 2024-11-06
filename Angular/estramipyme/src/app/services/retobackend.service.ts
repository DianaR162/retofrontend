import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseDto } from '@models/responseDto.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const USER_REGISTER_URL = '/user'

export interface IUserRequestDto {
  name: string,
  lastName: string,
  personType: string,
  documentType: string,
  documentNumber: string,
  companyName: string,
  sector: string,
  otherSector: string,
  mail: string,
  password: string,
  passwordConfirm: string
}

@Injectable({
  providedIn: 'root'
})
export class RetobackendService {

  constructor(private http: HttpClient) {  } 

  userRegister(payload: IUserRequestDto): Observable<IResponseDto<boolean>> {
    return this.http.post<IResponseDto<boolean>>(environment.apiUrl + USER_REGISTER_URL, payload);
  }
}
