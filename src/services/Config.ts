export interface AUTHAPITYPE {
    CHECKUSER:string,
    LOGIN:string,
    FORGOTPASSWORD:string,
    RESETPASSWORD:string,
    REGISTERUSER:string
    LOGOUT:string,
    PROFILE:string,
    OTPCHECK:string,
    GENERATOTP:string,
    CHECKTOKENVALIDATION:string,
    GetTeacher:any
}

export const AUTHAPI: AUTHAPITYPE = {
    CHECKUSER:"/auth/checkuser/",
    LOGIN:"/auth/login/?app=web",
    FORGOTPASSWORD:"/auth/password/",
    RESETPASSWORD:"/auth/resetpassword/",
    REGISTERUSER:"/auth/register/",
    LOGOUT:'/auth/logout/',
    PROFILE:'/auth/profile/',
    OTPCHECK:"/auth/verifyotp/",
    GENERATOTP:"/auth/generateotp/",
    CHECKTOKENVALIDATION:"/auth/validatetoken/",
    GetTeacher:'/auth/getallteachers/'
};

export interface SCHOOLMANGETYPE {
    SCHOOLMANAGEVIEW:string,
    SCHOOLMANAGEDELETE:string,
    CLASSES:string,
    GRADELIST:string,
    GRADESTANDARD:string
}
export const SCHOOLMANAGE: SCHOOLMANGETYPE ={
    SCHOOLMANAGEVIEW:'/api/school/',
    SCHOOLMANAGEDELETE:'/api/users/deactivate/',
    CLASSES:'/api/classes/',
    GRADELIST:'/api/lovs/grade/',
    GRADESTANDARD:'/api/lovs/standard'
}

export interface SUBJECTMANGETYPE {
    SUBJECTMANAGEVIEW:string,
    SUBJECTMANAGEDELETE:string,
    SubjectList:string
}
export const SUBJECTMANAGE: SUBJECTMANGETYPE ={
    SUBJECTMANAGEVIEW:'/api/subject/',
    SUBJECTMANAGEDELETE:'/api/users/deactivate/',
    SubjectList:'/api/subject/getallsubject/'
}

export interface CATEGORYMANAGETYPE {
    CATEGORYMANAGEVIEW:string,
    YearList:string,
    durationChart:string
}
export const CATEGORYMANAGE: CATEGORYMANAGETYPE = {
    CATEGORYMANAGEVIEW:'/api/lovs/subject_category/',
    YearList:'/api/lovs/academic_year/',
    durationChart:'/api/lovs/duration/'
}

export interface subjectRequestData {
    "url": "/api/subject/",
}

export const USERNAMENAGE = {
    USERMANAGE:'/auth/user/',
    GETUSER:'/auth/getusers/',
    GETSCHOOLCATEGORY:'/api/school/schoollist'
}

export const STUDENTS = {
    STUDENTS:'/api/students/',
    CHECKPARENT:'/auth/parentcheck/',
    STUDNETSIMAGEUPDATE:'/api/students/uploadprofile/',
    studentProfile:'/api/dashboard/studentbasicreport',
    studentProfileTopic:'/api/dashboard/studentprofilebytopic',
    studentProfileSubject:'/api/dashboard/studentprofilebysubject',
    studentProfileLine:'/api/students/performance/details/',
    getStudentNameList:'/api/students/getstudents/'

}

export const IMAGEUPLOAD = {
    STUDENTIMAGEUPLOAD:'/api/students/uploadprofile/',
    TeacherImageUpload:'/api/teacher/profileupload/'
}

export const DIARYAPI = {
    DIARY:'/api/diary/',
    GETALLSTUDENTLIST:'/api/classes/getallstandards/',
    GETSTUDENTLIST:'/api/classes/studentlist/',
    DIARYAPIIMAGEUPDATE:'/api/diary/upload/',
    GETALLSTUDENTSEARCHLIST: '/api/students/getallstudents/',
    DiaryDropDown:'/api/lovs/diary_type/'
}

export const Teacher = {
    TeacherPost:'/api/teacher/subjectmapping/',
    TeacherId:'/api/teacher/details/',
    TeacherClass:'api/teacher/classincharge/',
    TeacherSubjectClassEdit:'/api/teacher/details/',
    ClassCount:'/api/teacher/details/'
}

export const QuestionSet = {
    Question:'/api/questionset/',
    teacherQuestion:'/api/teacher/teacher_subject_dropdown/'
}

export const NoticesBoard = {
    noticeboard:'/api/notice_board/',
    noticeboardImage:'/api/notice_board/upload/'
}

export const ListItem = {
    myClassList:'/api/classes/getmygrades/',
    mySectionList:'/api/classes/getmysections/'
}

export const DashboardAPI = {
    dashboard:'/api/dashboard/dashboard_count',
    TeacherEngagement:'/api/dashboard/teacherreport/',
    StandardAnalysis:'/api/dashboard/standard_analysis',
    SubjectAnalysis:'/api/dashboard/subject_analysis',
    InstantFeedBack:'/api/instantfeedback/instant_feedback_list',
    attendanceUse:'/api/dashboard/getattendance',
    feedbacksUse:'/api/dashboard/getfeedbacks',
    quizesUse:'/api/dashboard/getquizes',
    topicAnalysis:'/api/dashboard/topic_analysis',
    subjectPerformance:'/api/dashboard/subject_performance',
    concernPoint:'/api/dashboard/concern_point',
    classReports:'/api/classes/getclassreports/',
    quizReport:'/api/quiz/quiz_report',
    attendeanceReport:'/api/attendance/attendance_report',
    teacherPerformance:'/api/teacher/teacher_performance_count',
    teacherSubjectPerformance:'/api/teacher/teacher_subject_performance',
    teacherOverallPerformance:'/api/teacher/teacher_overall_performance',
    recentFeedbackList:'/api/instantfeedback/recent_feedback_list',
    recentQuizReport:'/api/quiz/recent_quiz_report',
    topicAnalysisReport:'/api/dashboard/topicanalysisreport',
    ClassrePort:'/api/dashboard/classreport',
    todaysAttendance:'/api/attendance/todays_attendance',
    gradeComparisonReport:'/api/dashboard/gradecomparisonreport',
    classRecentFeedback:'/api/dashboard/classrecentfeedback',
    classRecentQuiz:'/api/dashboard/classrecentquiz',
    studentRecentQuiz:'/api/quiz/studentrecentquiz',
    diaryReply:'/api/diary/reply/',
    gradeSubjectList:'/api/subject/getall/'
}
// This instant feedback Api link
export const InstantFeedBackAPI = {
    feedbackBarChart:'/api/instantfeedback/feedback_bar_chart',
    feedbackPieChart:'/api/instantfeedback/feedback_pie_chart',
    feedbackStudent:'/api/instantfeedback/feedback_student',
    feedbackSubject:'/api/instantfeedback/feedback_subject'
}

export const QuizzesReportAPI = {
    quizQuestionList:'/api/quiz/quiz_question_list',
    quizCalculation:'/api/quiz/quiz_calculation',
    quizStudentDetails:'/api/quiz/quiz_student_detail',
    quizBarChart:'/api/quiz/quiz_barchart',
    questionReportView:'/api/quiz/quiz_question_view',
    singleQuizStudent:'/api/quiz/quiz_single_student',
    singleQuizQuestionList:'/api/quiz/quiz_question_list_single_student'
}
// /api/quiz/quiz_question_list_single_student?quiz_id=11&card_id=1

export const leastAttendees = {
    getLeastAttendees:'/api/dashboard/least_attendees'
}