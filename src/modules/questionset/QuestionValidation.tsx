import * as yup from 'yup';
export const QuestionValidation = yup.object({
    question_name: yup.string()
    .required('Please enter the Question Set Name'),
    select_class: yup.string()
    .required('Please select the Grade'),
    select_subject: yup.string()
    .required('Please select the Subject'),
    question: yup.string()
    .required('Please enter the Question'),
    add_topics: yup.string()
    .required('Please enter the Topics'),
    question_name_A: yup.string()
    .required('Please enter the  Option A'),
    question_name_B: yup.string()
    .required('Please enter the  Option B'),
    question_name_C: yup.string()
    .required('Please enter the  Option C'),
    question_name_D: yup.string()
    .required('Please enter the Option D'),
    answer: yup.string()
    .required('Please select the Correct Answer')
})


export const  validationSchemaTest = yup.object().shape({
    question_name: yup.string()
    .required('Please enter the Question Set Name'),
    select_class: yup.string()
    .required('Please select the Grade'),
    select_subject: yup.string()
    .required('Please select the Subject'),
    questionlist: yup.array().of(
        yup.object().shape({
            question: yup.string()
            .required('Please enter the Question'),
            add_topics: yup.string()
            .max(30, "Add Topics should not be more than 30 characters")
            .required('Please Add Topics'),
            question_name_A: yup.string()
            .required('Please enter the Option A'),
            question_name_B: yup.string()
            .required('Please enter the Option B'),
            question_name_C: yup.string()
            .required('Please enter the Option C'),
            question_name_D: yup.string()
            .required('Please enter the Option D'),
            answer: yup.string()
            .required('Please choose the Correct Answer'),
            })
        )
    });