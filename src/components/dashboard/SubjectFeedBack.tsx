import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getSubjectPerformance } from '../../store/teacher/Actions';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';
import CommonLoader from '../../components/CommonLoader';

interface propsSubject {
    getSubjectPerformance:(postValue:any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    loginProfile:any,
    getTeacherInfo?:any;
    getTeacherDetails?:any;
}

class SubjectFeedBack extends Component<propsSubject> {
    componentDidMount(): void {
        const { getTeacherInfo } = this.props;
        window.scrollTo(0, 0);
        if(getTeacherInfo){
            let postValue:any = {
                academic_year: 2021,
                teacher_id: getTeacherInfo
            }
            this.props.getSubjectPerformance(postValue)
        }        
    }
    getTopicDetails(getValue:any, getAllValue:any){
        history.push({
            pathname: `/topics/${getValue}`
          });
        let postData:any = {
            feedback:getValue,
            subject_id:getAllValue.subject_id
        }
        this.props.getAttendanceStudentView(postData);
            }
    render() {
        const { getTeacherDetails } = this.props;
        return (
            <div>
                    {/* <!-- start bar chart --> */}
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="mb-2">Subject Performance</h4>
                           
                                {getTeacherDetails?
                                getTeacherDetails.map((items:any)=>(
                                <div className="card">
                                <div className="card-head">
                                    <header>{items.subject_name}</header>
                                    <div className="tools">

                                    </div>
                                </div>
                               
                                <div className="card-body no-padding height-9">
                                {items.is_empty === false?
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="row mb-3 ml-3">
                                            <Doughnut
                                                data={{
                                                    labels: ['Correct', 'Incorrect', 'Not Attempted'],
                                                    datasets: [{
                                                        data: items.percentage,
                                                        backgroundColor: items.color_code,
                                                        hoverBackgroundColor: items.color_code
                                                    }]
                                                }}
                                                width={15}
                                                height={15}
                                                options={option}                                               
                                            />
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center mt-5">
                                            <div>
                                                <h5>Correct Answer</h5>
                                                <h3>{items.correct_answer}</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center mt-5">
                                            <div>
                                                <h5>Not Attempted</h5>
                                                <h3>{items.not_attempted}</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center mt-5">
                                            <div>
                                                <h5>Incorrect Answer</h5>
                                                <h3>{items.wrong_answer}</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div> Good Topics</div>
                                            {items.good_topics.length?
                                            items.good_topics.map((item:any)=>(
                                                <>
                                                <button className="btn
                                                btn-outline-danger mt-3 ml-2" onClick={(e: any) => this.getTopicDetails(item, items)}>{item}</button>
                                                </>
                                            ))
                                                :null}
                                        </div>
                                        <div className="col-md-2">
                                            <div>Weak Topics</div>
                                            {items.weak_topics.length?
                                            items.weak_topics.map((item:any)=>(
                                                <>
                                                <button className="btn
                                                btn-outline-danger mt-3 ml-2" onClick={(e: any) => this.getTopicDetails(item, items)}>{item}</button>
                                                </>
                                            ))
                                                :null}
                                        </div>
                                    </div>
                                :<CommonLoader/>}
                                </div>
                                </div>
                                )):null}
                            
                        </div>
                    </div>
            </div>
        );
    }
}

export const option = {
    legend: {
        display: false
      },
    tooltips: {
      callbacks: {
        label: function(tooltipItem:any, data:any) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue/total*100).toFixed(1));
          return currentValue + ' (' + percentage + '%)';
        },
        title: function(tooltipItem:any, data:any) {
          return data.labels[tooltipItem[0].index];
        }
      }
    }
  }
 

const mapStateToProps = (state: any) => {
    return{
        loginProfile:state.profile.profileData,
        getTeacherDetails:state.teacher.getSubjectPerformance
    }
}

export default connect(mapStateToProps, {getSubjectPerformance, getAttendanceStudentView})(SubjectFeedBack);