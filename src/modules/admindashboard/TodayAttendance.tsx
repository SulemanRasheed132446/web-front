import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchTodayAttendanceReport} from '../../store/dashboard/Actions';

interface propsTypes {
    fetchTodayAttendanceReport:(postValue:any) => any;
    getTypeAttendance?:any;
    loading?:any;
}
export class TodayAttendance extends Component<propsTypes> {
    componentDidMount(): void {
        this.getTodayAttendanceReport()
    }
    getTodayAttendanceReport(){
        let postValue:any = {
            academic_year: "2021"
        }
        this.props.fetchTodayAttendanceReport(postValue)
    }
    render() {
        const { getTypeAttendance } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card card-box">
                            <div className="card-head">
                                <header className="mt-4">Today Attendance</header>
                            </div>
                            <div className="card-body no-padding height-9">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <table className="gradeTable">
                                            <tbody>
                                            {getTypeAttendance?
                                                getTypeAttendance.map((items:any)=>(
                                                <tr>
                                                <td  className="academicGradeTitle">{items.school_name}</td>  
                                                {
                                                   items.class_list?
                                                   items.class_list.map((classList:any)=>(
                                                   <td  className="academicGrade status-color7"><small>{classList.grade} {classList.percentage}</small></td>
                                                   ))
                                                   :null 
                                                }                                            
                                                </tr>
                                                ))
                                                :null}
                                            </tbody>
                                    </table>
                                    </div>
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
    return{
        getTypeAttendance:state.dashboard.recordsTodayAttendanceReport
    }
}

export default connect(mapStateToProps, {fetchTodayAttendanceReport})(TodayAttendance)
