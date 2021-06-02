import React from 'react'
import { connect } from 'react-redux'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import BreadCrumb from '../../components/BreadCrumb';
import { addStudent } from '../../store/student/Actions';
import { fetchGradePost, fetchGradeStandardPost } from '../../store/classes/Actions';
import { studentInputTypes, StudentType } from '../../store/student/Types';
import { fetchParent } from '../../store/student/Actions';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { StudentValidation } from './StudentValidation';
import history from '../../History';
import ImageUpload  from './StudentImage';
import { fetchMyClassListGet, fetchMySectionListGet } from '../../store/classes/Actions';
import { getStudentClassesData } from '../../store/profile/Actions';


export type OwnStudentFormProps = {
    addStudent: (student: any) => void;
    fetchGradePost:(postValue:any) => void;
    fetchGradeStandardPost:() => any;
    fetchParent: (getParent:any) => any;
    fetchMyClassListGet:() => any;
    fetchMySectionListGet:(grade:any) => any;
    getStudentClassesData:(postData:any)=>any;
    loading: boolean;    
    errorMessage: any;
    ListSection:any;
    ListClass:any;
    getParentResponse:any;
    checkParent:any;
    getImageURL:any;
    getProfile:any;
};
 const initialAddValues: StudentType = {
    phone_number: '',
    email_id: '',
    student_name:  '',
    academic_year:'2021',
    grade: '',
    standard:'',
    parent_firstname:  '',
    parent_lastname:  '',
    profile_picture: '',
    user_id:'sdad'
}

