import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecentFeedbackList } from '../../store/question/Actions';
import CommonLoader from '../../components/CommonLoader';
import { Link } from "react-router-dom";
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

export interface PostsFeedbackProps {
    getRecentFeedbackList:(postValue:any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    loading?: boolean,
    loginProfile:any,
    getRecentFeedback?:any,
    getTeacherId?:any

}
export class RecentFeedback extends Component<PostsFeedbackProps> {
    componentDidMount(): void {
        const { getTeacherId } = this.props;
        window.scrollTo(0, 0);
        const postValue = {
            academic_year: '2021',
            teacher_id: getTeacherId
        }
        this.props.getRecentFeedbackList(postValue);
    }
    getInstantFeedBackResult = (getValue:any) =>{
        if(getValue){
            let postValue:any ={ 
                class_id:getValue.class_id,
                school_id: getValue.school_id
            }
            history.push({
                pathname: `/view_instant_feedback/${getValue.id}`,
              });
              this.props.getAttendanceStudentView(postValue);
        }
    }
    render() {
        const { getRecentFeedback } = this.props;
        return (
            <div>
               <div className="row">
                    <div className="col-md-12">
                    <h4 className="mb-2">Recent Feedback</h4>
                        <div className="card card-topline-red">
                            <div className="card-body no-padding height-9">
                                <div className="table-responsive">
                                    <table className="table table-striped custom-table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Performance (Average)</th>
                                            <th>Time</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        {getRecentFeedback? 
                                        <tbody>
                                            {
                                                getRecentFeedback.map((items: any, index: any) => (
                                                    <tr key={index}>
                                                        <td className="titleCapitalize">{items.name}</td>
                                                        <td>{items.performance}</td>
                                                        <td>{items.created_at}</td>
                                                        <td> <Link to={`#`} onClick={()=> this.getInstantFeedBackResult(items)}>
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
                            <Link to={"/instant_feedback"}>
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
        getRecentFeedback:state.questionset.recentFeedbackList,
        loading:state.questionset.loading
    }
}

export default connect(mapStateToProps, {getRecentFeedbackList, getAttendanceStudentView})(RecentFeedback)
