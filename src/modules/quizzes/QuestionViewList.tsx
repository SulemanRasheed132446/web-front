import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';
import { fetchQuestionAnswersReport, fetchQuestionReportView } from '../../store/question/Actions';
import Modal from 'react-bootstrap/Modal'
import CommonLoader from '../../components/CommonLoader';
import { Link } from 'react-router-dom';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface propsQuestionAnwser {
    getQuizzesId?: any;
    fetchQuestionAnswersReport: (postValue: any) => any;
    fetchQuestionReportView:(postData:any) => any;
    getAttendanceStudentView:(postData:any) => any;
    getQuestionAnswer?: any;
    getQuestionReport?:any;
}
interface propsTypes {
    show: any
}
export class QuestionViewList extends Component<propsQuestionAnwser, propsTypes> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        }
    }
    componentDidMount(): void {
        const { getQuizzesId } = this.props;
        window.scrollTo(0, 0);
        if (getQuizzesId) {
            let postValue: any = {
                quiz_id: getQuizzesId
            }
            this.props.fetchQuestionAnswersReport(postValue);
        }
       
    }
    public showQuestionView(getValue:any) {       
        this.getSinglePageView(getValue);
    }
    public hideQuestionDelete = (getValue: any) => {
        this.setState({ show: getValue })
    }
    getSinglePageView(getId:any){
        const { getQuizzesId } = this.props;
        if(getQuizzesId){
            let postValue: any = {
                quiz_id: getQuizzesId,
                question_id: getId
            }
            this.props.fetchQuestionReportView(postValue).then((res:any)=>{
                this.setState({ show: true })
            })
        }
    }
             // This is function used to pull student view page
    getStudentDetails = (getValue:any, getAll?:any) => {
        console.log(getValue, getAll, 'getValue...')
        let getStudentId:any = getValue.card_id
        if(getStudentId){
            let getPostValue:any = {
                card_id:getValue.card_id, 
                class_id: getAll.class_id,
                school_id: getAll.school_id
            };
            history.push({
                pathname: `/student_view`,
                state: {
                    class_id: getValue.class_id,
                    card_id: getValue.card_id
                  }
              });
              this.props.getAttendanceStudentView(getPostValue)
        }
    }
    addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
      }
    public getViewQuestionAnswer() {
        const { getQuestionReport } = this.props;
        return (
            <div>
                {getQuestionReport?
                
                <Modal
                    show={this.state.show}
                    onHide={() => this.hideQuestionDelete(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                {getQuestionReport.question_data ?
                                        <div className="card">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="pl-3 pt-3"><strong>{getQuestionReport.question_data.question_id}. {getQuestionReport.question_data.question}</strong></p>
                                                    <div className="col-md-2 mt-3 pr-2">
                                                        <button className="btn btn-xs btn-circle btn-pink cursorPoint">{getQuestionReport.question_data.answer}</button>
                                                    </div>
                                                    <hr className="m-0 mt-2" />
                                                    

                                                </div>
                                            </div>

                                            <div className="row p-3">
                                                <div className="col-md-7">
                                                    {getQuestionReport.question_data.options ?
                                                        getQuestionReport.question_data.options.map((optionList: any) => (
                                                            <div className="row">
                                                                <div className="col-md-10 mb-3">
                                                                    <p><strong  style={{color:optionList.color_code}}>{optionList.option}. </strong> <span>{optionList.value}</span></p>
                                                                </div>
                                                                <div className="col-md-2 mb-3">
                                                                    <div className="btn btn-xs btn-circle countBtn"
                                                                    style={{background:optionList.color_code, color:'#ffffff'}}>{optionList.count}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        : null}
                                                </div>
                                                <div className="col-md-5">
                                                    {getQuestionReport.question_data.chart_data ?
                                                        <Doughnut
                                                            data={{
                                                                labels: getQuestionReport.question_data.chart_data.name,
                                                                datasets: [{
                                                                    data: getQuestionReport.question_data.chart_data.count,
                                                                    backgroundColor: getQuestionReport.question_data.chart_data.color_code
                                                                }]
                                                            }}
                                                            options={{
                                                                responsive: false,
                                                                maintainAspectRatio: false
                                                            }}
                                                        />
                                                        : null}

                                                </div>
                                            </div>
                                        </div>
                                    : null}
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        {getQuestionReport.student_data?
                                        <div className="row">
                                            <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                <li className="title-sticky">
                                                    <div className="row">
                                                        <div className="col-md-12"><strong>A - ({
                                                        getQuestionReport.student_data.A?
                                                        getQuestionReport.student_data.A.length
                                                    :0})
                                                        </strong></div>
                                                    </div>
                                                </li>
                                                {getQuestionReport.student_data?
                                                <>
                                                    {getQuestionReport.student_data.A ?
                                                    getQuestionReport.student_data.A.map((items:any)=>(
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
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                    <button
                                                                        className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={()=> this.getStudentDetails(items, getQuestionReport)}>
                                                                        <span>{items.name.charAt(0)}</span>											</button>
                                                                </div>
                                                                                    </div>
                                                                        }
                                                            <div className="col-md-11
                                                                col-sm-11">
                                                                <div
                                                                    className="details">
                                                                    <div
                                                                        className="title
                                                                        mt-2 ml-3">
                                                                        <Link to="#"  onClick={()=> this.getStudentDetails(items, getQuestionReport)}>{items.name}</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    ))
                                                    :<CommonLoader/> }
                                                    </>
                                                    :null}
                                            </ul>
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                    {getQuestionReport.student_data?
                                        <div className="row">
                                            <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                <li className="title-sticky">
                                                    <div className="row">
                                                        <div className="col-md-12"><strong>B - ({getQuestionReport.student_data.B?
                                                        getQuestionReport.student_data.B.length
                                                        :0})
                                                        </strong></div>
                                                    </div>
                                                </li>
                                                {getQuestionReport.student_data?
                                                <>
                                            {getQuestionReport.student_data.B?
                                                getQuestionReport.student_data.B.map((items:any)=>(
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
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                    <button
                                                                        className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={()=> this.getStudentDetails(items, getQuestionReport)}>
                                                                        <span>{items.name.charAt(0)}</span>											</button>
                                                                </div>
                                                                                    </div>
                                                                        }
                                                        <div className="col-md-11
                                                            col-sm-11">
                                                            <div
                                                                className="details">
                                                                <div
                                                                    className="title
                                                                    mt-2 ml-3">
                                                                    <Link to="#"  onClick={()=> this.getStudentDetails(items, getQuestionReport)} >{items.name}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))
                                                :<CommonLoader/>}
                                                </>
                                                :null}
                                            </ul>
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                    {getQuestionReport.student_data?
                                        <div className="row">
                                            <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                <li className="title-sticky">
                                                    <div className="row">
                                                        <div className="col-md-12"><strong>C - ({
                                                        getQuestionReport.student_data.C?
                                                        getQuestionReport.student_data.C.length
                                                        :0})
                                                        </strong></div>
                                                    </div>
                                                </li>
                                                {getQuestionReport.student_data?
                                                <>
                                                {getQuestionReport.student_data.C?
                                                getQuestionReport.student_data.C.map((items:any)=>(
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
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                    <button
                                                                        className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={()=> this.getStudentDetails(items, getQuestionReport)}>
                                                                        <span>{items.name.charAt(0)}</span>											</button>
                                                                </div>
                                                                                    </div>
                                                                        }
                                                        <div className="col-md-11
                                                            col-sm-11">
                                                            <div
                                                                className="details">
                                                                <div
                                                                    className="title
                                                                    mt-2 ml-3">
                                                                    <Link to="#"  onClick={()=> this.getStudentDetails(items, getQuestionReport)}>{items.name}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))
                                                :<CommonLoader/>}
                                                </>
                                                :null}
                                            </ul>
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                    {getQuestionReport.student_data?
                                        <div className="row">
                                            <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                <li className="title-sticky">
                                                    <div className="row">
                                                        <div className="col-md-12"><strong>D - ({
                                                        getQuestionReport.student_data.D?
                                                        getQuestionReport.student_data.D.length
                                                    :0})
                                                        </strong></div>
                                                    </div>
                                                </li>
                                                {getQuestionReport.student_data?
                                                <>
                                                {getQuestionReport.student_data.D ?
                                                getQuestionReport.student_data.D.map((items:any)=>(
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
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                    <button
                                                                        className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={()=> this.getStudentDetails(items, getQuestionReport)}>
                                                                        <span>{items.name.charAt(0)}</span>											</button>
                                                                </div>
                                                                                    </div>
                                                                        }
                                                        <div className="col-md-11
                                                            col-sm-11">
                                                            <div
                                                                className="details">
                                                                <div
                                                                    className="title
                                                                    mt-2 ml-3">
                                                                    <Link to="#"  onClick={()=> this.getStudentDetails(items, getQuestionReport)}>{items.name}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))
                                                :<CommonLoader/>}
                                                </>
                                                :null}
                                            </ul>
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                    {getQuestionReport.student_data?
                                        <div className="row">
                                            <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                <li className="title-sticky">
                                                    <div className="row">
                                                        
                                                        <div className="col-md-12"><strong>Not Attempted ({
                                                        getQuestionReport.student_data['Not Answered']?
                                                        getQuestionReport.student_data['Not Answered'].length
                                                    :0})
                                                        </strong></div>
                                                    </div>
                                                </li>
                                                {getQuestionReport.student_data?
                                                <>
                                                {getQuestionReport.student_data['Not Answered']?
                                                getQuestionReport.student_data['Not Answered'].map((items:any)=>(
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
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                    <button
                                                                        className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={()=> this.getStudentDetails(items, getQuestionReport)}>
                                                                        <span>{items.name.charAt(0)}</span>											</button>
                                                                </div>
                                                                                    </div>
                                                                        }
                                                        <div className="col-md-11
                                                            col-sm-11">
                                                            <div
                                                                className="details">
                                                                <div
                                                                    className="title
                                                                    mt-2 ml-3">
                                                                    <Link to="#"  onClick={()=> this.getStudentDetails(items, getQuestionReport)}>{items.name}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))
                                                :<CommonLoader/>}
                                                </>
                                                :null}
                                            </ul>
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                    {getQuestionReport.student_data?
                                        <div className="row">
                                            <ul className="docListWindow
                                                small-slimscroll-style overflowBox">
                                                <li className="title-sticky">
                                                    <div className="row">
                                                        <div className="col-md-12"><strong>Absentee ({getQuestionReport.student_data.absentee?
                                                        getQuestionReport.student_data.absentee.length
                                                        :0})
                                                        </strong></div>
                                                    </div>
                                                </li>
                                                {getQuestionReport.student_data?
                                                <>
                                                {getQuestionReport.student_data.absentee?
                                                getQuestionReport.student_data.absentee.map((items:any)=>(
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
                                                                        :   <div className="col-md-1
                                                                        col-sm-1">
                                                                                        <div className="prog-avatar">
                                                                    <button
                                                                        className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick={()=> this.getStudentDetails(items, getQuestionReport)}>
                                                                        <span>{items.name.charAt(0)}</span>											</button>
                                                                </div>
                                                                                    </div>
                                                                        }
                                                        <div className="col-md-11
                                                            col-sm-11">
                                                            <div
                                                                className="details">
                                                                <div
                                                                    className="title
                                                                    mt-2 ml-3">
                                                                    <Link to="#"  onClick={()=> this.getStudentDetails(items, getQuestionReport)}>{items.name}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))
                                                :<CommonLoader/>}
                                                </>
                                                :null}
                                            </ul>
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                :null}
            </div>
        )
    }
  

    render() {
        const { getQuestionAnswer } = this.props;
        return (
            <div>
                {this.getViewQuestionAnswer()}
                <div className="row">
                    <div className="col-md-12">
                        {getQuestionAnswer ?
                            getQuestionAnswer.map((items: any, index: any) => (
                                <div className="card-box">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <p className="pl-3 pt-3">{index + 1}. {items.question}</p>
                                            <div className="col-md-2 pr-2">
                                                <button className="btn btn-xs btn-circle btn-pink cursorPoint">{items.answer}</button>
                                            </div>
                                            <hr className="m-0 mt-2" />
                                           

                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-info mt-3 pull-right mr-3" 
                                            onClick={() => this.showQuestionView(items.question_id)}>View Responses</button>
                                        </div>
                                    </div>

                                    <div className="row p-3">
                                        <div className="col-md-7">
                                            {items ?
                                                items.options.map((optionList: any) => (
                                                    <div className="row">
                                                        <div className="col-md-10 mb-3">
                                                            <p>
                                                                <strong style={{color:optionList.color_code}}>{optionList.option}. </strong> 
                                                                <span>{optionList.value}</span></p>
                                                        </div>
                                                        <div className="col-md-2 mb-3">
                                                            <div className="btn btn-xs btn-circle countBtn" 
                                                            style={{background:optionList.color_code, color:'#ffffff'}}>{optionList.count}</div>
                                                        </div>
                                                    </div>
                                                ))
                                                : null}
                                        </div>
                                        <div className="col-md-5">
                                            <div className="row"> 
                                            <div className="col-lg-4 col-md-12 col-sm-12 col-12 mt-4">
                                            {items.chart_data.count ? (
                                               <div className="row mb-3">
                                               <div className="col-md-12 text-right">
                                               <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Correct </span><i className="correctBG icount" >{items.chart_data.count[0]}</i></label>
                                               </div>
                                               <div className="col-md-12 text-right">
                                               <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Incorrect </span><i className="incorrectBG icount">{items.chart_data.count[1]}</i></label>
                                               </div>
                                               <div className="col-md-12 text-right">
                                               <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Not Attempted </span><i className="notansBG icount">{items.chart_data.count[2]}</i> </label>
                                               </div>
                                       </div>
                                               ) : (
                                                <div className="row mb-3">
                                                <div className="col-md-12 text-right">
                                                <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Correct </span><i className="correctBG icount" >0</i></label>
                                                </div>
                                                <div className="col-md-12 text-right">
                                                <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Incorrect </span><i className="incorrectBG icount">0</i></label>
                                                </div>
                                                <div className="col-md-12 text-right">
                                                <label className="labelChart" htmlFor=""><span className="ml-2 mr-2">Not Attempted </span><i className="notansBG icount">0</i></label>
                                                </div>
                                        </div>
                                               )}
                                            </div>
                                            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                            {items.chart_data ?
                                                <Doughnut
                                                    data={{
                                                        labels: items.chart_data.name,
                                                        datasets: [{
                                                            data: items.chart_data.count,
                                                            backgroundColor: items.chart_data.color_code
                                                        }]
                                                    }}
                                                    height={130}
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
const mapStateToProps = (state: any) => {
    return {
        getQuestionAnswer: state.questionset.QuestionAnswersReport,
        getQuestionReport: state.questionset.questionReportView
    }
}


export default connect(mapStateToProps, { fetchQuestionAnswersReport, fetchQuestionReportView, getAttendanceStudentView })(QuestionViewList)
