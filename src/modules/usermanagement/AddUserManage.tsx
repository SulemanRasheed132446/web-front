import React from 'react';
import { connect } from 'react-redux';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { userType, CategoryFieldsType } from '../../store/usermanage/Type';
import { AddUserPost, fetchCategoryPost } from '../../store/usermanage/Actions';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { UserManageValidation } from './UserManageValidation';

const initialUserValues: userType = {
    firstname: '',
    lastname: '',
    email_id: '',
    phone_number: '',
    role: '',
    school_id: '',
    timezone: 'Asia/Kolkata'
}
export type OwnUserManageFormProps = {
    categoryDetails: CategoryFieldsType[],
    AddUserPost: (userManage: userType) => void;
    fetchCategoryPost: () => void;
    loading: boolean;
    errorMessage: any
};
class AddUserManage extends React.Component<OwnUserManageFormProps>  {
    formikUser: any
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchCategoryPost();
    }
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if(this.props.errorMessage?.firstname 
            || this.props.errorMessage?.lastname 
            || this.props.errorMessage?.phone_number 
            || this.props.errorMessage?.email_id) {
            this.formikUser.setFieldError('firstname', this.props.errorMessage.firstname)
            this.formikUser.setFieldError('lastname', this.props.errorMessage.lastname)
            this.formikUser.setFieldError('phone_number', this.props.errorMessage.phone_number)
            this.formikUser.setFieldError('email_id', this.props.errorMessage.email_id)
        }
    }
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            history.push("/");
        }
        const getCategoryDetails: any = this.props.categoryDetails;
        let categoryUserAdd: any;
        if (getCategoryDetails) {
            categoryUserAdd = getCategoryDetails;
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
                                mainPageTitle={['Add User']} />
                            {categoryUserAdd ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Add User</header>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Formik
                                                            ref={node => this.formikUser = node}
                                                            initialValues={initialUserValues}
                                                            onSubmit={(values: userType, actions) => {
                                                                this.props.AddUserPost(values)
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
                                                                return (
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
                                                                                                    {categoryUserAdd.map((item: any) => (
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
                                                                                        !!(errors.firstname && touched.firstname) ||
                                                                                        !!(errors.lastname && touched.lastname) ||
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
                                : <SpinnerLoader />}
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        );
    }
}
const mapStateToProps = ({ userManage }: RootState) => {
    return {
        categoryDetails: userManage.category,
        loading: userManage.loading,
        errorMessage: userManage.errorMessage
    };
};
export default connect(
    mapStateToProps, { AddUserPost, fetchCategoryPost }
)(AddUserManage);