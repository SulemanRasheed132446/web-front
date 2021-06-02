import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import BreadCrumb from '../../components/BreadCrumb';
import { getInstantFeedBack } from '../../store/dashboard/Actions';
import CommonLoader from '../../components/CommonLoader';
import {fetchCategoryPost} from '../../store/usermanage/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import history from '../../History';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAttendanceStudentView } from '../../store/profile/Actions';

export interface PostsIntantFeedbackProps extends RouteComponentProps<OwnPropsParams> {
    getInstantFeedBack:(postValue:any) => any;
    fetchCategoryPost: () => any;
    getAttendanceStudentView:(postValue:any) => any;
    loading: boolean,
    loginProfile:any,
    getInstantFeedbackData:any,
    pageInstantFeedback: number;
    per_pageInstantFeedback: number;
    totalPageInstantFeedback: number;
    totalInstantFeedback: number;
    getSchoolList:any;
    
}
interface propsInstantFeed {
    slectSchoolId:any,
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
export class InstantFeedback extends Component<PostsIntantFeedbackProps, propsInstantFeed> {
    getClassPropsValue:any;
    getSchoolId:any;
    constructor(props: any) {
        super(props);
        this.state = {
            slectSchoolId: null,
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
        this.getSchoolDetails = this.getSchoolDetails.bind(this);
    }
    componentDidMount(): void {
        const { loginProfile } = this.props;
        window.scrollTo(0, 0);
        this.getClassPropsValue =  this.props.match.params.id;
             
        if(loginProfile){
            const getUserType:any = loginProfile.usertype;
            if(getUserType === 1){
                this.getSchoolNameList();
                this.InstantFeedbackAcademic();
            } else {
                this.InstantFeedbackData();  
            }
        }     
    }
    getSchoolNameList(){
        this.props.fetchCategoryPost().then((res:any)=>{
            const { getSchoolList } = this.props;
            if(getSchoolList.length > 0){
                this.setState({slectSchoolId:getSchoolList[0].id})
                this.InstantFeedbackAcademic();
            }
        }); 
    }
    InstantFeedbackAcademic(){
        const { getSchoolList } = this.props;
        if(this.getClassPropsValue){
            const postValue = {
                page_no:1,
                academic_year: '2021',
                school_id: this.getClassPropsValue
            }
            this.props.getInstantFeedBack(postValue);
            this.setState({slectSchoolId:this.getClassPropsValue})
        }
        if(getSchoolList){
            if(getSchoolList.length){
                const postValue = {
                    page_no:1,
                    academic_year: '2021',
                    school_id: getSchoolList[0].id
                }
                this.props.getInstantFeedBack(postValue);
            }
        }
    }
    InstantFeedbackData(){
        const postValue = {
            page_no:1,
			academic_year: '2021'
		}
        this.props.getInstantFeedBack(postValue);
    }
    getInstantFeedBackResult = (getValue:any) =>{
        const { slectSchoolId } = this.state;
        if(getValue){
            let postValue:any ={ 
                class_id:getValue.class_id,
                school_id: slectSchoolId
            }
            history.push({
                pathname: `/view_instant_feedback/${getValue.id}`,
              });
              this.props.getAttendanceStudentView(postValue);
        }
    }
    public fetchMoreInstantFeedback = () => {
        const { slectSchoolId } = this.state;
        if (this.state.hasMore === true) {
         if (Math.ceil(this.props.totalInstantFeedback / this.props.per_pageInstantFeedback) > this.props.pageInstantFeedback) {   
            const postValue = {
              page_no: this.state.page + 1,
              search: this.state.search,
              sort_by: this.state.SortOrderData,
              order_by: this.state.OrderNameData,
              academic_year: '2021',
              school_id: slectSchoolId
            }              
            this.props.getInstantFeedBack(postValue);
            this.setState({
              page: this.state.page + 1
            }) 
          }
    
          if (Math.ceil(this.props.totalInstantFeedback / this.props.per_pageInstantFeedback) === this.props.pageInstantFeedback) {
            this.setState({
              hasMore: false,
            })
          }
        }
      }
    private instantFeedBackTable(record:any){
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        return (
            <InfiniteScroll
            dataLength={this.props.getInstantFeedbackData.length}
            next={this.fetchMoreInstantFeedback}
            hasMore={this.state.hasMore}
            loader={<h4 style={loadingTextCSS}>Loading...</h4>}
          >
        <table className="table table-striped custom-table table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Class Name</th>
                <th>Subject</th>
                <th>Performance (Average)</th>
                <th>Time</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {record.length > 0 ?
                record.map((items: any, index: any) => (
                    <tr key={index}>
                        <td className="titleCapitalize">{items.name}</td>
                        <td>{items.class_name}</td>
                        <td>{items.subject_name}</td>
                        <td>{items.performance}</td>
                        <td>{items.created_at}</td>
                        <td> <Link to={`#`} onClick={()=> this.getInstantFeedBackResult(items)}>
                            <button className="btn btn-primary btn-xs"
                                title="View Question Set"><i className="fa fa-eye" aria-hidden="true"></i></button></Link></td>
                    </tr>
                ))
                : <CommonLoader/>
            }
        </tbody>
    </table>
    </InfiniteScroll>
    )
    }
 
    getSchoolDetails = (event:any)=>{
        let getValue = event.target.value;
        this.setState({ slectSchoolId: event.target.value });
        if(getValue){
            const postValue = {
                page_no:1,
                academic_year: '2021',
                school_id: getValue
            }
            this.props.getInstantFeedBack(postValue);            
        }
    }
    render() {
        const { loading, getInstantFeedbackData, getSchoolList } = this.props;
        const { slectSchoolId } =  this.state;
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
                                titleName={['Instant Feedback']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['Instant Feedback']} />
                                    {academicAdminUserTypes ?
                                <div className="row">
                                     <div className="col-md-4"></div>
                                    <div className="col-md-5"></div>
                                    {SchoolListAdd?
                                    <div className="col-md-3 mb-4 pull-right">                                       
									<select name="classlist" value={slectSchoolId} className="form-control" onChange={this.getSchoolDetails}>
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
                                        <div className="card card-topline-red">
                                            <div className="mr-4 mt-2">
                                                
                                            </div>
                                            <div className="card-head" >
                                                <header>
                                                </header>
                                                <div className="tools">
                                                <h4 className="pull-right">Total: {this.props.totalInstantFeedback}</h4>
                                                    {/* <input
                                                        placeholder="Search"
                                                        name="search"
                                                        className="form-control" 
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="card-body no-padding height-9">
                                                <div className="table-responsive">
                                                    {this.instantFeedBackTable(getInstantFeedbackData)}                                                   
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
        getInstantFeedbackData:state.dashboard.records_InstantFeedBack,
        pageInstantFeedback:state.dashboard.page_InstantFeedBack,
        per_pageInstantFeedback:state.dashboard.per_page_InstantFeedBack,
        totalInstantFeedback:state.dashboard.total_InstantFeedBack,
        totalPageInstantFeedback:state.dashboard.totalPageInstantFeedBack,
        getSchoolList:state.userManage.category,
        loading:state.dashboard.loading
    }
}

export default connect(mapStateToProps, {getInstantFeedBack, fetchCategoryPost, getAttendanceStudentView})(InstantFeedback)
