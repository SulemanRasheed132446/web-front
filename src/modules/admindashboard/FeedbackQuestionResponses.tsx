import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { Select, MenuItem, FormControl } from '@material-ui/core';
import { fetchFeedbackQuestionResponses } from '../../store/dashboard/Actions';

export type PostsFetchQuizBarProps = {
	fetchFeedbackQuestionResponses:(postValue:any) => any;
	getfetchFeedbackDetails:any;
	getDurationList:any;
}

export class FeedbackQuestionResponses extends Component<PostsFetchQuizBarProps> {
	componentDidMount(): void {
		window.scrollTo(0, 0);
		this.getFetchQuizChartBar();
	}
	getFetchQuizChartBar(){
		const loadMoreType = {
			filter: 'This Year'
		  }
		  this.props.fetchFeedbackQuestionResponses(loadMoreType);
	}
    render() {
		const { getfetchFeedbackDetails, getDurationList } = this.props;
		let getSchoolName:any = [];
		let getColorCode:any = [];
		let getFeedbackResponse:any = [];
		if(getfetchFeedbackDetails){
			getSchoolName = [];
			getColorCode = [];
			getFeedbackResponse = [];
			getfetchFeedbackDetails.forEach((feedback:any, index:any)=>{
				getSchoolName.push(feedback.school_name);
				getColorCode.push(feedback.color_code);
				getFeedbackResponse.push(feedback.feedback_response);
			})
		}
        return (
            <div>
                 <div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card card-box">
							<div className="card-head">
								<header className="mt-4">Feedback Question Responses</header>
								{getDurationList ?
								<div className="tools mb-3">
                                <FormControl>
                                <Select
                                labelId="select_work_day"
                                id="select_work_day"
								style={{width:'300px'}}
								value={'This Year'}
								>
									{getDurationList.map((items:any, index:any)=>(
										<MenuItem value={items.value}> {items.value} </MenuItem>
									))}
								</Select>
                                </FormControl>                               
								</div>
								:null}
							</div>
							<div className="card-body no-padding height-9">
								<div className="row">
									<Bar
										data={{
											labels: getSchoolName,
											datasets: [
												{
													backgroundColor: getColorCode,
													borderColor: getColorCode,
													borderWidth: 2,
													data: getFeedbackResponse
												}
											]
										}}
										height={90}
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
													}
												  }],
												xAxes : [ {													
            										barPercentage: 0.5,
													gridLines : {
														display : false
													}
												} ]
											}
										  }}
									/>
								</div>
							</div>
						</div>
					</div>
                    </div> 
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
	return {
		getfetchFeedbackDetails:state.dashboard.feedbackQuestionResponses,
		getDurationList:state.profile.getDuration
	}
}


export default connect(mapStateToProps, {fetchFeedbackQuestionResponses})(FeedbackQuestionResponses)
