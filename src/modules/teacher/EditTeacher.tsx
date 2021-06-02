import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import { EditTeacherPost, fetchTeacherPostId } from '../../store/teacher/Actions';
import { teacherDetails } from '../../store/teacher/Type';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../store/Index';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { Link } from 'react-router-dom';
import { Button, FormGroup } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { TeacherType } from '../../store/teacher/Type';
import { TeacherValidation } from './TeacherValidation';
import TeacherImageUpload from './teacherImageUpload';

interface OwnTeacherEditFormProps extends RouteComponentProps<OwnPropsParams> {
    EditTeacherPost: (student: any) => void;
    fetchTeacherPostId: (id: string) => void;
    loading: boolean;    
    errorMessage: any;
    getTeacherId:any;
    getTeacherData:any;
    getImageURL?: any;
    getErrorMsg?:any;
};
export class EditTeacher extends React.Component<OwnTeacherEditFormProps> {
    formikTeacher: any
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchTeacherPostId(String(this.props.match.params.id)); 
    }
    componentDidUpdate() {
        const { getErrorMsg } = this.props;
        let getErrorMessage: any = this.formikTeacher;
        if (getErrorMessage) {
            if (getErrorMsg) {
                if (getErrorMsg.firstname
                    || getErrorMsg.lastname
                    || getErrorMsg.email_id
                    || getErrorMsg.phone_number) {
                    getErrorMessage.setFieldError('teacherfirstname', this.props.getErrorMsg.firstname)
                    getErrorMessage.setFieldError('teacherlastname', this.props.getErrorMsg.lastname)
                    getErrorMessage.setFieldError('teacheremailid', this.props.getErrorMsg.email_id)
                    getErrorMessage.setFieldError('teacherphonenumber', this.props.getErrorMsg.phone_number)
                }
            }

        }

    }
    render() {
        const { loading } = this.props;
        const loadingTeacher = { display: loading ? "block" : "none" };
        const getEditDetails:any = this.props.getTeacherData;
        const getTeacherData = getEditDetails;
        let teacherfirstname: any;
        let teacherlastname: any;
        let teacheremailId: any;
        let teacherphoneno: any;
        let teacherrole: any;
        let teacherschoolId: any;
        let teacheruserId: any;
        let teacherldapId: any;
        let teacherImage:any;
            if (getTeacherData) {
                teacherfirstname = getTeacherData.firstname;
                teacherlastname = getTeacherData.lastname;
                teacheremailId = getTeacherData.email;
                teacherphoneno = getTeacherData.phone_number;
                teacherrole = getTeacherData.role;
                teacherschoolId = getTeacherData.school_id;
                teacheruserId = getTeacherData.id;
                teacherldapId = this.props.match.params.id;
                teacherImage = getTeacherData.image
            }
        const initialTeacherEditValues: teacherDetails = {
            teacherfirstname: teacherfirstname,
            teacherlastname: teacherlastname,
            teacheremailid: teacheremailId,
            teacherphonenumber: teacherphoneno,
            teacherrole: teacherrole,
            id: teacheruserId,
            school_id: teacherschoolId,
            ldap_id: teacherldapId,
            image: teacherImage,
            timezone: 'Asia/Kolkata'
        }
        if(this.props.getImageURL){
            const getUrlpath = this.props.getImageURL.url;
            if(getUrlpath){
                getUrlpath.forEach((items:any)=>{
                    teacherImage = items;
                })
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
                                mainPageTitle={['Edit Teacher']} />
                                { teacherfirstname && teacheremailId ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Edit Teacher</header>
                                            </div>
                                            <div className="card-body">
                                            <Formik
                            ref={node => this.formikTeacher = node}
                            initialValues={initialTeacherEditValues}
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
                                    image: teacherImage,
                                    timezone: 'Asia/Kolkata'
                                }
                                this.props.EditTeacherPost(initialTeacherValue)
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
                                                    <TeacherImageUpload postImage={teacherImage}/>
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
                            : <SpinnerLoader />}
                        </div>
                    </div>
                </div>
                <div style={loadingTeacher}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({teacher}: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        getTeacherId:teacher.items[Number(ownProps.match.params.id)],
        loading:teacher.loading,
        getErrorMsg: teacher.errors,
        getImageURL:teacher.imageUpload,
        getTeacherData:teacher.GetTeacherProfile
    };
}

export default connect(mapStateToProps, { fetchTeacherPostId, EditTeacherPost })(EditTeacher)
