import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem, Checkbox } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import BreadCrumb from '../../components/BreadCrumb';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { TeacherSubjectMappingPost } from '../../store/teacher/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import { TextField } from 'formik-material-ui';
import { TeacherSubjectValidation } from './TeacherValidation';
import { studentValida } from '../../services/Constants';

export type OwnTeacherFormProps = {
    TeacherSubjectMappingPost: (teacherMap: any) => void;    
    fetchGetAllClassList: (postData:any) => void; // This is the service get all class list 
    GetCorrectSubject: () => any; 
    errorMessage?: any;
    loading: boolean; 
    gradeStandard:any;
    getTeacherViewData:any;
    schoolIdDetails:any,
    SubjectList:any;
    loader:any
};
export interface addSubject {
    subjectName?:any,
    classNameId?:any,
    classInchanger?:any,
    addClassMapping?:any
}
const initialSubjectValues:addSubject = {
    subjectName:'',
    classNameId:''
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export class AddSubject extends React.Component<OwnTeacherFormProps, addSubject> {
    teacherId:any;
    getClassList:any = [];
    getSubject:any;
    constructor(props: any) {
        super(props);
        this.state = {
            addClassMapping:[]
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        const postSubject:any = {
            academic_year: '2021'
        }
        this.props.fetchGetAllClassList(postSubject); // This is the service get all class list
        this.props.GetCorrectSubject();
    }
    
    componentDidUpdate() {  
    }

    getSubjectDetails(getEvent:any, getValue:any) {
        const { value } = getEvent.target;
        this.getSubject = value;
    }
    getClassMappingList(getValue?:any){     
        this.getClassList = [];
        if(getValue){
            getValue.forEach((items:any)=>{
                const getClassList = String(items.id);  
                this.getClassList.push(getClassList)                
            })
        }
    }

 onSubmit = (values: addSubject) => {
    const teacherMap:any = {
        academic_year: '2021',
        teacher_id: this.props.getTeacherViewData.ldap_id,
        subject_id: values.subjectName,
        class_ids:this.getClassList
    }
    this.props.TeacherSubjectMappingPost(teacherMap)
}
    
    render() {
        const { loading, loader } = this.props;
        const loadingTeacher = { display: loading || loader ? "block" : "none" };
        const getClass:any = this.props.gradeStandard;
        const getSubject:any = this.props.SubjectList;
        let getSubjectCrnList:any;
        if(getSubject){
            getSubjectCrnList = getSubject.data;
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
                        mainPageTitle={['Add Subject & Class Mapping']}/>
                        {getSubjectCrnList && getClass ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">
                                <div className="card-head">
                                    <header>Add Subject & Class Mapping</header>
                                    <div className="tools">
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Formik
                                                ref={node=>this.teacherId = node}
                                                initialValues={initialSubjectValues}
                                                validationSchema={TeacherSubjectValidation}
                                                onSubmit={this.onSubmit}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<any>) => {
                                                    let getClassList:any = false;
                                                    const isEmptySubject = (!values.subjectName);
                                                        this.getClassList.length > 0?
                                                        getClassList = true
                                                        :getClassList = false
                                                    
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
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                <FormGroup>
                                                                    {getClass?
                                                                <Autocomplete
                                                                    fullWidth
                                                                    multiple
                                                                    id="checkboxes-tags-demo"
                                                                    options={getClass}
                                                                    disableCloseOnSelect
                                                                    noOptionsText={studentValida.noRecordData}
                                                                    getOptionLabel={(option:any) => option.grade_standard}
                                                                    onChange={(e:any, getvalue:any) => {
                                                                        setFieldValue('classNameId', e.target.value)
                                                                       this.getClassMappingList(getvalue)
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
                                                                    renderInput={(params) => {
                                                                        return(
                                                                        <Field component={TextField} {...params} label="Search Class Name*" name="classNameId"/>
                                                                    )}}
                                                                    />
                                                                    :null}                                                                    
                                                                </FormGroup> 
                                                                </div>
                                                            </div>
                                                        </div>         
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" disabled={isEmptySubject || isValidating || !dirty 
                                                                ||  !!(errors.subjectName && touched.subjectName) || !getClassList} type="submit">Submit</Button>
                                                            <Link to={`/teacher/${this.props.getTeacherViewData.ldap_id}`}><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                                                    </form>
                                                )}
                                            }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                :<SpinnerLoader/>}
                    </div>
                    
                </div>
            </div>
            <div style={loadingTeacher}><SpinnerLoader/></div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        loading:state.student.loading,
        loader:state.teacher.loading,
        errorMessage: state.teacher.errors,
        gradeStandard:state.diary.gradelist,
        getTeacherViewData:state.teacher.GetTeacherProfile,
        schoolIdDetails:state.profile.schoolId,
        SubjectList:state.subjects.category
    };
  };

export default connect(mapStateToProps,{TeacherSubjectMappingPost, GetCorrectSubject, fetchGetAllClassList})(AddSubject)
