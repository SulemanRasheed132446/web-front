import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { getTopicAnalysisReport } from '../../store/question/Actions';
import { getTeacherNameList } from '../../store/teacher/Actions';
import { GetStudentNameList } from '../../store/student/Actions';
import history from '../../History';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

interface PostsSchoolBarProps {
    getTops?:any;
    FeedbackDetails?:any;
    fetchGetAllClassList: (postPage: any) => any;
    getTopicAnalysisReport:(postValue:any) => any;
    GetStudentNameList:(postValue:any) => any;
    getTeacherNameList:() => any;
    getStudentDetails:any;
	getAllClassList?:any;
	loading?: boolean;
    loginProfile?: any;
    getTopicsData?:any;
    teacherNameList?:any;
}
interface stateTypes {
class_id:any,
teacher_name:any,
student_name:any
}
export class FeedBackView extends Component<PostsSchoolBarProps, stateTypes> {
    constructor(props: any) {
        super(props);
        this.state = {
            class_id: this.props.FeedbackDetails.class_id,
            teacher_name:'',
            student_name:''
        }
    }
    componentDidMount(): void {
        const { loginProfile } = this.props;
        window.scrollTo(0, 0);
        if(loginProfile){
            if(loginProfile.usertype === 1){
                this.getAdacemicStudent()
            }else if(loginProfile.usertype === 2){
                this.props.getTeacherNameList();
                this.getcommonStudent()
            }else if(loginProfile.usertype === 3){
                this.getAdacemicStudent()
            }
        }
        
        this.getFeedBackDetails()
    }
    getcommonStudent(){
        let loadMoreType:any;
		loadMoreType = {
			academic_year: '2021'
		  }
        this.props.fetchGetAllClassList(loadMoreType).then((res:any)=>{
         
        });
        if(this.state.class_id){
            let postValue:any = {
                academic_year: '2021',
                class_id:this.state.class_id
            }
            this.props.GetStudentNameList(postValue)
        }
    }
    getAdacemicStudent(){
        const { FeedbackDetails } = this.props;
        let loadMoreType:any;
		loadMoreType = {
			academic_year: '2021',
            school_id:FeedbackDetails.school_id
		  }
        this.props.fetchGetAllClassList(loadMoreType).then((res:any)=>{
         
        });
        if(this.state.class_id){
            let postValue:any = {
                academic_year: '2021',
                class_id:this.state.class_id,
                school_id:FeedbackDetails.school_id
            }
            this.props.GetStudentNameList(postValue)
        }
    }
    getFeedBackDetails(){
        const { getTops, FeedbackDetails } = this.props;
        const{ class_id } = this.state;
        let postValue:any = {
            academic_year: 2021,
            subject_id:FeedbackDetails.subject_id,
            topic: getTops,
            school_id:FeedbackDetails.school_id,
            class_id:class_id
        }
        this.props.getTopicAnalysisReport(postValue)
    }
    getfilterClasses = (e:any) =>{
        const{ teacher_name, student_name } = this.state;
        const { getTops, FeedbackDetails } = this.props;
    const { value } = e.target;
    let postValue:any = {
        academic_year: 2021,
        subject_id:FeedbackDetails.subject_id,
        topic: getTops,
        school_id:FeedbackDetails.school_id,
        class_id:value,
        teacher_id:teacher_name,
        card_id:student_name
    }
    this.props.getTopicAnalysisReport(postValue)
        this.setState({class_id: value})
    // }
    }
    getfilterTeacher = (e:any) =>{
        const{ class_id, student_name } = this.state;
        const { getTops, FeedbackDetails } = this.props;
    const { value } = e.target;
    let postValue:any = {
        academic_year: 2021,
        subject_id:FeedbackDetails.subject_id,
        topic: getTops,
        school_id:FeedbackDetails.school_id,
        class_id:class_id,
        teacher_id:value,
        card_id:student_name
    }
    this.props.getTopicAnalysisReport(postValue)
    this.setState({teacher_name: value})
    }
    getfilterStudent = (e:any) =>{
        const{ class_id, teacher_name } = this.state;
        const { getTops, FeedbackDetails } = this.props;
    const { value } = e.target;
    let postValue:any = {
        academic_year: 2021,
        subject_id:FeedbackDetails.subject_id,
        topic: getTops,
        school_id:FeedbackDetails.school_id,
        class_id:class_id,
        teacher_id:teacher_name,
        card_id:value
    }
    this.props.getTopicAnalysisReport(postValue)
    this.setState({student_name: value})
    }
    getInstantFeedBackResult = (getValue:any) =>{
        history.push({
			pathname: `/view_instant_feedback/${getValue.id}`,
		  });
    }
    render() {
        const { getAllClassList, getTopicsData, teacherNameList, getStudentDetails, loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let getCorrectClassName:any = [];
        let getCorrectCorrectAns:any = [];
        let correctAns:any;
        let getIncorrectClassName:any = [];
        let getIncorrectAns:any = [];
        let getMissingClassName:any = [];
        let getMissingAns:any = [];
        let getIncorrectValue:any;
        let getMissingValue:any;
        let barChartView:any;
        console.log(getTopicsData, 'getTopicsData....')
        if(getTopicsData.correct_ans){
            getCorrectClassName = [];
            getCorrectCorrectAns = [];
            getTopicsData.correct_ans.forEach((items:any)=>{
                getCorrectClassName.push(items.class_name)
                getCorrectCorrectAns.push(items.performance)
            })
            correctAns = {
                label:getCorrectClassName,
                backgroundColor: "#318f94",
                borderColor: "#318f94",
                borderWidth: 1,
                data:getCorrectCorrectAns
            }
        }
        if(getTopicsData.missing){
            getIncorrectClassName = [];
            getIncorrectAns = [];
            getTopicsData.missing.forEach((items:any)=>{
                getIncorrectClassName.push(items.class_name)
                getIncorrectAns.push(items.performance)
            })
            getIncorrectValue = {
                label:getIncorrectClassName,
                backgroundColor: "#d0011b",
                borderColor: "#d0011b",
                borderWidth: 1,
                data:getIncorrectAns
            }
        }
        if(getTopicsData.wrong_ans){
            getMissingClassName = [];
            getMissingAns = [];
            getTopicsData.wrong_ans.forEach((items:any)=>{
              
                getMissingClassName.push(items.class_name)
                getMissingAns.push(items.performance)
            })
            getMissingValue = {
                label:getMissingClassName,
                backgroundColor: "#d0011b",
                borderColor: "#d0011b",
                borderWidth: 1,
                data:getMissingAns
            }
        }
        if(correctAns || getIncorrectValue || getMissingValue){
            barChartView= [correctAns, getIncorrectValue, getMissingValue];
        }
        return (
            <div>
                <div className="row">
                <div className="col-md-10">
                <div className="card card-box">
                    <div className="row mt-3 ml-2 mr-2">
                    {getAllClassList ?
                        <>
                        <div className="col-md-4">
                        <div className="form-group">
                        
                        <label>Class</label>
                        <select name="className" id="" className="form-control" value={this.state.class_id} onChange={this.getfilterClasses}>
                            {getAllClassList.map((items:any)=>(
                                <option value={items.id}> {items.grade_standard} </option>
                            ))}
                        </select>
                        </div>
                        </div>
                        </>
                        :null}
                        {teacherNameList.length > 0?
                        <div className="col-md-4">
                        <div className="form-group">
                        <label>Teacher Name</label>
                        <select name="teacherName" id="" className="form-control" onChange={this.getfilterTeacher}>
                        {teacherNameList.map((items:any)=>(
                            <option value={items.ldap_id}> {items.firstname} {items.lastname} </option>
                        ))}
                        </select>
                        </div>
                        </div>
                        :null}
                        {getStudentDetails?
                        <>
                        <div className="col-md-4">
                        <div className="form-group">
                        <label>Student Name</label>
                        <select name="StudentName" id="" className="form-control" onChange={this.getfilterStudent}>
                        {getStudentDetails.map((items:any)=>(
                            <option value={items.id}> {items.student_name} </option>
                        ))}
                        </select>
                        </div>
                        </div>
                        </>
                        :null}
                    </div>
							<div className="card-body no-padding height-9">
								<div className="row">
									<Bar
										data={{
                                            labels: [
                                              "Correct",
                                              "Incorrect",
                                              "Missing"
                                            ],
                                            datasets: barChartView
                                          }}
                                        height={85}
										options={option}
									/>
								</div>
							</div>
						</div>
                </div>
                <div className="col-md-2">
                <div className="card card-box">
                    <div className="cardBoxSize mt-5 mb-3">
                        <p>Overall Performance</p>
                        <h3>{getTopicsData.over_all_performance}</h3>               
                    </div>
                    <div className="cardBoxSize mt-5 mb-5">
                    <p>No. of times Asked</p>
                    <h3>{getTopicsData.no_of_times_asked}</h3> 
                    </div>
                </div>
                </div>
                </div>
                
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
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
    }
}
export const option = {
    legend:{
		display:false
 },
	title: {
		display: true,
		text: ''
	},
	scales : {
		yAxes: [{
			ticks: {
			  beginAtZero: true,
			  steps: 10,
			  stepValue: 5,
			  userCallback: function(label:any, index:any, labels:any) {
                console.log(label, index, labels, 'label...')
				  if (Math.floor(label) === label) {
                     
					  return label;
				  }
			  }
			}
		  }],
		xAxes : [ {
			barPercentage: 0.5,
			gridLines : {
				display : false
			}
		} ]
	},
    tooltips: {
      callbacks: {
        label: function(tooltipItem:any, data:any) {
            console.log(tooltipItem, data, 'data...')
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          return currentValue;
        },
        title: function(tooltipItem:any, data:any) {
          return data.labels[tooltipItem[0].index];
        }
      }
    }
  }
const mapStateToProps = (state:any) => {
    return {
        loading: state.questionset.loading,
        FeedbackDetails:state.profile.AttendanceStudentView,
        teacherNameList:state.teacher.GetTeacherName,
        getStudentDetails:state.student.getStudentNameList,
        getAllClassList:state.diary.gradelist,
        loginProfile:state.profile.profileData,
        getTopicsData: state.questionset.topicAnalysisReport
    }
}


export default connect(mapStateToProps, {fetchGetAllClassList, getTopicAnalysisReport, getTeacherNameList, GetStudentNameList})(FeedBackView)
