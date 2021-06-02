import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../store/Index';
import { fetchStudent } from '../../store/student/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { Link } from 'react-router-dom';
import { getStudentClassesData } from '../../store/profile/Actions';

interface PostViewProfileProps extends RouteComponentProps<OwnPropsParams> {
    fetchStudent: (id: number) => void;
    getStudentClassesData:(postData:any)=>any;
    getStudentDetails:any;
    loader:boolean;
    StudentId:any;
}
export class ViewStudentFullDetails extends React.Component<PostViewProfileProps> {
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchStudent(Number(this.props.match.params.id)); 
    }
    //in your component
addDefaultSrc= (ev:any) =>{
    ev.target.src = '../assets/img/user/teacher-profile.jpg'
  }
    render() {
        const { loader } = this.props;
        const loadingStudentView = { display: loader ? "block" : "none" };
        const studentFullDetails:any = this.props.getStudentDetails;
        const getStudentData = studentFullDetails.data;
        let getCardId:any;
        if(getStudentData){
            getCardId = getStudentData.studentclass_details;
        }
        if(getStudentData.studentclass_details) {
            let postClassesDetails:any = {
                class_name: getStudentData.studentclass_details.grade, 
                section_name: getStudentData.studentclass_details.standard
            }
            this.props.getStudentClassesData(postClassesDetails);
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Student Profile']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['Student']} 
                                baseURL={['student']} 
                                mainPageTitle={['Student Profile']} />
                                { getStudentData && getCardId ? 
                                <div>
                                <div className="row mt-5">
                                <div className="col-md-4"></div>
                                    <div className="col-md-4">                                        
                                            <div className="">
                                            <div className="card card-topline-aqua">
                                                <div className="card-body no-padding height-9">
                                                    <div className="row">
                                                        <div className="profile-userpic">
                                                            <img onError={this.addDefaultSrc} src={`${process.env.REACT_APP_API_URL}${getCardId.profile_picture}`} 
                                                            className="img-responsive" alt=""/> </div>
                                                    </div>
                                                    <div className="profile-usertitle">
                                                        <div className="profile-usertitle-name uppercase"> {getStudentData.student_name} </div>
                                                        <p>Card Id: {getCardId.card_id}</p>
                                                    </div>
                                                    <ul className="list-group list-group-unbordered">
                                                        <li className="list-group-item">
                                                            <div className="row">
                                                                <div className="col-md-6"><b>Phone Number </b></div>
                                                                <div className="profile-desc-item col-md-6">
                                                                    <div className="pull-right">
                                                                    {getStudentData.phone_number}
                                                                    </div>                                                                    
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item">
                                                        <div className="row">
                                                                <div className="col-md-6"> <b>Email Id </b></div>
                                                                <div className="profile-desc-item col-md-6">
                                                                    <div className="pull-right">
                                                                    {getStudentData.email_id}
                                                                    </div>                                                                    
                                                                </div>
                                                        </div> 
                                                        </li>
                                                        <li className="list-group-item">
                                                        <div className="row">
                                                                <div className="col-md-6"> <b>Class </b></div>
                                                                <div className="profile-desc-item col-md-6">
                                                                    <div className="pull-right">
                                                                    {getCardId.grade} - {getCardId.standard}
                                                                    </div>                                                                    
                                                                </div>
                                                        </div> 
                                                        </li>
                                                    </ul>
                                                    <div className="row list-separated profile-stat">
                                                        <div className="col-md-4 col-sm-4 col-6">
                                                        </div>
                                                        <div className="col-md-4 col-sm-4 col-6">                                                            
                                                            <div className="uppercase profile-stat-text mt-3"><Link to={'/student'}>Back</Link> </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4 col-6">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>                                        
                                     </div>
                                    <div className="col-md-4"></div>
                                </div>                               
                                </div>: <SpinnerLoader />}

                         </div>
                    </div>
                </div>
                <div style={loadingStudentView}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({student}: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        StudentId:student.items[Number(ownProps.match.params.id)],
        getStudentDetails:student.items,
        loader:student.loading
        };
};

export default connect(mapStateToProps, {fetchStudent, getStudentClassesData})(ViewStudentFullDetails)
