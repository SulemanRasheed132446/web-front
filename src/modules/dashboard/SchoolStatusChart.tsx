import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { fetchSubjectAnalysis, fetchStandardAnalysis } from '../../store/dashboard/Actions';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { CommonState } from '../../components/type';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';

export type PostsSchoolBarProps = {
	getChangeYearData?:any;
	fetchGetAllClassList: (postPage: any) => any;
	fetchSubjectAnalysis:(getValue:any) => any;
	fetchStandardAnalysis:(postValue:any) => any;
	getAllClassList?:any;
	getSubjectAnalysis?:any;
	getStandardAnalysis?:any;
	loading?: boolean;
	getSchoolId?:any;
	loginProfile?: any;
}
class Schoolstatuschart extends Component<PostsSchoolBarProps, CommonState> {
	constructor(props: any) {
		super(props);
		this.state = {
			page:1,
			page_no: 1,
			search: '',
			academic_year:this.props.getChangeYearData,
			class_id:null
		}
	}
	componentDidMount(): void {
		const { loginProfile } = this.props;
		window.scrollTo(0, 0);
		if(loginProfile.usertype === 1){
			this.academicSubjectList();
		} else {
			this.commonSubjectList()
		}
	}
	commonSubjectList(){
		const { academic_year } = this.state;
		let loadMoreType:any;
		if(academic_year){
			loadMoreType = {
				academic_year: academic_year
			  }
			this.props.fetchGetAllClassList(loadMoreType).then((res: any) => {	
				const { getAllClassList } = this.props;	
			  if(getAllClassList.length){
					  const getPerformanace:any = {
						  academic_year: academic_year,
						  class_id:  getAllClassList[0].id
						}
					  this.props.fetchSubjectAnalysis(getPerformanace);
					  const getStandardAnalysis:any = {
						academic_year: academic_year,
						class_id:  getAllClassList[0].id,
						grade:getAllClassList[0].grade_standard
					  }
					  this.props.fetchStandardAnalysis(getStandardAnalysis);
						this.setState({class_id:getAllClassList[0].id})
				  }				
			  }
		   )
		}
		
	}
	academicSubjectList(){
		const { getSchoolId } = this.props;
		const { academic_year } = this.state;
		let loadMoreType:any;
		if(academic_year){
			loadMoreType = {
				academic_year: academic_year,
				school_id:getSchoolId
			  }
			  this.props.fetchGetAllClassList(loadMoreType).then((res: any) => {	
				  const { getAllClassList }	= this.props;	 			 
			  if(getAllClassList.length){
				  if(getSchoolId){
					  const getPerformanace:any = {
						  academic_year: academic_year,
						  class_id:  getAllClassList[0].id,
						  school_id:getSchoolId
						}
						this.setState({class_id:getAllClassList[0].id})
					  this.props.fetchSubjectAnalysis(getPerformanace);
					  const getStandardAnalysis:any = {
						academic_year: academic_year,
						class_id:  getAllClassList[0].id,
						grade:getAllClassList[0].grade_standard
					  }
					  this.props.fetchStandardAnalysis(getStandardAnalysis);
				  } 		
			  }
		   })
		}
		
	}
	getSubjectAnalysis = (event:any) =>{
		console.log(event, 'event...')
		const { academic_year } = this.state;
		const { value } = event.target;
		const { getSchoolId } = this.props;
		if(academic_year){
			if(value){
				if(getSchoolId){
					const getPerformanace:any = {
						academic_year: academic_year,
						class_id:  value,
						school_id:getSchoolId
					  }
					  this.setState({class_id:value})
					this.props.fetchSubjectAnalysis(getPerformanace);
				} else {
					const getPerformanace:any = {
						academic_year: academic_year,
						class_id:  value
					  }
					  this.setState({class_id:value})
					this.props.fetchSubjectAnalysis(getPerformanace);
				}
				
			}
		}
		
	}
	getStandardAnalysis = (event:any) =>{
		const { academic_year } = this.state;
		const { value } = event.target;
		const { getSchoolId, getAllClassList } = this.props;
		console.log(getAllClassList, value,  'getAllClassList...')
		
		if(academic_year){
			let getGradeName:any = getAllClassList.find((items:any)=>items.id === parseInt(value))
			console.log(getGradeName.grade_standard, 'getGradeName...')
			if(value){
				if(getSchoolId){
					const getPerformanace:any = {
						academic_year: academic_year,
						class_id:  value,
						school_id: getSchoolId,
						grade:getGradeName.grade_standard
					  }
					  this.setState({class_id:value})
					this.props.fetchStandardAnalysis(getPerformanace);
				} else {
					const getPerformanace:any = {
						academic_year: academic_year,
						class_id:  value,
						grade:getGradeName.grade_standard
					  }
					  this.setState({class_id:value})
					this.props.fetchStandardAnalysis(getPerformanace);
				}			
			}
		}
	
	}
	render() {
		const { loading, getSubjectAnalysis, getStandardAnalysis, getAllClassList } = this.props;
		const loadingDiary = { display: loading ? "block" : "none" };
		let labelsName:any;
		let backgroundColor:any;
		let dataCount:any;
		let labelsStandard:any;
		let backgroundStandard:any;
		let dataCountStandard:any;
		if(getSubjectAnalysis){
			labelsName = [];
			backgroundColor = [];
			dataCount = [];
			getSubjectAnalysis.forEach((items:any)=>{
				labelsName.push(items.subject_name);
				backgroundColor.push(items.color_code)
				dataCount.push(items.performance)
			})
		}
		if(getStandardAnalysis){
			labelsStandard = [];
			backgroundStandard = [];
			dataCountStandard = [];
			getStandardAnalysis.forEach((items:any)=>{
				labelsStandard.push(items.subject_name);
				backgroundStandard.push(items.color_code)
				dataCountStandard.push(items.performance)
			})
		}
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-12 col-sm-12 col-12">
						<div className="card card-box height300">
							<div className="card-head">
								<header>Subject Analysis</header>
								<div className="tools">
								{getAllClassList ?
									<select name="className" id="" className="form-control" onChange={this.getSubjectAnalysis}>
										{getAllClassList.map((items:any)=>(
											<option value={items.id}> {items.grade_standard} </option>
										))}
									</select>
								:null}	
								</div>
							</div>
							<div className="card-body no-padding height-9">
								{dataCount?
								<div className="row">
									<Bar
										data={{
											labels: labelsName,
											datasets: [
												{
													backgroundColor: backgroundColor,
													borderColor: backgroundColor,
													borderWidth: 2,
													data: dataCount
												}
											]
										}}
										options={
											{											
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
														  if (Math.floor(label) === label) {
															  return label;
														  }
													  }
													},
													scaleLabel: {
														display: true,
														labelString: 'Performance (%)'
													  }
												  }],
												xAxes : [ {
            										barPercentage: 0.5,
													gridLines : {
														display : false
													},
													scaleLabel: {
														display: true,
														labelString: 'Subjects'
													  }
												} ]
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
								<header>Standard Analysis</header>
								<div className="tools">
								{getAllClassList ?
								<select name="className" id="" className="form-control" onChange={this.getStandardAnalysis}>
									{getAllClassList.map((items:any)=>(
										<option value={items.id}> {items.grade_standard} </option>
									))}
								</select>
								:null}	
								</div>
							</div>
							<div className="card-body no-padding height-9">
								{dataCountStandard?
								<div className="row">
									<Bar
										data={{
											labels: labelsStandard,
											datasets: [
												{
													backgroundColor: backgroundStandard,
													borderColor: backgroundStandard,
													borderWidth: 2,
													data: dataCountStandard
												}
											]
										}}
										options={{
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
														  if (Math.floor(label) === label) {
															  return label;
														  }
													  }
													},
													scaleLabel: {
														display: true,
														labelString: 'Performance (%)'
													  }
												  }],
												xAxes : [ {
            										barPercentage: 0.5,
													gridLines : {
														display : false
													},
													scaleLabel: {
														display: true,
														labelString: 'Classes'
													  }
												} ]
											}
										  }}
									/>
								</div>
								:<CommonLoader/>}
							</div>
						</div>
					</div>
				</div>
				<div style={loadingDiary}><SpinnerLoader /></div>
			</div>
		);
	}
}
const mapStateToProps = (state:any) => {
	return {
		getChangeYearData:state.profile.getYear,
		loading: state.dashboard.loading,
		getAllClassList:state.diary.gradelist,
		loginProfile:state.profile.profileData,
		getSubjectAnalysis:state.dashboard.SubjectAnalysis,
		getStandardAnalysis:state.dashboard.StandardAnalysis
	}
}
export default connect(mapStateToProps, {fetchSubjectAnalysis, fetchStandardAnalysis, fetchGetAllClassList})(Schoolstatuschart);