import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDashboard } from '../../store/dashboard/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

export interface PostsTeacherProps {
	getChangeYearData?:any;
	fetchDashboard: (postValue: any) => void;
	getTeacherCountList: any
}

export class TeacherCount extends Component<PostsTeacherProps> {
	public state = {
        getYear:this.props.getChangeYearData
    }
	componentDidMount(): void {
		const { getYear } = this.state;
		window.scrollTo(0, 0);
		if(getYear){
			const postValue = {
				academic_year: getYear
			}
			this.props.fetchDashboard(postValue);
		}
	}
    render() {
		const { getTeacherCountList } = this.props;
		if(getTeacherCountList){
			getTeacherCountList.forEach((items:any)=> {
				if(items.title === 'Attendance'){
				let getAttendance:any = getTeacherCountList.find((item:any)=> item.title === 'Attendance')
					if(getAttendance.title === 'Attendance'){
						items['bg_class'] = "bg-blue";
						items['icon_class'] = "fa fa-file-text-o";
					}
				}else if(items.title === 'Quizzes'){
					let getQuizzes:any = getTeacherCountList.find((item:any)=> item.title === 'Quizzes')
					if(getQuizzes){
						items['bg_class'] = "bg-orange";
						items['icon_class'] = "fa fa-users";					}
					
				}else if(items.title === 'Instant Feedback') {
					let getInstantFeedback:any = getTeacherCountList.find((item:any)=> item.title === 'Instant Feedback')
					if(getInstantFeedback){
						items['bg_class'] = "bg-success";
						items['icon_class'] = "fa fa-file-text-o";
					}					
				}	
				
			})
		}
        return (
            <div>
                <div className="state-overview">
				{getTeacherCountList? 
				<div className="row">
				{
						getTeacherCountList.map((items:any)=>(
							<div className="col-xl-3 col-md-6 col-12">
						<div className={`info-box p-0 pl-3 ${items.bg_class}`}>
							<span className="info-box-icon push-bottom">
							<i className={items.icon_class} aria-hidden="true"></i>
							</span>
							<div className="info-box-content">
								<span className="info-box-text">{items.title}</span>
								<span className="info-box-number">{items.count}</span>
								<div className="progress">
									<div className="progress-bar width-60"></div>
								</div>
								<span className="progress-description">
									Total {items.title}
								</span>
							</div>
							{/* info-box-content */}
						</div>
						{/* info-box */}
					</div>
					))
					}				
				</div>
				:<SpinnerLoader/>}
			</div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
	return {
		getChangeYearData:state.profile.getYear,
		getTeacherCountList:state.dashboard.DashboardCount
	}
}

export default connect(mapStateToProps, {fetchDashboard})(TeacherCount)
