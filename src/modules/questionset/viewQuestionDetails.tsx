import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router';
import { fetchQuestionSet } from '../../store/question/Actions';
import './QuestionStyle.scss';
import { fetchGradePost } from '../../store/classes/Actions';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import CommonLoader from '../../components/CommonLoader';

interface OwnStudentEditProps extends RouteComponentProps<OwnPropsParams> {
    fetchQuestionSet:(id:number) => void;
    postQuestionId:any;
    getQuestionDetails:any;
    loading: boolean | undefined;
};
export class viewQuestionDetails extends Component<OwnStudentEditProps> {
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchQuestionSet(Number(this.props.match.params.id));
    }
    render() {
        const { loading, getQuestionDetails } = this.props;
        const loadingQuestionFull = { display: loading ? "block" : "none" };
        return (
            <div>
                 <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                    <BreadCrumb
                                titleName={['View Question Set']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['View Question Set']}
                                baseName={['Question Set']}
                                baseURL={['question']} />
                                {this.props.getQuestionDetails ?
                    <div className="row">
                        <div className="col-md-12">                           
                                <div>
                                <div className="row">
                                <div className="col-md-4">
                                <div className="form-group">
                                <p><small>Question Set Name</small></p>
                                <h4 className="titleCapitalize"><strong>{getQuestionDetails.question_name}</strong></h4>
                                </div>                               
                                </div>
                                <div className="col-md-4"> 
                                <div className="form-group">
                                <p><small>Class Name</small></p>
                                <h4><strong>{getQuestionDetails.class_name}</strong></h4>
                                </div>                       
                                </div>
                                <div className="col-md-4">
                                <div className="form-group">
                                <p><small>Subject Name</small></p>
                                <h4><strong>{getQuestionDetails.subject_name}</strong></h4>
                                </div> 
                                </div>
                                </div>
                                {this.props.getQuestionDetails.questions?
                                <div className="row">
                                    <div className="col-md-12">
                                        
                                            {this.props.getQuestionDetails.questions.map((items:any)=>(
                                            <div>
                                            <div className="card-box mt-4">
                                            <div className="card-body">
                                            <div className="d-flex mt-1 w-100">
                                            <div className="mr-3 mt-0">{items.serial_no}.</div>
                                            <div className="form-group w-100">                                           
                                            <p className="titleCapitalize">{items.question}</p>
                                            </div>                                            
                                            </div>
                                            <div className="col-md-12 pr-0 mt-0">
                                            <span className="btn btn-xs btn-pink btn-circle mb-3 titleCapitalize cursorPoint">{items.topics}</span>  
                                            </div>
                                            <div>
                                                {items.answers.map((items:any)=>(
                                            <div className="d-flex mt-1">
                                            <div className="mt-0 mr-3 ml-2 viewradio">
                                                <input type="radio" checked={items.is_correct_ans}  value={items.serial_no}/>
                                                <label><span></span></label>
                                            </div>
                                            <div className="mr-3 mt-0 ">{items.serial_no}.</div>
                                            <div className="form-group w-100">
                                            <p className="mt-0 titleCapitalize">{items.choice}</p>
                                            </div> 
                                            </div>
                                                ))}
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            ))}
                                        
                                    </div>                                    
                                </div>
                                :<CommonLoader/>}
                            </div>
                                
                                
                        </div>
                    </div>
                    :<CommonLoader/>}
                </div>
                </div>
                </div>
                <div style={loadingQuestionFull}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state:any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        postQuestionId: state.questionset.items[Number(ownProps.match.params.id)],
        loading: state.questionset.loading,        
        getCorrectClassList:state.diary.gradelist,
        getClassList:state.classes.gradelist,
        getSubjectlist:state.subjects.category,
        getQuestionDetails:state.questionset.getQuestionList
    }
}

export default connect(mapStateToProps, {fetchQuestionSet, fetchGradePost, fetchGetAllClassList, GetCorrectSubject})(viewQuestionDetails)
