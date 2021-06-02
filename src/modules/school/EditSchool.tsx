import React from 'react';
import { connect } from 'react-redux';
import { Field, Formik, Form } from 'formik';
import { RootState } from '../../store/Index';
import { RouteComponentProps } from 'react-router';
import { SchoolDetailsType, SchoolTypes } from '../../store/school/Types'
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { editSchool, fetchSchool } from '../../store/school/Actions';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { CATEGORY, 
    MONTHLIST, 
    UserRoles } from '../../services/Constants';
import { schoolEdit } from './SchoolValidation';
import moment from 'moment';

export interface PostsListProps extends RouteComponentProps<OwnPropsParams> {    
    fetchSchool: (id: number) => any;
    editSchool: (school: SchoolDetailsType) => void;
    loading: boolean
    schoolData: SchoolTypes;
    schoolEditDetails: any;
    errorMessage: any;
}

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 13.067439,
    lng: 80.237617
};

class EditSchool extends React.Component<PostsListProps> {
    formik:any;
    public state = {
        show: false,
        showDelete: false,
        addShow: false,
        acadamicAdmin: false,
        schoolAdmin: false,
        bothData: false,
        teacher: false,
        parent: false,
        deleteSchoolId: -1,
        latitudeedit:'',
        longitudeedit:'',
        getUrlService: ''
    };
    componentDidMount(): void {     
        window.scrollTo(0, 0);
        this.checkUserType();
        this.props.fetchSchool(Number(this.props.match.params.id)).then((rest:any)=>{
            const { schoolEditDetails } = this.props; 
            if(schoolEditDetails){
                let getValues:any = schoolEditDetails.school_coordinates;
                if(getValues){
                    this.setState({latitudeedit:getValues[0].latitude, longitudeedit:getValues[0].longitude})
                }                
            }
        });
    }

 
    checkUserType() {
        const getToken = localStorage.getItem('usertype');
        if (getToken === UserRoles.acadamicAdmin) {
            this.setState({ acadamicAdmin: true })
            this.setState({ getUrlService: 'school' })
        } else if (getToken === UserRoles.schoolAdmin) {
            this.setState({ schoolAdmin: true })
            this.setState({ getUrlService: 'view_school' })
        } else if (getToken === UserRoles.teacher) {
            this.setState({ teacher: true })
        } else if (getToken === UserRoles.parent) {
            this.setState({ parent: true })
        }
    }