export class AddStudent extends React.Component<OwnStudentFormProps, studentInputTypes> {  
    formik:any;
    parentName:any;
    getSectionList:any;
    getImage:any;
    constructor(props: any) {        
        super(props);        
        this.state = {
            phone_number:'',
            email_id:'',
            student_name:'',
            academic_year:'2021',
            grade:'',
            standard:'',
            parent_firstname:'',
            parent_lastname:'',
            profile_picture:'',
            user_id:'',
            checkParentList:false,
            getSelectClass:true,
            getClass:'',
            getSection:''
        }  
    }
    componentDidMount(): void {     
        window.scrollTo(0, 0);  

        this.getImage = '';
        const postValue = {
            academic_year:'2021'
        }
        this.props.fetchGradePost(postValue);
        this.props.fetchGradeStandardPost();  
        this.props.fetchMyClassListGet();  
        this.getSectionList = true;    
    }
    findParantDetail= (e: any) => {
        const { getProfile } = this.props;
        const { value } = e.target;
        if(value.length === 10) {
            const getPhone = {
                phone_number:value,
                school_id:getProfile.school_id
            };
            this.props.fetchParent(getPhone).then((res:any) => {
                if(this.props.checkParent === false){
                    this.formik.setFieldValue('email_id', '')  
                    this.formik.setFieldValue('parent_firstname', '')
                    this.formik.setFieldValue('parent_lastname', '')
                }
            });          
        }        
    }
   goBack(){
    history.push("/student");
   }
    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {         
         // This is the function used to update old parent details
        this.parentName = false;
        if(this.props.getParentResponse.length === undefined){ 
            this.parentName = false;
            this.formik.setFieldValue('email_id', this.props.getParentResponse.email_id)  
            this.formik.setFieldValue('parent_firstname', this.props.getParentResponse.parent_firstname)
            this.formik.setFieldValue('parent_lastname', this.props.getParentResponse.parent_lastname)
        }
      }
      selectClassname(getValue:any){
        const { value } = getValue.target;
        const getGrade = {
            grade:value
        }
        this.setState({getClass:value})
        this.props.fetchMySectionListGet(getGrade);
      }
      selectStandard(e:any){
        const { value } = e.target;
        this.setState({getSection:value})
      }
    render() { 
        const { loading, ListSection } = this.props;  
        const { getClass, getSection } =  this.state;      
        const loadingStudent = { display: loading ? "block" : "none" }; 
        if(this.props.getImageURL){
            const getUrlpath = this.props.getImageURL.url;
            if(getUrlpath){
                getUrlpath.forEach((items:any)=>{
                    this.getImage = items;
                })
            }
        }  
        if(getClass && getSection) {
            let postClassesDetails:any = {
                class_name: getClass, 
                section_name: getSection
            }
            this.props.getStudentClassesData(postClassesDetails);
        }
        if(ListSection.length > 0){
            this.getSectionList = false;
        }   
        return (
            <div>
                 <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                        <BreadCrumb 
                        titleName={['Student']} 
                        homeName={['Home']} 
                        url={['dashboard']} 
                        baseName={['Student']} 
                        baseURL={['student']} 
                        mainPageTitle={['Add Student']}/>
                        <div className="row">
                        <div className="col-md-12">
                        <div className="card-box">
                        <div className="card-head">
                        <header>Add Student</header>
                        <div className="tools">
                      </div>
                        </div>
                        <div className="card-body">                          
                            <div className="row">
                            <div className="col-md-12">                                                      
                                <Formik
                                    ref={node=>this.formik = node}
                                    validationSchema={StudentValidation}
                                    initialValues={initialAddValues}
                                    onSubmit={(values:any, actions) => { 
                                        const postValue:any = {
                                            phone_number: values.phone_number,
                                            email_id: values.email_id.toLowerCase(),
                                            student_name: values.student_name,
                                            academic_year:'2021',
                                            grade: values.grade,
                                            standard:values.standard,
                                            parent_firstname: values.parent_firstname,
                                            parent_lastname: values.parent_lastname,
                                            profile_picture: this.getImage,
                                            user_id:'sdad'
                                        }                                     
                                        this.props.addStudent(postValue)
                                    }}>
                                        {({ values, errors, isSubmitting, isValidating, dirty, touched, setFieldValue }) => {
                                            const isStudentEmpty = (!values.student_name 
                                                || !values.grade 
                                                || !values.standard 
                                                || !values.phone_number 
                                                || !values.email_id 
                                                || !values.parent_firstname
                                                || !values.parent_lastname);
                                        return(
                                        <Form>                                    
                                            <div className="row">
                                            <div className="col-md-6 p-t-20 pl-0 pr-0">
                                            <div className="col-md-12 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Student Name*'
                                                                type="text"
                                                                name="student_name"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                    <Field 
                                                    label='Grade*'
                                                    name="grade"  
                                                    select
                                                    component={TextField}        
                                                    disabled={false} 
                                                    onChange={(e:any) => {
                                                        setFieldValue('grade', e.target.value)
                                                        this.selectClassname(e);
                                                      }}   
                                                    >
                                                        { this.props.ListClass.map((item:any) =>(
                                                                    <MenuItem value={item.value}>{item.value}</MenuItem>
                                                            ))
                                                        }
                                                    </Field> 
                                                    </FormGroup> 
                                                    </div>
                                                </div>
                                                <div className="col-md-12 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                    <Field 
                                                    label='Section*'
                                                    name="standard"  
                                                    select
                                                    component={TextField}        
                                                    disabled={this.getSectionList} 
                                                    fullwidth 
                                                    onChange={(e:any) => {
                                                        setFieldValue('standard', e.target.value)
                                                        this.selectStandard(e);
                                                      }} 
                                                    >
                                                        { this.props.ListSection.map((item:any) =>(
                                                                    <MenuItem value={item.value}>{item.value}</MenuItem>
                                                            ))
                                                        }
                                                    </Field> 
                                                    </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-t-20">
                                                <div className="paddingleft">
                                                <ImageUpload postImage={this.getImage}/>
                                                </div>                                            
                                            </div>                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                            <Field
                                                                label='Phone Number*'
                                                                type="text"
                                                                name="phone_number"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false} 
                                                                onChange={(e:any) => {
                                                                    setFieldValue('phone_number', e.target.value)
                                                                    this.findParantDetail(e);
                                                                  }}                                                           
                                                            /> 
                                                    </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Email Id*'
                                                                type="email"
                                                                name="email_id"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={this.parentName}
                                                               
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>                                                       
                                                            <Field
                                                                label='Parent First Name*'
                                                                type="text"
                                                                name="parent_firstname"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={this.parentName}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>                                                       
                                                            <Field
                                                                label='Parent Last Name*'
                                                                type="text"
                                                                name="parent_lastname"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={this.parentName}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right mb-3 mr-2 mt-4">
                                                <Button className="btn btn-pink mr-1 ml-1" 
                                                disabled={isStudentEmpty 
                                                || isValidating 
                                                || !dirty || !!(errors.student_name && touched.student_name) || !!(errors.grade && touched.grade)||
                                                !!(errors.standard && touched.standard) || 
                                                !!(errors.phone_number && touched.phone_number) || 
                                                !!(errors.email_id && touched.email_id) || 
                                                !!(errors.parent_firstname && touched.parent_firstname) || 
                                                !!(errors.parent_lastname && touched.parent_lastname)} type="submit">Submit</Button>
                                                <Button className="btn btn-default mr-1 ml-1" onClick={this.goBack}>Cancel</Button>
                                            </div>
        
                                    </Form>
                                    )}
                                }
                                </Formik>
                               
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
            <div style={loadingStudent}><SpinnerLoader/></div>
        </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        ListClass:state.classes.my_class,
        ListSection:state.classes.my_section,
        loading:state.student.loading,
        errorMessage: state.student.errors,
        getParentResponse:state.student.parentDetails,
        checkParent:state.student.getParentStatus,
        getImageURL:state.student.ImageURL,
        getProfile:state.profile.profileData
    };
  };

export default connect(mapStateToProps, { addStudent, 
    fetchGradePost, 
    fetchGradeStandardPost, 
    fetchParent, 
    fetchMyClassListGet, 
    fetchMySectionListGet,
    getStudentClassesData })(AddStudent)
