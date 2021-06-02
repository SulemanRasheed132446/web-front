import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './dashboardStyle.scss';
import { fetchTeacherEngagement, fetchTeacherPerformance } from '../../store/dashboard/Actions';
import { CommonState } from '../../components/type';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import CommonLoader from '../../components/CommonLoader';
import history from '../../History';

export type PostsTeacherProps = {
	getChangeYearData?:any;
	fetchGetAllClassList: (postPage: any) => any;
	fetchTeacherPerformance: (postValue: any) => void;
	fetchTeacherEngagement:(getValue:any) => any;
	getAllClassList?:any;
	getProfile?:any;
	getTeacherEngagement?:any;
	getTeacherPerformance?:any;
	getSchoolId?:any;
}

class Teacherupdatedetails extends Component<PostsTeacherProps, CommonState> {
	constructor(props: any) {
		super(props);
		this.state = {
			page:1,
			page_no: 1,
			search: '',
			academic_year:this.props.getChangeYearData,
			class_id:null,
			messageData:''
		}
	}
	componentDidMount(): void {
		const { getProfile } = this.props;
		window.scrollTo(0, 0);
		if(getProfile.usertype === 1){
			this.getAcademicTeacherDetails();
		} else {
			this.commonTeacherDetails()
		}
		this.getTeacherEngagement()
	}

	commonTeacherDetails(){
		const { academic_year } = this.state;
		if(academic_year){
			let	loadMoreType:any = {
				academic_year: academic_year
			  }
				this.props.fetchGetAllClassList(loadMoreType).then((res: any) => {
					const { getAllClassList, getSchoolId } = this.props;
					if(getAllClassList.length && getSchoolId){
							const getPerformanace:any = {
								academic_year: academic_year,
								class_id:  getAllClassList[0].id,
								page_no: 1
							  }
							  this.setState({class_id:getAllClassList[0].id})
							this.props.fetchTeacherPerformance(getPerformanace);
					}
				  })
		}
	}

