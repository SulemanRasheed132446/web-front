import React, { Component } from 'react'
import { Button, MenuItem, FormGroup } from '@material-ui/core';
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import { fetchGradePost, fetchMyClassListGet } from '../../store/classes/Actions';
import { Link } from 'react-router-dom';
import { Field, Formik, Form, FieldArray } from 'formik';
import { GetCorrectSubject } from '../../store/subject/Actions';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { addQuestion, getTeacherSubjectList } from '../../store/question/Actions';
import { validationSchemaTest } from './QuestionValidation';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import './QuestionStyle.scss';

export type OwnQuestSetProps = {
    loading: boolean;
    addQuestion:(postQuestion:any) => void;
    fetchGradePost: (postValue:any) => void;
    GetCorrectSubject: (postValue:any) => void;  
    fetchGetAllClassList:(postValue:any)=>void;
    getTeacherSubjectList:(getList:any)=>void;
    fetchMyClassListGet:() => any;
    schoolAdminClass:any,
    getClassList:any;
    getSubjectlist:any;
    getProfile:any;
    getCorrectClassList:any;
    getErrormessage:any;
    TeacherSubjectList:any
}
const initialValues = {
    question_name: '',
    select_class: '',
    select_subject: '',
    questionlist: [
        {
            question: '',
            add_topics: '',
            question_name_A:'',
            question_name_B:'',
            question_name_C:'',
            question_name_D:'',
            answer:''
        }

    ]
};
  
export class AddQuestion extends Component<OwnQuestSetProps> {  
    getQuestionList:any = []; 
    formikQuestion:any;
    componentDidMount(): void {
        const { getProfile } = this.props;
        window.scrollTo(0, 0);
        const postValue = {
            academic_year:'2021'
        }
        this.props.fetchGradePost(postValue);
        this.getCommonData();
        this.getTeacherList();
        if(getProfile){
            if(getProfile.usertype === 1) {

            } else if(getProfile.usertype === 2) {
                this.props.fetchMyClassListGet();
            } else if(getProfile.usertype === 3) {

            }
        }
    }
    
