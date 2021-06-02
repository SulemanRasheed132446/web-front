import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getClassRecentFeedback, fetchClassRecentQuiz } from '../../store/classes/Actions';
import CommonLoader from '../../components/CommonLoader';
import { Link } from "react-router-dom";
import history from '../../History';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface propsClassRecent {
    getClassId?:any;
    getClassRecentFeedback:(postValue:any) => any;
    fetchClassRecentQuiz:(postValue:any) => any;
    getAttendanceStudentView:(postValue:any) =>any;
    ClassRecentFeedback?:any;
    ClassRecentQuiz?:any;
    loading?:any;
}

export class ClassRecentFeedback extends Component<propsClassRecent> {
    componentDidMount(): void {
        this.getClassesRecent()
    }
    getClassesRecent(){
        const { getClassId } = this.props;
        if(getClassId){
            let postValue:any = {
                academic_year: '2021',
                class_id:getClassId.classResport.id,
                school_id: getClassId.school_id
            }
            this.props.getClassRecentFeedback(postValue);
            this.props.fetchClassRecentQuiz(postValue);
        }
    }
    getQuizzesReport = (getValue:any) =>{        
        history.push({
			pathname: `/view_instant_feedback/${getValue.quiz_id}`,
		  });
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
        const { ClassRecentQuiz, ClassRecentFeedback, loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
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
                                                <th>Name</th>
                                                <th>Performance (Average)</th>
                                                <th>Last Updated Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {ClassRecentQuiz? 
                                        <tbody>
                                            {
                                                ClassRecentQuiz.map((items: any, index: any) => (
                                                    <tr key={index}>
                                                        <td>{items.name}</td>
                                                        <td>{items.performance}</td>
                                                        <td>{items.date}</td>
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
                                                <th>Performance</th>
                                                <th>Last Updated Time</th>
                                                <th>Action</th>
                                                
                                            </tr>
                                        </thead>
                                        {ClassRecentFeedback? 
                                        <tbody>
                                            {
                                                ClassRecentFeedback.map((items: any, index: any) => (
                                                    <tr key={index}>
                                                        <td>{items.question}</td>
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
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return{
        ClassRecentFeedback:state.classes.getClassRecentFeedback,
        ClassRecentQuiz:state.classes.getClassRecentQuiz,
        loading:state.classes.loading,
    }
}

export default connect(mapStateToProps, {getClassRecentFeedback, fetchClassRecentQuiz, getAttendanceStudentView})(ClassRecentFeedback)
