import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDashboard } from '../../store/dashboard/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
export interface PostsAcademicProps {
	getChangeYearData?:any;
	fetchDashboard: (postValue: any) => void;
	getCountList: any
}
export class AcademicAdminCount extends Component<PostsAcademicProps> {
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
		const { getCountList } = this.props;
		if(getCountList){
			getCountList.forEach((items:any)=> {
				if(items.title === 'Schools'){
				let schoolName:any = getCountList.find((item:any)=> item.title === 'Schools')
					if(schoolName.title === 'Schools'){
						items['bg_class'] = "bg-blue";
						items['icon_class'] = "fa fa-graduation-cap";
					}
				}else if(items.title === 'Teachers'){
					let getTeachers:any = getCountList.find((item:any)=> item.title === 'Teachers')
					if(getTeachers){
						items['bg_class'] = "bg-orange";
						items['icon_class'] = "fa fa-users";					}
					
				}else if(items.title === 'Students') {
					let getStudents:any = getCountList.find((item:any)=> item.title === 'Students')
					if(getStudents){
						items['bg_class'] = "bg-success";
						items['icon_class'] = "fa fa-graduation-cap";
					}					
				}else if(items.title === 'Quizzes') {
					let getStudents:any = getCountList.find((item:any)=> item.title === 'Quizzes')
					if(getStudents){
						items['bg_class'] = "bg-purple";
						items['icon_class'] = "fa fa-file-text";
					}					
				}	
				
			})
		}
        return (
            <div>
                <div className="state-overview">
					{getCountList?
				<div className="row">
					{
						getCountList.map((items:any)=>(
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
			{/* end widget */}
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
	return {
		getChangeYearData:state.profile.getYear,
		getCountList:state.dashboard.DashboardCount
	}
}


export default connect(mapStateToProps, {fetchDashboard})(AcademicAdminCount)
