import React from 'react'
import { connect } from 'react-redux'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import BreadCrumb from '../../components/BreadCrumb';
import { RootState } from '../../store/Index';
import { RouteComponentProps } from 'react-router';
import { StudentType, studentInputTypes } from '../../store/student/Types';
import { editStudent, fetchStudent } from '../../store/student/Actions';
import { fetchGradePost, fetchGradeStandardPost } from '../../store/classes/Actions';
import { fetchParent } from '../../store/student/Actions';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { StudentValidation } from './StudentValidation';
import ImageUpload  from './StudentImage';
import { fetchMyClassListGet, fetchMySectionListGet } from '../../store/classes/Actions';
import { getStudentClassesData } from '../../store/profile/Actions';

interface OwnStudentEditProps extends RouteComponentProps<OwnPropsParams> {
    editStudent: (student: any) => void;
    fetchGradePost: (postValue:any) => void;
    fetchParent: (getParent:any) => void;
    fetchGradeStandardPost: () => any;
    fetchStudent: (id: number) => any;
    fetchMyClassListGet:() => any;
    fetchMySectionListGet:(grade:any) => any;
    getStudentClassesData:(postData:any)=>any;
    loading: boolean;
    errorMessage: any;
    getStudentIt: any;
    getStudentData: any;
    getParentResponse:any;
    getImageURL:any;
    ListSection:any;
    ListClass:any;
    getProfile:any;
};

