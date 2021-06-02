import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router';
import { getSingleQuizStudent, getSingleQuizQuestionList } from '../../store/question/Actions';
import { Doughnut } from 'react-chartjs-2';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface propsStudentQuestionView extends RouteComponentProps<OwnPropsParams> {
    getSingleQuizStudent:(postValue:any) => any; 
    getSingleQuizQuestionList:(postValue:any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    getStudentInfoDetails?:any;
    singleQuizzStudent?:any;
    singleQuizQuestionList?:any;
    loading?:any
}
export class StudentQuestionView extends Component<propsStudentQuestionView> {
    componentDidMount(): void {
        window.scrollTo(0, 0);       
        localStorage.setItem('QuizzList', this.props.getStudentInfoDetails)
        this.getStudentProfileDetails();
        this.getStudentListDetails();
    }
    getStudentProfileDetails(){
        console.log(localStorage.getItem('QuizzList'), 'QuizzList....')
        let getStudentList:any = this.props.getStudentInfoDetails;
        if(getStudentList.length === 0){
            history.push('/quizzes')
        }else if(getStudentList){
            let postList:any = {
                quiz_id: getStudentList.quiz_id,
                card_id: getStudentList.studet_Details.card_id,
                student_id:getStudentList.studet_Details.id
            }
            this.props.getSingleQuizStudent(postList)
        }
        
    }
    getStudentListDetails(){
        console.log(typeof(localStorage.getItem('QuizzList')), 'QuizzList....')
        let getStudentList:any = this.props.getStudentInfoDetails;
        if(getStudentList.length === 0){
            history.push('/quizzes')
        }else if(getStudentList){
            let postList:any = {
                quiz_id:getStudentList.quiz_id,
                card_id: getStudentList.studet_Details.card_id
            }
            this.props.getSingleQuizQuestionList(postList)
        }
         
    }
    //i use next pr this code
    getTopicDetails(getValue?:any, getAllValue?:any){
            }
            viewStudentDetails(getValue:any) {
                if(getValue){
                    history.push({
                        pathname: `/student_view`,
                        state: {
                            class_id: getValue.class_id,
                            card_id: getValue.card_id,
                            school_id:getValue.school_id
                          }
                      });
                      this.props.getAttendanceStudentView(getValue)
                }
            }
            addDefaultSrc= (ev:any) =>{
                ev.target.src = '../assets/img/user/teacher-profile.jpg'
              }
    render() {
        const { singleQuizzStudent, singleQuizQuestionList, loading, getStudentInfoDetails } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let quizzesUrl:any;
        if(getStudentInfoDetails){
            quizzesUrl = `quizzes_report/${getStudentInfoDetails.quiz_id}`
        }
        console.log(singleQuizzStudent, 'singleQuizzStudent...')
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Question List']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['Question List']}
                                baseName={['quizzes']}
                                baseURL={[quizzesUrl]} />
                 {/* This part student profile details */}
                 <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box pl-3 pr-3 pt-1">
                                    {singleQuizzStudent ?
                                    <>
                                    <h4 className="pt-1"><span className="color-pink">{singleQuizzStudent.question_name}</span></h4>
                                    </>
                                    :null}
                                    </div>
                                </div>
                            </div>
                 <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body no-padding height-9">
                                            {singleQuizzStudent ?
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <div className="row mt-2">
                                                            <div className="ml-3 d-flex">
                                                            { singleQuizzStudent.profile?
                                                         <div>
                                                         <div className="profileImage">
                                                        <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${singleQuizzStudent.profile}`} 
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
                                                            ml-3 mt-3 btn-info" onClick ={()=>this.viewStudentDetails(singleQuizzStudent)}>{
                                                                singleQuizzStudent.student_name ?
                                                                                <span>{singleQuizzStudent.student_name.charAt(0)}</span>
                                                                                : null}
                                                                    </button>
                                                                </div>
                                                        }
                                                                
                                                                <div>
                                                                    <div
                                                                        className="text-center" onClick ={()=>this.viewStudentDetails(singleQuizzStudent)}>
                                                                        <h3 className="my-0">{singleQuizzStudent.student_name}</h3>
                                                                        <span>( {singleQuizzStudent.subject_name} )</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 text-center">
                                                        <h4 className="mb-3">{singleQuizzStudent.attempted}</h4>
                                                        <h5>Attempted</h5>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 text-center">
                                                        <h4 className="mb-3">{singleQuizzStudent.correct}</h4>
                                                        <h5>Correct</h5>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 text-center">
                                                        <h4 className="mb-3">{singleQuizzStudent.percentile}</h4>
                                                        <h5>Percentile</h5>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 text-center">
                                                        <h4>Difficult Topics</h4>
                                                        {singleQuizzStudent.difficult_topic ?
                                                                <>
                                                                    {singleQuizzStudent.difficult_topic.slice(0, 3).map((difficultTopics: any) => (
                                                                        <span className="tagcolor">{difficultTopics}  </span>
                                                                    ))}
                                                                </>
                                                                : null}
                                                    </div>
                                                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 text-center">
                                                        <h4>Easiest Topics</h4>
                                                        {singleQuizzStudent.easy_topic ?
                                                                <>
                                                                    {singleQuizzStudent.easy_topic.slice(0, 3).map((easyTopics: any) => (
                                                                        <span className="tagcolor">{easyTopics},  </span>
                                                                    ))}
                                                                </>
                                                                : null}
                                                    </div>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                    <div className="col-md-12">
                        {singleQuizQuestionList ?
                            singleQuizQuestionList.map((items: any, index: any) => (
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="pl-3 pt-3">{index + 1}. {items.question}</p>
                                            <div className="col-md-2 mt-2 pr-2">
                                                <button className="btn btn-xs btn-circle btn-pink" onClick={(e: any) => this.getTopicDetails(items.answer, items)}>{items.answer}</button>
                                            </div>
                                            <hr className="mt-2 m-0 mb-2"/>
                                            

                                        </div>
                                    </div>

                                    <div className="row pl-3 pr-3">
                                        <div className="col-md-6">
                                            {items ?
                                                items.options.map((optionList: any) => (
                                                    <div className="row">
                                                        <div className="col-md-10 mb-3">
                                                            <p style={{color:optionList.color_code}}><strong>{optionList.option}. </strong> <span>{optionList.value}</span></p>
                                                        </div>
                                                    </div>
                                                ))
                                                : null}
                                                <>
                                                {items.not_attempted?
                                                items.not_attempted.map((notAttemptedList: any) => (
                                                    notAttemptedList.value === 'Not Attempted'?
                                                    <div className="row">
                                                        <div className="col-md-10 mb-3">
                                                        <p style={{color:notAttemptedList.color_code}}>Not Attempted</p>
                                                        </div>
                                                    </div>
                                                    :null
                                                ))
                                                :null}
                                               
                                                </>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="d-flex mb-3">
                                                <div className="col-md-5 peiAlign">
                                                {items.chart_data.count ? (
                                                       <>
                                                           <div className="col-md-12">
                                                           <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Correct </span><i className="correctBG icount" >{items.chart_data.count[0]}</i></label>
                                                           </div>
                                                           <div className="col-md-12">
                                                           <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Incorrect </span><i className="incorrectBG icount">{items.chart_data.count[1]}</i></label>
                                                           </div>
                                                           <div className="col-md-12">
                                                           <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Not Attempted </span><i className="notansBG icount">{items.chart_data.count[2]}</i> </label>
                                                           </div>
                                                   </>
                                               ) : (
                                                <>
                                                <div className="col-md-12">
                                                <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Correct </span><i className="correctBG icount" >0</i></label>
                                                </div>
                                                <div className="col-md-12">
                                                <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Incorrect </span><i className="incorrectBG icount">0</i></label>
                                                </div>
                                                <div className="col-md-12">
                                                <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Not Attempted </span><i className="notansBG icount">0</i> </label>
                                                </div>
                                                </>
                                               )}
                                                </div>
                                                <div className="col-md-7">
                                                {items.chart_data ?
                                                <Doughnut
                                                    data={{
                                                        labels: items.chart_data.name,
                                                        datasets: [{
                                                            data: items.chart_data.count,
                                                            backgroundColor: items.chart_data.color_code
                                                        }]
                                                    }}
                                                    
                                                    options={option}
                                                />
                                                : null}
                                                    </div>
                                            </div>
                                        
                                            

                                        </div>
                                    </div>
                                </div>
                            ))
                            : null}

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
const mapStateToProps = (state:any) => {
    return{
        loading:state.questionset.loading,
        getStudentInfoDetails:state.profile.AttendanceStudentView,
        singleQuizzStudent:state.questionset.singleQuizStudent,
        singleQuizQuestionList:state.questionset.singleQuizQuestionList
    }
}

export default connect(mapStateToProps, {getSingleQuizStudent, getSingleQuizQuestionList, getAttendanceStudentView})(StudentQuestionView)
