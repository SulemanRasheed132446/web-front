import React, { Component } from 'react'
import { connect } from 'react-redux'
import Schoolstatuschart from './SchoolStatusChart';
import Teacherupdatedetails from './TeacherDetails';
import Totalcount from './TotalCount';
import { RouteComponentProps } from 'react-router';
import {fetchCategoryPost} from '../../store/usermanage/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import BreadCrumb from '../../components/BreadCrumb'

interface OwnSchoolDetailsProps extends RouteComponentProps<OwnPropsParams> {
    getChangeYearData?:any;
    fetchCategoryPost: () => any;
    getSchoolNameList:any;
    loading:any;
}
export interface propsTypes {
    getCorrectSchoolId:any,
    currectYear?:any
}
export class ViewSchoolDetailsTeam extends Component<OwnSchoolDetailsProps, propsTypes> {
    getClassPropsValue:any
    constructor(props: any) {
        super(props);
        this.state = {
            getCorrectSchoolId:null,
            currectYear: this.props.getChangeYearData
        }
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.props.fetchCategoryPost();
        this.getClassPropsValue =  this.props.match.params.id;
        if(this.getClassPropsValue) {
            this.setState({getCorrectSchoolId: this.getClassPropsValue})
        }
    }
    getFilterSchoolName = (event:any) => {
        const { value } = event.target;
        if(value){
            this.setState({getCorrectSchoolId: value})
        }
    }
    render() {
        const { loading, getSchoolNameList } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let getSchoolId:any = this.props.match.params.id;
        let schoolName:any;
        if(getSchoolNameList && getSchoolId) {
            let getSchoolName:any = getSchoolNameList.find((item:any)=> item.id === parseInt(getSchoolId))
            if(getSchoolName){
                schoolName = getSchoolName.school_name
            }
        }
        this.getClassPropsValue =  this.props.match.params.id;
        return (
            <div className="mt-3">
                <div className="page-wrapper">
                <div className="page-content-wrapper">
                <BreadCrumb 
                titleName={[schoolName]}  
                homeName={['Institutions']}
                url={['institutions']}/>
                <Totalcount getSchoolId={this.getClassPropsValue}/>
                <Schoolstatuschart getSchoolId={this.getClassPropsValue}/>
                <Teacherupdatedetails getSchoolId={this.getClassPropsValue}/>                
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
const mapStateToProps = (state:any) => {
    return {
		getChangeYearData:state.profile.getYear,
        loading:state.dashboard.loading,
        getSchoolNameList:state.userManage.category
    }
}

export default connect(mapStateToProps, {fetchCategoryPost})(ViewSchoolDetailsTeam)
