import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import BreadCrumb from '../../components/BreadCrumb'
import { fetchTeacherPostId, FetchSubjectMappingPost, fetchClassInchargeMappingPost, TeacherClassCountGet } from '../../store/teacher/Actions';
import { RouteComponentProps } from 'react-router';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import history from '../../History';
import {TeacherDetails} from '../../router/Roles';
import {teacherMappingView} from '../../store/teacher/Type';

interface OwnTeacherViewFormProps extends RouteComponentProps<OwnPropsParams> {
    fetchTeacherPostId: (id: string) => void;
    FetchSubjectMappingPost: (teacherDetails: any) => void;
    fetchClassInchargeMappingPost: (classIncharge:any) =>any;
    fetchGetAllClassList: (postValue:any) => void;
    GetCorrectSubject: (postValue:any) => void;
    TeacherClassCountGet: (getClassCount:any) => void;
    loading: boolean;
    errorMessage: any;
    getTeacherViewId: any;
    getTeacherViewData: any;
    getTeacherid: any;
    deleteDetails: any;
    page: number;
    per_page: number;
    totalPage: number;
    records: any;
    classInchargeRecords:any
    total: number;
    ClassNameList: any;
    SubjectList: any,
    getSubjectClasslist:any;
    totalSubjectClassCount:any;
    totalClassCount:any;
};

