import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import WeakGoodColor from '../../components/dashboard/WeakGoodColor';
import { Doughnut } from 'react-chartjs-2';
import { fetchStudentProfile, fetchStudentProfileTopic, fetchStudentProfileSubject, fetchStudentProfileLine } from '../../store/student/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { VictoryLine, createContainer, VictoryChart } from "victory";
import moment from 'moment'
import { getstudentRecentQuiz } from '../../store/question/Actions';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface propsStudentType extends RouteComponentProps<OwnPropsParams> {
    getStudentInfoDetails?:any;
    fetchStudentProfile: (postValue: any) => any;
    fetchStudentProfileTopic: (postValue: any) => any;
    fetchStudentProfileSubject: (postValue: any) => any;
    fetchStudentProfileLine: (postValue: any) => any;
    getstudentRecentQuiz: (postValue: any) => any;
    getAttendanceStudentView: (postValue:any) => any;
    loading?: any
    studentProfileInfo: any;
    studentProfileTopic: any;
    studentProfileSubject: any;
    studentProfileLine: any;
    studentRecentQuizList?: any;
}
const VictoryZoomVoronoiContainer: any = createContainer("zoom", "voronoi")
export class ViewStudentFull extends Component<propsStudentType, any> {
    getStateValue: any;
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.getStudentFullDetails();
    }
    addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
      }
    getStudentFullDetails() {
        // let getStudentId: any = this.props.match.params.id;
        let getStudentId: any = this.props.getStudentInfoDetails;
        if(getStudentId.school_id){
            let postValue: any = {
                academic_year: 2021,
                class_id: getStudentId.class_id,
                card_id: getStudentId.card_id,
                school_id:getStudentId.school_id
            }
            this.props.fetchStudentProfile(postValue);
            this.props.fetchStudentProfileTopic(postValue);
            this.props.fetchStudentProfileSubject(postValue);
            this.props.fetchStudentProfileLine(postValue);
            this.props.getstudentRecentQuiz(postValue);
        } else {
            let postValue: any = {
                academic_year: 2021,
                class_id: getStudentId.class_id,
                card_id: getStudentId.card_id
            }
            this.props.fetchStudentProfile(postValue);
            this.props.fetchStudentProfileTopic(postValue);
            this.props.fetchStudentProfileSubject(postValue);
            this.props.fetchStudentProfileLine(postValue);
            this.props.getstudentRecentQuiz(postValue);
        }

    }
    getTopicDetails(getValue?:any, getAllValue?:any){
        history.push({
            pathname: `/topics/${getValue}`
          });
        let postData:any = {
            feedback:getValue,
            subject_id:getAllValue.subject_id
        }
        this.props.getAttendanceStudentView(postData);
            }
        getQuizzesReport = (getValue:any) =>{    
            console.log(getValue, 'getValue....')    
            // history.push({
            //     pathname: `/view_instant_feedback/${getValue.quiz_id}`,
            //     });
        }
    render() {
        let attendanceDataset: any = []
        let perfomanceDataset: any = []
        let subjectDataset: any = []
        const { studentProfileInfo, studentProfileTopic, studentProfileSubject, loading, studentRecentQuizList } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        if(this.props.studentProfileLine){
            if (this.props.studentProfileLine.attendance) {
                this.props.studentProfileLine.attendance.forEach((attendanceData: any, attendanceIndex: any) => {
                    let attendanceDate: any = moment(attendanceData.date, "DD-MM-YYYY")
                    let attendanceObj: any = {
                        x: new Date(attendanceDate.format('YYYY'), attendanceDate.format('M'), attendanceDate.format('D')),
                        y: attendanceData.value,
                        labal: `Attendance - ${attendanceData.value}`
                    }
                    attendanceDataset.push(attendanceObj)
                })
            }
    
            if (this.props.studentProfileLine.performance) {
                this.props.studentProfileLine.performance.forEach((performanceData: any, performanceIndex: any) => {
                    let performanceDate: any = moment(performanceData.date, "DD-MM-YYYY")
                    let performanceObj: any = {}
                    performanceObj['x'] = new Date(performanceDate.format('YYYY'), performanceDate.format('M'), performanceDate.format('D'))
                    performanceObj['y'] = performanceData.value
                    performanceObj['labal'] = `Performance - ${performanceData.value}`
                    perfomanceDataset.push(performanceObj)
                })
            }
            if (this.props.studentProfileLine.subjects) {
                this.props.studentProfileLine.subjects[0].values.forEach((subjectData: any, subjectDataIndex: any) => {
                    let performanceDate: any = moment(subjectData.date, "DD-MM-YYYY")
                    let subjecteObj: any = {}
                    subjecteObj['x'] = new Date(performanceDate.format('YYYY'), performanceDate.format('M'), performanceDate.format('D'))
                    subjecteObj['y'] = subjectData.value
                    subjecteObj['labal'] = `${this.props.studentProfileLine.subjects[0].subject_name} - ${subjectData.value}`
                    subjectDataset.push(subjecteObj)
                })
            }
        }else{
            history.push('/');
        }
        
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                        <BreadCrumb 
                            titleName={['View Student']} 
                            homeName={['Home']} 
                            url={['dashboard']}
                            mainPageTitle={['View Student']} />
                            {/* This part student profile details */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-topline-red">
                                        <div className="card-body no-padding height-9">
                                            {studentProfileInfo ?
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        
                                                        <div className="row mt-2">
                                                            <div className="ml-3 d-flex">
                                                            { studentProfileInfo.profile_picture?
                                                         <div>
                                                         <div className="profileImage">
                                                        <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${studentProfileInfo.profile_picture}`} 
                                                        alt="Student Profile" width="40"
                                                        height="40"/>
                                                                    </div>
                                                     </div>
                                                        :
                                                        <div>
                                                        <button
                                                            className="mdl-button
                                                mdl-js-button
                                                mdl-button--fab
                                                mdl-button--mini-fab
                                                ml-3 mt-3 btn-info">{
                                                                studentProfileInfo.student_name ?
                                                                    <span>{studentProfileInfo.student_name.charAt(0)}</span>
                                                                    : null}
                                                        </button>
                                                    </div>
                                                        }
                                                               
                                                                <div>
                                                                    <div
                                                                        className="text-center">
                                                                        <h3 className="my-0">{studentProfileInfo.student_name}</h3>
                                                                        <span>( Student )</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 text-center">
                                                        <h3>{studentProfileInfo.class_name}</h3>
                                                        <h4>Class</h4>
                                                    </div>
                                                    <div className="col-md-2 text-center">
                                                        <h3>{studentProfileInfo.card_id}</h3>
                                                        <h4>Card-ID</h4>
                                                    </div>
                                                    <div className="col-md-2 text-center">
                                                        <h3>{studentProfileInfo.performance}</h3>
                                                        <h4>Percentage</h4>
                                                    </div>
                                                    <div className="col-md-2 text-center">
                                                        <h3>{studentProfileInfo.attendance}</h3>
                                                        <h4>Attendance</h4>
                                                    </div>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-topline-red">
                                        <div className="pl-4 pt-3">
                                        </div>

                                        <div className="p-5">
                                            <VictoryChart
                                                width={1200}
                                                height={300}
                                                scale={{ x: "time" }}
                                                containerComponent={
                                                    <VictoryZoomVoronoiContainer
                                                        labels={({ datum }: any) => `${datum?.labal}`}
                                                    />

                                                }
                                            >
                                                {attendanceDataset && <VictoryLine
                                                interpolation="natural"
                                                    style={{
                                                        data: { stroke: "#459592" }
                                                    }}
                                                    data={attendanceDataset}
                                                />}
                                                {perfomanceDataset && <VictoryLine
                                                interpolation="natural"
                                                    style={{
                                                        data: { stroke: "#f88266" }
                                                    }}
                                                    data={perfomanceDataset}
                                                />}
                                                {subjectDataset && <VictoryLine
                                                interpolation="natural"
                                                    style={{
                                                        data: { stroke: "#dbf876" }
                                                    }}
                                                    data={subjectDataset}
                                                />}
                                            </VictoryChart>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <WeakGoodColor />
                            {/* This is the part of show topics details list */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-topline-red">
                                        <div className="card-body no-padding height-9">
                                            <div className="row">
                                                <div className="col-md-12 center">
                                                    <h4>Topics</h4>
                                                </div>
                                            </div>
                                            {/* <!-- start chart--> */}

                                            <div className="row">
                                                {studentProfileTopic ?
                                                    studentProfileTopic.map((items: any) => (
                                                        <div className="col-md-4 mb-3">
                                                            <h4>{items.subject_name}</h4>
                                                            <div className="row p-3">
                                                                {items.class_list ?
                                                                    items.class_list.map((classData: any) => (
                                                                        <>
                                                                            {classData.graph_data ?
                                                                                classData.graph_data.map((graphTopic: any) => (
                                                                                    <Link to={'#'} onClick={(e: any) => this.getTopicDetails(graphTopic.topics, items)}>
                                                                                    <div className="col-md-2 col-sm-2 col-xs-2 mt-sm-3 m-1">
                                                                                        <div className="student-status-color-good
                                                                                        mr-2" style={{ background: graphTopic.color_code }} >
                                                                                            <p>{graphTopic.topics}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    </Link>
                                                                                ))
                                                                                : null}
                                                                        </>
                                                                    ))
                                                                    : null}

                                                            </div>
                                                        </div>
                                                    ))
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <!-- start bar chart --> */}
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Subject Performance</h4>
                                    {studentProfileSubject ?
                                        studentProfileSubject.map((items: any) => (
                                            <div className="card card-topline-red">
                                                <div className="card-head">
                                                    <header>{items.subject_name}</header>
                                                    <div className="tools">
                                                    </div>
                                                </div>
                                                <div className="card-body no-padding height-9">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <div className="row mb-3">
                                                                <Doughnut
                                                                    data={{
                                                                        labels: ['Correct', 'Incorrect', 'Not Attempted'],
                                                                        datasets: [{
                                                                            data: items.percentage,
                                                                            backgroundColor: items.color_code
                                                                        }]
                                                                    }}
                                                                    options={option}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 text-center mt-5">
                                                            <div>
                                                                <h4>Correct Answer</h4>
                                                                <h3>{items.correct_answer}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 text-center mt-5">
                                                            <div>
                                                                <h4>Not Attempted</h4>
                                                                <h3>{items.not_attempted}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 text-center mt-5">
                                                            <div>
                                                                <h4>Incorrect Answer</h4>
                                                                <h3>{items.wrong_answer}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div> Good Topics</div>
                                                            <hr className="m-0 mt-2" />
                                                            {items.good_topics ?
                                                                <>
                                                                    {items.good_topics.map((goodTopics: any) => (
                                                                        <button className="btn
                                                btn-outline-danger btn-xs mt-3 ml-2"  onClick={(e: any) => this.getTopicDetails(goodTopics, items)}>{goodTopics}</button>
                                                                    ))}
                                                                </>
                                                                : null}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div>Weak Topics</div>
                                                            <hr className="m-0 mt-2" />
                                                            {items.weak_topics ?
                                                                <>
                                                                    {
                                                                        items.weak_topics.map((weakTopics: any) => (
                                                                            <button className="btn
                                                btn-outline-danger 
                                                btn-xs mt-3" onClick={(e: any) => this.getTopicDetails(weakTopics, items)}>{weakTopics}</button>
                                                                        ))
                                                                    }
                                                                </>
                                                                : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : null}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-topline-red">
                                        <div className="card-head">
                                            <header>Recent Quiz</header>
                                            <div className="tools">

                                            </div>
                                        </div>

                                        <div className="card-body no-padding height-9">
                                            <div className="row">
                                                <div className="table-responsive">
                                                    <table className="table table-striped
                                                custom-table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Performance</th>
                                                                <th>Last Updated Time</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {studentRecentQuizList ?

                                                                studentRecentQuizList.map((items: any) => (
                                                                    <tr>
                                                                        <td>{items.name}</td>
                                                                        <td>{items.performance}</td>
                                                                        <td>{items.date}</td>
                                                                        <td> <Link to={`#`} onClick={()=> this.getQuizzesReport(items)}>
                                                                        <button className="btn btn-primary btn-xs"
                                                                            title="View Question Set"><i className="fa fa-eye" aria-hidden="true"></i></button></Link></td>
                                                                    </tr>
                                                                ))

                                                                : null}

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <Link to={"/quizzes"} className="btn btn-pink">...more</Link>
                                                </div>

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
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state: any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        loading: state.questionset.loading,
        getStudentInfoDetails:state.profile.AttendanceStudentView,
        studentProfileInfo: state.student.studentProfile,
        studentProfileTopic: state.student.studentProfileTopic,
        studentProfileSubject: state.student.studentProfileSubject,
        studentProfileLine: state.student.studentProfileLine,
        studentRecentQuizList: state.questionset.studentRecentQuiz
    }
}

export default connect(mapStateToProps, {
    fetchStudentProfile,
    fetchStudentProfileTopic,
    fetchStudentProfileSubject,
    fetchStudentProfileLine,
    getstudentRecentQuiz,
    getAttendanceStudentView
})(ViewStudentFull)
