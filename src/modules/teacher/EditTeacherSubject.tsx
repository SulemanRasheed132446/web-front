import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem, Checkbox } from '@material-ui/core';
import { fetchTeacherPostId, FetchSubjectMappingPost } from '../../store/teacher/Actions';
import { Field, Formik, FormikProps } from 'formik';
import BreadCrumb from '../../components/BreadCrumb';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { TeacherEditSubjectMappingPost } from '../../store/teacher/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import { RouteComponentProps } from 'react-router';
import { TextField } from 'formik-material-ui';
import { editTeacherSubjectValidation } from './TeacherValidation';
import { studentValida } from '../../services/Constants';

interface OwnTeacherSubjectFormProps extends RouteComponentProps<OwnPropsParams> {
    TeacherEditSubjectMappingPost: (teacherMap: any) => void;    
    FetchSubjectMappingPost: (teacherDetails: any) => void;
    fetchGetAllClassList: () => any; // This is the service get all class list 
    GetCorrectSubject: () => any; 
    errorMessage?: any;
    loading?: boolean; 
    gradeStandard?:any;
    getTeacherViewData?:any;
    schoolIdDetails?:any,
    SubjectList?:any
    getTeacherid?: any;
    records?: any;
    getClassSubjectEdit?:any;
    getCurrectTeacher?:any;
    Subject_name:any
};
export interface EditSubject {
    subjectName?:any,
    EditclassNameId?:any,
    classInchanger?:any,
    addClassMapping?:any,
    activeSubmit?:boolean,
    changeClassName?:any
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export class EditTeacherSubject extends Component<OwnTeacherSubjectFormProps, EditSubject> {
    getEditClassStates:any = false;
    teacherId:any;
    teacherForm:any;
    getSubject:any;
    getStateValue:any;
    getEditClassList:any = [];
    updateClassList:any = [];
    updateSubject:any;
    activeSubmitButton:any;
    constructor(props: any) {
        super(props);
        this.state = {
            addClassMapping:[],
            changeClassName:false
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchGetAllClassList();
        this.props.GetCorrectSubject();
        this.getStateValue = this.props.history.location.state;  
        this.activeSubmitButton = false;  
        if(this.getStateValue.class_id){
            let getClassId:any = this.getStateValue.class_id;
            if(getClassId){
                this.setState({addClassMapping:getClassId})
            }
        }
    }
    getSubjectDetails(getEvent:any, getValue:any) {
        const { value } = getEvent.target;
        this.getSubject = value;
    }
    getEditClassMappingList(getValue?:any, getData?:any, resonse?:any){
        resonse === 'remove-option' ||  resonse === 'select-option'?
        this.setState({changeClassName:true}):
            this.setState({changeClassName:false});
       
        this.getEditClassList = [];
        if(getData){
            getData.forEach((items:any)=>{
                const getClass = String(items.id);  
                this.getEditClassList.push(getClass)                
            })
            this.setState({addClassMapping:this.getEditClassList})
        }
    }
    validateSubject(value:any) {
        let error;
        if (!value) {
          error = 'Please select the subject';
        }
        return error;
      }
      componentDidUpdate() { 
          if(this.props.errorMessage){
            if(this.props.errorMessage.class_id) {
                this.teacherForm.setFieldError('EditclassNameId', this.props.errorMessage.class_id)
            } 
          } 
        
    } 
    onSubmit = (values: any) => {
        let teacherId:any;
        let editClassName:any;
        if(this.getStateValue) {
        teacherId = this.getStateValue.teacherId;
        }
        if(this.getEditClassList.length > 0){
            editClassName = Array.from(new Set(this.getEditClassList));
            this.setState({addClassMapping:editClassName})
        }
         if(this.state.addClassMapping.length > 0){
             let teacherMap:any;
             if(this.getStateValue.subject_id === String(values.subjectName)){
                teacherMap = {
                    academic_year: '2021',
                    teacher_id: teacherId,
                    subject_id: this.getStateValue.subject_id,
                    class_id: Array.from(new Set(this.state.addClassMapping))
                }
             }else{
                teacherMap = {
                     academic_year: '2021',
                     teacher_id: teacherId,
                     subject_id: this.getStateValue.subject_id,
                     new_subject_id: values.subjectName,
                     class_id: Array.from(new Set(this.state.addClassMapping))
                 }
               
             }
      
        this.props.TeacherEditSubjectMappingPost(teacherMap);
         } else {
         }
        
    }
    render() {
        let getClassData:any = [];
        let getSubject:any = [];
        let SubjectUpdateList:any = [];
        let teacherId:any;
        const { loading } = this.props;
        const loadingSubject = { display: loading ? "block" : "none" };
        const getClassList:any = this.props.gradeStandard;
        const getSubjectList:any = this.props.SubjectList;
        let getSubjectCrnList:any;
        if(getSubjectList){
            getSubjectCrnList = getSubjectList.data;
        }
        if(this.getStateValue) {
            getClassData = this.getStateValue.class_id;
            getSubject = parseInt(this.getStateValue.subject_id)
            teacherId = this.getStateValue.teacherId;
            SubjectUpdateList = [];
            getClassData.forEach((classList:any) => {
                let getClassId = getClassList.find((item:any)=> item.id === parseInt(classList)) 
                if(getClassId){
                    SubjectUpdateList.push(getClassId);  
                }               
               })
               
        }    
        const initialEditSubjectValues:EditSubject = {
            subjectName:getSubject,
            EditclassNameId: getClassData
        }
        if(this.getEditClassList.length > 0) {            
            this.activeSubmitButton = true;
        }else {
            this.activeSubmitButton = false;
        }
        return (
            <div>
                 <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                        <BreadCrumb 
                        titleName={['Teacher']} 
                        homeName={['Home']} 
                        url={['dashboard']} 
                        baseName={['Teacher']} 
                        baseURL={['teacher']} 
                        mainPageTitle={['Update Subject & Class Mapping']}/>
                {getSubjectCrnList && getClassList && getSubject && getClassData && SubjectUpdateList.length > 0 ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">
                                <div className="card-head">
                                    <header>Update Subject & Class Mapping</header>
                                    <div className="tools">
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Formik
                                                ref={node=>this.teacherForm = node}
                                                initialValues={initialEditSubjectValues}
                                                validationSchema={editTeacherSubjectValidation}
                                                onSubmit={this.onSubmit}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<any>) => {
                                                    this.state.addClassMapping.length > 0?
                                                    this.getEditClassStates = true:
                                                    this.getEditClassStates = false;
                                                    return(
                                                    <form onSubmit={handleSubmit} className="ui form">  
                                                    <div className="row"> 
                                                        <div className="col-md-6 p-t-20">
                                                            <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                            <FormGroup>
                                                            <Field
                                                                label='Subject*'
                                                                name="subjectName"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input mt-1"
                                                                fullwidth="true"
                                                                disabled={false}
                                                                onChange={(e:any, value:any) => {
                                                                    setFieldValue('subjectName', e.target.value)
                                                                    this.getSubjectDetails(e, value)
                                                                  }} 
                                                            >
                                                                {getSubjectCrnList.map((item: any) => (
                                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                                ))}
                                                            </Field>
                                                        </FormGroup>
                                                                {errors.subjectName && touched.subjectName && <div className="errorcolor">{errors.subjectName}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0 pb-0">
                                                                <FormGroup>
                                                                    {getClassList?
                                                                <Autocomplete
                                                                    fullWidth
                                                                    multiple
                                                                    id="checkboxes-tags-demo"
                                                                    options={getClassList}
                                                                    disableCloseOnSelect 
                                                                    noOptionsText={studentValida.noRecordData}                                                                   
                                                                    getOptionLabel={(option:any) => option.grade_standard}
                                                                    defaultValue={SubjectUpdateList} 
                                                                    onChange={(e, value, resonse) => {
                                                                       this.getEditClassMappingList(e, value, resonse)
                                                                    }}
                                                                    renderOption={(option, { selected }) => (
                                                                        <React.Fragment>
                                                                        <Checkbox
                                                                            icon={icon}
                                                                            checkedIcon={checkedIcon}
                                                                            style={{ marginRight: 8 }}
                                                                            checked={selected}
                                                                        />
                                                                        {option.grade_standard}
                                                                        </React.Fragment>
                                                                    )}
                                                                    className="mb-0 mt-1"
                                                                    renderInput={(params) => (
                                                                        <Field component={TextField} {...params} label="Search Class Name*" name="EditclassNameId"
                                                                        onChange={(e:any) => {
                                                                            setFieldValue('EditclassNameId', e.target.value)
                                                                          }} 
                                                                        />
                                                                    )}
                                                                    />
                                                                    :null}                                                                    
                                                                </FormGroup> 
                                                                <>
                                                                {this.getEditClassStates ?
                                                                    null
                                                                    : <span className="diaryerrorcolor">Please select the Class Name</span>}
                                                                </>
                                                                
                                                                </div>
                                                             </div>
                                                        </div>         
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" type="submit"  disabled={!this.getEditClassStates}>Submit</Button>
                                                            <Link to={`/teacher/${teacherId}`}><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                                                    </form>
                                                )}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                :<SpinnerLoader/>}

                 <div style={loadingSubject}><SpinnerLoader/></div>
                 </div>
                 </div>
                 </div>
            </div>
        )
    }
}

interface OwnPropsParams {
    id: string;
}

const mapStateToProps = (state: any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        loading: state.teacher.loading,
        errorMessage: state.teacher.errors,
        gradeStandard:state.diary.gradelist,
        getTeacherViewData: state.teacher.GetTeacherProfile,
        getTeacherid: state.teacher.TeacherId,
        records: state.teacher.records,
        ClassNameList: state.diary.gradelist,
        SubjectList: state.subjects.category
    };
}

export default connect(mapStateToProps, { fetchTeacherPostId, FetchSubjectMappingPost, fetchGetAllClassList, GetCorrectSubject, TeacherEditSubjectMappingPost })(EditTeacherSubject)