export class ViewFullDetailTeacher extends React.Component<OwnTeacherViewFormProps, teacherMappingView> {
    constructor(props: any) {
        super(props);
        this.state = {
            acsOrder: true,
            page: 1,
            search: '',
            SortOrderData: '',
            OrderNameData: '',
            hasMore: true,
            classInchanger:true
        }
    }
    getClassId: any = [];
    getSubjectId:any = [];
    mapClassSubject: any = [];
    mappingClassData: any = [];
    classInchargeList:any = [];
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchTeacherPostId(String(this.props.match.params.id));
        const postValue = {
            academic_year:'2021'
        }
        const getQuestion = {
            academic_year:'2021',
            teacher_id : this.props.match.params.id
        }
        this.props.fetchGetAllClassList(postValue);
        this.props.GetCorrectSubject(postValue);
        this.getTeacherDetails();
        this.props.TeacherClassCountGet(getQuestion);
    }
    getTeacherDetails() {
        if (this.props.match.params.id) {
            const postValue: any = {
                page_no: 1,
                academic_year: 2021,
                teacher_id: this.props.match.params.id
            }
            this.props.FetchSubjectMappingPost(postValue);
            this.props.fetchClassInchargeMappingPost(postValue).then((res:any) =>{
                const { classInchargeRecords } = this.props;
                if(classInchargeRecords){
                    if (classInchargeRecords.length > 0) {
                        this.setState({classInchanger:false})          
                    }else{
                        this.setState({classInchanger:true}) 
                    }
                   }

            });
        }
    }
    updateSubjectClass(getValue:any, getTeacherId:any){
        let classIdData;
        if(getValue.class_id) {            
            classIdData = getValue.class_id.map((el:any)=>parseInt(el))            
            getValue['class_id'] = classIdData;
        }
        history.push({
            pathname: TeacherDetails.TeacherSubjectEdit,
            state: {
              class_id: getValue.class_id,
              teacherId: getTeacherId,
              class_name: getValue.class_name,
              subject_id: getValue.subject_id
            }
          })
    }
    updateClass(getClassId:any, getTeacherId:any){
        let classId:any;
        let classNameList:any;
        if(getClassId.length > 0){
            getClassId.forEach((items:any) =>{
                classId = items.class_id;
                classNameList = items.class_name;
            })
        }
        history.push({
            pathname: TeacherDetails.TeacherClassEdit,
            state: {
              class_id: classId,
              class_name:classNameList,
              teacherId: getTeacherId
            }
          })
    }
    public showFilterClassTeacher = (getdata: any) => {
        if (getdata.sort_by === 'desc') {
          this.setState({ 
            acsOrder: false, 
            search: '',
            SortOrderData: getdata.sort_by,
            OrderNameData: getdata.order_by
          })
          const postValue = {
            page_no: 1,
            search: this.state.search,
            sort_by: getdata.sort_by,
            order_by: getdata.order_by,
            academic_year: 2021,
            teacher_id: this.props.match.params.id
          }
          this.setState({
            hasMore: true,
            SortOrderData: getdata.sort_by,
            OrderNameData: getdata.order_by,
            page: 1
          })
          this.props.FetchSubjectMappingPost(postValue);
        } else {
          this.setState({ 
            acsOrder: true, 
            SortOrderData: getdata.sort_by, 
            OrderNameData: getdata.order_by, 
            search: '' })
          const postValue = {
            page_no: 1,
            search: this.state.search,
            sort_by: getdata.sort_by,
            order_by: getdata.order_by,
            academic_year: 2021,
            teacher_id: this.props.match.params.id
          }
          this.setState({
            hasMore: true,
            SortOrderData: getdata.sort_by,
            OrderNameData: getdata.order_by,
            page: 1
          })
          this.props.FetchSubjectMappingPost(postValue);
        }
      }
    //in your component
    addDefaultSrc= (ev:any) =>{
        ev.target.src = '../assets/img/user/teacher-profile.jpg'
    }
    render() {          
        const { loading } = this.props;
        const { classInchanger } = this.state;
        const loadingTeacherFull = { display: loading ? "block" : "none" };
        const getsubjectMapping:any = this.props.getSubjectClasslist;
        const getClassIncharge:any = this.props.classInchargeRecords;
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Teacher']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['Teacher']}
                                baseURL={['teacher']}
                                mainPageTitle={['Teacher Profile']} />
                            <div className="row">
                                <div className="col-md-11">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.props.getTeacherViewData ?
                                        <div className="profile-sidebar">
                                            <div className="card card-topline-aqua">
                                                <div className="card-body no-padding height-9">
                                                    <div className="row">
                                                        <div className="profile-userpic">
                                                        {this.props.getTeacherViewData.image ? 
                    
                    <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${this.props.getTeacherViewData.image}`} 
                    className="img-responsive" alt="Student Profile" />
                    : <img src="../assets/img/user/teacher-profile.jpg" className="img-responsive" alt="" />} 
                     </div>
                                                    </div>
                                                    <div className="profile-usertitle">
                                                        <div className="profile-usertitle-name">{this.props.getTeacherViewData.firstname} {this.props.getTeacherViewData.lastname}</div>
                                                    </div>
                                                    <ul className="list-group list-group-unbordered">
                                                        <li className="list-group-item">
                                                            <div className="row">
                                                            <div className="col-md-6">
                                                            <b>Phone Number </b>
                                                            </div>
                                                            <div className="col-md-6">
                                                            <div className="profile-desc-item">{this.props.getTeacherViewData.phone_number}</div>
                                                            </div>
                                                            </div> 
                                                        </li>
                                                        
                                                        <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                            <b>Designation</b>
                                                            </div>
                                                            <div className="col-md-6">
                                                            <div className="profile-desc-item">{this.props.getTeacherViewData.role}</div>
                                                            </div>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                            <b>Email Id </b>
                                                            </div>
                                                            <div className="col-md-12">
                                                            <div className="profile-desc-item width100">{this.props.getTeacherViewData.email}</div>
                                                            </div>
                                                            </div>                                                             
                                                        </li>
                                                    </ul>
                                                    <div className="row list-separated profile-stat">
                                                        <div className="col-md-6 col-sm-6 col-6">
                                                        <div className="uppercase profile-stat-title"> {this.props.totalClassCount} </div>
                                                            <div className="uppercase profile-stat-text"> Total Class </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6 col-6">
                                                            <div className="uppercase profile-stat-title"> {this.props.totalSubjectClassCount} </div>
                                                            <div className="uppercase profile-stat-text"> Total Subject </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <SpinnerLoader />}
                                    <div className="profile-content">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card card-topline-red">
                                                <div className="card-head">
                                                    <header>Subject & Class Mapping</header>
                                                        <div className="pull-right mr-3 mb-2 mt-1">
                                                            <Link to={'/map_subject'}>
                                                                <button className="btn btn-pink">Map Subject</button>
                                                            </Link>
                                                            
                                                             </div>
                                                    </div>
                                                    <div className="card-body no-padding height-9">
                                                        <div className="row">
                                                            <div className="table-responsive">
                                                                <table className="table table-striped custom-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                        <th>  
                                                                            Subject
                                                                        </th>
                                                                            <th>
                                                                                <button
                                                                                    title="Ascending order" className="headerBold">
                                                                                    Class&nbsp;
                                                                                </button>
                                                                            </th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {getsubjectMapping.length > 0 ?
                                                                        <tbody>
                                                                            {getsubjectMapping.map((element:any) => (

                                                                                <tr>
                                                                                    <td >{element.subject_name}</td>
                                                                                    <td >
                                                                                    {element.class_objs.map((classInfo:any) => (
                                                                                     <span className={classInfo.class_active ? "btn btn-pink btn-circle mb-2 w-15" : "btn btn-disable btn-circle mb-2 w-15"} >{classInfo.class_name}</span>   
                                                                                    )) }
                                                                                    </td>
                                                                                    <th>
                                                                                        {element.subject_active?
                                                                                        <button className="btn btn-primary btn-xs"  onClick={() => this.updateSubjectClass(element, this.props.match.params.id)}
                                                                                        title="Edit Subject Map"><i className="fa fa-pencil" aria-hidden="true" ></i></button>
                                                                                        : <button className="btn btn-disable btn-xs"><i className="fa fa-pencil" aria-hidden="true" ></i></button>}
                                                                                    </th>
                                                                                </tr> 
                                                                            )                                                                                  
                                                                            )}
                                                                        </tbody>
                                                                        : <CommonLoader />}
                                                                </table>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card card-topline-red">
                                                <div className="card-head">
                                                    <header>Class Incharge</header>
                                                        <div className="pull-right mr-3 mb-2 mt-1">
                                                     
                                                        <div className="tools">   
                                                        {classInchanger?
                                                         <Link to={'/class_incharge_add'}>
                                                         <button className="btn btn-pink p-2">Add Class</button>
                                                        </Link>:null}                                                    
                                                           
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body no-padding height-9">
                                                        <div className="row">
                                                            <div className="table-responsive">
                                                                <table className="table table-striped custom-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                <button
                                                                                    title="Ascending order"
                                                                                    className="headerBold">
                                                                                    Class Incharge&nbsp;
                                                                                </button>
                                                                            </th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    
                                                                    <tbody>
                                                                    {getClassIncharge ? 
                                                                        getClassIncharge.map((items: any) => (
                                                                            <tr>
                                                                                <td >
                                                                                     <span className="btn btn-pink btn-circle">{items.class_name}</span></td>
                                                                                <td> 
                                                                                    {items.class_isactive?
                                                                                    <button className="btn btn-primary btn-xs"
                                                                                    title="Edit Class" onClick={() => this.updateClass(getClassIncharge, this.props.match.params.id)}><i className="fa fa-pencil" aria-hidden="true" 
                                                                                    ></i></button>
                                                                                    :<button className="btn btn-disable btn-xs"
                                                                                    title="Edit Class"><i className="fa fa-pencil" aria-hidden="true" ></i></button>}
                                                                                    
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                        :<CommonLoader />}
                                                                    </tbody>
                                                                   
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>                
                <div style={loadingTeacherFull}><SpinnerLoader /></div>
            </div>

        )
    }
}

interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state: any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        getTeacherViewId: state.teacher.items[Number(ownProps.match.params.id)],
        loading: state.teacher.loading,
        errorMessage: state.teacher.errors,
        getTeacherViewData: state.teacher.GetTeacherProfile,
        getTeacherid: state.teacher.TeacherId,
        records: state.teacher.records,
        ClassNameList: state.diary.gradelist,
        SubjectList: state.subjects.category,
        getSubjectClasslist: state.teacher.getSubjectClass,
        classInchargeRecords: state.teacher.classRecords,
        totalSubjectClassCount: state.teacher.SubjectTotal,
        totalClassCount: state.teacher.classCount,

    };
}

export default connect(mapStateToProps, { fetchTeacherPostId, 
    FetchSubjectMappingPost, 
    fetchGetAllClassList, 
    GetCorrectSubject, 
    fetchClassInchargeMappingPost, TeacherClassCountGet })(ViewFullDetailTeacher)
