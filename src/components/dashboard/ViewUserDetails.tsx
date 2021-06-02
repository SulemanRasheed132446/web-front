import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeacherPerformanceCount } from '../../store/teacher/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

interface teacherPerformanceType {
    TeacherPerformanceCount:(postValue:any)=>void;
    teacherPerformance?:any;
    getTeacherDetails?:any,
    loading?:any
}
class ViewUserDetails extends Component<teacherPerformanceType> {
    componentDidMount(): void {
        const { getTeacherDetails } = this.props;
        window.scrollTo(0, 0);
        let postValue:any = {
            academic_year: 2021,
            teacher_id: getTeacherDetails
        }
        this.props.TeacherPerformanceCount(postValue)
    }
    render() {
        const { teacherPerformance, loading } =  this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let getTeacherInfo:any = localStorage.getItem('TeacherDetails')
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body no-padding height-9">
                                <div className="row">
                                {getTeacherInfo?
                                    <div className="col-md-3">
                                        <div className="row  mt-2">
                                            <div className="ml-3 d-flex">
                                                <div>
                                                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ml-3 btn-pink">
                                                        <span>{getTeacherInfo.charAt(0)}</span>											
                                                    </button>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                    <h3 className="my-0">{getTeacherInfo}</h3>
                                                        <span>( Teacher )</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :null}
                                {teacherPerformance.length > 0?
                                teacherPerformance.map((items:any)=>(
                                    <div className="col-md-3 text-center">
                                            <h3>{items.count}</h3>
                                            <h4>{items.title}</h4>
                                        </div>
                                    ))
                                :null}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return{
        loading:state.teacher.loading,
        teacherPerformance:state.teacher.getTeacherPerformanceCount
    }
}
export default connect(mapStateToProps, {TeacherPerformanceCount})(ViewUserDetails);