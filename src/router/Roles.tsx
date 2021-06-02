import { UserRoles } from '../services/Constants'
//some views will be for admins only, some for users (non-admins)
// and then the rest is available for all roles
const userRoles = {
    admins: [String(UserRoles.acadamicAdmin), String(UserRoles.schoolAdmin)],
    other:[String(UserRoles.teacher), String(UserRoles.parent)],
	users: [String(UserRoles.nonAdmin)],
	all: [
		String(UserRoles.acadamicAdmin),
        String(UserRoles.schoolAdmin),
        String(UserRoles.teacher),
        String(UserRoles.parent),
		String(UserRoles.nonAdmin)
	]
};

export enum AuthRoutes {
	dashboard = '/dashboard',
    viewschooldetails = '/school',
    viewsubjectdetails = '/subject',
    teacherengagement = '/teacherengagement',
    addnewschool = '/add_school',
    editschool = '/edit_school/:id',
    logout = '/logout',
    addSubject='/add_subject',
    editSubject = '/edit_subject/:id',   
    viewSchool = '/view_school'
}

export enum SchoolManage {
    viewclasses = '/class',
    addclasses = '/add_class',
    editclasses = '/edit_class/:id'
}

export enum UserManagementUrl {
    userManageView = '/user',
    addUserManage = '/add_user',
    editUserManage = '/edit_user/:id'
}

export enum NonAuthRoutes {
	login = '/',
	forgotpassword = '/forgot_password',
    resetpassword = '/reset_password',
    unautheration= '/UnAuthorized',
    loginUser = '/login',
    userloginpassword ='/userloginpassword',
    userregister = '/register',
    userrotp = '/otp',
    userregisterpassword ='/password',
    ForgotOTP='/forgot_otp',
    pageNoFound='/404'
}

export enum StudentDetails {
    studentView = '/student',
    studentAdd = '/student_add',
    studentEdit = '/student_edit/:id',
    studnetFullDetails ='/student_profile/:id'
}

export enum TeacherDetails {
    teacherView = '/teacher',
    teacherAdd = '/teacher_add',
    teacherEdit = '/teacher_edit/:id',
    teacherFullDetails ='/teacher/:id',
    addSubject='/map_subject/',
    AddClassInCharge='/class_incharge_add',
    TeacherClassEdit="/class_incharge/edit",
    TeacherSubjectEdit="/subject_mapping",
    TeacherEngagement="/teachers/:id"
}

export enum DiaryList {
    diaryView = '/diary',
    diaryAdd = '/diary_add',
    diaryEdit = '/diary_edit/:id'
}

export enum NoticeBoard {
    noticeView = '/notice_board'
}

export enum Question {
    ViewQuestion = '/question',
    AddQuestion = '/question/add',
    ViewQuestionlist = '/question/:id',
    AddMoreQuestion = '/question/add/:id',
    studentQuestionView = '/student/:id'
}
export enum ClassesMenu {
    viewClasses = '/classes'
}

export enum commonmenu {
    InstantFeedback = '/instant_feedback',
    ViewInstantFeedback = '/view_instant_feedback/:id',
    Attendance='/attendance',
    StudentView='/student_view',
    ClassesReport='/classes_report/:id',
    Organizations='/institutions',
    viewSchoolTeam = '/institutions/:id',
    Quizzes = '/quizzes',
    getClassId = '/classes/:id',
    getQuizzesId = '/quizzes/:id',
    getInstantFeedback = '/instant_feedback/:id',
    getQuizzesReport = '/quizzes_report/:id'
}

export enum FeedBackMenu {
    viewFeedBack = '/topics/:id'
}
export default userRoles;