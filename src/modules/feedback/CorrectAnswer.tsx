import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTopicAnalysisReport } from '../../store/question/Actions';
import history from '../../History';

interface propsCorrect {
    getTops?:any;
    FeedbackDetails?:any;
    getTopicAnalysisReport:(postValue:any) => any;
    getTopicsData?:any;
    loginProfile?:any;
}
export class CorrectAnswer extends Component<propsCorrect> {
    componentDidMount(): void {
        const { getTops, FeedbackDetails } = this.props;
        console.log(FeedbackDetails, 'FeedbackDetails...')
        window.scrollTo(0, 0);
        let postValue:any = {
            academic_year: 2021,
            subject_id:FeedbackDetails.subject_id,
            topic: getTops,
            school_id:FeedbackDetails.school_id
        }
        this.props.getTopicAnalysisReport(postValue)
    }
    getInstantFeedBackResult = (getValue:any) =>{
        history.push({
			pathname: `/view_instant_feedback/${getValue.id}`,
		  });
    }
    
    render() {
        const { getTopicsData } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8 mb-3">
                    {getTopicsData.questions?
                    getTopicsData.questions.map((items:any)=>(
                    <div className="card card-topline-red">
                        <div className="card-body">
                        <div className="row">
                        <div className="col-md-11">
                        <h4 className="mb-1">{items.name}</h4>
                        <h6>( Instant Feedback )</h6>
                        <hr className="mt-3 mb-2"/>
                        <h5><strong style={{color:'#318f94'}}>Correct answer is</strong> {items.correct_ans}</h5>
                        <hr className="mt-3 mb-2"/>
                        <p>{items.class_name} : Class Performance</p>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-circle btn-pink pull-right"  
                            onClick={()=> this.getInstantFeedBackResult(items)}>view</button>
                        </div>
                        </div>
                        <div className="progress progressbar mt-3">
                        <div className="progress-bar pragressBarGood" role="progressbar" 
                        style={{width: items.correct_performance.performance, height:'15px', background: items.correct_performance.color_code}}>
                            {items.correct_performance.performance} ({items.correct_performance.student_count})</div>
                        <div className="progress-bar pragressBarMiddel" role="progressbar" 
                        style={{width: items.incorrect_performance.performance, height:'15px', background: items.incorrect_performance.color_code}}>
                        {items.incorrect_performance.performance} ({items.incorrect_performance.student_count})</div>
                        <div className="progress-bar pragressBarwid" role="progressbar" 
                        style={{width: items.not_answered.performance, height:'15px', background: items.not_answered.color_code}}>
                            {items.not_answered.performance} ({items.not_answered.student_count})</div>
                        </div>
                        </div>
                    </div>
                    ))                    
                    :null}
                    </div>
                    <div className="col-md-2">

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        loginProfile:state.profile.profileData,
        FeedbackDetails:state.profile.AttendanceStudentView,
        getTopicsData: state.questionset.topicAnalysisReport
    }
}


export default connect(mapStateToProps, {getTopicAnalysisReport})(CorrectAnswer)
