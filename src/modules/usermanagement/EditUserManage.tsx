import React from 'react';
import { connect } from 'react-redux';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router-dom';
import { EditUserPost, fetchCategoryPost, fetchUserPostId } from '../../store/usermanage/Actions';
import { userType, CategoryFieldsType, userManageTypes } from '../../store/usermanage/Type';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { UserManageValidation } from './UserManageValidation';
export interface OwnUserManageFormProps extends RouteComponentProps<OwnPropsParams> {
    categoryDetails: CategoryFieldsType[],
    userIdList: userManageTypes;
    userData: userType;
    EditUserPost: (userManage: userType) => void;
    fetchCategoryPost: () => void;
    fetchUserPostId: (id: string) => void;
    loading: boolean;
    errorMessage:any;
};

class EditUserManage extends React.Component<OwnUserManageFormProps> {
    formikUserEdit:any
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchCategoryPost();
        this.props.fetchUserPostId(String(this.props.match.params.id));
    }
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        let getErrorMsg:any = this.formikUserEdit;
        if(this.props.errorMessage){
            if (this.props.errorMessage.firstname || 
                this.props.errorMessage.lastname || 
                this.props.errorMessage.phone_number || 
                this.props.errorMessage.email_id) {
                getErrorMsg.setFieldError('firstname', this.props.errorMessage.firstname)
                getErrorMsg.setFieldError('lastname', this.props.errorMessage.lastname)
                getErrorMsg.setFieldError('phone_number', this.props.errorMessage.phone_number)
                getErrorMsg.setFieldError('email_id', this.props.errorMessage.email_id)
            }
        }
           
    }
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let firstname: any;
        let lastname: any;
        let emailId: any;
        let phoneno: any;
        let role: any;
        let schoolId: any;
        let userId: any;
        let ldapId: any;
        const getCategoryDetails: any = this.props.categoryDetails;
        const categoryUserData = getCategoryDetails;
        const getUserList: any = this.props.userIdList;
        if (getUserList) {
            const getUserData = getUserList.data;
            if (getUserData) {
                firstname = getUserData.firstname;
                lastname = getUserData.lastname;
                emailId = getUserData.email;
                phoneno = getUserData.phone_number;
                role = getUserData.role;
                schoolId = getUserData.school_id;
                userId = getUserData.id;
                ldapId = this.props.match.params.id;
            }
        }
        const initialEditUser: userType = {
            ldap_id: ldapId,
            id: userId,
            firstname: firstname,
            lastname: lastname,
            email_id: emailId,
            phone_number: phoneno,
            role: role,
            school_id: schoolId,
            timezone: 'Asia/Kolkata'
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['User']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['User']}
                                baseURL={['user']}
                                mainPageTitle={['Edit User']} />
                            {categoryUserData && firstname && schoolId ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Edit User</header>
                                            </div>
                                            <div className="card-body">
                                            <div className="row">
                    <div className="col-md-12">
                        <Formik
                            ref={node=>this.formikUserEdit = node}
                            initialValues={initialEditUser}
                            onSubmit={(values: userType, actions) => {
                                this.props.EditUserPost(values)
                            }}
                            validationSchema={UserManageValidation}
                            render={({
                                values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                            }: FormikProps<userType>) => {
                            const isUserEmpty = (!values.school_id 
                                || !values.role 
                                || !values.firstname 
                                || !values.lastname 
                                || !values.phone_number 
                                || !values.email_id);
                            return(
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className=" row">
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-2">
                                                        <FormGroup>
                                                            <Field
                                                                label='School Name*'
                                                                name="school_id"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                {categoryUserData.map((item: any) => (
                                                                    <MenuItem value={item.id}>{item.school_name}</MenuItem>
                                                                ))}
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-2">
                                                        <FormGroup>
                                                            <Field
                                                                label='Role*'
                                                                name="role"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                <MenuItem value='School Admin'>School Admin</MenuItem>
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 p-t-20">
                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                        <Field
                                                            label='First Name*'
                                                            type="text"
                                                            name="firstname"
                                                            component={TextField}
                                                            className="textfield__input"
                                                            disabled={false}
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Last Name*'
                                                                type="text"
                                                                name="lastname"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
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
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Email Id*'
                                                                type="text"
                                                                name="email_id"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right mb-3 mr-2 mt-4">
                                            <Button className="btn btn-pink mr-1 ml-1 w-15"
                                                 disabled={isUserEmpty || isValidating || !dirty ||
                                                    !!(errors.firstname && touched.firstname)||
                                                    !!(errors.lastname && touched.lastname)||
                                                    !!(errors.phone_number && touched.phone_number) || 
                                                    !!(errors.email_id && touched.email_id) || 
                                                    !!(errors.role && touched.role) || 
                                                    !!(errors.school_id && touched.school_id)} type="submit">Submit</Button>
                                            <Link to="/user">
                                                <Button className="btn btn-default mr-1 ml-1 w-15">Cancel</Button>
                                            </Link>
                                        </div>
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
                                : <SpinnerLoader />}
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        );
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({ userManage }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        categoryDetails: userManage.category,
        loading: userManage.loading,
        userData: userManage.items[Number(ownProps.match.params.id)],
        userIdList: userManage.items,
        errorMessage:userManage.errorMessage
    };
};
export default connect(
    mapStateToProps, { fetchCategoryPost, EditUserPost, fetchUserPostId }
)(EditUserManage);