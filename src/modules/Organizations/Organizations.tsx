import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import { fetchCategoryPost } from '../../store/usermanage/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import history from '../../History';
import { RouteComponentProps } from 'react-router';

export interface PostsOrganizationsProps extends RouteComponentProps<any> {
    fetchCategoryPost: () => void;
    loading: boolean,
    loginProfile: any,
    getSchoolList: any
}
interface propsOrganizationTypes {
    message:any
} 
export class Organizations extends Component<PostsOrganizationsProps, propsOrganizationTypes> {
    constructor(props: any) {
        super(props);
        this.state = {
            message:''
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchCategoryPost();
    }
    getcategoriesBaseOpenPage = (path:any, SchoolId:any) => {
        if(path && SchoolId) {
            history.push({
                pathname: path
              })     
        }
       
    }
    render() {
        const { getSchoolList, loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        if (getSchoolList) {
            getSchoolList.forEach((items: any) => {
                items['schoolPath'] = '/institutions/';
                items['question'] = [
                    {
                        id: 1,
                        name: 'Classes',
                        icon: 'fa fa-file-text-o',
                        URL: '/classes/'
                    },
                    {
                        id: 2,
                        name: 'Instant Feedback',
                        icon: 'fa fa-commenting-o',
                        URL: '/instant_feedback/'
                    },
                    {
                        id: 3,
                        name: 'Quizzes',
                        icon: 'fa fa-file-text',
                        URL: '/quizzes/'
                    }
                ]
            })
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <BreadCrumb
                            titleName={['Institutions']}
                            homeName={['Home']}
                            url={['dashboard']}
                            mainPageTitle={['Institutions']} />
                            {getSchoolList?
                        <div className="row">
                            {
                                getSchoolList.map((items: any) => (
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="m-3 mt-0 mb-0">
                                                <div>
                                                    <div className="width100 text-center">
                                                        <button
                                                        className="mdl-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-pink">
                                                        <Link to={`${items.schoolPath}${items.id}`} className="font-color font14">{items.school_name}</Link>
                                                        </button>
                                                    </div>
                                                    <div className="classes-height ml-3">
                                                        <ul className="text-left">
                                                            {items.question.map((questionItem: any) => (
                                                                <li className="mb-3"><Link to={`${questionItem.URL}${items.id}`}>
                                                                    <span>
                                                                        <i className={questionItem.icon} aria-hidden="true"></i>
                                                                    </span> {questionItem.name}
                                                                </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        :<CommonLoader/>}
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        loginProfile: state.profile.profileData,
        getSchoolList: state.userManage.category,
        loading: state.userManage.loading
    }
}

export default connect(mapStateToProps, { fetchCategoryPost })(Organizations)
