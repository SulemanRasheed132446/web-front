import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { fetchConcernPoint } from '../../store/dashboard/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { getLeastAttendees } from '../../store/teacher/Actions';
import CommonLoader from '../../components/CommonLoader';
import { Link } from 'react-router-dom';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';

export type PostsTeacherSubjectProps = {
    fetchGetAllClassList: (postPage: any) => any;
    fetchConcernPoint:(postValue:any) => any;
    getLeastAttendees:(postData:any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    getAllClassList: any;
    getProfile:any;
    getDuration: any;
    getPointValue?:any;
    loading: boolean;
    LeastAttendees?:any;
}
export class TeacherSubject extends Component<PostsTeacherSubjectProps> {
    componentDidMount(): void {
        window.scrollTo(0, 0);
        const loadMoreType = {
			academic_year: '2021'
        }
        this.props.fetchGetAllClassList(loadMoreType).then((res:any)=>{
            const { getAllClassList } = this.props;
            if(getAllClassList.length){
                const postValue = {
                    academic_year: '2021',
                    class_id: getAllClassList[0].id
                }
                this.props.fetchConcernPoint(postValue)
            }
        })
       this.getLeastAttendessData();
    }
    getLeastAttendessData(){
        const postValue = {
            academic_year: '2021'
        }
        this.props.getLeastAttendees(postValue);
    }
    getPointChange = (e: any) => {
    const { value } = e.target;
    if(value){
        const postValue = {
            academic_year: '2021',
            class_id: value
        }
        this.props.fetchConcernPoint(postValue)
    }
    }
    getStudentDetails = (getValue:any) => {
        let getStudentId:any = getValue.card_id
        if(getStudentId){
            history.push({
                pathname: `/student_view`,
                state: {
                    class_id: getValue.class_id,
                    card_id: getValue.card_id
                  }
              });
              this.props.getAttendanceStudentView(getValue)
        }
    }
    render() {
        const { loading, getAllClassList, getDuration, getPointValue, LeastAttendees } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let subject_name: any = [];
		let performance: any = [];
        let color_code: any = [];
        if (getPointValue) {
			subject_name = [];
			performance = [];
			color_code = [];
			getPointValue.forEach((items: any) => {
				performance.push(items.performance);
				color_code.push(items.color_code);
				subject_name.push(items.subject_name);
			})
        }
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card card-box height337">
                            <div className="card-head">
                                <header>Point Of Concern</header>
                                <div className="tools">
                                <div className="row">
                                <div className="col-md-6">
                                    {getAllClassList?
                                    <select name="getAll" id="" className="form-control" onChange={this.getPointChange}>
                                        {getAllClassList.map((items: any) => (
											<option value={items.id}> {items.grade_standard} </option>
										))}
                                    </select>
                                    :null}
                                </div>
                                <div className="col-md-6">
                                {getDuration?
									<select name="duration" id="" className="form-control">
										{getDuration.map((items: any) => (
											<option value={items.id}> {items.value} </option>
										))}
									</select>
									:null}
                                </div>
                            </div>
                                </div>
                            </div>
                           
                            <div className="card-body no-padding height-9">
                                {getPointValue > 0?
                                <div className="row">
                                    <Bar
                                        data={{
											labels: subject_name,
											datasets: [
												{
													backgroundColor: color_code,
													borderColor: color_code,
													borderWidth: 2,
													data: performance
												}
											]
                                        }}
                                        height={115}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: true,
                                                text: ''
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
                                        }}
                                    />
                                </div>
                                 :<CommonLoader/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="card-box">
                            <div className="card-head">
                                <header>
                                    Least Attendees
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
                                                <div className="col-md-9 col-xs-9"><strong>Student
                                                    Name
                                                </strong></div>
                                                <div className="col-md-3 col-xs-3"><strong>Absents</strong></div>
                                            </div>
                                        </li>
                                        {LeastAttendees?
                                        LeastAttendees.map((items:any)=>(
                                            <li>
                                            <div className="row">
                                                <div className="col-md-1
                                                            col-sm-1">
                                                            <div className="prog-avatar">
                                                            <button
                                                                className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink" onClick = {()=> this.getStudentDetails(items)}>
                                                                <span>{items.student_name.charAt(0)}</span>						
                                                            </button>
                                                        </div>
                                                </div>
                                                <div className="col-md-8
                                                            col-sm-8">
                                                    <div
                                                        className="details">
                                                        <div
                                                            className="title
                                                                    mt-2">
                                                            <Link to={"#"} onClick = {()=> this.getStudentDetails(items)}>{items.student_name}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3
                                                            col-sm-3
                                                            rating-style">
                                                    <p>{items.percentage}%</p>
                                                </div>
                                            </div>
                                        </li>
                                        ))
                                        :<CommonLoader/>}
                                    </ul>
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

const mapStateToProps = (state: any) => {
	return {
        getAllClassList: state.diary.gradelist,
        getDuration: state.profile.getDuration,
        getProfile: state.profile.profileData,
        getPointValue:state.dashboard.getConcernPoint,
        loading:state.dashboard.loading,
        LeastAttendees:state.teacher.getLeastAttendees
    }
}

export default connect(mapStateToProps, {fetchGetAllClassList, fetchConcernPoint, getLeastAttendees, getAttendanceStudentView})(TeacherSubject)
