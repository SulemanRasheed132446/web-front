
export const CATEGORY = [{
  lable: "KG",
  value: "KG"
},
{
  lable: "Primary",
  value: "Primary"
},
{
  lable: "Higher Secondary",
  value: "Higher Secondary"
}]


export const MONTHLIST = [
  { code: "JAN", month: "January" },
  { code: "FEB", month: "February" },
  { code: "MAR", month: "March" },
  { code: "APR", month: "April" },
  { code: "MAY", month: "May" },
  { code: "JUN", month: "June" },
  { code: "JUL", month: "July" },
  { code: "AUG", month: "August" },
  { code: "SEP", month: "September" },
  { code: "OCT", month: "October" },
  { code: "NOV", month: "November" },
  { code: "DEC", month: "December" }];


export const weakGoodColor = [
  {
    color: '#f88266'
  },
  {
    color: '#f88b68'
  },
  {
    color: '#f8946b'
  },
  {
    color: '#f89d6e'
  },
  {
    color: '#f8ae74'
  },
  {
    color: '#f8b776'
  },
  {
    color: '#f8c079'
  },
  {
    color: '#f8c97c'
  },
  {
    color: '#e4c37e'
  },
  {
    color: '#d0bd81'
  },
  {
    color: '#bcb883'
  },
  {
    color: '#a8b286'
  },
  {
    color: '#95ac88'
  },
  {
    color: '#81a68a'
  },
  {
    color: '#6da08d'
  },
  {
    color: '#599b8f'
  },
  {
    color: '#459592'
  }
];

export const teacherPerformanceCount = {
  "teacher_name": 'sudhakar',
  "teacher_status": [
    {
      "title": "Total Quizzes",
      "count": "3"
    },
    {
      "title": "Total Feedbacks",
      "count": "3"
    },
    {
      "title": "Total Attendances",
      "count": "1"
    }
  ]
}
export const overallPerformance = [
  {
    "subject_name": "English",
    "class_list": [
      {
        "class_name": "2nd",
        "graph_data": [
          { "name": "unit7", "color_code": "#43546" },
          { "name": "unit12", "color_code": "#436g6" },
          { "name": "unit1", "color_code": "#f7680" }
        ]
      },
      {
        "class_name": "3rd",
        "graph_data": [
          { "name": "unit6", "color_code": "#43546" },
          { "name": "unit2", "color_code": "#436g6" },
          { "name": "unit11", "color_code": "#f7680" }
        ]
      }

    ]

  },
  {
    "subject_name": "EVS",
    "class_list": [
      {
        "class_name": "2nd",
        "graph_data": [
          { "name": "unit7", "color_code": "#43546" },
          { "name": "unit12", "color_code": "#436g6" },
          { "name": "unit1", "color_code": "#f7680" }
        ]
      }

    ]
  }
]

export const subjectPerformance = [

  {
    "subject_name": "English",
    "correct_answer": 2,
    "incorrect_answer": 17,
    "not_attempted": 1,
    "percent": ["88", "8", "4"],
    "color_code": ["#43546", "#436g6", "#f7680"],
    "good_topics": ["unit7", "unit12", "parts of speech"]
  },
  {
    "subject_name": "English",
    "correct_answer": 2,
    "incorrect_answer": 17,
    "not_attempted": 1,
    "percent": ["88", "8", "4"],
    "color_code": ["#43546", "#436g6", "#f7680"],
    "good_topics": ["unit7", "unit12", "parts of speech"]
  }
]
// menu name list
export const academicMenuList = [{
  menu_name: 'Dashboard',
  url: '/dashboard',
  icon: 'fa fa-tachometer'
}, {
  menu_name: 'Classes',
  url: '/classes',
  icon: 'fa fa-file-text-o'
}, {
  menu_name: 'Institutions',
  url: '/institutions',
  icon: 'fa fa-building-o'
}, {
  menu_name: 'Instant Feedback',
  url: '/instant_feedback',
  icon: 'fa fa-file-text-o'
}, {
  menu_name: 'Quizzes',
  url: '/quizzes',
  icon: 'fa fa-file-text'
},
{
  menu_name: 'Manage',
  url: '',
  icon: 'fa fa-user-o',
  submenu: [{
    menu_name: 'School',
    url: '/school'
  },
  {
    menu_name: 'User',
    url: '/user'
  }
  ]
}]

