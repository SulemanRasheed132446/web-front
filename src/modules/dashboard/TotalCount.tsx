import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchDashboard } from '../../store/dashboard/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

export type PostsSchoolProps = {
	getChangeYearData?:any;
	fetchDashboard: (postValue: any) => void;
	getSchoolCountList?: any,
	getSchoolId?:any
}
class Totalcount extends Component<PostsSchoolProps> {
	public state = {
        getYear:this.props.getChangeYearData
    }
	componentDidMount(): void {
		const { getYear } = this.state;
		window.scrollTo(0, 0);
		let postValue:any
		if(getYear){
			if(this.props.getSchoolId){
				postValue = {
					academic_year: getYear,
					school_id: this.props.getSchoolId
				}
				this.props.fetchDashboard(postValue);
			}else {
				postValue = {
					academic_year: getYear
				}
				this.props.fetchDashboard(postValue);
			}
		}
		
	}
	
    render() {
		const { getSchoolCountList } = this.props;
		if(getSchoolCountList){
			getSchoolCountList.forEach((items:any)=> {
				if(items.title === 'Teachers'){
				let getTeachers:any = getSchoolCountList.find((item:any)=> item.title === 'Teachers')
					if(getTeachers.title === 'Teachers'){
						items['bg_class'] = "bg-blue";
						items['icon_class'] = "fa fa-users";
					}
				}else if(items.title === 'Students'){
					let getStudents:any = getSchoolCountList.find((item:any)=> item.title === 'Students')
					if(getStudents){
						items['bg_class'] = "bg-orange";
						items['icon_class'] = "fa fa-users";					}
					
				}else if(items.title === 'Quizzes'){
					let getQuizzes:any = getSchoolCountList.find((item:any)=> item.title === 'Quizzes')
					if(getQuizzes){
						items['bg_class'] = "bg-purple";
						items['icon_class'] = "fa fa-file-text";					}
					
				}else if(items.title === 'Instant Feedback') {
					let getInstantFeedback:any = getSchoolCountList.find((item:any)=> item.title === 'Instant Feedback')
					if(getInstantFeedback){
						items['bg_class'] = "bg-success";
						items['icon_class'] = "fa fa-file-text";
					}					
				}	
				
			})
		}
        return (
            <div>
              		{/* start widget */}
			<div className="state-overview">
				{getSchoolCountList?
				<div className="row">
				{
						getSchoolCountList.map((items:any)=>(
							<div className="col-xl-3 col-md-6 col-12" >
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
			{/* end widget */}
            </div>
        );
    }
}
const mapStateToProps = (state:any) => {
	return {
		getChangeYearData:state.profile.getYear,
		getSchoolCountList:state.dashboard.DashboardCount
	}
}
export default  connect(mapStateToProps, {fetchDashboard})(Totalcount);