import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router';
import FeedBackView from './FeedBackView';

interface propsTypes  extends RouteComponentProps<OwnPropsParams> {
    getTopicAnalysisReport:(postValue:any) => any;
}

export class FeedBack extends Component<propsTypes> {
    componentDidMount(): void {
    }
    render() {
        let getTopic:any = this.props.match.params.id;
        return (
            <div>
                 <BreadCrumb titleName={[`Feedback - ( ${getTopic} )`]} homeName={['Home']} url={['dashboard']}/>
                 <FeedBackView getTops={getTopic}/>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}

const mapStateToProps = (state:any) => {
}


export default connect(mapStateToProps)(FeedBack)