export const schoolAdminMenuList =  [{
  menu_name: 'Dashboard',
  url: '/dashboard',
  icon: 'fa fa-tachometer'
}, {
  menu_name: 'Classes',
  url: '/classes',
  icon: 'fa fa-file-text-o'
}, {
  menu_name: 'Instant Feedback',
  url: '/instant_feedback',
  icon: 'fa fa-file-text-o'
},{
  menu_name: 'Attendance',
  url: '/attendance',
  icon: 'fa fa-file-text-o'
}, {
  menu_name: 'Notice Board',
  url: '/notice_board',
  icon: 'fa fa-commenting-o'
}, {
  menu_name: 'Diary',
  url: '/diary',
  icon: 'fa fa-book'
}, {
  menu_name: 'Quizzes',
  url: '/quizzes',
  icon: 'fa fa-file-text'
}, {
  menu_name: 'Question Set',
  url: '/question',
  icon: 'fa fa-table'
},
{
  menu_name: 'Manage',
  url: '',
  icon: 'fa fa-user-o',
  submenu: [{
    menu_name: 'School',
    url: '/view_school'
  },
  {
    menu_name: 'Class',
    url: '/class'
  },
  {
    menu_name: 'Subject',
    url: '/subject'
  },
  {
    menu_name: 'Teacher',
    url: '/teacher'
  },
  {
    menu_name: 'Student',
    url: '/student'
  }
  ]
}]

export const teacherMenuList = [{
  menu_name: 'Dashboard',
  url: '/dashboard',
  icon: 'fa fa-tachometer'
}, {
  menu_name: 'Instant Feedback',
  url: '/instant_feedback',
  icon: 'fa fa-file-text-o'
}, {
  menu_name: 'Attendance',
  url: '/attendance',
  icon: 'fa fa-file-text-o'
}, {
  menu_name: 'Notice Board',
  url: '/notice_board',
  icon: 'fa fa-commenting-o'
}, {
  menu_name: 'Diary',
  url: '/diary',
  icon: 'fa fa-book'
}, {
  menu_name: 'Quizzes',
  url: '/quizzes',
  icon: 'fa fa-file-text'
}, {
  menu_name: 'Question Set',
  url: '/question',
  icon: 'fa fa-table'
}]

export const noticeBoard = [{
  message_title:'There are many variations of passages of Lorem Ipsum available.',
  update_time:'TODAY 5.50 PM'
},
{
  message_title:'There are many variations of passages of Lorem Ipsum available.',
  update_time:'TODAY 4.50 PM'
},
{
  message_title:'There are many variations of passages of Lorem Ipsum available.',
  update_time:'TODAY 3.50 PM'
},{
  message_title:'There are many variations of passages of Lorem Ipsum available.',
  update_time:'TODAY 2.50 PM'
}]
//Error message
export interface validationMessage {
  schoolErrorMsg: string,
  address: string,
  name: string,
  designation: string,
  phone_number: string,
  email_id: string,
  acadamic_start_month: string,
  acadamic_end_month: string,
  start_time: string,
  end_time: string,
  short_name: string,
  subject_name: string,
  category: string,
  failuserpass: string,
  loginUser: string,
  schoolCategory: string,
  latitude: string,
  otpCode: string,
  standard: string,
  grade: string,
  InvalidPhoneNo: string,
  InvalidEmailId: string,
  addClassStudent:string
}

