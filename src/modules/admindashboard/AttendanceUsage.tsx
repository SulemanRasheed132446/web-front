import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { Select, MenuItem, FormControl } from '@material-ui/core';
import { fetchAttendanceUsage } from '../../store/dashboard/Actions';

export type PostsAttendanceBarProps = {
	fetchAttendanceUsage:(postValue:any) => any;
	getAttendanceDetails:any;
	getDurationList:any;
}

export class AttendanceUsage extends Component<PostsAttendanceBarProps> {
	componentDidMount(): void {
		window.scrollTo(0, 0);
		this.getAttendanceChartBar();
	}
	getAttendanceChartBar(){
		const loadMoreType = {
			filter: 'This Year'
		  }
		  this.props.fetchAttendanceUsage(loadMoreType);
	}
    render() {
		const { getAttendanceDetails, getDurationList } = this.props;
		let getSchoolName:any = [];
		let getColorCode:any = [];
		let getAttendance:any = [];
		if(getAttendanceDetails){
			getSchoolName = [];
			getColorCode = [];
			getAttendance = [];
			getAttendanceDetails.forEach((attendance:any, index:any)=>{
				getSchoolName.push(attendance.school_name);
				getColorCode.push(attendance.color_code);
				getAttendance.push(attendance.attendance);
			})

		}
        return (
            <div>
                <div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card card-box">
							<div className="card-head">
								<header className="mt-4">Attendance Usage</header>
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
													data: getAttendance
												}
											]
										}}
										height={90}
										options={option}
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
export const option = {
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
	},
    tooltips: {
      callbacks: {
        label: function(tooltipItem:any, data:any) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          return currentValue;
        },
        title: function(tooltipItem:any, data:any) {
          return data.labels[tooltipItem[0].index];
        }
      }
    }
  }
const mapStateToProps = (state:any) => {
	return {
		getAttendanceDetails:state.dashboard.attendanceUsage,
		getDurationList:state.profile.getDuration
	}
}


export default connect(mapStateToProps,{fetchAttendanceUsage})(AttendanceUsage)
