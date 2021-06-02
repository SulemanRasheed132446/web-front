import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGradeComparisonReport, fetchGradeSubjectList } from '../../store/dashboard/Actions';
import CommonLoader from '../../components/CommonLoader';

interface propsGradeType {
    fetchGradeComparisonReport: (postValue: any) => any;
    fetchGradeSubjectList:() => any;
    getGradeComparisonValue?: any;
    getGradeSubjectList?:any;
    loading?:any;
}
interface propStateType {
    slectSubjectId:any
}
export class GradeComparison extends Component<propsGradeType, propStateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            slectSubjectId:'' 
        }
    }
    componentDidMount(): void {
        this.props.fetchGradeSubjectList().then((res:any)=>{
            const { getGradeSubjectList } = this.props;
            if(getGradeSubjectList){
                if(getGradeSubjectList.length > 0){
                    this.geGradeComparisonData(getGradeSubjectList[0])
                    this.setState({slectSubjectId:getGradeSubjectList[0].id})
                }
            }
        })
    }
    geGradeComparisonData(getValue:any) {
        if(getValue){
            let postValue: any = {
                academic_year: "2021",
                subject_id: getValue.id
            }
            this.props.fetchGradeComparisonReport(postValue);
        }
       
    }
    getSubjectFilterDetails = (event:any) =>{
        let getValue = event.target.value;
        this.setState({ slectSubjectId: event.target.value });
        if(getValue){
            let postValue: any = {
                academic_year: "2021",
                subject_id: getValue
            }
            this.props.fetchGradeComparisonReport(postValue);  
        }
    }
    render() {
        const { getGradeComparisonValue, getGradeSubjectList } = this.props;
        const { slectSubjectId } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card card-box">
                            <div className="card-head">
                                <header className="mt-4">Grade Comparison</header>
                                <div className="tools">
                                {getGradeSubjectList?
                                    <div className="mb-4 pull-right">                                       
									<select name="classlist" value={slectSubjectId} className="form-control" onChange={this.getSubjectFilterDetails}>
										{getGradeSubjectList.map((items: any) => (
											<option value={items.id}> {items.name} </option>
										))}
									</select>
                                    </div>
                                    :null}
                                </div>
                            </div>
                            <div className="card-body no-padding height-9">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <table className="gradeTable mb-2">
                                            {getGradeComparisonValue?
                                            <tr>
                                                <td className="academicGradeTitle"></td>
                                                {getGradeComparisonValue.fields ?
                                                    getGradeComparisonValue.fields.map((titleName: any, index: any) => (
                                                        <td className="academicGradeTitle text-center" key={index}>{titleName}</td>
                                                    ))
                                                    : null}
                                            </tr>
                                            :null}
                                            {getGradeComparisonValue ?
                                                <tbody>
                                                    {getGradeComparisonValue.school_values ?
                                                        getGradeComparisonValue.school_values.map((items: any) => (
                                                            <tr>
                                                                <td className="academicGradeTitle text-left"><small>{items.name}</small></td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["PKG"] ?
                                                                            items["PKG"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["LKG"] ?
                                                                            items["LKG"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["UKG"] ?
                                                                            items["UKG"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["1st"] ?
                                                                            items["1st"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["2nd"] ?
                                                                            items["2nd"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["3rd"] ?
                                                                            items["3rd"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["4th"] ?
                                                                            items["4th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["5th"] ?
                                                                            items["5th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["6th"] ?
                                                                            items["6th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["7th"] ?
                                                                            items["7th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["8th"] ?
                                                                            items["8th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["9th"] ?
                                                                            items["9th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["8th"] ?
                                                                            items["8th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["10th"] ?
                                                                            items["10th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["11th"] ?
                                                                            items["11th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                                <td className="academicGrade">
                                                                    {
                                                                        items["12th"] ?
                                                                            items["12th"].map((firstList: any) => (
                                                                                <div className="academicGrade" style={{ background: firstList.color_code }}>
                                                                                    <small>{firstList.standard} {firstList.performance}</small></div>
                                                                            ))
                                                                            : null
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                        : <div className="loadingCommon"></div>}
                                                </tbody>
                                                : <CommonLoader />}
                                        </table>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        getGradeComparisonValue: state.dashboard.getGradeComparisonReport,
        getGradeSubjectList:state.dashboard.gradeSujectList,
		loading: state.dashboard.loading
    }
}

export default connect(mapStateToProps, { fetchGradeComparisonReport, fetchGradeSubjectList })(GradeComparison)