export const FormvalidationMessage: validationMessage = {
  schoolErrorMsg: "Please enter the School Name",
  address: "Please enter the School Address",
  name: "Please enter the Contact Person Name",
  schoolCategory: "Please select the School Category",
  designation: "Please enter the Contact Person Designation",
  phone_number: "Please enter the Contact Person Phone Number",
  email_id: "Please enter the Contact Person Email Id",
  acadamic_start_month: "Please select the Academic Start Month",
  acadamic_end_month: "Please select the Academic End Month",
  start_time: "Please select the Start Time",
  end_time: "Please select the End Time",
  short_name: "Please enter the Subject Short Name",
  subject_name: "Please enter the Subject Name",
  category: "Please select the Subject Category",
  failuserpass: "Please enter your Password",
  loginUser: "Please enter the Email Id or Phone Number",
  otpCode: "Please enter your OTP",
  standard: 'Please select the Section',
  grade: 'Please select the Grade',
  InvalidPhoneNo: 'Please enter a valid Phone Number',
  InvalidEmailId: 'Please enter a valid Email Id',
  latitude: 'Please select school location',
  addClassStudent:'Please add at least one Class and Student'
}

export interface invalidMessage {
  invalidPhoneNumber: string,
  invalidName: string,
  invaliddesignation: string,
  invalidAddress: string,
  invalidEmailId: string,
  InvalidCategory: string,
  invalidSchoolName: string,
  invalidSubjectName: string,
  invalidShortName: string,
  incalidpassPatten: string,
  invalidUserName: string,
  endTimeInvalid: string,
  startTimeInvalid: string,
  loginUserName: string,
  otpInvalid: string,
  Confirmpassword: string,
  newpassword: string,
  confirmMessage: string
}

export const FormInvalidMessage: invalidMessage = {
  invalidPhoneNumber: "Please enter a valid Contact Person Phone Number",
  invalidSchoolName: "Please enter a valid School Name",
  invalidName: "Please enter a valid Contact Person Name",
  invaliddesignation: "Please enter a valid Contact Person Designation",
  invalidAddress: "Please enter a valid School Address",
  invalidEmailId: "Please enter a valid Contact Person Email Id",
  InvalidCategory: "Please enter a valid Contact Person Category",
  invalidSubjectName: "Please enter a valid Subject Name",
  invalidShortName: "Please enter a valid Subject Short Name",
  incalidpassPatten: "Must contain 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  invalidUserName: "Please enter a valid Email Id",
  endTimeInvalid: "End Time should be longer than Start Time",
  startTimeInvalid: 'End Time should be greater than Start Time',
  loginUserName: "Please enter a valid Email Id or Phone Number",
  otpInvalid: "Please enter a valid OTP",
  Confirmpassword: "Please enter your Confirm Password",
  newpassword: "Please enter your Password",
  confirmMessage: "Password and confirm password must match"
}

//Number validation value

export interface validationSize {
  nameMinSize: number,
  nameMaxSize: number,
  addressMaxSize: number,
  mobileNoSize: number,
  schoolMaxSize: number,
  subjectNameMaxSize: number,
  subjectNameMinSize: number,
  shortNameMaxSize: number,
  shortNameMinSize: number,
  schoolIdMaxSize: number,
  designation: number,
  mobileNoMax: number,
  categoryMax: number,
  maxpassword: number,
  minpassword: number,
  phoneNo: number,
  otpMax: number,
  otpMin: number,
  minLastName: number,
  maxlengthpassword: number,
  minlengthpassword: number
}