export class EditStudent extends React.Component<OwnStudentEditProps, studentInputTypes>  {
    formik:any;
    getSectionList:any;
    parentFirstname:any;
    emailId:any
    getEditData:any
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
        const { getStudentData } =  this.props;
        window.scrollTo(0, 0);
        const postValue = {
            academic_year:'2021'
        }
        this.props.fetchGradePost(postValue);
        this.props.fetchGradeStandardPost();
        this.props.fetchStudent(Number(this.props.match.params.id)).then((res:any)=>{
            const {getStudentData}= this.props;
            if(getStudentData){
                if(getStudentData.studentclass_details){
                    let studentData:any = getStudentData.studentclass_details;
                    if(studentData){
                        this.setState({getClass:studentData.grade, getSection:studentData.standard})
                    }
                }
            }
        });
        this.props.fetchMyClassListGet();
        if(getStudentData){
            this.getSectionUpdate();
        }
        
        
    }
    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) { 
        const { getStudentData } = this.props;      
        // This is the function used to update old parent details
        let getFormikData:any = this.formik;
        if(getFormikData){
            if(this.props.getParentResponse.length === undefined){ 
                getFormikData.setFieldValue('email_id', this.props.getParentResponse.email_id)  
                getFormikData.setFieldValue('parent_firstname', this.props.getParentResponse.parent_firstname)
                getFormikData.setFieldValue('parent_lastname', this.props.getParentResponse.parent_lastname)
           } else {
               if(getStudentData){
                getFormikData.setFieldValue('email_id', getStudentData.email_id)  
                getFormikData.setFieldValue('parent_firstname', getStudentData.parent_firstname)
                getFormikData.setFieldValue('parent_lastname', getStudentData.parent_lastname)
               }   
           }
        }
     }
    getSectionUpdate(){
        const getEditDetails = this.props.getStudentData;
        let getEditData = getEditDetails;
        if(getEditData){
            let studentclass_details:any;
            let getGrade:any;
            let Section:any;
            studentclass_details = getEditData.studentclass_details;
            if(studentclass_details){
                getGrade = studentclass_details.grade;
                Section = studentclass_details.standard;
                if(getGrade && Section){
                    const getGradeSelet = {
                        grade:getGrade
                    }
                    this.setState({getClass:getGrade, getSection:Section})
                    this.props.fetchMySectionListGet(getGradeSelet)
                }
            }
        }

    }
    selectEditClassname(getValue:any){
        const { value } = getValue.target;
        if(value){
            const getGrade = {
                grade:value
            }
            this.setState({getClass:value})
            this.props.fetchMySectionListGet(getGrade);
        }
      }
      selectStandard(e:any){
        const { value } = e.target;
        this.setState({getSection:value})
      }
      findParantDetail= (e: any) => {
        const { getProfile } = this.props;
        const { value } = e.target;
        if(value.length === 10) {
            const getPhone = {
                phone_number:value,
                school_id:getProfile.school_id
            };
            this.props.fetchParent(getPhone);          
        }        
    }

    render() {
        const { loading } = this.props;
        const { getClass, getSection } = this.state;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getEditDetails = this.props.getStudentData;
        this.getEditData = getEditDetails;
        let getGrade:any;
        let getStandard:any;
        let studentclass_details:any;
        let getID:any;
        let phoneNo:any;
        let studentName:any;
        let parentLastname:any;
        let userId:any
        let profilePicture:any
        let getUpdateImage:any
        if(this.getEditData){
            this.emailId =  this.getEditData.email_id;
            getID =  this.getEditData.id;
            phoneNo =  this.getEditData.phone_number;
            studentName =  this.getEditData.student_name;
            this.parentFirstname =  this.getEditData.parent_firstname;
            studentclass_details =  this.getEditData.studentclass_details;
            parentLastname =  this.getEditData.parent_lastname;
            userId =  this.getEditData.user_id;
            if(studentclass_details){
                getGrade = studentclass_details.grade;
                getStandard = studentclass_details.standard;
                profilePicture = studentclass_details.profile_picture;
                getUpdateImage = studentclass_details.profile_picture;
            }
        }
        const initialEditValues: StudentType = {
            id:getID,
            phone_number:phoneNo,
            email_id:this.emailId,
            student_name:studentName,
            academic_year:'2021',
            grade: getGrade,
            standard: getStandard,
            parent_firstname:this.parentFirstname,
            parent_lastname:parentLastname,
            profile_picture:profilePicture,
            user_id:userId
        };
        
        if(this.props.getImageURL){
            const getUrlpath = this.props.getImageURL.url;
            if(getUrlpath){
                getUrlpath.forEach((items:any)=>{
                    getUpdateImage = items;
                })
            }
        } 
        if(getClass || getSection) {
            let postClassesDetails:any = {
                class_name: getClass, 
                section_name: getSection
            }
            this.props.getStudentClassesData(postClassesDetails);
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
                                mainPageTitle={['Edit Student']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>Edit Student</header>
                                            <div className="tools">
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            { this.getEditData && this.emailId && this.parentFirstname && this.props.ListSection && this.props.ListClass ?
                                                <Formik
                                                ref={node=>this.formik = node}
                                                validationSchema={StudentValidation}
                                                initialValues={initialEditValues}
                                                onSubmit={(values:any, actions) => {
                                                    const postEditValues: any = {
                                                        id:getID,
                                                        phone_number:values.phone_number,
                                                        email_id:values.email_id.toLowerCase(),
                                                        student_name:values.student_name,
                                                        academic_year:values.academic_year,
                                                        grade: values.grade,
                                                        standard: values.standard,
                                                        parent_firstname:values.parent_firstname,
                                                        parent_lastname:values.parent_lastname,
                                                        profile_picture:getUpdateImage,
                                                        user_id:values.user_id
                                                    };
                                                    this.props.editStudent(postEditValues)
                                                }}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<StudentType>) =>{ 
                                                    const isEditStudentEmpty = (!values.student_name 
                                                        || !values.grade 
                                                        || !values.standard 
                                                        || !values.phone_number 
                                                        || !values.email_id 
                                                        || !values.parent_firstname
                                                        || !values.parent_lastname);
                                                return(
                                                    <form onSubmit={handleSubmit} className="ui form">
                                                            <div className="row">
                                                                <div className="col-md-6 p-t-20">
                                                                <div className="col-md-12 p-t-20 pl-0">
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
                                                                    <div className="col-md-12 p-t-20 pl-0">
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
                                                                            this.selectEditClassname(e);
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
                                                                    <div className="col-md-12 p-t-20 pl-0">
                                                                        <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                                        <FormGroup>
                                                                        <Field 
                                                                        label='Section*'
                                                                        name="standard"  
                                                                        select
                                                                        component={TextField}        
                                                                        disabled={false} 
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
                                                                    <ImageUpload postImage={getUpdateImage}/>
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
                                                                            disabled={false}
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
                                                                            disabled={false}
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
                                                                            disabled={false}
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" 
                                                            type="submit" disabled={isEditStudentEmpty 
                                                                || isValidating  || !!(errors.student_name && touched.student_name) || !!(errors.grade && touched.grade)||
                                                                !!(errors.standard && touched.standard) || 
                                                                !!(errors.phone_number && touched.phone_number) || 
                                                                !!(errors.email_id && touched.email_id) || 
                                                                !!(errors.parent_firstname && touched.parent_firstname) || 
                                                                !!(errors.parent_lastname && touched.parent_lastname)}>Submit</Button>
                                                            <Link to="/student"><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                    
                                                    </form>
                                                )}
                                            }
                                            />
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({ student, classes, profile }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        getStudentIt: student.items[Number(ownProps.match.params.id)],
        ListClass:classes.my_class,
        ListSection:classes.my_section,
        loading: student.loading,
        errorMessage: student.errors,
        getParentResponse: student.parentDetails,
        getStudentData: student.getStudentEditResponse,
        getImageURL:student.ImageURL,
        getProfile:profile.profileData
    };
};

export default connect(mapStateToProps, { fetchGradePost, 
    fetchGradeStandardPost, editStudent, 
    fetchStudent, fetchMyClassListGet, 
    fetchMySectionListGet, fetchParent, getStudentClassesData })(EditStudent)
