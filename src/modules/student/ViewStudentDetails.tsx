import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import { LoadMoreType } from '../../components/type';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { StudentType } from '../../store/student/Types';
import { CommonState } from '../../components/type';
import { fetchGradePost, fetchGradeStandardPost } from '../../store/classes/Actions';
import { FormControlLabel, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik,  Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Modal from 'react-bootstrap/Modal';
import Switch from '@material-ui/core/Switch';
import { deleteStudent, fetchStudentPost } from '../../store/student/Actions';
import CommonLoader from '../../components/CommonLoader';
import { notificationMsg } from '../../services/Constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMyClassListGet, fetchMySectionListGet } from '../../store/classes/Actions';
import { formValidationPatten } from '../../services/Constants';
import toaster from "toasted-notes";
import history from '../../History';

export interface PostsStudentProps {
  loading: boolean;
  loadingClass:boolean;
  getClassSectionData?:any;
  studentDetails: StudentType;
  studentDetailDelete: StudentType;
  deleteStudentDetails: any;
  ListGrade:any;
  ListStandard:any;
  fetchStudentPost: (loadMoreType: LoadMoreType) => any;
  deleteStudent: (studentDetailDelete: any) => any;
  addStudent: (student: StudentType) => any;
  fetchGradePost:() => any;
  fetchGradeStandardPost:() => any;
  fetchMyClassListGet:() => any;
  fetchMySectionListGet:(grade:any) => any;
  page: number;
  per_page: number;
  totalPage: number;
  records: any;
  total: number;
  sectionLoadError?:any
}
export interface listProps{
  grade:string,
  standard:string
}

export class ViewStudentDetails extends React.Component<PostsStudentProps, CommonState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      showDelete: false,
      addShow: false,
      acadamicAdmin: false,
      schoolAdmin: false,
      bothData: false,
      teacher: false,
      parent: false,
      deleteStudentId: [],
      query: '',
      studentData: [],
      subjectsTotal: 1,
      hasMore: true,
      prev: 0,
      next: 0,
      acsOrder: true,
      descOrder: false,
      page:1,
      page_no: 1,
      search: '',
      SortOrderData: '',
      OrderNameData: '',
      checkedstudent:true,
      academic_year:2021,
      class_id:7,
      grade: '',
      standard: ''
    };
  }
  componentDidMount(): void {
    window.scrollTo(0, 0);
    this.getSchoolDetails();
  }
  // This is function used to get student details and grade and section
  getSchoolDetails(){
    const { getClassSectionData } = this.props;
    this.props.fetchGradePost();
    if(getClassSectionData){
      let getValue:any = getClassSectionData;
      if(getValue){
        this.setState({grade:getValue.class_name, standard: getValue.section_name})
        this.getChangeStudnetDetails(getValue);
      }
    } else {
      this.props.fetchMyClassListGet().then((res:any)=>{
        const { ListGrade } = this.props;
        let selectedValue:any;
        if(ListGrade.length) {
          selectedValue = ListGrade[0].value;
          this.setState({grade:selectedValue})
        }
        const getClassName ={
          grade:selectedValue
        }
        if(getClassName){
          this.props.fetchMySectionListGet(getClassName).then((res:any)=>{
            const { ListStandard } = this.props;
            let selectStandard:any;
            if(ListStandard){
              if(ListStandard.length) {
                selectStandard = ListStandard[0].value;
                this.setState({standard:selectStandard})
              }
              this.getStudnetDetails();
            }else {
              let errorMessage:any = this.props.sectionLoadError;
              if(errorMessage.status === false){
                toaster.notify(errorMessage.message, {
                  position: 'top',
                  duration: notificationMsg.duration
              });
              history.push('/');
              }
             
            }
          }) 
        }
   
      });
    }
   
  }
  getStudnetDetails(){
    const { grade, standard } = this.state;
      const getPostStudent = {
        page_no: 1,
        academic_year:this.state.academic_year,
        search:this.state.search,
        grade:grade,
        standard:standard
      }
      this.props.fetchStudentPost(getPostStudent).then((res:any)=>{
        window.scrollTo(0, 0);
      });
  }
  getChangeStudnetDetails(getData:any){
    let getValue:any = getData;
    if(getValue){
         const getPostStudent = {
        page_no: 1,
        academic_year:this.state.academic_year,
        search:this.state.search,
        grade:getValue.class_name,
        standard:getValue.section_name
      }
         this.props.fetchStudentPost(getPostStudent).then((res:any)=>{
          window.scrollTo(0, 0);
        });
    }
  
   
  }
  checkDeleteStatus(){
    const selectStudentDataList = this.props.deleteStudentDetails;
    if (selectStudentDataList === true) {
      const getPostStudent = {
        page_no: 1,
        academic_year:this.state.academic_year,
        class_id:this.state.class_id,
        search:this.state.search,
        grade:this.state.grade,
        standard:this.state.standard
      }
      this.props.fetchStudentPost(getPostStudent).then((res:any)=>{
        window.scrollTo(0, 0);
      });
    }
  }
  handleInputStudentChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;    
    var intRegex = formValidationPatten.alphanumericTest;
    if(intRegex.test(getSearchValue) || getSearchValue === ''){
      if (getSearchValue) {
        const postSearchValue = {
          page_no: 1,
          academic_year:this.state.academic_year,
          class_id:this.state.class_id,
          search: getSearchValue,
          grade:this.state.grade,
          standard:this.state.standard
        }
        this.props.fetchStudentPost(postSearchValue);
        this.setState({
          hasMore: true,
          page_no: 1,
          search: getSearchValue
        })
      } else {
        const postSearchValue = {
          page_no: 1,
          search: '',
          academic_year:this.state.academic_year,
          class_id:this.state.class_id,
          grade:this.state.grade,
          standard:this.state.standard
        }      
        this.props.fetchStudentPost(postSearchValue);
        this.setState({
          hasMore: true,
          page_no: 1,
          search: ''
        })
      }
    }
   
  }
  public handleDelete = () => {
    this.props.deleteStudent(this.state.deleteStudentId).then((items:any)=>{
      window.scrollTo(0, 0);
    });
    this.setState({ showDelete: false, hasMore: true });
  }
  public hideStudentDelete = () => {
    this.setState({ showDelete: false, hasMore: true });
  }
  public showStudentDelete = (getData: any) => {
    this.setState({ showDelete: true, deleteStudentId: getData });
  }

  private renderStudentManageDelete() {
    const actionOption = this.state.deleteStudentId;
    let titleStudentMessage: any;
    const titleStudentMsg = 'Please Confirm'
    if (actionOption.isActive === true) {
      titleStudentMessage = 'Activate';
    } else {
      titleStudentMessage = 'Deactivate';
    }    
    return (
      <div>
        <Modal show={this.state.showDelete}>
          <Modal.Header className="pb-0 pt-0">
            <Modal.Title>{titleStudentMsg}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure want to {titleStudentMessage} the Student?</p>
          </Modal.Body>

          <Modal.Footer className="modelboxbutton">
            <button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.handleDelete}>Okay</button>
            <button className="btn btn-default mr-1 ml-1 w-15" onClick={this.hideStudentDelete}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
  public fetchMoreStudentData = () => {
    if (this.state.hasMore === true) {
      if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
        const postValue = {
          page_no:  this.state.page + 1,
          academic_year:this.state.academic_year,
          class_id:this.state.class_id,
          search:this.state.search,
          grade:this.state.grade,
          standard:this.state.standard
        }
        this.props.fetchStudentPost(postValue);
        this.setState({
          page: this.state.page + 1
        })
      }

      if (Math.ceil(this.props.total / this.props.per_page) === this.props.page) {
        this.setState({
          hasMore: false,
        })
      }
    }
  }
