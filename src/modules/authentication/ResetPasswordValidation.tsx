import { object, string, ref } from 'yup';
import { formValidationPatten, FormInvalidMessage, formValidationSize } from '../../services/Constants';

export const ResetValidation = object({
    resetnewpassword:
    string()
    .required(FormInvalidMessage.newpassword)
    .min(formValidationSize.minlengthpassword, FormInvalidMessage.incalidpassPatten)
    .max(formValidationSize.maxlengthpassword, FormInvalidMessage.incalidpassPatten)
    .matches(formValidationPatten.passwordPatten, FormInvalidMessage.incalidpassPatten
    ),
    resetconfirmpassword:
    string()
    .required(FormInvalidMessage.Confirmpassword)
    .oneOf([ref("resetnewpassword")], FormInvalidMessage.confirmMessage)
})