	getAcademicTeacherDetails(){
		const { academic_year } = this.state;
		const { getSchoolId } = this.props;
		if(academic_year){
			let	loadMoreType:any = {
				academic_year: academic_year,
				school_id:getSchoolId
			  }
				this.props.fetchGetAllClassList(loadMoreType).then((res: any) => {
					const { getAllClassList, getSchoolId } = this.props;
					if(getAllClassList.length && getSchoolId){
							const getPerformanace:any = {
								academic_year: academic_year,
								class_id:  getAllClassList[0].id,
								page_no: 1
							  }
							  this.setState({class_id:getAllClassList[0].id})
							this.props.fetchTeacherPerformance(getPerformanace);
					}
				  })
		}
		
	}
	getTeacherEngagement(){
		const { getSchoolId } = this.props;
		const { academic_year } = this.state;
		if(getSchoolId){
			const getTeacher:any = {
				academic_year: academic_year,
				page_no: 1,
				school_id:getSchoolId
			  }
			  this.props.fetchTeacherEngagement(getTeacher);
		} else {
			const getTeacher:any = {
				academic_year: academic_year,
				page_no: 1
			  }
			  this.props.fetchTeacherEngagement(getTeacher);
		}
		
	}
	getGradeValue = (e:any) =>{
		const { getSchoolId } = this.props;
		const { value } = e.target;
		let getPerformanace:any
		if(value){
			if(getSchoolId){
				getPerformanace = {
					academic_year: 2021,
					class_id: value,
					page_no: 1,
					School_id:getSchoolId
				}
				this.setState({class_id:value})
				this.props.fetchTeacherPerformance(getPerformanace);
			} else {
				getPerformanace = {
					academic_year: 2021,
					class_id: value,
					page_no: 1
				}
				this.setState({class_id:value})
				this.props.fetchTeacherPerformance(getPerformanace);
			}			
		}
	}
	postTeacherDetails= (getValue:any) =>{
		history.push({
			pathname: `/teachers/${getValue.teacher_id}`,
		  });
		  localStorage.setItem('TeacherDetails', getValue.teacher_name)
	}
	addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
      }
	render() {
		const { getTeacherEngagement, getAllClassList, getTeacherPerformance } = this.props;
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-12 col-sm-12 col-12">
						<div className="card-box ">
							<div className="card-head padding15 pb-2">
								<header>Teacher Engagement</header>
								<div className="tools">
								</div>
							</div>
							<div className="card-body ">
								<div className="row">
									<ul className="docListWindow small-slimscroll-style overflowBox width100">
										<li className="title-sticky">
											<div className="row">
												<div className="col-md-4"><strong>Teacher name</strong></div>
												<div className="col-md-4 text-center"><strong>Engagements per class</strong></div>
												<div className="col-md-4 text-center"><strong>Total Engagements</strong></div>
											</div>
										</li>
										{getTeacherEngagement.length ?
										<>
										{getTeacherEngagement.map((items:any, index:any)=>(
											<li key={index}>
											<div className="row">
												<div className="col-md-4 col-sm-4">
												{ items.teacher_profile?
                                                         <div>
                                                         <div className="profileImage">
                                                        <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${items.teacher_profile}`} 
                                                        alt="Student Profile" width="40"
                                                        height="40"/>
                                                                    </div>
                                                     </div>
                                                        :
                                                       <div className="prog-avatar">
														<button
															className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink">
															<span>{items.teacher_name.charAt(0)}</span>											</button>
													</div>
                                                        }
													
													<div className="details">
														<div className="title mt-2">
															<Link to={"#"} onClick={()=> this.postTeacherDetails(items)}>{items.teacher_name}</Link>

														</div>
													</div>
												</div>
												<div className="col-md-4 col-sm-4 rating-style text-center">
													<p>{items.engaegement_per_class}</p>
												</div>
												<div className="col-md-4 col-sm-4 rating-style text-right">
													<p>{items.total_engagement}</p>
												</div>
											</div>
										</li>
										))
										}	
										</>
										:<CommonLoader/>}							
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 col-12">
						<div className="card-box ">
							<div className="card-head">
								<header className="mt-3">Teacher Performance</header>
								<div className="tools">
									{getAllClassList ?
								<select name="className pb-0" id="" className="form-control" onChange={this.getGradeValue}>
								{getAllClassList.map((items:any)=>(
									<option value={items.id}> {items.grade_standard} </option>
								))}
								</select>
								:null}	
								</div>
							</div>
							<div className="card-body ">
								<div className="row">
									<ul className="docListWindow small-slimscroll-style overflowBox width100">
										<li className="title-sticky">
											<div className="row">

												<div className="col-md-6"><strong>Teacher name (Subject)</strong></div>
												<div className="col-md-3"><strong>Total Responses</strong></div>
												<div className="col-md-3"><strong>Performance</strong></div>
											</div>
										</li>
										{getTeacherPerformance.length > 0 ?
										<>
										{getTeacherPerformance.map((items:any)=>(
											<li>
											<div className="row">
												<div className="col-md-6 col-sm-6">
												{ items.teacher_profile?
                                                         <div>
                                                         <div className="profileImage">
                                                        <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${items.teacher_profile}`} 
                                                        alt="Student Profile" width="40"
                                                        height="40"/>
                                                                    </div>
                                                     </div>
                                                        :
														<div className="prog-avatar">
															<button
																className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink">
																<span>{items.teacher_name.charAt(0)}</span>											</button>
														</div>
                                                        }
													<div className="details">
														<div className="title">
															<Link to={"#"} onClick={()=> this.postTeacherDetails(items)}>{items.teacher_name}</Link>
														</div>
													</div>
												</div>
												<div className="col-md-3 col-sm-3 rating-style">
													<p>{items.total_responses}</p>
												</div>
												<div className="col-md-3 col-sm-3 rating-style">
													<p>{items.total_performance}</p>
												</div>
											</div>
										</li>
										))}
										</>
										:<CommonLoader/>}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state:any) => {
	return {
		getChangeYearData:state.profile.getYear,
		getAllClassList:state.diary.gradelist,
		getProfile:state.profile.profileData,
		getTeacherEngagement:state.dashboard.records_Teacher_Engagement,
		getTeacherPerformance:state.dashboard.records_Teacher_Performance
	}
}


export default  connect(mapStateToProps, {fetchTeacherEngagement, fetchTeacherPerformance, fetchGetAllClassList})(Teacherupdatedetails);