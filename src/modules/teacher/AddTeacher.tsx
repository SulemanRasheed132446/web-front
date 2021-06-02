import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { AddTeacherPost } from '../../store/teacher/Actions';
import { teacherDetails } from '../../store/teacher/Type';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { Link } from 'react-router-dom';
import { Button, FormGroup } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { TeacherType } from '../../store/teacher/Type';
import { TeacherValidation } from './TeacherValidation';
import TeacherImageUpload from './teacherImageUpload';

const initialTeacherValues: teacherDetails = {
    teacherfirstname: '',
    teacherlastname: '',
    teacheremailid: '',
    teacherphonenumber: '',
    teacherrole: 'Teacher',
    image:'',
    timezone: 'Asia/Kolkata'
}
export type OwnTeacherFormProps = {
    AddTeacherPost: (userManage: any) => void;
    loading: boolean;
    getTeacherImageURL?:any;
    getErrorMsg:any;
};
interface propsTeacherTypes {
    teacherImage?:any,
    imageFail?:any
}
export class AddTeacher extends React.Component<OwnTeacherFormProps, propsTeacherTypes> {
    formikTeacher:any;
    imageFail:any;
    constructor(props: any) {
        super(props);
        this.state = {
            teacherImage:'',
            imageFail:''
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        
    }
    
    componentDidUpdate() {
        const { getErrorMsg } = this.props;
        let getErrorMessage: any = this.formikTeacher;
        if (getErrorMessage) {
            if (getErrorMsg) {
                if (getErrorMsg.firstname
                    || getErrorMsg.lastname
                    || getErrorMsg.email_id
                    || getErrorMsg.phone_number || getErrorMsg.image) {
                    getErrorMessage.setFieldError('teacherfirstname', this.props.getErrorMsg.firstname)
                    getErrorMessage.setFieldError('teacherlastname', this.props.getErrorMsg.lastname)
                    getErrorMessage.setFieldError('teacheremailid', this.props.getErrorMsg.email_id)
                    getErrorMessage.setFieldError('teacherphonenumber', this.props.getErrorMsg.phone_number)
                    this.imageFail = this.props.getErrorMsg.image;
                }
            }

        }

    }

    render() {
        const { loading, getTeacherImageURL } = this.props;
        const loadingTeacherAdd = { display: loading ? "block" : "none" };
        let getImage:any;
        if(getTeacherImageURL){
            const getUrlpath = getTeacherImageURL.url;
            if(getUrlpath){
                getUrlpath.forEach((items:any)=>{
                    getImage = items;
                })
            }else {
                getImage = ''; 
            }
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
                                mainPageTitle={['Add Teacher']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>Add Teacher</header>
                                        </div>
                                        <div className="card-body">
                                        <Formik
                            ref={node => this.formikTeacher = node}
                            initialValues={initialTeacherValues}
                            validationSchema={TeacherValidation}
                            onSubmit={(values: any, actions) => {
                                const initialTeacherValue: TeacherType = {
                                    firstname: values.teacherfirstname,
                                    lastname: values.teacherlastname,
                                    email_id: values.teacheremailid,
                                    phone_number: values.teacherphonenumber,
                                    role: 'Teacher',
                                    id: values.id,
                                    ldap_id: values.ldap_id,
                                    image: getImage,
                                    timezone: 'Asia/Kolkata'
                                }
                                this.props.AddTeacherPost(initialTeacherValue)
                            }}
                            render={({
                                values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                            }: FormikProps<any>) => {

                                const isEmpty = (!values.teacherfirstname || !values.teacherlastname || !values.teacheremailid || !values.teacherphonenumber);
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='First Name*'
                                                                type="text"
                                                                name="teacherfirstname"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div>
                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                            <FormGroup>
                                                                <Field
                                                                    label='Last Name*'
                                                                    type="text"
                                                                    name="teacherlastname"
                                                                    component={TextField}
                                                                    className="textfield__input"
                                                                    disabled={false}
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Phone Number*'
                                                                type="text"
                                                                name="teacherphonenumber"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div>
                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                            <FormGroup>
                                                                <Field
                                                                    label='Email Id*'
                                                                    type="text"
                                                                    name="teacheremailid"
                                                                    component={TextField}
                                                                    className="textfield__input"
                                                                    disabled={false}
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 p-t-20">
                                                <TeacherImageUpload postImage={getImage}/>
                                                {this.imageFail?
                                                <div className="text-center">
                                                <span className="diaryerrorcolor">{this.imageFail}</span>
                                            </div>
                                                :null}
                                                </div>
                                            </div>
                                            <div className="text-right mb-3 mr-2 mt-4">
                                                <Button className="btn btn-pink mr-1 ml-1 w-15"
                                                    disabled={isEmpty || isValidating ||
                                                        !!(errors.teacheremailid && touched.teacheremailid) ||
                                                        !!(errors.teacherphonenumber && touched.teacherphonenumber) ||
                                                        !!(errors.teacherlastname && touched.teacherlastname) ||
                                                        !!(errors.teacherfirstname && touched.teacherfirstname)} type="submit">Submit</Button>
                                                <Link to="/teacher">
                                                    <Button className="btn btn-default mr-1 ml-1 w-15">Cancel</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }
                            }
                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTeacherAdd}><SpinnerLoader /></div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.teacher.loading,
        getTeacherImageURL:state.teacher.imageUpload,
        getErrorMsg: state.teacher.errors
    };
}

export default connect(mapStateToProps, { AddTeacherPost })(AddTeacher)
