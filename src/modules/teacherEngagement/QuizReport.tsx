import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecentQuizReport } from '../../store/question/Actions';
import CommonLoader from '../../components/CommonLoader';
import { Link } from "react-router-dom";
import { fetchGetAllClassList } from '../../store/diary/Actions';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

export interface PostsQuizzesProps {
    getRecentQuizReport:(postValue:any) => any;
    fetchGetAllClassList: (postPage: any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    loading?: boolean,
    loginProfile?:any,
    getQuizzesReport?:any,
    getTeacherId?:any
    getAllClassList?:any;
}
export class QuizReport extends Component<PostsQuizzesProps> {    
    componentDidMount(): void {
        const { getTeacherId } = this.props;
        window.scrollTo(0, 0);
        this.commonSchoolDetails()
        const postValue = {
            academic_year: '2021',
            teacher_id: getTeacherId
        }
        this.props.getRecentQuizReport(postValue);
    }
    commonSchoolDetails(){
        let loadMoreType:any = {
              academic_year: '2021'
            }
          this.props.fetchGetAllClassList(loadMoreType);
      }
      getQuizzesReport = (getValue:any) =>{      
        history.push({
			pathname: `/quizzes_report/${getValue.quiz_id}`,
          });
        this.props.getAttendanceStudentView(getValue)
    }
    render() {
        const { getQuizzesReport } = this.props;        
        return (
            <div>
                 <div className="row">
                    <div className="col-md-12">
                    <h4 className="mb-2">Recent Quiz</h4>
                        <div className="card card-topline-red">
                            <div className="card-body no-padding height-9">
                                <div className="table-responsive">
                                    <table className="table table-striped custom-table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                                                <th>Class Name  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                                                <th>Subject  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                                                <th>Performance (Average)  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                                                <th>Time  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {getQuizzesReport? 
                                        <tbody>
                                            {
                                                getQuizzesReport.map((items: any, index: any) => (
                                                    <tr key={index}>
                                                        <td>{items.question_set_name}</td>
                                                        <td>{items.quiz_name || '-'}</td>
                                                        <td>{items.subject_name}</td>
                                                        <td>{items.performance}</td>
                                                        <td>{items.last_updated_time}</td>
                                                        <td> <Link to={`#`} onClick={()=> this.getQuizzesReport(items)}>
                                                        <button className="btn btn-primary btn-xs"
                                                            title="View Question Set"><i className="fa fa-eye" aria-hidden="true"></i></button></Link></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        :<CommonLoader/>}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="pull-right">
                            <Link to={"/quizzes"}>
                            <button className="btn btn-pink">More...</button>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loginProfile:state.profile.profileData,
        getAllClassList:state.diary.gradelist,
        getQuizzesReport:state.questionset.recentQuizReport,
        loading:state.questionset.loading
    }
}

export default connect(mapStateToProps, {getRecentQuizReport, fetchGetAllClassList, getAttendanceStudentView})(QuizReport)