getGradeOption = (e: any) => {
  const { value } = e.target;
  const getValue = value;
  this.setState({ grade: getValue, hasMore: true });
  const getClassName ={
    grade:getValue
  }
  if(getClassName){
    this.props.fetchMySectionListGet(getClassName) 
  }
  setTimeout(() => {
  this.getStudnetDetails()
}, notificationMsg.getDuration);
}

getStandardOption = (e: any) => {
  const { value } = e.target;
  const getStandard = value;
  this.setState({ standard: getStandard, hasMore: true });
  setTimeout(() => {
  this.getStudnetDetails()
}, notificationMsg.getDuration);
}
//in your component
addDefaultSrc= (ev:any) =>{
  ev.target.src = 'assets/img/user/teacher-profile.jpg'
}

renderStudentDetails(){
  const { loading, loadingClass } = this.props;
  const loadingStudent = { display: loading || loadingClass ? "block" : "none" };
  return (
    <div>
       <InfiniteScroll
          dataLength={this.props.records.length}
          next={this.fetchMoreStudentData}
          hasMore={this.state.hasMore}
          loader={<h4 style={loadingStudent}>Loading...</h4>}
        >
        {this.props.records.length > 0 ?
        <div className="row mt-5 w-100">
        { 
          this.props.records.map((items:any, index:any) => (
            <div className="col-md-3">
              <div className="card">
                <div className="m-b-20">
                  <div className="doctor-profile">
                    <div id="studentList" className='profile-header bg-b-danger'>  
                    <div className="pull-right">                                                     
                    </div>                                  
                    </div>
                    {items.studentclass_details.profile_picture ? 
                    
                    <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${items.studentclass_details.profile_picture}`} 
                    className="user-img mb-2" alt="Student Profile" />
                    : <img src="assets/img/user/teacher-profile.jpg" className="user-img mb-2" alt="" />}                   
                    <div>
                    <div className="user-name mt-0">{items.student_name}</div>
                      <p>Card Id: {items.studentclass_details.card_id}</p>
                    </div>
                    <div className="profile-userbuttons">
                    {items.studentclass_details.is_active ?
                      <Link to={`/student_edit/${items.id}`} className="btn btn-circle btn-default btn-sm" title="Edit Student"><i
                        className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                        :<Link to={'#'} className="btn btn-circle btn-disable btn-sm"><i
                        className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>}
                        <Link to={`/student_profile/${items.id}`} className="btn btn-circle btn-pink btn-sm" title="View Student Profile">
                          <i className="fa fa-eye" aria-hidden="true"></i></Link>                          
                    </div>
                    
                  <div className="pull-right">                  
                          {items.studentclass_details.is_active ? <FormControlLabel
                            value="start"
                            control={<Switch
                              checked={items.studentclass_details.is_active}
                              onClick={() => this.showStudentDelete({ id: String(items.id), isActive: false, academic_year:"2021" })}
                              name="checkedA"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}                               
                            title="Deactivate Student"                             
                            />}
                            className="mr-1 mt-2"
                            label="Active"
                            labelPlacement="start"
                          /> : 
                          <FormControlLabel
                            value="end"
                            control={<Switch
                              checked={items.studentclass_details.is_active}
                              onClick={() => this.showStudentDelete({ id: String(items.id), isActive: true, academic_year:"2021" })}
                              name="checkedA"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}                              
                            title="Activate Student"
                            />}
                            className="mr-3 mt-2"
                            label="Inactive"
                            labelPlacement="end"
                          />
                           }
                  </div>
                  </div>
                </div>
              </div>
            </div>                         
          ))}                        
        </div>
        : <CommonLoader/>}
      </InfiniteScroll>
    </div>
  )
}
      // This is the functio use to filter grit data
      public showFilterStudent = (getdata: any) => {
        if (getdata.sort_by === 'desc') {
          this.setState({ 
            acsOrder: false, 
            search: '',
            SortOrderData: getdata.sort_by,
            OrderNameData: getdata.order_by,
            role: this.state.role
          })
          const postValue = {
            page_no: 1,
            academic_year:this.state.academic_year,
            class_id:this.state.class_id,
            search:this.state.search,
            grade:this.state.grade,
            standard:this.state.standard,
            sort_by: getdata.sort_by,
            order_by: getdata.order_by
          }
          this.setState({
            hasMore: true,
            SortOrderData: getdata.sort_by,
            OrderNameData: getdata.order_by,
            page: 1
          })
          this.props.fetchStudentPost(postValue);
        } else {
          this.setState({ 
            acsOrder: true, 
            SortOrderData: getdata.sort_by, 
            OrderNameData: getdata.order_by, 
            search: '' })
          const postValue = {
            page_no: 1,
            academic_year:this.state.academic_year,
            class_id:this.state.class_id,
            search:this.state.search,
            grade:this.state.grade,
            standard:this.state.standard,
            sort_by: getdata.sort_by,
            order_by: getdata.order_by
          }
          this.setState({
            hasMore: true,
            SortOrderData: getdata.sort_by,
            OrderNameData: getdata.order_by,
            page: 1
          })
          this.props.fetchStudentPost(postValue);
        }
      }
  render() {
    const { grade, standard } = this.state;
    this.checkDeleteStatus();
    const { loading, ListStandard } = this.props;
    const loadingStudent = { display: loading ? "block" : "none" };
    let gradeList:any;
    if(this.props.ListGrade){
      gradeList = this.props.ListGrade;
    }  
    const initialListValues:listProps = {
      grade: this.state.grade,
      standard: this.state.standard
    }

    return (
      <div>
        {this.renderStudentManageDelete()}
        <div className="page-wrapper">
          <div className="page-content-wrapper">
            <div className="page-content pt-3">
              <BreadCrumb
                titleName={['Student']}
                homeName={['Home']}
                url={['dashboard']}
                mainPageTitle={['Student']} />
              <div>
                {ListStandard && gradeList ?
                <div className="row">
                  <div className="col-md-12">
                      <div className="row mb-4">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <header className="mt-3 mb-3">
                          <Link to={'/student_add'}>
                            <button className="btn btn-pink">Add Student</button>
                          </Link>
                          {this.state.acsOrder ?
                          <button onClick={() => this.showFilterStudent({ sort_by: 'desc', order_by: 'student_name' })}
                            title="Ascending order" className="btn btn-default ml-2">Student Name&nbsp;
                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                            onClick={() => this.showFilterStudent({ sort_by: 'asc', order_by: 'student_name' })}
                            title="Descending order" className="btn btn-default ml-2">
                            Student Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
                        </header>
                      </div>
                      <div className="col-md-5 mt-0">
                      <Formik
                      initialValues={initialListValues} onSubmit={(values, actions) => {
                        }}>
                        {({ values, errors, isSubmitting, isValidating, handleChange, dirty, touched }) => (
                      <Form>
                      <div className="row">
                      <div className="col-md-6 col-sm-6 col-6">                   
                      <FormGroup>
                      <Field label='Grade*' name="grade" value ={grade} select component={TextField}  disabled={false}  onChange={this.getGradeOption}>                       
                        { gradeList.map((item:any) =>(
                                          <MenuItem value={item.value}>{item.value}</MenuItem>
                          ))
                        }
                      </Field>
                        </FormGroup>                         
                      </div>
                      <div className="col-md-6 col-sm-6 col-6">
                       <FormGroup>
                      <Field label='Section*' name="standard" select value = {standard} component={TextField} 
                      onChange={this.getStandardOption} disabled={false} fullwidth>
                        { this.props.ListStandard.map((item:any) =>(
                                          <MenuItem value={item.value}>{item.value}</MenuItem>
                                  ))
                        }
                      </Field>
                        </FormGroup> 
                      </div>                      
                      </div>
                      </Form>
                        )}
                      </Formik>
                      </div>
                      <div className="col-md-3">
                      <div className="row">
                      <div className="col-md-8 col-sm-8 col-8 mt-3">
                        <div className="tools">
                            <input
                              placeholder="Search"
                              name="search"
                              className="form-control"
                              onChange={this.handleInputStudentChange}
                            />
                        </div> 
                        </div> 
                        <div className="col-md-4 col-sm-4 col-4 mt-3 pl-0">
                          <h4 className="pull-right">Total: {this.props.total}</h4>
                        </div>
                      </div>                       
                      </div>
                      </div>
                     {this.renderStudentDetails()}                   
                  </div>
                </div>
                 :<div style={loadingStudent}><SpinnerLoader /></div>}
              </div>
            </div>
          </div>
        </div>
        <div style={loadingStudent}><SpinnerLoader /></div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    getClassSectionData:state.profile.getStudentClasses,
    ListGrade:state.classes.my_class,
    ListStandard:state.classes.my_section,
    studentDetails: state.student.items,
    loading: state.student.loading,
    loadingClass:state.classes.loading,
    total: state.student.total,
    per_page: state.student.per_page,
    records: state.student.records,
    page: state.student.page,
    totalPage: state.student.totalPage,
    deleteStudentDetails: state.student.isAuthenticated,
    sectionLoadError:state.classes.errors
  };
}

export default connect(mapStateToProps, { fetchGradePost, 
  fetchGradeStandardPost, 
  deleteStudent, 
  fetchStudentPost, 
  fetchMyClassListGet, 
  fetchMySectionListGet })(ViewStudentDetails)
