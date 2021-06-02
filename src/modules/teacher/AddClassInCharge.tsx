import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import BreadCrumb from '../../components/BreadCrumb';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { TeacherClassMappingPost } from '../../store/teacher/Actions';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

export type OwnTeacherFormProps = {
    TeacherClassMappingPost: (teacherMap: any) => void;
    fetchGetAllClassList: (postValue:any) => void;
    loading: boolean; 
    getClassList:boolean;
    getTeacherViewData:any;
    schoolIdDetails:any
};
export interface addClasslist {
    ClassList:string
}
const initialClassValues:addClasslist = {
    ClassList:''
}
export class AddClassInCharge extends Component<OwnTeacherFormProps> {
    getClassIncharge:any = [];
    componentDidMount(): void {
        window.scrollTo(0, 0);
        const ClassIncharge:any = {
            academic_year: '2021'
        }
        this.props.fetchGetAllClassList(ClassIncharge);
    }
    getClassInchargeList(getValue?:any){     
        this.getClassIncharge = [];
        if(getValue) {
            this.getClassIncharge.push(String(getValue.id))        
         }
    }

    onSubmitClassIncharge = (values: any) => {
        let classIncharge:any = [];
        if(values){
            classIncharge = [values.ClassList]
        }
        if(classIncharge.length) {
            const ClassIncharge: any = {
                academic_year: '2021',
                teacher_id: this.props.getTeacherViewData.ldap_id,
                class_incharge: classIncharge
            }
            this.props.TeacherClassMappingPost(ClassIncharge)
        }
       
    }
    render() {
        const { loading } = this.props;
        const loadingTeacher = { display: loading  ? "block" : "none" };
        const getClass:any = this.props.getClassList;
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
                            mainPageTitle={['Add Class Incharge']}/>
                             <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">
                                <div className="card-head">
                                    <header>Add Class Incharge</header>
                                    <div className="tools">
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Formik
                                                initialValues={initialClassValues}
                                                onSubmit={this.onSubmitClassIncharge}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<any>) => (
                                                    <form onSubmit={handleSubmit} className="ui form">  
                                                    <div className="row">      
                                                            <div className="col-md-12 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                <FormGroup>
                                                                {getClass?
                                                                <FormGroup>
                                                                <Field 
                                                                label='Section*'
                                                                name="ClassList"  
                                                                select
                                                                component={TextField}        
                                                                disabled={false}  
                                                                >
                                                                    {
                                                                        getClass.map( (item:any) => (
                                                                            <MenuItem value={item.id}>{item.grade_standard}</MenuItem>
                                                                        ))
                                                                    }
                                                                    
                                                                </Field>                         
                                                                </FormGroup>
                                                                    :null}
                                                                </FormGroup> 
                                                                </div>
                                                            </div>
                                                        </div>         
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" type="submit">Submit</Button>
                                                            <Link to={`/teacher/${this.props.getTeacherViewData.ldap_id}`}><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                                                    </form>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
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
        loading:state.teacher.loading,
        errorMessage: state.teacher.errors,
        getClassList:state.diary.gradelist,
        getTeacherViewData:state.teacher.GetTeacherProfile,
        schoolIdDetails:state.profile.schoolId
    };
}

export default connect(mapStateToProps, {TeacherClassMappingPost, fetchGetAllClassList})(AddClassInCharge)
