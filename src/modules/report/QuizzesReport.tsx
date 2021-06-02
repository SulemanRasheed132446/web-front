import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router';
import { fetchClassrePort, getStudentClassrePort } from '../../store/classes/Actions';
import { postTeacherEngagement } from '../../store/dashboard/Actions';
import CommonLoader from '../../components/CommonLoader';
import { Link } from 'react-router-dom';
import history from '../../History';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import ClassRecentFeedback from './ClassRecentFeedback';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface propsQuizzesReportTypes extends RouteComponentProps<OwnPropsParams> {
    getQuizzes:any;
    fetchClassrePort: (postValue: any) => any;
    postTeacherEngagement: (getValue: any) => any;
    getStudentClassrePort: (getStudent: any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    getTeacherDetails?: any;
    getStudentDetails?: any;
    classSubjectList?: any;
    loading?: any;
    loginProfile?: any;
}
export interface propsTypes {
    schoolId:any
}
export class QuizzesReport extends Component<propsQuizzesReportTypes, propsTypes> {
    getClassInfo: any;
    commonUser: any;
    adacemicAdmin: any;
    constructor(props: any) {
        super(props);
        this.state = {
            schoolId:''
        }
    }
    componentDidMount(): void {
        const { loginProfile } = this.props;
        window.scrollTo(0, 0);
        this.getClassInfo = this.props.match.params.id;
        if(loginProfile){
            if (loginProfile.usertype === 1) {
                this.getAdacemicAdminData();
                this.adacemicAdmin = true;
                this.commonUser = false;
            } else {
                this.getCommonData();
                this.adacemicAdmin = false;
                this.commonUser = true;
            }
        }
      
    }
    getCommonData() {
        let getClassId: any = this.props.match.params.id;
        if (getClassId) {
            let postValue: any = {
                academic_year: "2021",
                class_id: getClassId,
                page_no: 1
            }
            this.props.postTeacherEngagement(postValue)
            let classesList: any = {
                academic_year: 2021,
                class_id: getClassId
            }
            this.props.fetchClassrePort(classesList);
            this.props.getStudentClassrePort(classesList);
        }
    }
    getAdacemicAdminData() {
        const { getQuizzes } = this.props;
        let getClassId: any = this.props.match.params.id;
        if(getQuizzes){
            if(!getQuizzes.school_id){
                history.push('/classes');
            }
            let postValue: any = {
                academic_year: "2021",
                class_id: getClassId,
                school_id: getQuizzes.school_id,
                page_no: 1
            }
            this.props.postTeacherEngagement(postValue)
            let classesList: any = {
                academic_year: 2021,
                class_id: getClassId,
                school_id: getQuizzes.school_id
            }
            this.props.getStudentClassrePort(classesList);
            this.props.fetchClassrePort(classesList);
            let postValueTeacher: any = {
                academic_year: "2021",
                class_id: getClassId,
                page_no: 1,
                school_id: getQuizzes.school_id
            }
            this.props.postTeacherEngagement(postValueTeacher)
        }
    }
    postTeacherDetails = (getValue: any) => {
        history.push({
            pathname: `/teachers/${getValue.teacher_id}`,
        });
        localStorage.setItem('TeacherDetails', getValue.teacher_name)
    }
    postStudentDetails = (getValue:any) => {
        const { getQuizzes } = this.props;
        if(getValue){
            let getPostValue:any = {
                card_id:getValue.card_id, 
                class_id: this.props.match.params.id,
                school_id: getQuizzes.school_id
            };
            this.props.getAttendanceStudentView(getPostValue);
            history.push(`/student_view`)
        }
        
    }

    getStudentClasses = (e: any) => {
        const { value } = e.target;
        let getClassId: any = this.props.match.params.id;
        if (value) {
            const postValue = {
                page_no: 1,
                academic_year: '2021',
                class_id: getClassId,
                school_id: value
            }
            this.props.getStudentClassrePort(postValue);
            this.setState({schoolId:value})
        }
    }
    addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
      }
    render() {
        const { getTeacherDetails, classSubjectList, getStudentDetails, loading, getQuizzes } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let getClassesDetails: any = localStorage.getItem("classesInfo")
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={[getClassesDetails]}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={[getClassesDetails]}
                                baseName={['Classes']}
                                baseURL={['classes']} />
                            <div className="row mb-3">
                                <div className="col-md-3">
                                    <div>
                                        {classSubjectList ?
                                            <select className="form-control" onChange={this.getStudentClasses}>
                                                <option value="" disabled selected hidden>Subject</option>
                                                {classSubjectList.map((items: any) => (
                                                    <option value={items.id}>{items.subject_name}</option>
                                                ))}
                                            </select>
                                            : null}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: this.adacemicAdmin ? "block" : "none" }}>
                                {
                                    getQuizzes ?
                                        <ClassRecentFeedback getClassId={getQuizzes} />
                                        : null
                                }
                            </div>
                            <div className="row" style={{ display: this.commonUser ? "block" : "none" }}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>
                                                Teachers
                                            </header>
                                            <div className="tools">
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                    <li className="title-sticky">
                                                        <div className="row">
                                                            <div className="col-md-6 col-xs-6"><strong>Teacher
                                                            </strong></div>
                                                            <div className="col-md-3 col-xs-3"><strong>Total Responses</strong></div>
                                                            <div className="col-md-3 col-xs-3"><strong>Performance</strong></div>
                                                        </div>
                                                    </li>
                                                    {getTeacherDetails ?
                                                        getTeacherDetails.map((items: any) => (
                                                            <li>
                                                                <div className="row">
                                                                {items.teacher_profile?
                                                                           <div className="col-md-1
                                                                           col-sm-1">
                                                                        <div className="prog-avatar">
                                                                                <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${items.teacher_profile}`} 
                                                                                alt="Student Profile" width="40"
                                                                                height="40"/>
                                                                                           </div>
                                                                                       </div>
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                                            <button
                                                                                                className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink">
                                                                                                <span>{items.teacher_name.charAt(0)}</span>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                        }
                                                                    <div className="col-md-5
                                                            col-sm-5">
                                                                        <div
                                                                            className="details">
                                                                            <div
                                                                                className="title
                                                                    mt-2">
                                                                                <Link to={"#"} onClick={() => this.postTeacherDetails(items)}>{items.teacher_name}</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.total_responses}</p>
                                                                    </div>
                                                                    <div className="col-md-3
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.total_performance}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                        : <CommonLoader />}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>
                                                Students
                                            </header>
                                            <div className="tools">
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                    <li className="title-sticky">
                                                        <div className="row">
                                                            <div className="col-md-6 col-xs-6"><strong>Name
                                                            </strong></div>
                                                            <div className="col-md-3 col-xs-3"><strong>Overall Attendance</strong></div>
                                                            <div className="col-md-3 col-xs-3"><strong>Performance</strong></div>
                                                        </div>
                                                    </li>
                                                    {getStudentDetails ?
                                                        getStudentDetails.map((items: any) => (
                                                            <li>
                                                                <div className="row">
                                                                {items.profile_picture?
                                                                           <div className="col-md-1
                                                                           col-sm-1">
                                                                        <div className="prog-avatar">
                                                                                <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${items.profile_picture}`} 
                                                                                alt="Student Profile" width="40"
                                                                                height="40"/>
                                                                                           </div>
                                                                                       </div>
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                                            <button
                                                                                                className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink">
                                                                                                <span>{items.student_name.charAt(0)}</span>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                        }
                                                                    <div className="col-md-5
                                                            col-sm-5">
                                                                        <div
                                                                            className="details">
                                                                            <div
                                                                                className="title
                                                                    mt-2">
                                                                                <Link to={"#"} onClick={() => this.postStudentDetails(items)}>{items.student_name}</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.attendance}</p>
                                                                    </div>
                                                                    <div className="col-md-3
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.performance}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                        : <CommonLoader />}
                                                </ul>
                                            </div>
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

const mapStateToProps = (state: any) => {
    return {
        loading: state.classes.loading,
        getQuizzes:state.profile.AttendanceStudentView,
        loginProfile: state.profile.profileData,
        getTeacherDetails: state.dashboard.recordsPostTeacherEngagement,
        classSubjectList: state.classes.getClassrePort,
        getStudentDetails: state.classes.getStudentClassrePort
    }
}


export default connect(mapStateToProps, { fetchClassrePort, postTeacherEngagement, getStudentClassrePort, getAttendanceStudentView })(QuizzesReport)
