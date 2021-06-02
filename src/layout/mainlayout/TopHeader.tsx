import React from 'react';
import { Link } from 'react-router-dom';
import { UserRoles, academicMenuList, schoolAdminMenuList, teacherMenuList, noticeBoard } from '../../services/Constants'
import { connect } from 'react-redux';
import { fetchProfilePost, getYearData, DiaryNotificationMessage, NoticeBoardMessage } from '../../store/profile/Actions'
import { RootState } from '../../store/Index'
import { LogoutPost } from '../../store/authentication/Actions'
import Modal from 'react-bootstrap/Modal'
import { TokenValidationPost, YearListGet, DurationListGet } from '../../store/profile/Actions';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { GetCorrectSubject } from '../../store/subject/Actions';

export interface ProfileDetails {
	getProfileDetails?:any;
	getChangeYearData?:any;
	YearList: any;
	getYearData:(postvalue?:any) => any;
	fetchProfilePost: () => any;
	LogoutPost: () => void;
	TokenValidationPost: () => any;
	YearListGet: () => any;
	DurationListGet:() => any;
	GetCorrectSubject: (postValue:any) => void; 
	DiaryNotificationMessage:(postValue:any) => any;
	NoticeBoardMessage:(postValue:any) => any;
}
interface propTopType {
	acadamicAdmin: boolean,
		schoolAdmin: boolean,
		bothData: boolean,
		teacher: boolean,
		parent: boolean,
		showLogout: boolean,
		getYear:any,
		sideMenuBar: boolean,
		menuListclose: any,
		menuListOpen: boolean
}
class Topheader extends React.Component<ProfileDetails, propTopType> {
	showMenuOption:any = 'arrow';
	constructor(props: any) {
		super(props);
		this.state = {
			acadamicAdmin: false,
			schoolAdmin: false,
			bothData: false,
			teacher: false,
			parent: false,
			showLogout: false,
			getYear:this.props.getChangeYearData,
			sideMenuBar:true,
			menuListclose:'arrow',
			menuListOpen:false
		};
	  }

	public closeLogout = () => {
		this.setState({ showLogout: false });
	}

	public ShowLogoutBox = () => {
		this.setState({ showLogout: true });
	}

	componentDidMount(): void {
		const { getYear } = this.state;
		this.props.getYearData()
		this.props.fetchProfilePost();
		this.props.TokenValidationPost();;
		this.props.YearListGet();
		this.checkUserType();
		this.props.DurationListGet();
		this.getCurrectYear();
		const { getProfileDetails } = this.props;
		if(getYear){
			if(getProfileDetails.school_id){
				const postValue = {
					academic_year:getYear,
					school_id:getProfileDetails.school_id
				}
				this.props.GetCorrectSubject(postValue);
			}
		}
	}
	getCurrectYear(){
		const dateCurrent: any = new Date();
		let currectYear:any = dateCurrent.getFullYear();
		if(currectYear){
			this.setState({getYear:currectYear})
		}
	}
	checkUserType() {
		const getTopToken = localStorage.getItem('usertype');
		if (getTopToken === UserRoles.acadamicAdmin) {
			this.setState({ acadamicAdmin: true })
		} else if (getTopToken === UserRoles.schoolAdmin) {
			this.setState({ schoolAdmin: true })
		} else if (getTopToken === UserRoles.teacher) {
			this.setState({ teacher: true })
		} else if (getTopToken === UserRoles.parent) {
			this.setState({ parent: true })
		}
	}

