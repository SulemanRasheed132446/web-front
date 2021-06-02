import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import { getAttendanceReport } from '../../store/dashboard/Actions';
import moment from 'moment';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import history from '../../History';
import { formValidationPatten } from '../../services/Constants';
import { getAttendanceStudentView } from '../../store/profile/Actions';

interface attendanceProps {
    fetchGetAllClassList: (postPage: any) => any;
    getAttendanceReport:(postValue:any) => any;
    getAttendanceStudentView:(postData:any) => any;
    getAttendanceDetails:any;
    getAllClassList?:any;
    getProfile?:any,
    totalReport?:any,
    loading?:any;
}
interface propsAttendanceType {
    getClassName:any,
    page:any,
    search:any
}
export class Attendance extends Component<attendanceProps, propsAttendanceType> {
    constructor(props: any) {
        super(props);
        this.state = {
            getClassName:'',
            page:1,
            search:''
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.commonSchoolDetails()
    }
  
    commonSchoolDetails(){
      let loadMoreType:any = {
            academic_year: '2021'
          }
        this.props.fetchGetAllClassList(loadMoreType).then((res:any)=>{
            const { getAllClassList } = this.props;
            if(getAllClassList.length > 0)
            this.getAttendanceDetails(getAllClassList[0].id);
            this.setState({getClassName:getAllClassList[0].id})
        });
    }
    getAttendanceDetails(getvalue:any){
        let postValue:any = {
            page_no:1,
            academic_year: '2021',
            class_id: getvalue
        }
        this.props.getAttendanceReport(postValue)
    }
    getfilterClasses = (e:any) =>{
        const { value } = e.target;
        if(value){
            let postValue:any = {
                page_no:1,
                academic_year: '2021',
                class_id: value
            }
            this.props.getAttendanceReport(postValue)
            this.setState({getClassName:value})
        }
    }
    // This is function used to pull student view page
    getStudentDetails = (getValue:any) => {
        let getStudentId:any = getValue.card_id
        if(getStudentId){
            history.push({
                pathname: `/student_view`,
                state: {
                    class_id: getValue.class_id,
                    card_id: getValue.card_id
                  }
              });
              this.props.getAttendanceStudentView(getValue)
        }
    }
    

handleInputAttendanceChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;
    var intRegex = formValidationPatten.alphanumericTest;
    if(intRegex.test(getSearchValue) || getSearchValue === ''){
       if (getSearchValue) {
      const postSearchValue = {
        page_no: 1,
        search: getSearchValue,
        class_id: this.state.getClassName,
        academic_year: '2021'
      }
      this.props.getAttendanceReport(postSearchValue);
      this.setState({
        page: 1,
        search: getSearchValue
      })
    } else {
      const postSearchValue = {
        page_no: 1,
        search: '',
        class_id: this.state.getClassName,
        academic_year: '2021'
      }      
      this.props.getAttendanceReport(postSearchValue);
      this.setState({
        page: 1,
        search: ''
      })
    }
    } else {
    }
   
  }
    render() {
        const { getAttendanceDetails, getAllClassList, totalReport, loading } = this.props;
        const loadingDiary = { display: loading ? "block" : "none" };    
        console.log(getAttendanceDetails.student_detail, 'getAttendanceDetails.student_detail....')
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Attendance']}
                                homeName={['Home']}
                                url={['dashboard']} />
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-topline-red">
                                            <div className="mr-4 mt-2">
                                                <h4 className="pull-right">Total: {totalReport}</h4>
                                            </div>
                                            <div className="card-head" >
                                                <header>
                                                {getAllClassList?                                     
                                                    <select name="classlist" className="form-control" onChange={this.getfilterClasses}>
                                                        {getAllClassList.map((items: any) => (
                                                            <option value={items.id}> {items.grade_standard} </option>
                                                        ))}
                                                    </select>
                                                    :null}
                                                </header>
                                                <div className="tools">
                                                    {/* <input
                                                        placeholder="Search"
                                                        name="search"
                                                        className="form-control"
                                                        onChange={this.handleInputAttendanceChange} 
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="card-body no-padding height-9">
                                                {getAttendanceDetails.absent_data && getAttendanceDetails.student_detail?
                                                
                                                <div className="table-responsive">
                                                    <div className="">
                                                        <div>
                                                        <div >
                                                        <div  className="attendance-flex-container">
                                                        <table className="table table-striped custom-table table-hover width1Table text-center">
                                                        <thead>
                                                            <tr>
                                                            <th className="text-center height60">Card Id</th>
                                                            <th className="text-center height60">Name</th>
                                                            <th className="text-center height60">Overall</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                                { getAttendanceDetails.student_detail ?
                                                                getAttendanceDetails.student_detail.map((items:any, i:any)=>(
                                                                <tr key={i}>
                                                                    <td>{items.card_id}</td>
                                                                    <td><Link to={'#'} onClick={()=> this.getStudentDetails(items)}>{items.student_name}</Link></td>
                                                                    <td>{items.percentage} %</td>
                                                                    
                                                                </tr>
                                                                ))
                                                                :<CommonLoader/>
                                                                }
                                                                
                                                            </tbody>
                                                            </table>
                                                            <div className="attendance-container">
                                                                <div className="attendance-flex-scroll">
                                                                <table className="table table-striped custom-table table-hover text-center">
                                                        <thead>
                                                            <tr>
                                                            
                                                            {getAttendanceDetails.absent_data ?
                                                            getAttendanceDetails.absent_data.map((monthList:any)=>{
                                                                return(
                                                                <th className="minwidth text-center paddingcommon">
                                                            {monthList.day}
                                                            <span> {moment().month(monthList.month - 1).format("MMM")}</span>
                                                            <div className="absentbg">{monthList.absent_count} Absent</div>
                                                                </th>
                                                            )}
                                                            ) :null}
                                                                
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                                { getAttendanceDetails.student_detail ?
                                                                getAttendanceDetails.student_detail.map((items:any, i:any)=>{
                                                                    return(
                                                                        <tr>
                                                                            {items['attendance_details'] ?
                                                                            items['attendance_details'].map((attendItems:any)=>{
                                                                                return(
                                                                                    <td style={{color:attendItems.color_code}}>{attendItems.attendance_value} </td>
                                                                                )
                                                                            })
                                                                        :<CommonLoader/>}
                                                                        </tr>
                                                                        )
                                                                })
                                                                :<CommonLoader/>
                                                                }
                                                            </tbody>
                                                        </table>
                                                            </div>
                                                            </div>
                                                            </div>

                                                    </div>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                                :<CommonLoader/>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingDiary}><SpinnerLoader /></div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return{
        loading: state.dashboard.loading,
		getAllClassList:state.diary.gradelist,
		getProfile:state.profile.profileData,
        getAttendanceDetails:state.dashboard.recordsAttendanceReport,
        totalReport:state.dashboard.totalAttendanceReport
    }
}

export default connect(mapStateToProps, {getAttendanceReport, fetchGetAllClassList, getAttendanceStudentView})(Attendance)