export const formValidationSize: validationSize = {
  nameMinSize: 3,
  schoolMaxSize: 50,
  nameMaxSize: 50,
  addressMaxSize: 250,
  mobileNoSize: 10,
  subjectNameMaxSize: 50,
  subjectNameMinSize: 2,
  shortNameMaxSize: 10,
  shortNameMinSize: 2,
  schoolIdMaxSize: 150,
  designation: 75,
  mobileNoMax: 10,
  categoryMax: 50,
  maxpassword: 12,
  minpassword: 8,
  phoneNo: 10,
  otpMax: 6,
  otpMin: 6,
  minLastName: 1,
  maxlengthpassword: 12,
  minlengthpassword: 8
}
export interface validationSizeMessage {
  schoolNameMinMsg: string,
  schoolNameMaxMsg: string,
  nameMixMsg: string,
  nameMaxMsg: string,
  addressMixMsg: string,
  addressMaxMsg: string,
  phoneMinMsg: string,
  phoneMaxMsg: string,
  designationMinMsg: string,
  designationMaxMsg: string,
  subjectNameMinMsg: string,
  shortNameMaxMsg: string,
  shortNameMinMsg: string,
  subjectNameMaxSize: string,
  minvaluepasssize: string,
  maxvaluepasssize: string,
  minUserNo: string,
  otpMaxMsg: string,
  otpMixMsg: string
}
export const formValidationSizeMsg: validationSizeMessage = {
  schoolNameMinMsg: "Please enter at least 3 characters",
  schoolNameMaxMsg: "School Name should not be more than 150 characters",
  nameMixMsg: "Please enter at least 3 characters",
  nameMaxMsg: "Contact Person Name should not be more than 50 characters",
  addressMixMsg: "Please enter at least 3 characters",
  addressMaxMsg: " Contact Person Address should not be more than 250 characters",
  phoneMinMsg: "Please enter the 10 digit Contact Person Phone Number",
  phoneMaxMsg: "Please enter the 10-digit Contact Person Phone Number",
  designationMinMsg: "Please enter at least 3 characters",
  designationMaxMsg: "Contact Person Designation should not be more than 75 characters",
  subjectNameMinMsg: "Please enter at least 2 characters",
  shortNameMaxMsg: "Subject Short Name should not be more than 10 characters",
  shortNameMinMsg: "Please enter at least 2 characters",
  subjectNameMaxSize: "Subject Name should not be more than 50 characters",
  minvaluepasssize: "Please enter at least 8 characters",
  maxvaluepasssize: "Password should not be more than 12 characters",
  minUserNo: "Email Id or Phone Number minimum 10 digits",
  otpMaxMsg: "Please enter a 6-digit OTP",
  otpMixMsg: "Please enter a valid OTP"
}