    public onMarkerDragEnd = ({ e }: { e: any }) => {
        const getselectData:any = this.props.schoolEditDetails;
        let schoolCoordinates = getselectData.school_coordinates;
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        schoolCoordinates[0].latitude=lat;
        schoolCoordinates[0].longitude=lng;
        this.setState({
            latitudeedit:schoolCoordinates[0].latitude,
            longitudeedit:schoolCoordinates[0].longitude
        })
    };
    componentDidUpdate() {    
       let getFormikValue:any = this.formik;
       if(getFormikValue) {
        if(this.props.errorMessage.school_name){
            getFormikValue.setFieldError("schoolName", this.props.errorMessage.school_name);
        } else if(this.props.errorMessage.category){
            getFormikValue.setFieldError("category", this.props.errorMessage.category); 
        } else if(this.props.errorMessage.name){  
            getFormikValue.setFieldError("nameSchool", this.props.errorMessage.name);                
        }else if(this.props.errorMessage.email_id){ 
            getFormikValue.setFieldError("emailId", this.props.errorMessage.email_id)
        }else if(this.props.errorMessage.designation){
            getFormikValue.setFieldError("designationSchool", this.props.errorMessage.designation);  
        }else if(this.props.errorMessage.address){
            getFormikValue.setFieldError("addressSchool", this.props.errorMessage.address); 
        }else if(this.props.errorMessage.phone_number){
            getFormikValue.setFieldError("phoneNumber", this.props.errorMessage.phone_number); 
        }else if(this.props.errorMessage.end_time){  
            getFormikValue.setFieldError("endTime", this.props.errorMessage.end_time);
        }else if(this.props.errorMessage.start_time){
            getFormikValue.setFieldError("startTime", this.props.errorMessage.start_time);
        }else if(this.props.errorMessage.acadamic_start_month){
            getFormikValue.setFieldError("acadamicStartMonth", this.props.errorMessage.acadamic_start_month); 
        }else if(this.props.errorMessage.acadamic_end_month){
            getFormikValue.setFieldError("acadamicEndMonth", this.props.errorMessage.acadamic_end_month); 
        }     
       }
      
    }
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const { getUrlService,latitudeedit,longitudeedit} = this.state;
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            history.push("/");
        }
        const getselectData:any = this.props.schoolEditDetails;
        let selectData: any;
        let position: any;
        let getStatTime;
        let getEndTime;
        let contactPersonsName;
        let contactPersonsDesignation;
        let contactPersonsPhoneNumber;
        let contactPersonsemailId;
        let latitude;
        let longitude;
        let schoolCoordinates;
        let contactPersons;
        let school_name;
        let school_id;
        let school_address;
        let school_category;
        let acadamic_start_month;
        let acadamic_end_month;
        if (getselectData) {
            selectData = getselectData;
            if (selectData) {
                schoolCoordinates = selectData.school_coordinates;
                contactPersons = selectData.contact_persons;
                school_name = selectData.school_name;
                school_id = selectData.id;
                school_address = selectData.address;
                school_category = selectData.category;
                acadamic_start_month = selectData.acadamic_start_month;
                acadamic_end_month = selectData.acadamic_end_month;
            }
        }

        if (selectData) {
            getStatTime = selectData.start_time;
            getEndTime = selectData.end_time;
        }
    
        if (schoolCoordinates) {
            position = {
                lat: parseFloat(schoolCoordinates[0].latitude),
                lng: parseFloat(schoolCoordinates[0].longitude)
            }
            latitude = schoolCoordinates[0].latitude;
            longitude = schoolCoordinates[0].longitude;
        }
        if (contactPersons) {
            contactPersonsName = contactPersons[0].name;
            contactPersonsDesignation = contactPersons[0].designation;
            contactPersonsPhoneNumber = contactPersons[0].phone_number;
            contactPersonsemailId = contactPersons[0].email_id;
        }
        const initialSchoolEdit: any = {
            id: school_id,
            schoolName: school_name,
            addressSchool: school_address,
            nameSchool: contactPersonsName,
            designationSchool: contactPersonsDesignation,
            phoneNumber: contactPersonsPhoneNumber,
            emailId: contactPersonsemailId,
            category: school_category,
            latitude: latitude,
            longitude: longitude,
            acadamicStartMonth: acadamic_start_month,
            acadamicEndMonth: acadamic_end_month,
            startTime: moment(getStatTime, ["h:mm A"]).format("HH:mm"),
            endTime: moment(getEndTime, ["h:mm A"]).format("HH:mm")
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['School']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['School']}
                                baseURL={[getUrlService]}
                                mainPageTitle={['Edit School']} />
                            {selectData && contactPersons && schoolCoordinates ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Edit School</header>
                                            </div>
                                            <div className="card-body">
                                                <Formik
                                                ref={node=>this.formik = node}
                                                    validationSchema={schoolEdit}
                                                    initialValues={initialSchoolEdit} onSubmit={(values, actions) => {
                                                        const startTime = values.startTime;
                                                        const endTime = values.endTime;
                                                        const initialValuesList: any = {
                                                            id: values.id,
                                                            school_name: values.schoolName,
                                                            address: values.addressSchool,
                                                            contact_persons: [{
                                                                name: values.nameSchool,
                                                                designation: values.designationSchool,
                                                                phone_number: values.phoneNumber,
                                                                email_id: values.emailId
                                                            }],
                                                            category: values.category,
                                                            school_coordinates: [{
                                                                latitude:latitudeedit,
                                                                longitude:longitudeedit
                                                            }],
                                                            acadamic_start_month: values.acadamicStartMonth,
                                                            acadamic_end_month: values.acadamicEndMonth,
                                                            start_time: moment(startTime, 'hh:mm').format('hh:mm A'),
                                                            end_time: moment(endTime, 'hh:mm').format('hh:mm A'),
                                                            is_active: 'true'
                                                        }
                                                        this.props.editSchool(initialValuesList)
                                                    }}>
                                                    {({ values, errors, isSubmitting, isValidating, dirty, touched }) => {
                                                        const isSchoolEditEmpty = (!values.schoolName 
                                                            || !values.category 
                                                            || !values.nameSchool 
                                                            || !values.phoneNumber 
                                                            || !values.emailId 
                                                            || !values.designationSchool
                                                            || !values.addressSchool
                                                            || !values.startTime
                                                            || !values.endTime
                                                            || !values.acadamicStartMonth
                                                            || !values.acadamicEndMonth);
                                                        return(
                                                        <Form>
                                                            <div>

                                                                <div className="">
                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                <FormGroup>
                                                                                    <Field
                                                                                        label='School Name*'
                                                                                        type="text"
                                                                                        name="schoolName"
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={this.state.schoolAdmin}
                                                                                    />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                <FormGroup>
                                                                                    <Field
                                                                                        label='Category*'
                                                                                        name="category"
                                                                                        select
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        fullwidth="true"
                                                                                        disabled={false}
                                                                                    >
                                                                                        {CATEGORY.map(item => (
                                                                                            <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                                        ))}
                                                                                    </Field>
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Name*'
                                                                                            type="text"
                                                                                            name="nameSchool"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Designation*'
                                                                                            type="text"
                                                                                            name="designationSchool"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Phone Number*'
                                                                                            type="text"
                                                                                            name="phoneNumber"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Email Id*'
                                                                                            type="email"
                                                                                            name="emailId"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12 p-b-5 p-t-5">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                                <FormGroup>
                                                                                    <Field
                                                                                        name="addressSchool"
                                                                                        component={TextField}
                                                                                        label="Address*"
                                                                                        className="textfield__input"
                                                                                        rows="1"
                                                                                        disabled={false}
                                                                                    />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            type="time"
                                                                                            name="startTime"
                                                                                            label="Start Time*"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                            InputLabelProps={{
                                                                                                shrink: true,
                                                                                            }}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            type="time"
                                                                                            name="endTime"
                                                                                            label="End Time*"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                            InputLabelProps={{
                                                                                                shrink: true,
                                                                                            }}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            name="acadamicStartMonth"
                                                                                            select
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            label="Academic Start Month*"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        >
                                                                                            {MONTHLIST.map(item => (
                                                                                                <MenuItem value={item.code}>{item.code}</MenuItem>
                                                                                            ))}
                                                                                        </Field>
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            name="acadamicEndMonth"
                                                                                            select
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            label="Academic End Month*"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        >
                                                                                            {MONTHLIST.map(item => (
                                                                                                <MenuItem value={item.code}>{item.code}</MenuItem>
                                                                                            ))}
                                                                                        </Field>
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-3 mb-3">
                                                                        <LoadScript
                                                                            googleMapsApiKey="AIzaSyClPYMkRJrTY9ENwFVBWmFerJXPv07QqZM"
                                                                        >
                                                                            <GoogleMap
                                                                                mapContainerStyle={containerStyle}
                                                                                center={center}
                                                                                zoom={15}
                                                                            >
                                                                                <Marker
                                                                                    position={position}
                                                                                    onDragEnd={(e) => this.onMarkerDragEnd({ e: e })}
                                                                                    draggable={true}
                                                                                />
                                                                                <></>
                                                                            </GoogleMap>
                                                                        </LoadScript>
                                                                    </div>
                                                                    <div className="text-right mb-3 mr-2 mt-4">
                                                                        <Button 
                                                                        className="btn btn-pink mr-1 ml-1" 
                                                                        type="submit"
                                                                        disabled={isSchoolEditEmpty || isValidating 
                                                                            || !dirty || !!(errors.acadamicEndMonth && touched.acadamicEndMonth) 
                                                                            || !!(errors.acadamicStartMonth && touched.acadamicStartMonth)||
                                                                            !!(errors.endTime && touched.endTime) ||  
                                                                            !!(errors.startTime && touched.startTime) || 
                                                                            !!(errors.addressSchool && touched.addressSchool) || 
                                                                            !!(errors.emailId && touched.emailId) || 
                                                                            !!(errors.phoneNumber && touched.phoneNumber) || 
                                                                            !!(errors.designationSchool && touched.designationSchool) || 
                                                                            !!(errors.nameSchool && touched.nameSchool) || 
                                                                            !!(errors.category && touched.category) || 
                                                                            !!(errors.schoolName && touched.schoolName)}>Submit</Button>
                                                                        <Link to="/school" 
                                                                        style={{ display: this.state.acadamicAdmin ? "inline-block" : "none" }}>
                                                                        <Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                                        <Link to="/view_school" 
                                                                        style={{ display: this.state.schoolAdmin ? "inline-block" : "none" }}>
                                                                        <Button className="btn btn-default mr-1 ml-1">Cancel</Button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    )}
                                                    }
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <div><SpinnerLoader /></div>}
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
const mapStateToProps = ({ schools }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        errorMessage: schools.errors,
        loading: schools.loading,
        schoolData: schools.items[Number(ownProps.match.params.id)],
        schoolEditDetails: schools.getSchoolEdit
    };
};
export default connect(
    mapStateToProps, { editSchool, fetchSchool }
)(EditSchool);