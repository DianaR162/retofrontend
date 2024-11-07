import { RegisterDataModel } from "@models/registerdata.models";
import { IUserRequestDto } from "@services/retobackend.service";

const registerDataToUserRequestDto = (registerData: RegisterDataModel): IUserRequestDto => {
    const {
        name,
        surname,
        personType,
        docType,
        docNumber,
        businessName,
        sector,
        otroSector,
        email,
        password,
        confirmPassword
    } = registerData;

    return {
        name,
        lastName: surname,
        personType,
        documentType: docType,
        documentNumber: docNumber.toString(),
        companyName: businessName,
        sector,
        otherSector: otroSector,
        mail: email,
        password,
        passwordConfirm: confirmPassword,
    }
}

export { registerDataToUserRequestDto }
