import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getOverallPerformance} from '../../store/question/Actions';
import { Link } from 'react-router-dom';
import history from '../../History';
interface propsFeedbackType {
    getOverallPerformance:(postValue:any) => any;
    overallPerformance?:any;
    getTeacherDetails?:any
}
class Feedback extends Component<propsFeedbackType> {
    componentDidMount(): void {
        const { getTeacherDetails } = this.props;
        window.scrollTo(0, 0);
        let postValue:any = {
            academic_year: 2021,
            teacher_id: getTeacherDetails
        }
        this.props.getOverallPerformance(postValue)
    }
    getTopicDetails(getValue:any){
history.push({
    pathname: `/topics/${getValue.topics}`
  });
    }
    render() {
        const { overallPerformance } = this.props; 
        return (
            <div>
                <div className="row">
                    {overallPerformance?
                    overallPerformance.map((items:any)=>(
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body no-padding height-9">
                                <div className="row">
                                    <div className="col-md-12 center">
                                        <h4>Topics ({items.subject_name})</h4>
                                    </div>
                                </div>
                                {items.class_list?
                                items.class_list.map((classList:any)=>(
                                <>
                                <div className="row">
                                    <div className="col-md-12">
                                            <h5 className="ml-2 mt-2">{classList.class_name}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="d-flex ml-3">
                                    {classList.graph_data?
                                    classList.graph_data.map((graghData:any)=>(
                                    <div className="mt-sm-3 ml-1">
                                        <Link to={'#'}  onClick={(e: any) => this.getTopicDetails(graghData)}>
                                        <div
                                            className="teacher-status-color-good" style={{background:graghData.color_code}}>
                                            <p>{graghData.topics}</p>
                                        </div>
                                        </Link>
                                        
                                    </div>
                                    ))
                                    :null}
                                    </div>
                                
                                </div>
                                </>
                                ))
                                :null}
                                
                            </div>
                        </div>
                    </div>
                    ))
                    :null}
                    </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return{
        loading:state.teacher.loading,
        overallPerformance:state.questionset.teacherOverallPerformance
    }
}
export default connect(mapStateToProps, {getOverallPerformance})(Feedback);