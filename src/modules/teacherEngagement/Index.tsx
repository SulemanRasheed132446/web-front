import React, { Component } from 'react';
import ViewUserDetails from '../../components/dashboard/ViewUserDetails'
import WeakGoodColor from '../../components/dashboard/WeakGoodColor'
import Feedback from '../../components/dashboard/FeedBack'
import Subjectfeedback from '../../components/dashboard/SubjectFeedBack'
import BreadCrumb from '../../components/BreadCrumb'
import { RouteComponentProps } from 'react-router';
import QuizReport from './QuizReport';
import RecentFeedback from './RecentFeedback';

interface propsTypes  extends RouteComponentProps<OwnPropsParams> {

}
class Index extends Component<propsTypes> {
    componentDidMount(): void {
		window.scrollTo(0, 0);
	}
    render() {
        const getValue:any = this.props.location;
        let getTeacherId:any = this.props.match.params.id;
        if(getValue) {}
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content">
                        <BreadCrumb titleName={['Teacher']} homeName={['Home']} url={[]}/>
                        <ViewUserDetails getTeacherDetails={getTeacherId}/>
                        <WeakGoodColor/>
                        <Feedback getTeacherDetails={getTeacherId}/>
                        <Subjectfeedback getTeacherInfo={getTeacherId}/>
                        <QuizReport getTeacherId={getTeacherId}/>
                        <RecentFeedback getTeacherId={getTeacherId}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
interface OwnPropsParams {
    id: string;
}
export default Index;