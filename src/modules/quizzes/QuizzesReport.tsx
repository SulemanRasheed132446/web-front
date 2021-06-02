import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import CommonLoader from '../../components/CommonLoader';
import QuestionViewList from './QuestionViewList';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { fetchQuizzesStudentReport, fetchCalculationsReport, fetchBarchartReport } from '../../store/question/Actions';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface propsQuizzesTypes extends RouteComponentProps<OwnPropsParams> {
    fetchQuizzesStudentReport: (postValue: any) => any;
    fetchCalculationsReport: (postValue: any) => any;
    fetchBarchartReport: (postValue: any) => any;
    getAttendanceStudentView: (postValue: any) => any;
    getQuizzesDetails:any,
    getQuizzesStudent: any;
    getCalculations: any;
    getBarchartReport: any;
    loading?: any
}
export class QuizzesReportView extends Component<propsQuizzesTypes> {
    getQuizzesPropsValue: any;
    getQuizzesData: any;
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.getQuizzesPropsValue = this.props.match.params.id;
        if (this.getQuizzesPropsValue) {
            let getValue: any = {
                quiz_id: this.getQuizzesPropsValue
            }
            this.props.fetchQuizzesStudentReport(getValue);
            this.props.fetchCalculationsReport(getValue);
            this.props.fetchBarchartReport(getValue)
        }
    }
    getStudentQuestionDetails = (getValue: any) => {
        let getCardId: any = getValue.card_id;
        if (getCardId) {
            history.push({
                pathname: `/student/${getCardId}`,
                state: { quiz_id: this.getQuizzesPropsValue }
            });
            let postValue: any = {
                studet_Details: getValue,
                quiz_id: this.getQuizzesPropsValue
            }
            this.props.getAttendanceStudentView(postValue);
        }
    }
    getTopicDetails(getValue?:any, getAllValue?:any){
        const { getQuizzesDetails } = this.props;
        history.push({
            pathname: `/topics/${getValue}`
        });
        let postData:any = {
            feedback:getValue,
            subject_id:getAllValue.subject_id,
            school_id:getQuizzesDetails.school_id,
            class_id:getAllValue.class_id
        }
        this.props.getAttendanceStudentView(postData);
    }
    addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
      }
    render() {
        const { getQuizzesStudent, getCalculations, getBarchartReport, loading } = this.props;
        this.getQuizzesData = this.props.match.params.id;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        return (
            <div>
                
                <div className="page-wrapper">
                 <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            
                            <BreadCrumb
                                titleName={['View Quizzes']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['View Quizzes']}
                                baseName={['Quizzes']}
                                baseURL={['quizzes']} />
                                <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box pl-3 pr-3 pb-3">
                                    {getCalculations ?
                                    <>
                                    <h3 className="color-pink">{getCalculations.question_set_name}</h3>
                                    <h5>Conducted <span className="color-pink">{getCalculations.conducted_by}</span> in <strong className="color-pink">{getCalculations.class_name}</strong></h5>
                                    </>
                                    :null}
                                    </div>
                                </div>
                            </div>
                            {/* This is table used to view to studet list */}
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="card-box">
                                        <div className="card-body">
                                            <div className="row">
                                                <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                    <li className="title-sticky">
                                                        <div className="row">
                                                            <div className="col-md-6"><strong>Student
                                                                Name
                                                            </strong></div>
                                                            <div className="col-md-2"><strong>Score</strong></div>
                                                            <div className="col-md-2"><strong>Percentage</strong></div>
                                                            <div className="col-md-2"><strong>Percentile</strong></div>
                                                        </div>
                                                    </li>
                                                    {getQuizzesStudent ?
                                                        getQuizzesStudent.map((items: any) => (

                                                            <li>
                                                                <div className="row">
                                                                {items.profile?
                                                                           <div className="col-md-1
                                                                           col-sm-1">
                                                                        <div className="prog-avatar">
                                                                                <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${items.profile}`} 
                                                                                alt="Student Profile" width="40"
                                                                                height="40"/>
                                                                                           </div>
                                                                                       </div>
                                                                        :  
                                                                        <div className="col-md-1
                                                                        col-sm-1">
                                                                                    <div className="prog-avatar">
                                                                                        <button
                                                                                            className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink">
                                                                                            <span>{items.name.charAt(0)}</span>											</button>
                                                                                    </div>
                                                                                </div>
                                                                        }

                                                                    


                                                                    <div className="col-md-5
                                                            col-sm-8">
                                                                        <div
                                                                            className="details">
                                                                            <div
                                                                                className="title
                                                                    mt-2">
                                                                                <Link to="#" onClick={() => this.getStudentQuestionDetails(items)}>{items.name}</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-2
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.score}</p>
                                                                    </div>
                                                                    <div className="col-md-2
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.percentage}</p>
                                                                    </div>
                                                                    <div className="col-md-2
                                                            col-sm-3
                                                            rating-style">
                                                                        <p>{items.percentile}</p>
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
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* view quizze status */}
                                            <div className="row">
                                                {getCalculations ?
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="card-box p-4 height265">
                                                            <div className="row">
                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 
                                        col-12 ">
                                                                    <div className="overview-panel purple
                                            text-center mt-2 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1"> Average</p>
                                                                            <h5 className="mt-1 color-pink">
                                                                                {getCalculations.average || 0}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4
                                        col-12 pl-3">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1"> Highest</p>
                                                                            <h5 className="mt-1 color-pink">{getCalculations.highest || 0}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4
                                        col-12">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 p-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1">Median</p>
                                                                            <h5 className="mt-1 color-pink">{getCalculations.median || 0}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                <div className="row">
                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4
                                        col-12">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 p-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1">Lowest</p>
                                                                            <h5 className="mt-1 color-pink">{getCalculations.lowest || 0}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4
                                        col-12">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 p-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1">Total Ques.</p>
                                                                            <h5 className="mt-1 color-pink">
                                                                                {getCalculations.total_questions || 0}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4
                                        col-12">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 p-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1">Participants</p>
                                                                            <h5 className="mt-1 color-pink">{getCalculations.participants || 0}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                             
                                                                <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6
                                        col-12 mt-2">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 p-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mt-1">Easiest Topics</p>
                                                                            <h4 className="mt-1 color-pink">{getCalculations.easiest_topics ?
                                                                                getCalculations.easiest_topics.slice(0, 3).map((item: any, index: any) => {
                                                                                    return(
                                                                                    <button className="btn btn-outline-danger btn-xs ml-2 p-1"  onClick={(e: any) => this.getTopicDetails(item, getCalculations)}>{item}</button>
                                                                                )})
                                                                                : '-'}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6
                                        col-12 mt-2">
                                                                    <div className="overview-panel purple
                                            text-center mt-1 p-1 mb-1">
                                                                        <div className="value white">
                                                                            <p className="mb-1 mt-1">Difficult Topics</p>
                                                                            <h4 className="mt-1 color-pink">
                                                                                {getCalculations.difficult_topic ?
                                                                                    getCalculations.difficult_topic.slice(0, 3).map((item: any, index: any) => (
                                                                                        <button className="btn btn-outline-danger btn-xs ml-2 p-1"  onClick={(e: any) => this.getTopicDetails(item, getCalculations)}>{item}</button>
                                                                                    ))
                                                                                    : '-'}
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {getBarchartReport ?
                                                <div className="card-box height265">
                                                    <div className="row">
                                                        <div className="col-md-12 pr-4 pl-4 pb-3 pt-3">
                                                            <Bar
                                                                data={{
                                                                    labels: getBarchartReport.question,
                                                                    datasets: [
                                                                        {
                                                                            backgroundColor: getBarchartReport.color_code,
                                                                            borderColor: getBarchartReport.color_code,
                                                                            borderWidth: 2,
                                                                            data: getBarchartReport.correct_response
                                                                        }
                                                                    ]
                                                                }}
                                                                height={115}
                                                                options={option}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                : null}
                                        </div>


                                    </div>
                                </div>

                            </div>


                            <QuestionViewList getQuizzesId={this.getQuizzesData} />

                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
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
          var currentValue = dataset.data[tooltipItem.index];
          return 'Correct Response (' + currentValue + ')';
        },
        title: function(tooltipItem:any, data:any) {
          return 'Question ' + data.labels[tooltipItem[0].index] + '';
        }
      }
    },
    title: {
        display: true,
        text: 'Question Number'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                userCallback: function(label:any, index:any, labels:any) {
                    if (Math.floor(label) === label) {
                        return label;
                    }
                }
            }
        }],
        xAxes: [{
            barPercentage: 0.5,
            gridLines: {
                display: false
            }
        }]
    }
  }
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state: any) => {
    return {
        getQuizzesStudent: state.questionset.QuizzesStudentReport,
        getQuizzesDetails:state.profile.AttendanceStudentView,
        getCalculations: state.questionset.CalculationsReport,
        getBarchartReport: state.questionset.BarchartReport,
        loading: state.questionset.loading
    }
}


export default connect(mapStateToProps, { fetchQuizzesStudentReport, fetchCalculationsReport, fetchBarchartReport, getAttendanceStudentView })(QuizzesReportView)
