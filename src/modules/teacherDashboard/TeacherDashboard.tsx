import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { fetchTopicAnalysis, fetchSubjectPerformance } from '../../store/dashboard/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';

export type PostsTeacherProps = {
	fetchGetAllClassList: (postPage: any) => any;
	fetchTopicAnalysis: (postValue: any) => any;
	fetchSubjectPerformance: (postValue: any) => void;
	GetCorrectSubject: (postValue: any) => any;
	getAllClassList: any;
	getProfile: any;
	getTopicAnalys: any;
	getCorrectClassList: any;
	getSubjectPerform: any;
	getDuration: any;
	getSubjectsList: any;
	loading: boolean;
}

interface propsTeacherType {
	schoolId:any,
	academicYear:any,
	classId:any
}
export class TeacherDashboard extends Component<PostsTeacherProps, propsTeacherType> {
	constructor(props: any) {
		super(props);
		this.state = {
			schoolId:null,
			academicYear:2021,
			classId:null
		}
	}
	componentDidMount(): void {
		window.scrollTo(0, 0);
		const { getProfile, getSubjectsList } = this.props;
		const loadMoreType = {
			academic_year: '2021'
		}
		
		this.props.fetchGetAllClassList(loadMoreType).then((res: any) => {
			const { getAllClassList } = this.props;
			if (getProfile.school_id && getAllClassList.length > 0) {
				const postValue = {
					academic_year: '2021',
					school_id: getProfile.school_id,
					class_id: getAllClassList[0].id
				}
				
				this.props.GetCorrectSubject(postValue).then((res:any)=>{
					const { getAllClassList, getSubjectsList } = this.props;
					let subjectId: any = getSubjectsList.data;
					if(getAllClassList){
						if (getAllClassList.length > 0 && subjectId.length) {
							const getPerformanace: any = {
								academic_year: 2021,
								class_id: getAllClassList[0].id,
								subject_id: subjectId[0].id
							}
							this.setState({schoolId:subjectId[0].id, classId:getAllClassList[0].id})
							this.props.fetchTopicAnalysis(getPerformanace);
					}
					}
				});
			}
			
		})
		let subjectId: any = getSubjectsList.data;
		if (subjectId) {
			if(subjectId.length) {
				const getPerformanace: any = {
					academic_year: 2021,
					subject_id: subjectId[0].id
				}
				this.props.fetchSubjectPerformance(getPerformanace);
			}			
		}
	}
	getTeacherFilterClass = (e:any) => {
		const { schoolId } = this.state;
		const { value } = e.target;
		const postValue = {
			academic_year: '2021',
			school_id: schoolId,
			class_id: value
		}
		
		this.props.GetCorrectSubject(postValue)
		const getPerformanace: any = {
			academic_year: 2021,
			class_id: value,
			subject_id: schoolId
		}
		this.setState({classId:value})
		this.props.fetchTopicAnalysis(getPerformanace);
	}
	getTeacherFilterSubject = (e:any) =>{
		const { classId } = this.state;
		const { value } = e.target;
		const getPerformanace: any = {
			academic_year: 2021,
			class_id: classId,
			subject_id: value
		}
		this.setState({schoolId:value})
		this.props.fetchTopicAnalysis(getPerformanace);
	}
	getSubjectFilterClass = (e:any) => {
		const { schoolId } = this.state;
		const { value } = e.target;
		const postValue = {
			academic_year: '2021',
			school_id: schoolId,
			class_id: value
		}
		
		this.props.GetCorrectSubject(postValue)
		const getPerformanace: any = {
			academic_year: 2021,
			class_id: value,
			subject_id: schoolId
		}
		this.setState({classId:value})
		this.props.fetchSubjectPerformance(getPerformanace);
	}
	getSubjectFilterSubject = (e:any) =>{
		const { classId } = this.state;
		const { value } = e.target;
		const getPerformanace: any = {
			academic_year: 2021,
			class_id: classId,
			subject_id: value
		}
		this.setState({schoolId:value})
		this.props.fetchSubjectPerformance(getPerformanace);
	}
	render() {
		const { loading, getTopicAnalys, getSubjectPerform, getDuration, getCorrectClassList, getSubjectsList } = this.props;
    	const loadingTextCSS = { display: loading ? "block" : "none" };
		let subject_name: any = [];
		let performance: any = [];
		let color_code: any = [];
		let subject_name_Perform: any = [];
		let performance_Perform: any = [];
		let color_code_Perform: any = [];
		let getSubject: any = getSubjectsList.data;
		if (getTopicAnalys) {
			subject_name = [];
			performance = [];
			color_code = [];
			getTopicAnalys.forEach((items: any) => {
				performance.push(items.performance);
				color_code.push(items.color_code);
				subject_name.push(items.subject_name);
			})
		}
		if (getSubjectPerform) {
			subject_name_Perform = [];
			performance_Perform = [];
			color_code_Perform = [];
			getSubjectPerform.forEach((items: any) => {
				performance_Perform.push(items.performance);
				color_code_Perform.push(items.color_code);
				subject_name_Perform.push(items.subject_name);
			})
		}
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-12 col-sm-12 col-12">
						<div className="card card-box height300">
							<div className="card-head">
								<header>Topic Analysis</header>
								<div className="tools">
								</div>
							</div>
							<div className="row p-3 pb-0">
								<div className="col-md-4">
									{getCorrectClassList?
									<select name="classlist" id="" className="form-control" onChange={this.getTeacherFilterClass}>
										{getCorrectClassList.map((items: any) => (
											<option value={items.id}> {items.grade_standard} </option>
										))}
									</select>
									:null}
								</div>
								<div className="col-md-4">
									{getSubject?
									<select name="subjectList" id="" className="form-control" onChange={this.getTeacherFilterSubject}>
										{getSubject.map((items: any) => (
											<option value={items.id}> {items.name} </option>
										))}
									</select>
									:null}
								</div>
								<div className="col-md-4">
									{getDuration?
									<select name="duration" id="" className="form-control">
										{getDuration.map((items: any) => (
											<option value={items.id}> {items.value} </option>
										))}
									</select>
									:null}
								</div>
							</div>
							<div className="card-body no-padding height-9">
								{getTopicAnalys?
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
					<div className="col-lg-6 col-md-12 col-sm-12 col-12">
						<div className="card card-box height300">
							<div className="card-head">
								<header>Subject Performance</header>
								<div className="tools">
								</div>

							</div>
							<div className="row p-3 pb-0">
								<div className="col-md-4">
									{getCorrectClassList?
									<select name="classlist" id="" className="form-control" onChange={this.getSubjectFilterClass}>
										{getCorrectClassList.map((items: any) => (
											<option value={items.id}> {items.grade_standard} </option>
										))}
									</select>
									:null}
								</div>
								<div className="col-md-4">
									{getSubject?
									<select name="subjectList" id="" className="form-control" onChange={this.getSubjectFilterSubject}>
										{getSubject.map((items: any) => (
											<option value={items.id}> {items.name} </option>
										))}
									</select>
									:null}
								</div>
								<div className="col-md-4">
									{getDuration?
									<select name="duration" id="" className="form-control">
										{getDuration.map((items: any) => (
											<option value={items.id}> {items.value} </option>
										))}
									</select>
									:null}
								</div>
							</div>
							<div className="card-body no-padding height-9">
								{getSubjectPerform?
								<div className="row">
									<Bar
										data={{
											labels: subject_name_Perform,
											datasets: [
												{
													backgroundColor: color_code_Perform,
													borderColor: color_code_Perform,
													borderWidth: 2,
													data: performance_Perform
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
				</div>
				<div style={loadingTextCSS}><SpinnerLoader /></div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		getAllClassList: state.diary.gradelist,
		getProfile: state.profile.profileData,
		getTopicAnalys: state.dashboard.getTopicAnalysis,
		getCorrectClassList: state.diary.gradelist,
		getSubjectPerform: state.dashboard.getSubjectPerformance,
		getDuration: state.profile.getDuration,
		getSubjectsList: state.subjects.category,
        loading:state.dashboard.loading
	}
}

export default connect(mapStateToProps, { fetchGetAllClassList, fetchTopicAnalysis, GetCorrectSubject, fetchSubjectPerformance })(TeacherDashboard)
