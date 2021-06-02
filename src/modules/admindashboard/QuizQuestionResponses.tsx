import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { Select, MenuItem, FormControl } from '@material-ui/core';
import { fetchQuizQuestionResponses } from '../../store/dashboard/Actions';

export type PostsFetchQuizBarProps = {
	fetchQuizQuestionResponses:(postValue:any) => any;
	getfetchQuizDetails:any;
	getDurationList:any;
}

export class QuizQuestionResponses extends Component<PostsFetchQuizBarProps> {
	componentDidMount(): void {
		window.scrollTo(0, 0);
		this.getFetchQuizChartBar();
	}
	getFetchQuizChartBar(){
		const loadMoreType = {
			filter: 'This Year'
		  }
		  this.props.fetchQuizQuestionResponses(loadMoreType);
	}
    render() {
		const { getfetchQuizDetails, getDurationList } = this.props;
		let getSchoolName:any = [];
		let getColorCode:any = [];
		let getQuizResponse:any = [];
		if(getfetchQuizDetails){
			getSchoolName = [];
			getColorCode = [];
			getQuizResponse = [];
			getfetchQuizDetails.forEach((quiz:any, index:any)=>{
				getSchoolName.push(quiz.school_name);
				getColorCode.push(quiz.color_code);
				getQuizResponse.push(quiz.quiz_response);
			})
		}
        return (
            <div>
                  <div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card card-box">
							<div className="card-head">
								<header className="mt-4">Quiz Question Responses</header>
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
													data: getQuizResponse
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
		getfetchQuizDetails:state.dashboard.quizQuestionResponses,
		getDurationList:state.profile.getDuration
	}
}

export default connect(mapStateToProps, {fetchQuizQuestionResponses})(QuizQuestionResponses)