    getCommonData(){
        const { getProfile } = this.props;
        if(getProfile) {
			const postValue = {
				academic_year:'2021',
                school_id:getProfile.school_id
			}
            this.props.fetchGetAllClassList(postValue);
        }
    }
    getschoolAdmin(getGradeId:any){
        const { getProfile } = this.props;
        if(getProfile) {
			const postValue = {
				academic_year:'2021',
                school_id:getProfile.school_id,
                grade_id:getGradeId
			}
            this.props.GetCorrectSubject(postValue);
        }
    }
getTeacherList(){
    const { getProfile } = this.props;
    if(getProfile){
        let getValueList:any = {
            teacher_id: getProfile.ldap_id,
            academic_year:2021
        }
        this.props.getTeacherSubjectList(getValueList);
    }
    
}
getSubjectList = (e:any, getValue?:any) => {
if(getValue){
    this.getschoolAdmin(getValue)
}
}
componentDidUpdate() { 
}
    render() {
        const { loading } = this.props;
      const loadingQuestionFull = { display: loading ? "block" : "none" };
        const getProfile = this.props.getProfile;
        const getSubject:any = this.props.getSubjectlist;
        let SubjectList:any;
        let ClassListSchoolAdmin:any;
        let ClassListTeacher:any;
        if(getSubject) {
            SubjectList = getSubject.data;
        }
        if(getProfile){
            if(getProfile.usertype === 1 || getProfile.usertype === 2 ) {
                ClassListSchoolAdmin = this.props.schoolAdminClass;
                SubjectList = getSubject.data;
            } else if(getProfile.usertype === 3) {
                ClassListTeacher = this.props.getCorrectClassList;
                SubjectList = this.props.TeacherSubjectList;
            }
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                        <BreadCrumb
                                titleName={['New Question Set']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['Add Question Set']}
                                baseName={['Question Set']}
                                baseURL={['question']} />
                                {SubjectList && getProfile && this.props.getCorrectClassList && this.props.getClassList ?
                        <div className="row">
                            <div className="col-md-12">
                            <Formik
                                            ref={node=>this.formikQuestion = node}
                                            initialValues={initialValues}
                                            validationSchema={validationSchemaTest}
                                            
                                            onSubmit={(values, actions) => {
                                                let getQuestionValue:any   
                                                if(values){
                                                    values.questionlist.forEach((item:any, index:any)=>{
                                                        let submitValue:any = [];
                                                        let optionA:any;
                                                        let optionB:any;
                                                        let optionC:any;
                                                        let optionD:any;
                                                        if( item.answer === 'A'){
                                                            optionA = true; optionB = false; optionC = false; optionD = false;
                                                        } else if( item.answer === 'B'){
                                                            optionA = false; optionB = true; optionC = false; optionD = false;
                                                        } else if( item.answer === 'C'){
                                                            optionA = false; optionB = false; optionC = true; optionD = false;
                                                        } else if( item.answer === 'D'){
                                                        optionA = false; optionB = false; optionC = false; optionD = true;
                                                        }

                                                        submitValue =   
                                                              {
                                                                serial_no: index + 1,
                                                                question: item.question,
                                                                question_picture: '',
                                                                topics: item.add_topics,
                                                                answers: [
                                                                  {
                                                                    serial_no: 'A',
                                                                    choice: item.question_name_A,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionA
                                                                  },
                                                                  {
                                                                    serial_no: 'B',
                                                                    choice: item.question_name_B,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionB
                                                                  },
                                                                  {
                                                                    serial_no: 'C',
                                                                    choice: item.question_name_C,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionC
                                                                  },
                                                                  {
                                                                    serial_no: 'D',
                                                                    choice: item.question_name_D,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionD
                                                                  }
                                                                ]
                                                              }
                                                            
                                                        this.getQuestionList.push(submitValue);
                                                    })

                                                    if(this.getQuestionList.length > 0) {
                                                        const createrBy:any =  getProfile.firstname+"  "+getProfile.lastname;
                                                        getQuestionValue =  {
                                                            school_id: getProfile.school_id,
                                                            academic_year: '2021',
                                                            grade_id: String(values.select_class),
                                                            subject_id: String(values.select_subject),
                                                            question_name: values.question_name,
                                                            posted_by:  createrBy,                                                            
                                                            questions: this.getQuestionList
                                                          }
                                                    this.props.addQuestion(getQuestionValue);
                                                    }
                                                }
                                             
                                            }}>
                                            {({ values, errors, isSubmitting, isValidating, dirty, touched, handleReset, handleSubmit, setFieldValue }) => {
                                                // this is the add question set validation message
                                                  let getAnswerList:any;
                                                  values.questionlist.length > 0?
                                                  getAnswerList = true
                                                  :getAnswerList = false
                                                  const isQuestionEmpty = (!values.question_name
                                                    || !values.select_class
                                                    || !values.select_subject);
                                                return (
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <FormGroup>
                                                                <Field
                                                                    label='Question Set Name*'
                                                                    type="text"
                                                                    name="question_name"
                                                                    component={TextField}
                                                                    className="textfield__input"
                                                                    disabled={false}
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <FormGroup className="w-100 mb-4">
                                                               
                                                                     {ClassListSchoolAdmin ?
                                                                    <Field
                                                                    label='Select Class*'
                                                                    name="select_class"
                                                                    select
                                                                    component={TextField}
                                                                    disabled={false}
                                                                    onChange={(e:any, value:any) => {
                                                                        setFieldValue('select_class', e.target.value)
                                                                        this.getSubjectList(e, e.target.value)
                                                                      }} 
                                                                >
                                                                    { ClassListSchoolAdmin.map((item:any) =>(
                                                                        <MenuItem value={item.id}>{item.value}</MenuItem>
                                                                            ))
                                                                        }
                                                                        </Field>
                                                                    :null}
                                                                     {ClassListTeacher ?
                                                                      <Field
                                                                      label='Select Class*'
                                                                      name="select_class"
                                                                      select
                                                                      component={TextField}
                                                                      disabled={false}
                                                                  >
                                                                     { this.props.getCorrectClassList.map((item:any) =>(
                                                                        <MenuItem value={item.id}>{item.grade_standard}</MenuItem>
                                                                            ))
                                                                        }
                                                                      </Field>
                                                                     :null}
                                                                    
                                                               
                                                            </FormGroup>
                                                        </div>
                                                        {SubjectList?
                                                        <div className="col-md-4">
                                                            <FormGroup className="w-100 mb-4">
                                                                <Field
                                                                    label='Select Subject*'
                                                                    name="select_subject"
                                                                    select
                                                                    component={TextField}
                                                                    disabled={false}
                                                                >
                                                                    { SubjectList.map((item:any) =>(
            
                                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Field>
                                                            </FormGroup>
                                                        </div>
                                                        :null}
                                                    </div>
                                                    <FieldArray
                                                        name="questionlist"
                                                        render={({ insert, remove, push }) => (
                                                            <>
                                                                        {values.questionlist.length > 0 &&
                                                                            values.questionlist.map((friend:any, index:any) => (
                                                
                                                                                <div className="row" key={index}>
                                                                            <div className="col-md-12">
                                                                          
                                                                                <div className="card-box mt-4">
                                                                                    <div className="card-body  pb-5">
                                                                                    <div className="col-md-12 text-right ">
                                                                                        <button className=""
                                                                                            type="button"  title="Delete Question"                
                                                                                            onClick={() => remove(index)}
                                                                                        >
                                                                                        <span className="deleteIcon"> 
                                                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                        </span>
                                                                                        </button>
                                                                                    </div>
                                                                                    
                                                                                    <div className="d-flex mt-1 w-100">
                                                                                        <div className="mr-3 mt-4">{index + 1}.</div>
                                                                                        <FormGroup className="w-100">
                                                                                            <Field
                                                                                                label='Write Question*'
                                                                                                type="text"
                                                                                                name={`questionlist.${index}.question`}
                                                                                                component={TextField}
                                                                                                className="textfield__input"
                                                                                                disabled={false}
                                                                                            />
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                    <div className="col-md-12 pr-0 mt-3">

                                                                                        <FormGroup className="w-100">
                                                                                            <Field
                                                                                                label='Add Topics*'
                                                                                                type="text"
                                                                                                name={`questionlist.${index}.add_topics`}
                                                                                                component={TextField}
                                                                                                className="textfield__input"
                                                                                                disabled={false}
                                                                                            />
                                                                                        </FormGroup>
                                                                                    </div> 
                                                                                  
                                                                                <div className="row">
                                                                                <>
                                                                                {errors.questionlist ?
                                                                                  <div className="col-md-12 text-center mt-3">
                                                                                  {
                                                                                  Object.keys(errors).length !== 0  && errors!.questionlist![index]?.answer !== undefined && touched && touched?.questionlist && touched?.questionlist.length !== index ? 
                                                                                  <div className="errorcolor">{errors!.questionlist![index]?.answer!}</div>
                                                                                  :null
                                                                                  }
                                                                                  </div>
                                                                                :null}
                                                                           </>
                                                                                <div className="col-md-6">
                                                                                    <div className="col-md-12">
                                                                                        <div className="d-flex mt-3">
                                                                                        <div className="mt-4 mr-3 ml-2">
                                                                                        <Field type="radio" name={`questionlist.${index}.answer`}  color="success"  value="A"/>
                                                                                        </div>
                                                                                        <div className="mr-3 mt-4">A.</div>
                                                                                        <FormGroup className="w-100">
                                                                                        <Field
                                                                                            label='Write Option A*'
                                                                                            type="text"
                                                                                            name={`questionlist.${index}.question_name_A`}
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            disabled={false}
                                                                                        />
                                                                                        </FormGroup> 
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                    <div className="d-flex mt-3">
                                                                                    <div className="mt-4 mr-3 ml-2">
                                                                                    <Field type="radio" name={`questionlist.${index}.answer`} value="B" />
                                                                                    </div>
                                                                                    <div className="mr-3 mt-4">B.</div>
                                                                                    <FormGroup className="w-100">
                                                                                    <Field
                                                                                        label='Write Option B*'
                                                                                        type="text"
                                                                                        name={`questionlist.${index}.question_name_B`}
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                    </FormGroup>  
                                                                                    </div>
                                                                                </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="col-md-12">
                                                                                    <div className="d-flex mt-3">
                                                                                    <div className="mt-4 mr-3 ml-2">
                                                                                    <Field type="radio" name={`questionlist.${index}.answer`} value="C" />
                                                                                    </div>
                                                                                    <div className="mr-3 mt-4">C.</div>
                                                                                    <FormGroup className="w-100">
                                                                                    <Field
                                                                                        label='Write Option C*'
                                                                                        type="text"
                                                                                        name={`questionlist.${index}.question_name_C`}
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                    </FormGroup>
                                                                                    </div>
                                                                                 </div>
                                                                                <div className="col-md-12">
                                                                                <div className="d-flex mt-3">
                                                                                    <div className="mt-4 mr-3 ml-2">
                                                                                    <Field type="radio" name={`questionlist.${index}.answer`} value="D" />
                                                                                    </div>
                                                                                    <div className="mr-3 mt-4">D.</div>
                                                                                    <FormGroup className="w-100">
                                                                                    <Field
                                                                                        label='Write Option D*'
                                                                                        type="text"
                                                                                        name={`questionlist.${index}.question_name_D`}
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                    </FormGroup>
                                                                                    
                                                                                </div>
                                                                                    </div>
                                                                                </div> 
                
                                                                                </div>  
                                                                                </div>
                                                                                  </div>
                                                                                  </div>
                                                                              </div>
                                                                              
                                                                            ))}
                                                                            <div className="col-md-12 text-center">
                                                                            <Link to={'#'} title="Add Question" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored margin-right-10" data-upgraded=",MaterialButton" onClick={() => push({question: "", add_topics: "", question_name_A:"", question_name_B:"", question_name_C:"", question_name_D:"" })}>
                                                                                <i className="material-icons">add</i>
                                                                            </Link>
                                                                            </div>
                                                                       
                                                        </>    
                                                        )}
                                                    />
                                                    <div className="text-right mb-3 mr-2 mt-4">
                                                        <Button
                                                            className="btn btn-pink mr-1 ml-1"
                                                            type="submit" disabled={isQuestionEmpty
                                                                || isValidating
                                                                || !dirty
                                                                || !!(errors.question_name && touched.question_name)
                                                                || !!(errors.select_class && touched.select_class)
                                                                || !!(errors.select_subject && touched.select_subject) || !getAnswerList}>Submit</Button>
                                                        <Link to={'/question'}>
                                                            <Button
                                                                className="btn btn-default mr-1 ml-1 ">Cancel</Button>
                                                        </Link>
                                                    </div>
                                                </Form>
                                            )}}
                                        </Formik>
                            </div>
                        </div>
                        : <SpinnerLoader/>}
                    </div>
                </div>
                </div>
                <div style={loadingQuestionFull}><SpinnerLoader /></div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {   
    return{
        loading:state.classes.loading,
        getClassList:state.classes.gradelist,
        getSubjectlist:state.subjects.category,
        getProfile:state.profile.profileData,
        schoolAdminClass:state.classes.my_class,
        getCorrectClassList:state.diary.gradelist,
        TeacherSubjectList:state.questionset.getTeacherSubjectList,
        getErrormessage:state.questionset.errors
    }
}

export default connect(mapStateToProps, {fetchGradePost, 
    GetCorrectSubject, 
    addQuestion, 
    fetchGetAllClassList, 
    getTeacherSubjectList, fetchMyClassListGet })(AddQuestion)
