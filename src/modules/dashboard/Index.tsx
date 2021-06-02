import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb'
import Schoolstatuschart from './SchoolStatusChart';
import Teacherupdatedetails from './TeacherDetails';
import Totalcount from './TotalCount';
import AttendanceUsage from '../admindashboard/AttendanceUsage';
import QuizQuestionResponses from '../admindashboard/QuizQuestionResponses';
import FeedbackQuestionResponses from '../admindashboard/FeedbackQuestionResponses';
import './dashboardStyle.scss';
import TeacherCount from './TeacherCount';
import AcademicAdminCount from './AcademicAdminCount';
import TeacherDashboard from '../teacherDashboard/TeacherDashboard';
import TeacherSubject from '../teacherDashboard/TeacherSubject';
import GradeComparison from '../admindashboard/GradeComparison';
import TodayAttendance from '../admindashboard/TodayAttendance';

export interface PostsDiaryProps {
    loading: boolean,
    loginProfile:any
}
class DashboardIndexPage extends React.Component<PostsDiaryProps>{
    componentDidMount(): void {
		window.scrollTo(0, 0);
	}
    render(){
        let academicAdminUserTypes:any = false;
        let schoolAdminUserTypes:any = false;
        let teacherUserTypes:any = false;
        const getUserType:any = this.props.loginProfile.usertype;
        if(getUserType === 1){
            academicAdminUserTypes = true;
        } else if(getUserType === 2){
            schoolAdminUserTypes =  true;
        } else if(getUserType === 3){ 
            teacherUserTypes = true;
        }
        
        return(
            <div>
                <div className="page-wrapper">
                <div className="page-content-wrapper">
                <BreadCrumb titleName={['Dashboard']} homeName={['Home']} url={['dashboard']}/>
                {getUserType? 
                <>{
                    academicAdminUserTypes? 
                    <>
                <AcademicAdminCount/>
                <AttendanceUsage/>
                <QuizQuestionResponses/>
                <FeedbackQuestionResponses/>
                <GradeComparison/>
                <TodayAttendance/>
                    </>
                    :null
                }
                {schoolAdminUserTypes? 
                <>
                <Totalcount/>
                <Schoolstatuschart/>
                <Teacherupdatedetails/>
                </>
                :null
                }
                {teacherUserTypes? 
                <>
                <TeacherCount/>
                <TeacherDashboard/>
                <TeacherSubject/>
                </>
                :null}
                
                </>
                :null}
                
                </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state: any) => {
    return {
        loginProfile:state.profile.profileData
    }
}

export default connect(mapStateToProps)(DashboardIndexPage)
