import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { diaryList } from '../../store/diary/Types';
import { StudentList } from '../../components/StudentList';
import ImageUpload from '../../components/ImageUpload';
import {
  fetchDiaryPost, fetchGetAllClassList,
  fetchGetStudent,
  addDiaryPost,
  fetchSearchAllStudent
} from '../../store/diary/Actions';
import { diaryType } from '../../store/diary/Types';
import CommonLoader from '../../components/CommonLoader';
import { Button, FormGroup } from '@material-ui/core';
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { NoticesBoardValidation } from './NoticeBoardValidation';
import { NoticesBoard } from '../../services/Config';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Checkbox, TextField as MTextField } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { studentValida, FormvalidationMessage } from '../../services/Constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants';
import history from '../../History';
import '../diary/DiaryStyle.scss';

export interface PostsDiaryProps {
  fetchDiaryPost: (getDiary: any, url: any) => any;
  fetchGetAllClassList: (loadMoreType: any) => any;
  fetchGetStudent: (getStudentList: any) => any;
  addDiaryPost: (addDiaryPost: diaryType, URLPath: any) => any;
  fetchSearchAllStudent: (searchStudent: any) => any;
  loading: boolean
  DiaryDetails: any;
  AllClassList: any;
  AllStudentList: any;
  page: number;
  per_page: number;
  totalPage: number;
  records: any;
  total: number;
  getDiaryImageURL: any;
  loadingStudent: boolean;
  getResponseClassList: any;
  getResponseStudent: any;
  errorMessage: any;
  getProfile: any;
  getSearchStudentList: any,
  updateStatuRecord?: any
}
export interface addNoticeBoard {
  your_title: string,
  message: string,
  diaryMessageDetails: boolean
}
const initialNoticeBoard: addNoticeBoard = {
  your_title: '',
  message: '',
  diaryMessageDetails: true
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export class ViewNoticeBoard extends React.Component<PostsDiaryProps, diaryList>  {
  formikNoticeBoard: any
  getAllStudentDetails: any = [];
  getStudentList: any;
  getClassList: any = [];
  postStudentList: any = [];
  getDiaryImage: any
  state = {
    checkedListAll: [],
    ItemsChecked: false,
    ShowStudentList: false,
    images: [],
    setImages: [],
    maxNumber: 65,
    AllStudent: [],
    getClass: "1st",
    page: 1,
    search: '',
    SortOrderData: '',
    OrderNameData: '',
    SelectValue: 'pl-2',
    standardlist: [],
    studentlist: [],
    allstudentslist: [],
    currentCheckboxAllStudent: false,
    currentSelectedStandard: [],
    selectedDiariesList: [],
    getDiaryImage: '',
    hasMore: true,
    responseData: this.props.records,
    message: '',
    diaryMessageDetails: false,
    studentAutoCompleteData:[]
  };
  constructor(props: any) {
    super(props);
    this.handleCheckStudent = this.handleCheckStudent.bind(this);
  }
  componentDidMount(): void {
    window.scrollTo(0, 0);
    this.getNoticeBoardData()
    const loadMoreType = {
      academic_year: '2021'
    }
    this.props.fetchGetAllClassList(loadMoreType).then((res: any) => {
      const { AllClassList, AllStudentList } = this.props
      if (AllClassList.length > 0) {
        this.setState({ currentSelectedStandard: AllClassList[0] });
        this.setState({ standardlist: AllClassList });
        this.props.fetchGetStudent({
          class_id: AllClassList[0].id,
          academic_year: '2021'
        });
      }
      this.setState({ studentlist: AllStudentList });

    })

    this.props.fetchSearchAllStudent({
      search: ' ',
      academic_year: '2021'
    })
    
  }
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (this.props.getDiaryImageURL) {
      const getUrlpath = this.props.getDiaryImageURL.url;
      let noticeImage:any = [];
      if (getUrlpath) {
        getUrlpath.forEach((items:any)=>{
          let diaryNotices:any = {
            url:items
          };
          noticeImage.push(diaryNotices);
        })
        this.getDiaryImage = noticeImage;
      }
      else {
        this.getDiaryImage = noticeImage;
      }
    }
    if (this.props.errorMessage.data) {
      this.formikNoticeBoard.setFieldError('your_title', this.props.errorMessage.data.title)
      this.formikNoticeBoard.setFieldError('message', this.props.errorMessage.data.message)
    }
  }
  getNoticeBoardData() {
    const { search, SortOrderData, OrderNameData } = this.state;
    const postValue = {
      page_no: 1,
      search: search,
      sort_by: SortOrderData,
      order_by: OrderNameData,
      academic_year: '2021'
    }
    this.props.fetchDiaryPost(postValue, NoticesBoard.noticeboard).then((res: any) => {
      window.scrollTo(0, 0);
      this.setState({ responseData: this.props.records })
    });
  }

  standardonSelect(e: any, data: any) {
    const { selectedDiariesList } = this.state;
    const { AllStudentList } = this.props;
    const { items } = data;
    let standardlistele: any = document.getElementById("standardlist");
    if (standardlistele.querySelector('.active')) {
      standardlistele.querySelector('.active').classList.remove('active');
    }
    this.setState({ currentSelectedStandard: items });
    e.target.classList.add('active')
    const getStudent = {
      class_id: items.id,
      academic_year: '2021'
    }
    this.props.fetchGetStudent(getStudent).then((res: any) => {
      this.setState({ studentlist: AllStudentList });
      this.unSelectAll();
      let findDiariesList = selectedDiariesList.find((item: any) => item.id === getStudent.class_id);
      if (findDiariesList) {
        this.selectPreviousSelectedStudents(findDiariesList);
      }
    });

  }

  handleCheckStudent(e: any) {
    const { selectedDiariesList, currentSelectedStandard } = this.state;
    const { AllStudentList } = this.props;
    const standardId: any = currentSelectedStandard;
    let checkbox: any = document.getElementById('student_' + e.currentTarget.dataset.id);
    if (checkbox.checked) {
      checkbox['checked'] = true;

      let availableDiareslist = selectedDiariesList.filter((item: any) => item.id === standardId.id);
      if (availableDiareslist.length) {
        let findDiariesList = selectedDiariesList.map((item: any) => {
          if (item.id === standardId.id) {
            item.studentslist.push(AllStudentList.filter((item: any) => item.id === parseInt(e.currentTarget.dataset.id))[0])
            if (item.studentslist.length === AllStudentList.length) {
              let selectAllCheckbox: any = document.getElementById('student_all');
              selectAllCheckbox['checked'] = true;
              item.all = true;
              checkbox['checked'] = true;
            }
          }
          return item;
        });
        this.setState({ selectedDiariesList: findDiariesList });
      } else {
        let selectedAllStandardStudents: any = currentSelectedStandard;
        selectedAllStandardStudents['all'] = false;
        selectedAllStandardStudents['studentslist'] = AllStudentList.filter((item: any) => item.id === parseInt(e.currentTarget.dataset.id));
        this.setState({ selectedDiariesList: [...selectedDiariesList, selectedAllStandardStudents] })
      }

    } else {

      let findDiariesList = selectedDiariesList.map((item: any) => {
        if (item.id === standardId.id) {
          let studentslist;
          if (item.all) {
            studentslist = AllStudentList.filter((item: any) => item.id !== parseInt(e.currentTarget.dataset.id))
          } else {
            studentslist = item.studentslist.filter((item: any) => item.id !== parseInt(e.currentTarget.dataset.id))
          }
          item.studentslist = studentslist;
          item.all = false;
        }
        return item;
      })
      this.setState({ selectedDiariesList: findDiariesList });
      this.setState({ currentCheckboxAllStudent: false });

      let selectAllCheckbox: any = document.getElementById('student_all');
      selectAllCheckbox['checked'] = false;
      checkbox['checked'] = false;
    }
    this.checkValuelist('', '', '', checkbox)
  }

  selectPreviousSelectedStudents(data: any) {
    const { AllStudentList } = this.props;

    const { all } = data;
    let selectAllCheckbox: any = document.getElementById('student_all');

    if (all) {

      AllStudentList.forEach((item: any, index: any) => {
        let checkbox: any = document.getElementById('student_' + item.id);
        checkbox['checked'] = true;
      })

      selectAllCheckbox['checked'] = true;
      this.setState({ currentCheckboxAllStudent: true })
    } else {

      data.studentslist.forEach((item: any, index: any) => {
        let checkbox: any = document.getElementById('student_' + item.id);
        checkbox['checked'] = true;
      })
      if (data.studentslist.length === AllStudentList.length) {
        let selectAllCheckbox: any = document.getElementById('student_all');
        selectAllCheckbox['checked'] = true;
      }
    }

  }

  //This is function used to search values
  checkValuelist = (e?: any, data?: any,reason?:any, handleCheck?:any) => {
    const { AllStudentList } = this.props;
    const { selectedDiariesList, standardlist, currentSelectedStandard  } = this.state;   
   if(selectedDiariesList){
     let getStudentData:any = [];
    selectedDiariesList.forEach((items:any, index:any)=>{
      if(items.studentslist){
        items.studentslist.forEach((items:any, index:any)=>{
          getStudentData.push(items)
        })
      }
    })
    if(getStudentData.length > 0){
      this.setState({studentAutoCompleteData: getStudentData})
    }else {
      this.setState({studentAutoCompleteData: []})
    }
   }
    if(reason==="clear"){
      let removeSelectedStudent:any=[]
      let selectedAllStandardStudents: any = currentSelectedStandard;
        selectedAllStandardStudents['all'] = false;
        selectedAllStandardStudents['studentslist'] = AllStudentList.filter((item: any) => item.id === parseInt(e.currentTarget.dataset.id));
        this.setState({ selectedDiariesList: [...selectedDiariesList, selectedAllStandardStudents] })
      this.setState({ selectedDiariesList: removeSelectedStudent });    
    }
    else if(reason==="remove-option"){
      const selectedStudent = data;
      selectedStudent.forEach((selStudent: any, index: any) => {
        let availableDiareslist = selectedDiariesList.filter((item: any) => item.id === parseInt(selStudent.studentclass_details[0].class_id)); 
        if (availableDiareslist.length) {
          let findDiariesList = selectedDiariesList.map((item: any) => {
            if (item.id === parseInt(selStudent.studentclass_details[0].class_id)) {
              let studentexists = item.studentslist.filter((d: any) => d.id === parseInt(selStudent.id));
              if (!studentexists.length) {
                let checkbox: any = document.getElementById('student_' + selStudent.id);
                // item.studentslist.push(selStudent);
                item.studentslist.push(selectedStudent.filter((item: any) => item.id === parseInt(studentexists.id)))
                if (checkbox) checkbox['checked'] = false;
              }
              else{
                item.studentslist.splice(index,1)
              }
          }
          return item;
          
        });
        this.setState({ selectedDiariesList: findDiariesList });
      }
  })
}
    else if(reason==="select-option"){
      const selectedStudent = data;
      selectedStudent.forEach((selStudent: any, index: any) => {
        let availableDiareslist = selectedDiariesList.filter((item: any) => item.id === parseInt(selStudent.studentclass_details[0].class_id));
        if (availableDiareslist.length) {
          let findDiariesList = selectedDiariesList.map((item: any) => {
            if (item.id === parseInt(selStudent.studentclass_details[0].class_id)) {
  
              let studentexists = item.studentslist.filter((d: any) => d.id === parseInt(selStudent.id));
              if (!studentexists.length) {
                let checkbox: any = document.getElementById('student_' + selStudent.id);
                item.studentslist.push(selStudent);
                if (checkbox) checkbox['checked'] = true;
              }
            }
            return item;
          });
          this.setState({ selectedDiariesList: findDiariesList });
        } else {
  
          let selectedClass = standardlist.filter((item: any) => item.id === parseInt(selStudent.studentclass_details[0].class_id))[0];
          let selectedAllStandardStudents: any = selectedClass;
          selectedAllStandardStudents['all'] = false;
          selectedAllStandardStudents['studentslist'] = [selStudent]
          let checkbox: any = document.getElementById('student_' + selStudent.id);
          if (checkbox) checkbox['checked'] = true;
          this.setState({ selectedDiariesList: [...selectedDiariesList, selectedAllStandardStudents] })
        }
      })

    }
   
  }

  unSelectAll() {
    // unseleted all
    const { AllStudentList } = this.props;
    let selectAllCheckbox: any = document.getElementById('student_all');
    AllStudentList.forEach((item: any, index: any) => {
      let checkbox: any = document.getElementById('student_' + item.id);
      checkbox['checked'] = false;
    })
    this.setState({ currentCheckboxAllStudent: false })
    selectAllCheckbox['checked'] = false;
  }

  SelectAll() {
    const { AllStudentList } = this.props;
    let selectAllCheckbox: any = document.getElementById('student_all');
    AllStudentList.forEach((item: any, index: any) => {
      let checkbox: any = document.getElementById('student_' + item.id);
      checkbox['checked'] = true;
    })
    selectAllCheckbox['checked'] = true;
    this.setState({ currentCheckboxAllStudent: true })
  }

  selectAllStudents() {
    const { AllStudentList } = this.props;
    const { currentSelectedStandard, selectedDiariesList } = this.state;
    if (!this.state.currentCheckboxAllStudent) {
      if (AllStudentList.length === 0) {
        this.unSelectAll();
      }
      else {
        // Selected All
        this.SelectAll();
        let selectedAllStandardStudents: any = currentSelectedStandard;
        selectedAllStandardStudents['all'] = true;
        selectedAllStandardStudents['studentslist'] = AllStudentList; // if you want to add all studentlist in add AllStudent array
        const filteredPeople = selectedDiariesList.filter((item) => item !== currentSelectedStandard);
        this.setState({ selectedDiariesList: [...filteredPeople, selectedAllStandardStudents] })
      }
    } else {
      // unseleted all
      this.unSelectAll();
      const filteredPeople = selectedDiariesList.filter((item) => item !== currentSelectedStandard);
      this.setState({ selectedDiariesList: filteredPeople })
    }
  }
  showStudentList = (e: any, getValue: any) => {
    if (getValue === true) {
      this.setState({ ShowStudentList: getValue })
    } else {
      this.setState({ ShowStudentList: false })
    }
    setTimeout(() => {
      let standardlistele: any = document.getElementById("standardlist");
      if(standardlistele.firstChild === null) {
        toaster.notify(FormvalidationMessage.addClassStudent, {
          position: 'top',
          duration: notificationMsg.duration
      });
      history.push('/');
      } else {
        standardlistele.firstChild.classList.add('active')
      } 
    }, 500);
  }
  HiddenStudentList(getValue: any) {
    this.setState({ ShowStudentList: getValue })
  }
  onSubmitDiary = (values: any) => {
    const getProfile = this.props.getProfile;
    var today = new Date();
    const { selectedDiariesList, message } = this.state;
    this.getClassList = []
    this.postStudentList = []
    let studentList: any;
    selectedDiariesList.forEach((items: any, index: any) => {
      items.studentslist.forEach((students: any) => {
        studentList = {
          student_id: students.id,
          student_name: students.student_name,
          parent_id: students.user_id
        }
        this.postStudentList.push(studentList)
      })
      const classlist = {
        class_id: items.id,
        is_all: items.all,
        student_list: this.postStudentList
      }
      this.getClassList.push(classlist)
      if (items.studentslist.length === this.postStudentList.length) {
        this.postStudentList = []
      }
    })
    if (message && values) {
      const postValue: any = {
        academic_year: "2021",
        school_id: getProfile.school_id,
        class_list: this.getClassList,
        selected_value: "sdfsdfsdfsd",
        title: values.your_title,
        message: message,
        image: this.getDiaryImage,
        date: today,
        posted_by: getProfile.firstname +' '+ getProfile.lastname
      }
      this.props.addDiaryPost(postValue, NoticesBoard.noticeboard).then((res: any) => {
        this.getNoticeBoardData()
      });
    }
  }

  public fetchMoreNoticeBoardData = () => {
    const { page, search, SortOrderData, OrderNameData } = this.state;
    if (this.state.hasMore === true) {
      if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
        const postValue = {
          page_no: page + 1,
          search: search,
          sort_by: SortOrderData,
          order_by: OrderNameData,
          academic_year: '2021'
        }
        this.props.fetchDiaryPost(postValue, NoticesBoard.noticeboard);
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
  getCkEditorValue = (editordata: any) => {
    if (editordata) {
      this.setState({ message: editordata })
      this.state.message.length > 0 ?
        this.setState({ diaryMessageDetails: true }) :
        this.setState({ diaryMessageDetails: false })
    }
    else {
      this.setState({ diaryMessageDetails: false })
    }
  }

  render() {
    const { loading, loadingStudent, getSearchStudentList } = this.props;
    const getProfile = this.props.getProfile;
    let viewNoticeBoardForm: boolean = false;
    const loadingDiary = { display: loading || loadingStudent ? "block" : "none" };
    const { standardlist, selectedDiariesList, ShowStudentList, diaryMessageDetails, studentAutoCompleteData } = this.state;
    const getRecords: any = this.props.records;
    let getStudentList: any;
    if (this.props.AllStudentList) {
      getStudentList = this.props.AllStudentList;
    }
    if (getRecords) {
      getRecords.forEach((items: any) => {
        let getClass = items.class_list;
        if (getClass) {
          getClass.forEach((ClassList: any) => {
            if (standardlist.length > 0) {
              let getClassList: any = standardlist.find((item: any) => item.id === parseInt(ClassList.class_id))
              if (getClassList) {
                ClassList["grade_standard"] = getClassList.grade_standard;
              }
            }
          })
        }
      })
    }
    if (getProfile.usertype === 1 || getProfile.usertype === 2) {
      viewNoticeBoardForm = true;
    } else if (getProfile.usertype === 3) {
      viewNoticeBoardForm = false;
    }
    let studentAutoComplete:any;
    if(studentAutoCompleteData){
      studentAutoComplete = studentAutoCompleteData;
    }
    return (
      <div>
        <div className="page-wrapper">
          <div className="page-content-wrapper">
            <div className="page-content pt-3">
              <BreadCrumb
                titleName={['Notice Board']}
                homeName={['Home']}
                url={['dashboard']}
                mainPageTitle={['Notice Board']} />
              {viewNoticeBoardForm ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="card ">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <label className="font-style">Add Notice Board</label>
                        </AccordionSummary>
                        <AccordionDetails>

                          <div className="col-md-12">
                            <Formik
                              ref={node => this.formikNoticeBoard = node}
                              validationSchema={NoticesBoardValidation}
                              initialValues={initialNoticeBoard}
                              onSubmit={this.onSubmitDiary}
                              render={({
                                values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                              }: FormikProps<any>) => {
                                let getStudentDetails: any = false;
                                let selectStudentList:any = false;
                                if(selectedDiariesList.length){
                                  selectedDiariesList.forEach((items:any, index:any)=>{
                                    items.studentslist.length > 0 ? 
                                    selectStudentList = true
                                    :selectStudentList = false
                                  })
                                }
                                selectedDiariesList.length > 0 && selectStudentList?
                                  getStudentDetails = true :
                                  getStudentDetails = false;

                                const isNoticeEmpty = (!values.your_title
                                  || !this.state.message);
                                return (
                                  <Form>
                                    <FormGroup>
                                      <Field
                                        label='Your Title*'
                                        type="text"
                                        name="your_title"
                                        component={TextField}
                                        className="textfield__input mb-3"
                                        disabled={false}

                                        onClick={(e: any) => this.showStudentList(e, true)}
                                      />
                                    </FormGroup>
                                    {/* here print the select values */}
                                    <div>
                                      {/* {this.getAllStudentDetails ? */}
                                      <div className="row">
                                        <div className="col-12">
                                          {selectedDiariesList ?
                                            <>
                                              {selectedDiariesList.map((item: any, index: any) => (
                                                <>
                                                  {item.all ?
                                                    <span className="btn btn-circle btn-circle btn-info disabled mr-2 mb-3">{item.grade_standard} </span>
                                                    : <>{item.studentslist.map((slist: any, index: any) => (
                                                      <span className="btn btn-circle btn-circle btn-danger disabled mr-2 mb-3">({item.grade_standard}) <span className="userNameTitle">{slist.student_name}</span></span>
                                                    )
                                                    )}</>
                                                  }

                                                </>
                                              ))}
                                            </> : 'No Selected'}
                                        </div>
                                      </div>
                                      {/* This is the function used to multiple student list view on autocomplete option */}
                                      {ShowStudentList ?
                                        <div>
                                          <Autocomplete
                                            fullWidth
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={getSearchStudentList}
                                            disableCloseOnSelect
                                            value={studentAutoComplete? studentAutoComplete: []}
                                            getOptionLabel={(option: any) => option.student_name}
                                            noOptionsText={studentValida.noRecordData}
                                            renderTags={() => null} // don't render tag in the TextField
                                            onChange={(e, value, reason) => {
                                              this.checkValuelist(e, value, reason)
                                              if(value){
                                                this.setState({studentAutoCompleteData:value})
                                              }
                                            }}
                                            renderOption={(option, { selected }) => (
                                              <React.Fragment>
                                                <Checkbox
                                                  icon={icon}
                                                  checkedIcon={checkedIcon}
                                                  style={{ marginRight: 8 }}
                                                  checked={selected}
                                                />
                                                {option.student_name}
                                              </React.Fragment>
                                            )}
                                            className="mb-3 mt-1"
                                            renderInput={(params) => (
                                              <MTextField {...params} label="Search Student" name="searStudent"/>
                                            )}
                                          />
                                          <>
                                            {getStudentDetails ?
                                              null
                                              : <span className="diaryerrorcolor">{studentValida.diraySelectStudent}</span>}
                                          </>
                                          <div className="row mb-3 p-3">

                                            {/* List the class details list */}
                                            <div className="col-md-6">
                                              <ul className="list-group docListWindow small-slimscroll-style autoselection" id="standardlist">
                                                {standardlist ?
                                                  <>
                                                    {standardlist.map((items: any, index: any) => (
                                                      <li className="list-group-item" key={index} onClick={(e) => this.standardonSelect(e, { items, index })}>{items.grade_standard}
                                                        <span className="icon-angle-right float-right">&gt;</span>
                                                      </li>
                                                    ))}
                                                  </>
                                                  : <CommonLoader />}
                                              </ul>
                                            </div>
                                            {/* This is the list of student details list */}
                                            <div className="col-md-6">
                                              <ul className="docListWindow small-slimscroll-style autoselection">
                                                <li className="title-sticky zindex0 list-group-item" onClick={() => this.selectAllStudents()} >
                                                  <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" defaultChecked={this.state.currentCheckboxAllStudent} id={'student_all'} />
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Select All</label>
                                                  </div>
                                                </li>
                                                <StudentList studentlist={getStudentList} handleCheckStudent={this.handleCheckStudent} />
                                              </ul>
                                            </div>
                                          </div>
                                          {/* This is the function called hidden studnet list*/}
                                          <div className="mt-3 text-center">
                                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-info"
                                              onClick={() => this.HiddenStudentList(false)}>
                                              <i className="fa fa-angle-up" aria-hidden="true"></i>
                                            </button>
                                          </div>
                                        </div>
                                        : null}
                                      <div className="row  pt-3">
                                        <div className="col-md-12">
                                          <CKEditor
                                            editor={ClassicEditor}
                                            data=""
                                            onReady={(editor: any) => {
                                              // You can store the "editor" and use when it is needed.
                                            }}
                                            config={{}}
                                            onChange={(event: any, editor: any) => {
                                              const data = editor.getData();
                                              this.getCkEditorValue(data)
                                            }}
                                            onBlur={(event: any, editor: any) => {
                                            }}
                                            onFocus={(event: any, editor: any) => {
                                            }}
                                          />

                                        </div>
                                        <>
                                          {diaryMessageDetails ?
                                            null
                                            : <span className="diaryerrorcolor ml-3">{studentValida.diaryMessage}</span>}
                                        </>
                                      </div>
                                      <div className="row  pt-3">
                                        <div className="col-md-12">
                                      <div className="pos-rel text-center  pl-0">
                                            <ImageUpload URLLink={NoticesBoard.noticeboardImage} />
                                          </div>
                                          </div>
                                          </div>

                                      {/* This is the tag use import multiple image upload  */}

                                      <div className="form-group text-right mt-3 mb-1">
                                        <Button type="submit" className="btn btn-pink mr-1 ml-1 w-15"
                                          disabled={
                                            isNoticeEmpty 
                                            || isValidating 
                                            || !dirty 
                                            || !!(errors.your_title && touched.your_title)
                                            || !!(errors.message && touched.message) 
                                            || !getStudentDetails || !selectStudentList} value="Submit">Submit</Button>
                                      </div>
                                      <div>

                                      </div>
                                    </div>
                                  </Form>
                                )
                              }}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                </div>
                : null}
              <div>
                <InfiniteScroll
                  dataLength={this.props.records.length}
                  next={this.fetchMoreNoticeBoardData}
                  hasMore={this.state.hasMore}
                  loader={<h4 style={loadingDiary}>Loading...</h4>}
                >
                  <>
                    {getRecords.length > 0 ?
                      <>
                        {
                          getRecords.map((item: any) => (
                            <div className="card">
                              <div className="row p-4">
                                <div className="col-md-12">

                                  <p>To:
                                    <>
                                      {item.class_list.map((classList: any, index: any) => (
                                        <>
                                          {
                                            classList.is_all ?
                                              <span className="btn btn-xs btn-circle btn-info mr-1 ml-2 mb-2 cursorPoint" key={index}>{classList.class_name}</span>
                                              : null
                                          }
                                          {
                                            classList.is_all ? null
                                              : <>
                                                {
                                                  classList.student_list ?
                                                    classList.student_list.map((studentName: any, index: any) => (
                                                      <span className="btn btn-xs btn-circle btn-info mr-1 ml-2 mb-2 cursorPoint" key={index}>{studentName.student_name}</span>
                                                    ))
                                                    : null
                                                }
                                              </>
                                          }

                                        </>
                                      ))}
                                    </>
                                  </p>

                                </div>
                                <div className="col-md-12">
                                  <h3 className="titleCapitalize color-pink mt-3"><strong>{item.title}</strong></h3>
                                  <hr className="mt-0" />
                                  <div dangerouslySetInnerHTML={{ __html: item.message }} />
                                  <div className="row">
                                    <div className="col-md-5">
                                      {item.image ?
                                      item.image.map((items:any)=>(
                                        <img src={`${process.env.REACT_APP_API_URL}${items.url}`} className="w-100 p-3" alt="" />
                                      )): null}
                                    </div>

                                  </div>

                                </div>

                                <div className="col-md-12 p-3 text-right">
                                  by <strong>{item.posted_by}</strong><span> {moment(item?.created_at).fromNow()}</span>
                                </div>
                              </div>
                            </div>

                          ))
                        }
                      </>

                      : null}
                  </>
                </InfiniteScroll>
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
  return {
    updateStatuRecord: state.diary.updateRecord,
    total: state.diary.total,
    per_page: state.diary.per_page,
    records: state.diary.records,
    page: state.diary.page,
    totalPage: state.diary.totalPage,
    loading: state.diary.loading,
    loadingStudent: state.student.loading,
    DiaryDetails: state.diary.items,
    AllClassList: state.diary.gradelist,
    AllStudentList: state.diary.standardList,
    getDiaryImageURL: state.student.ImageURL,
    getResponseClassList: state.diary.getClassList,
    getResponseStudent: state.diary.getStudentList,
    errorMessage: state.diary.errors,
    getProfile: state.profile.profileData,
    getSearchStudentList: state.diary.getSearchStudentList,
  };
};


export default connect(mapStateToProps, {
  fetchDiaryPost,
  fetchGetAllClassList,
  fetchGetStudent,
  addDiaryPost,
  fetchSearchAllStudent
})(ViewNoticeBoard)