	private LogoutPage() {
		return (
			<div>
				<Modal show={this.state.showLogout}>
					<Modal.Header className="pb-0 pt-0">
						<Modal.Title>Logout</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Are you sure want to Logout?</p>
					</Modal.Body>

					<Modal.Footer className="modelboxbutton">
						<button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.props.LogoutPost}>Okay</button>
						<button className="btn btn-default mr-1 ml-1 w-15" onClick={this.closeLogout}>Cancel</button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
	ChangeYear = (e:any) =>{
		let getChangeYear:any = e.target.value;
		if(getChangeYear){
			// let getChange:any = getChangeYear;
			this.props.getYearData(getChangeYear);
			this.setState({getYear:getChangeYear})
		}
	}
		
	public hideSubmenuList = () =>{
		const { sideMenuBar } = this.state;
		if(sideMenuBar === true){
			this.setState({ sideMenuBar: false })
		} else {
			this.setState({ sideMenuBar: true })
		}
	}
	public hideToggel = () =>{
		const { sideMenuBar } = this.state;
		if(sideMenuBar === true){
			this.setState({ sideMenuBar: false })
		} else {
			this.setState({ sideMenuBar: true })
		}
	}
onMouseEnterHandler = (getValue:any) => {
	if( getValue ==='Manage' ){
		this.setState({menuListclose:'arrow open'})
	}
		
		
    }
onMouseLeaveHandler = (getValue:any) =>{
	if( getValue ==='Manage' ){
		this.setState({menuListclose:'arrow'})
	}
    }
	render() {
		const { getYear } = this.state;
		const getProfile: any = this.props.getProfileDetails;
		let getMenuList:any;
		let noticeData:any = noticeBoard;
		const getData:any = getProfile;
		let userFirstName;
		let userLastName;
		let userRole;
		if (getData) {
			userFirstName = getData.firstname;
			userLastName = getData.lastname;
			userRole = getData.role;
		}
		// This is the function used to user type based show menu
		if (getData.usertype === 1) {
			getMenuList = academicMenuList;
		} else if (getData.usertype === 2) {
			getMenuList = schoolAdminMenuList;
		} else if (getData.usertype === 3) {
			getMenuList = teacherMenuList;
		}
		
		return (
			<div>
				{this.LogoutPage()}
				{/* start header */}
				{this.props.YearList && userFirstName ?
				<>
					<div className="page-header navbar navbar-fixed-top">
						<div className="page-header-inner ">
							{/* logo start */}
							<div className="page-logo pl-4">
								<Link to="#" className="clickMenuList">
									<i className="fa fa-graduation-cap mr-2" aria-hidden="true"></i>
									<span className="logo-default">DAPS</span> </Link>
							</div>
							{/* logo end */}
							{/* start mobile menu */}
							<Link to="" className="menu-toggler responsive-toggler" data-toggle="collapse"
								data-target=".navbar-collapse"  onClick={() => this.hideToggel()}>
								<span></span>
							</Link>
							{/* end mobile menu */}
							{/* start header menu */}
							<div className="top-menu">
								<ul className="nav navbar-nav pull-right">
									{/* start manage user dropdown */}
									<li className="dropdown dropdown-user">
									<select name="year" className="form-control mt-2" value={getYear} onChange={this.ChangeYear}>
										{
												this.props.YearList.map((menuItems: any) => (
													<option value={menuItems.value}>
														{menuItems.value}
													</option>
												))
											}
										</select>
									</li>

									<li className="dropdown dropdown-user mr-3">
										<Link to={'#'} className="dropdown-toggle pr-2 pb-0 pt-0" data-toggle="dropdown" data-hover="dropdown"
											data-close-others="true">
											<img alt="" className="img-circle " src="assets/img/profile_small.jpg" />
											<span className="username username-hide-on-mobile mt-1 mr-2 userNameTitle"> {userFirstName} {userLastName}</span>
											<p className="d-block usernamesubtitle">{userRole} <i className="fa fa-angle-down"></i></p>
										</Link>
										<ul className="dropdown-menu dropdown-menu-default animated jello">
											{/* <li>
								<Link to={'#'}>
										<i className="icon-user"></i> Profile </Link>
								</li> */}
											<li>
												<Link to={'#'} onClick={() => this.ShowLogoutBox()}>
													<i className="icon-logout"></i> Log Out </Link>
											</li>
										</ul>
									</li>
									{/* This is notification menu option. this is plan to next phase  */}
									{/* <li className="dropdown dropdown-quick-sidebar-toggler mt-3 mr-4">
										<Link to={'#'} id="headerSettingButton" className="notificationCount" data-upgraded=",MaterialButton">
											<i className="fa fa-bell-o"></i>
											<span className="badge headerBadgeColor1"> 6 </span>
										</Link>
									</li> */}
									{/* end manage user dropdown */}

								</ul>
							</div>
						</div>
						<div className="navbar-custom">
							<div className="hor-menu hidden-sm hidden-xs">
								<ul className="nav navbar-nav">
									{getMenuList?
									getMenuList.map((items:any, i:any)=>(
										<li className="mega-menu-dropdown" key={i}>
										<Link to={items.url} className="dropdown-toggle">
											<i className={items.icon} aria-hidden="true"></i> {items.menu_name}
											{
												items.submenu?
												<>
												<i className="fa fa-angle-down"></i>
												<span className="selected"></span>
												<span className="arrow open"></span>
												</>
												:null
											}
										</Link>
										{
											items.submenu?
											<ul className="dropdown-menu">
												<li>
													<div className="mega-menu-content">
														<div className="row">
															<div className="col-md-12">
																<ul className="mega-menu-submenu">
																{items.submenu.map((submenu:any, index:any)=>(
																	<li className="nav-item" key={index}>
																	<Link to={submenu.url} className="nav-link ">
																		<span className="title">{submenu.menu_name}</span>
																	</Link>
																</li>
																))}
																</ul>
															</div>
														</div>
													</div>
												</li>
											</ul>
											
											:null
										}
									</li>
									
									))
									:null}
								</ul>
							</div>
						</div>
					</div>
					{/* mobile menu */}
					<div className="page-container">
					<div className="sidebar-container" style={{ display: this.state.sideMenuBar ? "block" : "none" }}>
					<div className="sidemenu-container navbar-collapse collapse fixed-menu">
						<div id="remove-scroll">
							<ul className="sidemenu page-header-fixed p-t-20" data-keep-expanded="false" data-auto-scroll="true"
								data-slide-speed="200">
							{getMenuList?
							getMenuList.map((items:any, i:any)=>(
								<li className="nav-item companymenuli" onMouseLeave={() => this.onMouseLeaveHandler(items.menu_name)}	onMouseEnter={() => this.onMouseEnterHandler(items.menu_name)} key={i}>
								<Link to={items.url} className="nav-link nav-toggle" onClick={() => this.hideSubmenuList()}>
									<i className={items.icon} aria-hidden="true"></i> 
									<span className="title">{items.menu_name}</span>
									{items.submenu ? 
									<>
									<span className={this.state.menuListclose}></span>
									</>
									:null}
									
									
								</Link>
								{
									items.submenu?
									<ul className="submenu pl-3">
											{items.submenu.map((submenu:any, index:any)=>(
												<li className="nav-item" key={index}>
											<Link to={submenu.url} className="nav-link clickMenuList" onClick={() => this.hideSubmenuList()}>
												<span className="title"> {submenu.menu_name}</span>
											</Link>
							
										</li>
											))}
									</ul>
									
									:null
								}
							</li>
							
							))
							:null}
							</ul>
						</div>
					</div>
				</div>
				</div>
				</>
					: <SpinnerLoader />}
				{/* end header */}
				{/* <!-- start chat sidebar --> */}
				<>
			<div className="chat-sidebar-container" data-close-on-body-click="false">
				<div className="chat-sidebar">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a href="#quick_sidebar_tab_1" className="nav-link active tab-icon" data-toggle="tab">Notice Board
							</a>
						</li>
						<li className="nav-item">
							<a href="#quick_sidebar_tab_3" className="nav-link tab-icon" data-toggle="tab"> Diary
							</a>
						</li>
					</ul>
					<div className="tab-content">					
						{/* <!-- Start Doctor Chat --> */}
						<div className="tab-pane chat-sidebar-chat animated in show active slideInRight" id="quick_sidebar_tab_1">
							<div className="chat-sidebar-list">
								<div className="chat-sidebar-chat-users slimscroll-style" data-rail-color="#ddd"
									data-wrapper-class="chat-sidebar-list">
									<div className="chat-header">
										<h5 className="list-heading"> <i className="fa fa-comments-o"></i> Latest Notice Board</h5>
									</div>
									<ul className="media-list list-items">
										{noticeData?
										noticeData.map((items:any)=>(
										<li className="media">
											<div className="media-body">
												<p >{items.message_title}</p>
												<div className="media-heading-sub">{items.update_time}</div>
											</div>
										</li>
										))
										:null}
									</ul>
								</div>
							</div>
						</div>
						{/* <!-- End Doctor Chat --> */}
						{/* <!-- Start Setting Panel --> */}
						<div className="tab-pane chat-sidebar-chat animated slideInRight" id="quick_sidebar_tab_3">
							<div className="chat-sidebar-list">
								<div className="chat-sidebar-chat-users slimscroll-style" data-rail-color="#ddd"
									data-wrapper-class="chat-sidebar-list">
									<div className="chat-header">
										<h5 className="list-heading"> <i className="fa fa-comments-o"></i> Latest Diary</h5>
									</div>
									<ul className="media-list list-items">
									{noticeData?
										noticeData.map((items:any)=>(
										<li className="media">
											<div className="media-body">
												<p >{items.message_title}</p>
												<div className="media-heading-sub">{items.update_time}</div>
											</div>
										</li>
										))
										:null}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</>
			{/* <!-- end chat sidebar --> */}
			</div>
		);
	}
}
const mapStateToProps = ({ schools, login, profile }: RootState) => {
	return {
		getChangeYearData:profile.getYear,
		getProfileDetails: profile.profileData,
		YearList: profile.YearList
	};
};
export default connect(
	mapStateToProps, { fetchProfilePost, 
		LogoutPost, 
		TokenValidationPost, 
		YearListGet, 
		DurationListGet, 
		GetCorrectSubject, 
		getYearData, 
		DiaryNotificationMessage, 
		NoticeBoardMessage }
)(Topheader);