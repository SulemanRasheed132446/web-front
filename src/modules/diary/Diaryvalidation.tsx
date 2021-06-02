import * as yup from 'yup';
import { userFormValidations } from '../../services/Constants';

export const DiaryValidation = yup.object({
    diray_status: yup.string()
    .required('Please select the message type'),
    your_title: yup.string()
    .required('Please enter Your Title')
    .min(userFormValidations.firstNameSizeMin, userFormValidations.dirayTitleMin)
    .max(userFormValidations.lastNameSizeMax, userFormValidations.dirayTitleMax)
})

export const DiaryReplyData = yup.object({ 
    replayMessage: yup.string()
    .required('Please enter the Reply Message')
})