//reg.exp pattens
export interface validationPatten {
  numberPatten: RegExp,
  namePatten: RegExp,
  emailPatten: RegExp,
  passwordPatten: RegExp,
  phoneRegExp: RegExp,
  emailIdPhoneNo: RegExp,
  address: RegExp,
  schoolNamePattern: RegExp,
  alphanumericTest: RegExp
}
export const formValidationPatten: validationPatten = {
  namePatten: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,
  schoolNamePattern: /^([a-zA-Z@_&.,'-]+\s)*[a-zA-Z@_&.,'-]+$/,
  numberPatten: /^[0-9]+$/,
  // eslint-disable-next-line
  emailPatten:/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
  passwordPatten: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phoneRegExp: /^[^-\s][0-9_\s-]+$/,
  emailIdPhoneNo: /^([_+a-z0-9]+(\.[_+a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))|(\d+$)$/,
  address: /^\S+(?: \S+)*$/,
  alphanumericTest: /^[A-Za-z0-9_\s-]+$/
}

export enum UserRoles {
  acadamicAdmin = "1",
  schoolAdmin = "2",
  teacher = "3",
  parent = "4",
  nonAdmin = "0"
}

export interface notificationMessage {
  position: string,
  duration: number,
  getDuration: number
}

export const notificationMsg: notificationMessage = {
  position: "top-right",
  duration: 2000,
  getDuration: 500
}

export interface userManagevalidaType {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: string,
  emailId: string,
  firstNameMin: string,
  firstNameMax: string,
  firstNameSizeMin: number,
  firstNameSizeMax: number,
  firstNameInvalid: string,
  lastNameMin: string,
  lastNameMax: string,
  lastNameSizeMin: number,
  lastNameSizeMax: number,
  lastNameInvalid: string,
  schoolName: string,
  emailIdInvalid: string,
  phoneNumbervalid: string,
  phoneMinMsg: string,
  phoneMaxMsg: string,
  dirayTitleMax: string,
  dirayTitleMin: string
}

export const userFormValidations: userManagevalidaType = {
  firstName: "Please enter the First Name",
  lastName: "Please enter the Last Name",
  phoneNumber: "Please enter the Phone Number",
  role: "Please select the Role",
  emailId: "Please enter the Email Id",
  schoolName: "Please select the School Name",
  firstNameMin: "Please enter at least 3 characters",
  firstNameMax: "First Name should not be more than 50 characters",
  firstNameInvalid: "Please enter a valid First Name",
  lastNameMin: "Last name minimum 1 characters",
  lastNameMax: "Last Name should not be more than 50 characters",
  lastNameInvalid: "Please enter a valid last name",
  emailIdInvalid: "Please enter a valid Email Id",
  phoneNumbervalid: "Please enter a 10 digit Phone Number",
  phoneMinMsg: "Please enter the valid Phone Number",
  phoneMaxMsg: "Please enter the valid Phone Number",
  firstNameSizeMin: 3,
  firstNameSizeMax: 50,
  lastNameSizeMin: 1,
  lastNameSizeMax: 50,
  dirayTitleMax: 'Your title maximum 50 characters',
  dirayTitleMin: 'Your title minimum 3 characters'
}

interface studentValidation {
  phone_number: string,
  student_name: string,
  profile_picture: string,
  email_id: string,
  maxphonenumber: number,
  minphonenumber: number,
  maxphoneinvalid: string,
  minphoneinvalid: string,
  invalidphone: string,
  invalidstudentname: string,
  maxstudentname: string,
  minstudentname: string,
  invalidemailid: string,
  grade: string,
  standard: string,
  parentFirstName: string,
  maxparentFirstName: string,
  minparentFirstName: string,
  invalidparentFirstName: string,
  parentLastName: string,
  maxparentLastName: string,
  minparentLastName: string,
  invalidparentLastName: string,
  diraySelectStudent: string,
  diaryMessage:string,
  noRecordData:string
}

export const studentValida: studentValidation = {
  phone_number: 'Please enter the Phone Number',
  student_name: 'Please enter the Student Name',
  profile_picture: 'please upload profile picture',
  email_id: 'Please enter the Email Id',
  maxphonenumber: 10,
  minphonenumber: 10,
  maxphoneinvalid: 'Please enter a 10 digit Phone Number',
  minphoneinvalid: 'Please enter a 10 digit Phone Number',
  invalidphone: 'Please enter a valid Phone Number',
  invalidstudentname: 'Please enter a valid Student Name',
  maxstudentname: 'Student Name should not be more than 50 characters',
  minstudentname: 'Please enter at least 3 characters',
  invalidemailid: 'Please enter a valid Email Id',
  grade: 'Please select the Grade',
  standard: 'Please select the Section',
  parentFirstName: 'Please enter the Parent First Name',
  parentLastName: 'Please enter the Parent Last Name',
  maxparentFirstName: 'Parent First Name should not be more than 50 characters',
  minparentFirstName: 'Please enter at least 3 characters',
  invalidparentFirstName: 'Please enter a valid Parent First Name',
  maxparentLastName: 'Parent Last Name should not be more than 50 characters',
  minparentLastName: 'Parent Last Name minimum 3 characters long',
  invalidparentLastName: 'Please enter a valid Parent Last Name',
  diraySelectStudent: 'Please select the Student',
  diaryMessage:'Please write your message',
  noRecordData:'No matching records found.'
}
