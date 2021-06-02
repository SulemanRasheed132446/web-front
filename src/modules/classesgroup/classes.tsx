import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import {fetchCategoryPost} from '../../store/usermanage/Actions';
import { getClassesReport } from '../../store/dashboard/Actions';
import CommonLoader from '../../components/CommonLoader';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import history from '../../History';
import { getAttendanceStudentView } from '../../store/profile/Actions';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface PostsClassesProps extends RouteComponentProps<OwnPropsParams>{
    loginProfile?: any,
    fetchCategoryPost: () => any;
    getClassesReport: (postValue:any) => any;
    getAttendanceStudentView:(postValue:any) => any;
    loading?: boolean,
    getSchoolList?:any,
    ClassesReport?:any,
    total?:any, 
    getYear?:any,
    perPage?:any,
    pageNo?:any
}
export interface propsTypes {
    getCorrectSchoolId:any,
    getCurrectYear?:any,
    hasMore:boolean,
    prev: any,
    next: any,
    acsOrder: any,
    descOrder: any,
    page:any,
    per_page: any,
    records:any,
    total:any,
    totalPage:any,
    search: any,
    SortOrderData:any,
    OrderNameData:any
}
export class classes extends Component<PostsClassesProps, propsTypes> {
    getClassPropsValue:any;
    constructor(props: any) {
        super(props);
        this.state = {
            getCorrectSchoolId:null,
            getCurrectYear: this.props.getYear,
            hasMore: true,
            prev: 0,
            next: 10,
            acsOrder: true,
            descOrder: false,
            page: 1,
            per_page: 10,
            records: [],
            total: 0,
            totalPage: 0,
            search: '',
            SortOrderData:'',
            OrderNameData:''
        }
    }
    componentDidMount(): void {
        const { loginProfile } = this.props;
        window.scrollTo(0, 0);
        let getUserType:any = loginProfile.usertype
    if(loginProfile){
        if(getUserType === 1){
            this.getAcdemicAdminLogin();
        } else if(getUserType === 2){
            this.ClassesReportList();
        } else if(getUserType === 3){
            this.ClassesReportList();
        }
    }   
    }
    getAcdemicAdminLogin(){
        this.props.fetchCategoryPost().then((res:any)=>{
            const {getSchoolList} = this.props;
            this.getClassPropsValue =  this.props.match.params.id;   
            if(this.getClassPropsValue) {
                this.setState({getCorrectSchoolId: this.getClassPropsValue})
                this.academicAdminLogin();
            } else if(getSchoolList.length){
                    this.setState({getCorrectSchoolId: getSchoolList[0].id})
                    this.academicAdminLogin();
                } 
        });
    }
    ClassesReportList() {
        const{ getCurrectYear } = this.state;
        if(getCurrectYear){
            const postValue = {
                page_no:1,
                academic_year:getCurrectYear
            }
            this.props.getClassesReport(postValue); 
        }
           
}
academicAdminLogin(){
    const { getCorrectSchoolId, getCurrectYear } = this.state; 
    if(this.getClassPropsValue && getCurrectYear){
        const postValue = {
            page_no:1,
            academic_year: getCurrectYear,
            school_id: this.getClassPropsValue
        }
        this.props.getClassesReport(postValue);
    } else {
        if(getCurrectYear){
            const postValue = {
                page_no:1,
                academic_year: getCurrectYear,
                school_id: getCorrectSchoolId
            }
            this.props.getClassesReport(postValue);
        }
      
    }
    
}
    getfilterClasses = (e:any) =>{
        const{ getCurrectYear } = this.state;
    const { value } = e.target;
    if(value && getCurrectYear){
        const postValue = {
            page_no:1,
            academic_year: getCurrectYear,
            school_id:value
        }
        this.props.getClassesReport(postValue);
        this.setState({getCorrectSchoolId: value})
    }
    }
    getClassResport = (getValue:any) =>{
        const { getCorrectSchoolId } = this.state;
        if(getValue){
            let getClassName:any = getValue.class_name
            let postViewQuzzis:any = {
                classResport:getValue,
                school_id: getCorrectSchoolId
            }
            history.push({
                pathname: `/classes_report/${getValue.id}`,
                state:{class_id:getClassName}
              });
              localStorage.setItem("classesInfo", getClassName)
              this.props.getAttendanceStudentView(postViewQuzzis);
        }
    }
    getOpenResport = (postValue:any) =>{
        if(postValue){
            history.push({
                pathname: `/quizzes_report/${postValue.quiz_id}`,
              });
        }   
    }
    public fetchMoreClassesReport = () => {
        const { getCorrectSchoolId } = this.state;
        if (this.state.hasMore === true) {
         if (Math.ceil(this.props.total / this.props.perPage) > this.props.pageNo) {   
            const postValue = {
              page_no: this.state.page + 1,
              search: this.state.search,
              sort_by: this.state.SortOrderData,
              order_by: this.state.OrderNameData,
              academic_year: '2021',
              school_id: getCorrectSchoolId
            }              
            this.props.getClassesReport(postValue);
            this.setState({
              page: this.state.page + 1
            }) 
          }
    
          if (Math.ceil(this.props.total / this.props.perPage) === this.props.pageNo) {
            this.setState({
              hasMore: false,
            })
          }
        }
      }
    render() {
        const { getSchoolList, ClassesReport, loading } = this.props;
        const { getCorrectSchoolId } = this.state;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let academicAdminUserTypes: any = false;
        const getUserType: any = this.props.loginProfile.usertype;
        if (getUserType === 1) {
            academicAdminUserTypes = true;
        }
        const getSchoolListData:any = getSchoolList;
        let SchoolListAdd:any;
        if(getSchoolList){
            SchoolListAdd = getSchoolListData;
        }
        return (
            <div>
                <div>
                    <div className="page-wrapper">
                        <div className="page-content-wrapper">
                            <BreadCrumb 
                            titleName={['Classes']} 
                            homeName={['Home']} 
                            url={['dashboard']}
                            mainPageTitle={['Classes']} />
                            {academicAdminUserTypes ?
                                <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-5"></div>
                                {SchoolListAdd?
                                    <div className="col-md-3 mb-4 pull-right">                                       
									<select name="classlist" className="form-control" value={getCorrectSchoolId} onChange={this.getfilterClasses}>
										{SchoolListAdd.map((items: any) => (
											<option value={items.id}> {items.school_name} </option>
										))}
									</select>
                                    </div>
                                    :null}
                                </div>
                                : null}
<>
                            <InfiniteScroll
                            dataLength={this.props.ClassesReport.length}
                            next={this.fetchMoreClassesReport}
                            hasMore={this.state.hasMore}
                            loader={<h4 style={loadingTextCSS}>Loading...</h4>}
                        >
                                {ClassesReport.length > 0?
                            <div className="row">
                                {
                                    ClassesReport.map((items: any) => (
                                        <div className="col-md-3">
                                                <div className="card">
                                                    <div className="m-3 mt-0 mb-0">
                                                        <div className="doctor-profile">
                                                            <div className="width100 text-center">
                                                                <button
                                                                className="mdl-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-pink" onClick={()=> this.getClassResport(items)}>
                                                                <h4><small className="font-color font14">{items.class_name}</small></h4>
                                                            </button>
                                                            </div>
                                                            <div className="classes-height">
                                                            <Link to={"#"} onClick={()=> this.getClassResport(items)}><h4 className="text-center"><strong>Recent Quizzes</strong></h4></Link>
                                                                {items.quizzes ?    
                                                            <Link to={"#"} >
                                                                <ul className="text-center">
                                                                    {items.quizzes.map((items: any) => (
                                                                        <li onClick={()=> this.getOpenResport(items)}>{items.name}</li>
                                                                    ))}
                                                                </ul>
                                                            </Link>
                                                                :null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                        </div>
                                    ))}
                            </div>
                            :<CommonLoader/>}
                            </InfiniteScroll>
                            </>
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state: any) => {
    return {
        getYear:state.profile.getYear,
        loginProfile: state.profile.profileData,
        getSchoolList:state.userManage.category,
        ClassesReport:state.dashboard.recordsClassesReport,
        total:state.dashboard.totalClassesReport,
        loading:state.dashboard.loading,
        perPage:state.dashboard.perPageClassesReport,
        pageNo:state.dashboard.pageClassesReport
    }
}

export default connect(mapStateToProps, {fetchCategoryPost, getClassesReport, getAttendanceStudentView})(classes)
