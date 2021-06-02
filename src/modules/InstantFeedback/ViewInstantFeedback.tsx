import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { getFeedbackBarChart, getFedbackSubject, getFeedbackStudent, getFeedbackPieChart } from '../../store/question/Actions';
import CommonLoader from '../../components/CommonLoader';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { getAttendanceStudentView } from '../../store/profile/Actions';
import history from '../../History';

interface propsInstantTypes extends RouteComponentProps<OwnPropsParams> {
    getStudentDetails?:any;
    getFeedbackBarChart: (postValue: any) => any;
    getFedbackSubject: (postValue: any) => any;
    getFeedbackStudent: (postValue: any) => any;
    getFeedbackPieChart: (postValue: any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    loading: boolean,
    feedbackBarChart: any,
    feedbackStudent: any,
    feedbackPieChart: any,
    fedbackSubject: any
}
interface propsInstantFeedbackTypes {
optionA:any,
optionB:any,
optionC:any,
optionD:any,
optionNotAnswed:any,
chooseOptionA:any,
chooseOptionB:any,
chooseOptionC:any,
chooseOptionD:any,
chooseNotAnswed:any,
clearOption:any

}
export class ViewInstantFeedback extends Component<propsInstantTypes, propsInstantFeedbackTypes> {
    constructor(props: any) {
        super(props);
        this.state = {
            optionA:'btn-pink',
            optionB:'btn-pink',
            optionC:'btn-pink',
            optionD:'btn-pink',
            optionNotAnswed:'btn-pink',
            chooseOptionA:'',
            chooseOptionB:'',
            chooseOptionC:'',
            chooseOptionD:'',
            chooseNotAnswed:'',
            clearOption:false
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.getInstantfeedbackData();
    }
    addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
      }
    postStudentDetails = (getValue:any) =>{
        const { getStudentDetails } = this.props;
        if(getValue){
            let getPostValue:any = {
                card_id:getValue.card_id, 
                class_id: getStudentDetails.class_id,
                school_id: getStudentDetails.school_id
            };
            localStorage.setItem('StudentDetails', getPostValue)
            this.props.getAttendanceStudentView(getPostValue);
            history.push(`/student_view`)
        }
        
    }
    getInstantfeedbackData() {
        let getInstantId: any = this.props.match.params.id;
        if (getInstantId) {
            let postValue: any = {
                feedback_id: getInstantId
            }
            this.props.getFeedbackBarChart(postValue);
            this.props.getFedbackSubject(postValue);
            this.props.getFeedbackStudent(postValue);
            this.props.getFeedbackPieChart(postValue);
        }

    }
    chooseAOption = (getValue:any)=>{
    const { chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed } = this.state;
    let getInstantId: any = this.props.match.params.id;
    if(chooseOptionA === ''){
        this.setState({optionA:'btn-default', chooseOptionA:'A'})
        let pushOption:any = []
        let getOption:any = ['A', chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed]
        pushOption.push(getOption)
        let postValue: any = {
            feedback_id: getInstantId, 
            optin:pushOption
            
        }
        this.props.getFeedbackStudent(postValue);
    }else {
  this.setState({optionA:'btn-pink', chooseOptionA:''})
    let postValue: any = {
        feedback_id: getInstantId, 
        optin:['', chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed]

    }
    this.props.getFeedbackStudent(postValue);
    }
    }
    chooseBOption = (getValue:any)=>{
        const { chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed } = this.state;
        let getInstantId: any = this.props.match.params.id;
    if(chooseOptionB === ''){
        this.setState({optionB:'btn-default', chooseOptionB:'B'})
        let postValue: any = {
            feedback_id: getInstantId, 
            optin:[chooseOptionA, 'B', chooseOptionC, chooseOptionD, chooseNotAnswed]
    
        }
        this.props.getFeedbackStudent(postValue);
        } else {
        this.setState({optionB:'btn-pink', chooseOptionB:''})
        let postValue: any = {
            feedback_id: getInstantId, 
            optin:[chooseOptionA, '', chooseOptionC, chooseOptionD, chooseNotAnswed]
    
        }
        this.props.getFeedbackStudent(postValue);
        }
    }
    chooseCOption = (e:any)=>{
        const { chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed } = this.state;
        let getInstantId: any = this.props.match.params.id;
    if(chooseOptionC === ''){
        this.setState({optionC:'btn-default', chooseOptionC:'C'})
        let postValue: any = {
            feedback_id: getInstantId, 
            optin:[chooseOptionA, chooseOptionB, chooseOptionC, 'C', chooseNotAnswed]
    
        }
        this.props.getFeedbackStudent(postValue);
        } else {
        this.setState({optionC:'btn-pink', chooseOptionC:''})
        let postValue: any = {
            feedback_id: getInstantId, 
            optin:[chooseOptionA, chooseOptionB, '', chooseOptionD, chooseNotAnswed]
    
        }
        this.props.getFeedbackStudent(postValue);
        }
    }
    chooseDOption = (e:any)=>{
        const { chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed } = this.state;
        let getInstantId: any = this.props.match.params.id;
        if(chooseOptionD === ''){
            this.setState({optionD:'btn-default', chooseOptionD:'D'})
            let postValue: any = {
                feedback_id: getInstantId, 
                optin:[chooseOptionA, chooseOptionB, chooseOptionC, 'D', chooseNotAnswed]
        
            }
            this.props.getFeedbackStudent(postValue);
            } else {
            this.setState({optionD:'btn-pink', chooseOptionD:''})
            let postValue: any = {
                feedback_id: getInstantId, 
                optin:[chooseOptionA, chooseOptionB, chooseOptionC, '', chooseNotAnswed]
        
            }
            this.props.getFeedbackStudent(postValue);
            }
    } 
    chooseNotAnswed = (e:any)=>{
        const { chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, chooseNotAnswed } = this.state;
        let getInstantId: any = this.props.match.params.id;
        if(chooseNotAnswed === ''){
            this.setState({optionNotAnswed:'btn-default', chooseNotAnswed:'Not Answered'})
            let postValue: any = {
                feedback_id: getInstantId, 
                optin:[chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, 'Not Answered']
        
            }
            this.props.getFeedbackStudent(postValue);
            } else {
            this.setState({optionNotAnswed:'btn-pink', chooseNotAnswed:''})
            let postValue: any = {
                feedback_id: getInstantId, 
                optin:[chooseOptionA, chooseOptionB, chooseOptionC, chooseOptionD, '']
        
            }
            this.props.getFeedbackStudent(postValue);
            }
    }
    clearAll = (e:any)=>{
        let getInstantId: any = this.props.match.params.id;
            this.setState({optionA:'btn-pink', 
            optionB:'btn-pink', 
            optionC:'btn-pink', 
            optionD:'btn-pink', 
            optionNotAnswed:'btn-pink',chooseOptionA:'', chooseOptionB:'', chooseOptionC:'', chooseOptionD:'', chooseNotAnswed:''})
            let postValue: any = {
                feedback_id: getInstantId
            }
            this.props.getFeedbackStudent(postValue);
    }
    getTopicDetails(getValue?:any, getAllValue?:any){
        const { getStudentDetails } = this.props;
        console.log(getAllValue, getValue, 'getStudentDetails...')
        history.push({
            pathname: `/topics/${getValue}`
        });
        let postData:any = {
            feedback:getValue,
            subject_id:getAllValue.subject_id,
            school_id:getStudentDetails.school_id,
            class_id:getAllValue.class_id
        }
        this.props.getAttendanceStudentView(postData);
    }
    render() {
        const { feedbackBarChart, feedbackStudent, feedbackPieChart, fedbackSubject, loading } = this.props;
        const { optionA, optionB, optionC, optionD, optionNotAnswed } = this.state;
        const loadingTextCSS = { display: loading ? "block" : "none" };

        return (
            <div>
                <div>
                    <div className="page-wrapper">
                        <div className="page-content-wrapper">
                            <div className="page-content pt-3">
                                <BreadCrumb
                                    titleName={['View Instant Feedback']}
                                    homeName={['Home']}
                                    url={['dashboard']}
                                    mainPageTitle={['View Instant Feedback']}
                                    baseName={['InstantFeedback']}
                                    baseURL={['instant_feedback']} />
                                    <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box pl-3 pr-3 pb-3">
                                    {fedbackSubject ?
                                    <>
                                    <h3 className="color-pink">{fedbackSubject.name}</h3>
                                    <h5>Conducted <span className="color-pink">{fedbackSubject.conducted_name}</span> in <strong className="color-pink">{fedbackSubject.class_name}</strong></h5>
                                    </>
                                    :null}
                                    </div>
                                </div>
                            </div>

<div className="row">
                                    {fedbackSubject ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="card-box">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-12 col-sm-12
                                        col-12 p-1 pl-4">
                                                        <div className="overview-panel purple
                                            text-center mt-4 ml-3 p-2">
                                                            <div className="value white">
                                                                <p className="mb-1 mt-2"> Subject</p>
                                                                <h4 className="mt-1 color-pink">
                                                                    {fedbackSubject.subject_name}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-12 col-sm-12
                                        col-12 p-1">
                                                        <div className="overview-panel purple
                                            text-center mt-4 ml-3 p-2">
                                                            <div className="value white">
                                                                <p className="mb-1 mt-2"> Correct</p>
                                                                <h4 className="mt-1 color-pink">{fedbackSubject.correct_percent}%</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-12 col-sm-12
                                        col-12 p-1">
                                                        <div className="overview-panel purple
                                            text-center mt-4 ml-3 p-2">
                                                            <div className="value white">
                                                                <p className="mb-1 mt-2">Participants</p>
                                                                <h4 className="mt-1 color-pink">{fedbackSubject.participants}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-12 col-sm-12
                                        col-12 p-1 pr-5">
                                                        <div className="overview-panel purple
                                            text-center mt-4 ml-3 p-2">
                                                            <div className="value white">
                                                                <p className="mb-1 mt-2">Topics</p>
                                                                <h4 className="mt-1 color-pink"><button
                                                                    className="btn btn-circle
                                                        btn-pink"  onClick={(e: any) => this.getTopicDetails(fedbackSubject.topics, fedbackSubject)}>{fedbackSubject.topics}</button></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>
                                                    <button className={`btn btn-circle mr-2 ${optionA}`}
                                                     onClick={() => this.chooseAOption('A')}>A</button>
                                                    <button className={`btn btn-circle mr-2 ${optionB}`}
                                                     onClick={() => this.chooseBOption('B')}>B</button>
                                                    <button className={`btn btn-circle mr-2 ${optionC}`}
                                                     onClick={() => this.chooseCOption('C')}>C</button>
                                                    <button className={`btn btn-circle mr-2 ${optionD}`}
                                                     onClick={() => this.chooseDOption('D')}>D</button>
                                                    <button className={`btn btn-circle mr-2 ${optionNotAnswed}`}  
                                                    onClick={() => this.chooseNotAnswed('Not Answered')}>Not Answered</button>
                                                    {optionA === 'btn-default' || 
                                                    optionB === 'btn-default' || 
                                                    optionC === 'btn-default' || 
                                                    optionD === 'btn-default' || 
                                                    optionNotAnswed === 'btn-default'?
                                                    <button className={`btn btn-circle mr-2 btn-danger`}  
                                                    onClick={this.clearAll}>Clear All</button>
                                                    :null}
                                                    
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
                                                                <div className="col-md-9"><strong>Student
                                                                    Name
                                                                </strong></div>
                                                                <div className="col-md-3"><strong>Response</strong></div>
                                                            </div>
                                                        </li>
                                                        {feedbackStudent ?
                                                            feedbackStudent.map((items: any) => (

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
                                                                                                className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={() => this.postStudentDetails(items)}>
                                                                                                <span>{items.student_name.charAt(0)}</span>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                        }
                                                                     
                                                                        <div className="col-md-8
                                                            col-sm-8">
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
                                                                            <p>{items.option}</p>
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
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="card-box">
                                            <div className="row">
                                                {feedbackBarChart ?
                                                    <div className="col-md-12 p-5">
                                                        <Bar
                                                            data={{
                                                                labels: feedbackBarChart.option,
                                                                datasets: [
                                                                    {
                                                                        backgroundColor: feedbackBarChart.color_code,
                                                                        borderColor: feedbackBarChart.color_code,
                                                                        borderWidth: 2,
                                                                        data: feedbackBarChart.count
                                                                    }
                                                                ]
                                                            }}
                                                            height={119}
                                                            options={option}
                                                        />
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                        {feedbackPieChart ?
                                            <div className="card-box">
                                                <div>
                                               {feedbackPieChart.count? (
                                                    <div className="row mb-3 mt-3">
                                                    <div className="col-md-4 text-center">
                                                    <label className="labelChart" htmlFor=""><i className="correctBG icount" >{feedbackPieChart.count[0]}</i><span className="ml-2 mr-2">Correct </span></label>
                                                    </div>
                                                    <div className="col-md-4 text-center">
                                                    <label className="labelChart" htmlFor=""><i className="incorrectBG icount">{feedbackPieChart.count[1]}</i><span className="ml-2 mr-2">Incorrect </span></label>
                                                    </div>
                                                    <div className="col-md-4 text-center">
                                                    <label className="labelChart" htmlFor=""><i className="notansBG icount">{feedbackPieChart.count[2]}</i><span className="ml-2 mr-2">Not Attempted </span> </label>
                                                    </div>
                                            </div>
                                               ) : (
                                                <div className="row mb-3 mt-3">
                                                <div className="col-md-4 text-center">
                                                <label className="labelChart" htmlFor=""><i className="correctBG icount" >0</i><span className="ml-2 mr-2">Correct </span></label>
                                                </div>
                                                <div className="col-md-4 text-center">
                                                <label className="labelChart" htmlFor=""><i className="incorrectBG icount">0</i><span className="ml-2 mr-2">Incorrect </span></label>
                                                </div>
                                                <div className="col-md-4 text-center">
                                                <label className="labelChart" htmlFor=""><i className="notansBG icount">0</i><span className="ml-2 mr-2">Not Attempted </span> </label>
                                                </div>
                                        </div>
                                               )}
                                                
                                                    <div className="col-md-12 mb-3 p-4">
                                                        <Doughnut
                                                            data={{
                                                                labels: feedbackPieChart.name,
                                                                datasets: [{
                                                                    data: feedbackPieChart.count,
                                                                    backgroundColor: feedbackPieChart.color_code
                                                                }]
                                                            }}
                                                            height={100}
                                                            options={{
                                                                legend: { display: false, position: "right" },
                                                                datalabels: {
                                                                  display: true,
                                                                  color: "white",
                                                                },
                                                                tooltips: {
                                                                  backgroundColor: "#5a6e7f",
                                                                },
                                                              }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
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
export const option = {
    legend: {
        display: false
      },
    title: {
        display: true,
        text: 'Response'
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem:any, data:any) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          return 'Count ' + currentValue + '';
        },
        title: function(tooltipItem:any, data:any) {
          return 'Option '+data.labels[tooltipItem[0].index]+'';
        }
      }
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
        getStudentDetails:state.profile.AttendanceStudentView,
        feedbackBarChart: state.questionset.feedbackBarChart,
        feedbackStudent: state.questionset.feedbackStudent,
        feedbackPieChart: state.questionset.FeedbackPieChart,
        fedbackSubject: state.questionset.feedbackSubject
    }
}

export default connect(mapStateToProps, { getFeedbackBarChart, getFeedbackStudent, getFeedbackPieChart, getFedbackSubject, getAttendanceStudentView })(ViewInstantFeedback)
