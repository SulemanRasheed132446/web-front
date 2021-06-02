import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { getQuizReport } from '../../store/dashboard/Actions';
import CommonLoader from '../../components/CommonLoader';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import {fetchCategoryPost} from '../../store/usermanage/Actions';
import { RouteComponentProps } from 'react-router';
import history from '../../History';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formValidationPatten } from '../../services/Constants';
import { getAttendanceStudentView } from '../../store/profile/Actions';

export interface PostsQuizzesProps extends RouteComponentProps<OwnPropsParams> {
    getQuizReport:(postValue:any) => any;
    fetchCategoryPost: () => any;
    getAttendanceStudentView:(postValue:any) => any;
    loading: boolean,
    loginProfile:any,
    getQuizzesReport:any,
    total:any;
    getSchoolList:any;
    pageQuiz:any;
    perPageQuiz:any;
}
export interface propsTypes {
    getCorrectSchoolId:any,
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
export class Quizzes extends Component<PostsQuizzesProps, propsTypes> {
    getSchoolPropsValue:any;
    constructor(props: any) {
        super(props);
        this.state = {
            getCorrectSchoolId:null,
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
        window.scrollTo(0, 0);
        this.props.fetchCategoryPost().then((res:any)=>{
            const { getSchoolList } = this.props;
            if(getSchoolList){
                if(getSchoolList.length>0){
                    this.setState({getCorrectSchoolId: getSchoolList[0].id})
                }
            }
        }); 
        this.getSchoolPropsValue =  this.props.match.params.id;
        if(this.getSchoolPropsValue) {
            this.setState({getCorrectSchoolId: this.getSchoolPropsValue})
        }
        this.quizzesReportAcademic();              
    }
    quizzesReportAcademic() {
        this.getSchoolPropsValue =  this.props.match.params.id;
        if(this.getSchoolPropsValue) {
            const postValue = {
                page_no:1,
                academic_year: '2021',
                school_id: this.getSchoolPropsValue
            }
            this.props.getQuizReport(postValue);
        } else {
            const postValue = {
                page_no:1,
                academic_year: '2021'
            }
            this.props.getQuizReport(postValue);
        }
           
    }
    getFilterQuizze = (e:any) =>{
        const { value } = e.target;
        if(value){
            const postValue = {
                page_no:1,
                academic_year: '2021',
                school_id:value
            }
            this.props.getQuizReport(postValue);
            this.setState({getCorrectSchoolId: value})
        }
    }
    getQuizzesResult = (getValue:any) =>{
        console.log(getValue, 'getValue...')
        let postValue:any = {
            getQuizzesDetails:getValue,
            school_id:this.state.getCorrectSchoolId
        }
        history.push({
			pathname: `/quizzes_report/${getValue.quiz_id}`,
          });
        this.props.getAttendanceStudentView(postValue)
    }
    
  handleQuizzesChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;
    var intRegex = formValidationPatten.alphanumericTest;
    if(intRegex.test(getSearchValue) || getSearchValue === ''){
      if (getSearchValue) {
        const postSearchValue = {
          page_no: 1,
          search: getSearchValue,
          academic_year: '2021',
          school_id: this.state.getCorrectSchoolId
        }
        this.props.getQuizReport(postSearchValue);
        this.setState({
          hasMore: true,
          page: 1,
          search: getSearchValue
        })
      } else {
        const postSearchValue = {
          page_no: 1,
          search: ''
        }
        this.props.getQuizReport(postSearchValue);
        this.setState({
          hasMore: true,
          page: 1,
          search: ''
        })
      }
    } else {

    }
  
  }
  public showFilterData = (getdata: any) => {
    if (getdata.sort_by === 'desc') {
      this.setState({ acsOrder: false })
      const postValue = {
        page_no: 1,
        academic_year: '2021',
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.props.getQuizReport(postValue);
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
    } else {
      this.setState({ acsOrder: true })
      const postValue = {
        page_no: 1,
        academic_year: '2021',
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.props.getQuizReport(postValue);
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
    }
  }
  public fetchMoreQuizzes = () => {
    if (this.state.hasMore === true) {
     if (Math.ceil(this.props.total / this.props.perPageQuiz) > this.props.pageQuiz) {   
        const postValue = {
          page_no: this.state.page + 1,
          search: this.state.search,
          sort_by: this.state.SortOrderData,
          order_by: this.state.OrderNameData,
          academic_year: '2021',
          school_id: this.state.getCorrectSchoolId
        }              
        this.props.getQuizReport(postValue);
        this.setState({
          page: this.state.page + 1
        }) 
      }

      if (Math.ceil(this.props.total / this.props.perPageQuiz) === this.props.pageQuiz) {
        this.setState({
          hasMore: false,
        })
      }
    }
  }

    render() {
        const { loading, getQuizzesReport, total, getSchoolList } = this.props;
        const { getCorrectSchoolId } = this.state;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let academicAdminUserTypes:any = false;
        const getUserType:any = this.props.loginProfile.usertype;
        if(getUserType === 1){
            academicAdminUserTypes = true;
        }
        const getSchoolListData:any = getSchoolList;
        let SchoolListAdd:any;
        if(getSchoolList){
            SchoolListAdd = getSchoolListData;
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Quizzes']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['Quizzes']} />
                                    {academicAdminUserTypes ?
                                <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-5"></div>
                                    {SchoolListAdd?
                                    <div className="col-md-3 mb-4 pull-right">                                       
									<select name="classlist" className="form-control" value={getCorrectSchoolId} onChange={this.getFilterQuizze}>
										{SchoolListAdd.map((items: any) => (
											<option value={items.id}> {items.school_name} </option>
										))}
									</select>
                                    </div>
                                    :null}
                                </div>
                                : null}
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="mr-4 mt-2">
                                                <h4 className="pull-right">Total: {total}</h4>
                                            </div>
                                            <div className="card-head" >
                                                <header>
                                                </header>
                                                <div className="tools">
                                                    {/* <input
                                                        placeholder="Search"
                                                        name="search"
                                                        className="form-control"
                                                        onChange={this.handleQuizzesChange}
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="card-body no-padding height-9">
                                                <div className="table-responsive">
                                                <InfiniteScroll
                                                        dataLength={this.props.getQuizzesReport.length}
                                                        next={this.fetchMoreQuizzes}
                                                        hasMore={this.state.hasMore}
                                                        loader={<h4 style={loadingTextCSS}>Loading...</h4>}
                                                    >
                                                    <table className="table table-striped custom-table table-hover">
                                                        <thead>
                                                            <tr>
                                                            <th>
                                                            Name
                                                            </th>
                                                            <th>
                                                            Class Name
                                                            </th>
                                                            <th>
                                                            Subject
                                                            </th>
                                                            <th>
                                                            Performance (Average)
                                                            </th>
                                                            <th>
                                                            Time 
                                                            </th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        {getQuizzesReport? 
                                                        <tbody>
                                                            {
                                                                getQuizzesReport.map((items: any, index: any) => (
                                                                    <tr key={index}>
                                                                        <td>{items.question_set_name}</td>
                                                                        <td>{items.class_name}</td>
                                                                        <td>{items.subject_name}</td>
                                                                        <td>{items.performance}</td>
                                                                        <td>{items.time}</td>
                                                                        <td> <Link to={`#`} onClick={()=> this.getQuizzesResult(items)}>
                                                                            <button className="btn btn-primary btn-xs"
                                                                                title="View Question Set"><i className="fa fa-eye" aria-hidden="true"></i></button></Link></td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                        :<CommonLoader/>}
                                                    </table>
                                                </InfiniteScroll>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        loginProfile:state.profile.profileData,
        getQuizzesReport:state.dashboard.recordsQuizReport,
        loading:state.dashboard.loading,
        total:state.dashboard.totalQuizReport,
        getSchoolList:state.userManage.category,
        pageQuiz:state.dashboard.pageQuizReport,
        perPageQuiz:state.dashboard.perPageQuizReport
    }
}

export default connect(mapStateToProps, {getQuizReport, fetchCategoryPost, getAttendanceStudentView})(Quizzes)
