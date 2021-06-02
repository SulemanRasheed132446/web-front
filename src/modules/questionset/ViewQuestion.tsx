import React, { Component } from 'react'
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import { Link } from 'react-router-dom';
import CommonLoader from '../../components/CommonLoader';
import { QuestionTypes } from '../../store/question/Types';
import { Question } from '../../router/Roles';
import { fetchQuestionSetPost } from '../../store/question/Actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';

export type OwnQuestSetProps = {
    fetchQuestionSetPost:(getPostValue:any)=>void;
    GetCorrectSubject: (postValue:any) => void;  
    fetchGetAllClassList:(postValue:any)=>void;
    loading: boolean;
    acsOrder:boolean;
    page: number;
    per_page: number;
    totalPage: number;
    records: any;
    total: number;
    getClassList:any;
    getSubjectlist:any;
}
export class ViewQuestion extends Component<OwnQuestSetProps, QuestionTypes, any> {
    hasMoreClass:any;
    constructor(props: any) {
        super(props);
        this.state = {
            acsOrder:true,
            academic_year:'2021',
            search:'',
            hasMore:true,
            page:1,
            page_no: 1,
            SortOrderData: '',
            OrderNameData: '',
            recordPage: 1,
        }
    }
    componentDidMount(): void {
      window.scrollTo(0, 0);
          this.getQuestionSetDetails() 
          const postValue = {
            academic_year:'2021'
        }
        this.props.GetCorrectSubject(postValue);
        this.props.fetchGetAllClassList(postValue);   
    }
    getQuestionSetDetails(){
        const getPostStudent = {
            page_no: 1,
            academic_year:this.state.academic_year,
            search:this.state.search,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData
          }
        this.props.fetchQuestionSetPost(getPostStudent);
    }
    showFilterData(getValues:any){
      if (getValues.sort_by === 'desc') {
        this.setState({ 
          acsOrder: false, 
          search: '',
          SortOrderData: getValues.sort_by,
          OrderNameData: getValues.order_by
        })
        const postValue = {
          page_no: 1,
          academic_year:this.state.academic_year,
          search: this.state.search,
          sort_by: getValues.sort_by,
          order_by: getValues.order_by
        }
        this.setState({
          hasMore: true,
          SortOrderData: getValues.sort_by,
          OrderNameData: getValues.order_by,
          page: 1
        })
        this.props.fetchQuestionSetPost(postValue);
      } else {
        this.setState({ 
          acsOrder: true, 
          SortOrderData: getValues.sort_by, 
          OrderNameData: getValues.order_by, 
          search: '' })
        const postValue = {
          page_no: 1,
          academic_year:this.state.academic_year,
          search: this.state.search,
          sort_by: getValues.sort_by,
          order_by: getValues.order_by
        }
        this.setState({
          hasMore: true,
          SortOrderData: getValues.sort_by,
          OrderNameData: getValues.order_by,
          page: 1
        })
        this.props.fetchQuestionSetPost(postValue);
      }
    }
    public fetchMoreStudentData = () => {
      const { page } = this.state;
      if (this.state.hasMore === true) {
        if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
          const postValue = {
            page_no:  page + 1,
            academic_year:this.state.academic_year,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData,
            search:this.state.search
          }
          this.props.fetchQuestionSetPost(postValue);
          this.setState({
            page: page + 1
          })
        }
  
        if (Math.ceil(this.props.total / this.props.per_page) === this.props.page) {
          this.setState({
            hasMore: false,
          })
        }
      }
    }
    private renderQuestionView(records: any) {
        const { acsOrder } = this.state;
        const { loading } = this.props;
        const loadingQuestionFull = { display: loading ? "block" : "none" };
        return (
            <div>
          <InfiniteScroll
          dataLength={records.length}
          next={this.fetchMoreStudentData}
          hasMore={this.state.hasMore}
          loader={<h4 style={loadingQuestionFull}>Loading...</h4>}
        >
            <table className="table table-striped custom-table table-hover">
            <thead>
            <tr>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'question_name' })}
                  title="Ascending order" className="headerBold">Name&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'question_name' })}
                  title="Descending order" className="headerBold">
                 Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'grade_id' })}
                  title="Ascending order" className="headerBold">Class Name&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'grade_id' })}
                  title="Descending order" className="headerBold">
                 Class Name<i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'subject_id' })}
                  title="Ascending order" className="headerBold">Subject Name&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'subject_id' })}
                  title="Descending order" className="headerBold">
                 Subject Name<i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>
            Questions
            </th>
            <th>
               Total Quizzes
            </th>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'posted_by' })}
                  title="Ascending order" className="headerBold">Created By&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'posted_by' })}
                  title="Descending order" className="headerBold">
                 Created By <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>Last Updated Time</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {records.length > 0 ?
                records.map((items: any) => (
                <tr> 
                    <td >{items['question_name'] || '-'}</td>
                    <td >{items['class_name'] || '-'}</td>
                    <td >{items['subject_name'] || '-'}</td>
                    <td >{items['question_count'] || '0'}</td>
                    <td >{items['quiz_count'] || '0'}</td>
                    <td >{items['posted_by'] || '-'}</td>
                    <td >{items['date_time'] || '-'}</td>
                    <td>                     
                      {items.is_active ?
                        <Link to={`/question/${items.id}`}>
                          <button className="btn btn-primary btn-xs"
                            title="View Question Set"><i className="fa fa-eye" aria-hidden="true"></i></button></Link> :
                        <button className="btn btn-disable btn-xs"
                          title="View Question Set"><i className="fa fa-eye" aria-hidden="true"></i></button>}
                    </td>
                </tr>
                ))
                : <CommonLoader />}
            </tbody>
            </table>
            </InfiniteScroll>
            </div>
        )
    }

    handleInputQuestionSet = (e: any) => {
        const { value } = e.target;
        const getSearchValue = value;
        if (getSearchValue) {
          const postSearchValue = {
            page_no: 1,
            search: getSearchValue,
            academic_year:this.state.academic_year,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData
          }
          this.props.fetchQuestionSetPost(postSearchValue);
          this.setState({
            hasMore: true,
            page: 1,
            search: getSearchValue
          })
          this.hasMoreClass = true;
        } else {
          const postSearchValue = {
            page_no: 1,
            search: '',
            academic_year:this.state.academic_year,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData
          }
          this.props.fetchQuestionSetPost(postSearchValue);
          this.setState({
            hasMore: true,
            page: 1,
            search: ''
          })
          this.hasMoreClass = true;
        }
    
      }
    render() {
      const { records, getClassList, getSubjectlist } = this.props;
      const { loading } = this.props;
      const loadingQuestionFull = { display: loading ? "block" : "none" };
      if(records.length > 0){
        let getSubjectName:any = getSubjectlist.data;
        if(getSubjectName){
          records.forEach((items:any)=>{
            // get class Name list
            let gradeId:any = getClassList.find((item:any)=> item.id === parseInt(items.grade_id))
            if(gradeId){
              items['class_name'] = gradeId.grade_standard;
            }
            // get Subject name list
            let subjectName:any = getSubjectName.find((item:any)=> item.id === parseInt(items.subject_id))
            if(subjectName){
              items['subject_name'] = subjectName.name;
            }
          })
        }
      
      }
        return (
            <div>
                <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                    <BreadCrumb 
                    titleName={['Question Set']} 
                    homeName={['Home']} 
                    url={['dashboard']} 
                    mainPageTitle={['Question Set']} />
                    <div className="row">
                        <div className="col-md-12">
                        <div className="card card-topline-red">
                            <div className="mr-4 mt-2">
                            <h4 className="pull-right">Total: {this.props.total}</h4>
                            </div>
                            <div className="card-head">
                            <header>
                                <Link to={Question.AddQuestion}>
                                <button className="btn btn-pink">Add Question Set</button>
                                </Link>
                            </header>
                            <div className="tools">
                                <input
                                    placeholder="Search"
                                    name="search"
                                    className="form-control"
                                    onChange={this.handleInputQuestionSet} 
                                />
                            </div>
                            </div>
                            <div className="card-body no-padding height-9">
                            <div className="row">
                                <div className="table-responsive">

                                {this.renderQuestionView(this.props.records)}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div style={loadingQuestionFull}><SpinnerLoader /></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
    loading: state.questionset.loading,
    total: state.questionset.total,
    per_page: state.questionset.per_page,
    records: state.questionset.records,
    page: state.questionset.page,
    totalPage: state.questionset.totalPage,
    getClassList:state.diary.gradelist,
    getSubjectlist:state.subjects.category,
    }
}

const mapDispatchToProps = {
    fetchQuestionSetPost,
    fetchGetAllClassList,
    GetCorrectSubject
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestion)
