//mutations for the frontend
import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation createUserMutation($email:String!,$password:String!){
    registerUser(email: $email,password: $password) {
      token
      user {
        id
        userInformation{
         email
         username
         role
         name
        }
        authentication {
          isVerified
          isBoarded
        }
      }
    }
  }
`;

// onboardUser(user : UserInput) : User
export const ONBOARD_USER = gql`
  mutation onboardUserMutation($user:UserInput!){
    onboardUser(user: $user) {
      id
      userInformation{
        email
        username
        role
        name
        }
    }
  }

  `;

export const GET_USER_BY_ID = gql`
    mutation getUserByIdMutation($id:Int!){
      getUserById(id:$id){
        userInformation{
          name
          username
          email
          mobileNum
          gender
          role
          state
          college
          department
          course
          collegeId
          graduationYear
          cgpa
          hosteler
          profilePic 
          leetcodeProfile    
          codeforcesProfile  
          linkedinProfile    
          githubProfile      
      }
      }
    }
  `;

export const GET_USER_BY_USER_NAME = gql`
    mutation GetAllUser($user: UserInputOptional) {
    getAllUser(user: $user) {
        userInformation{
          name
          username
          email
          mobileNum
          gender
          role
          state
          college
          department
          course
          collegeId
          graduationYear
          cgpa
          hosteler
          profilePic 
          leetcodeProfile    
          codeforcesProfile  
          linkedinProfile    
          githubProfile      
      }
      }
    }
  `;

export const GET_USER_BY_ID2 = gql`
    mutation getUserByIdMutation($id:Int!){
      getUserById(id:$id){
        id
        userInformation{
        username
          name
          profilePic           
      }
      }
    }
  `;


export const LOGIN_USER = gql`
  mutation loginUserMutation($username:String,$email:String,$password:String!){
    loginUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        userInformation{
          email
          username
          role
          name
         }
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmailMutation($email:String!,$otp:String!){
    checkOTPForEmail(email: $email, otp: $otp) {
      token
     user{
      id
      userInformation{
        email
        username
        role
        name
       }
      authentication {
        isVerified
        isBoarded
        otpForEmail 
        otpEmailExpiry
      }
     }
    }
  }
`;

export const SEND_VERIFY_EMAIL = gql`
  mutation sendVerifyMailMutation($email:String!){
    sendVerifyMail(email: $email)
  }
`;


export const All_USER = gql`
mutation getAllUserMuatation($user:UserInputOptional){
        getAllUser(user:$user){
          id
          userInformation{
            name
            username
            email
            mobileNum
            role
            profilePic
          }
        }
  }
`
export const UPDATE_USER = gql`
mutation updateUserMutation($user:UserInputOptional){
  updateUserProfile(user:$user){
    userInformation{
      name
      username
      email
      mobileNum
      gender
      role
      state
      college
      department
      course
      collegeId
      graduationYear
      cgpa
      hosteler
      profilePic 
      leetcodeProfile    
      codeforcesProfile  
      linkedinProfile    
      githubProfile      
  }
  }
}

`;

export const UPDATE_USER_ROLE = gql`
  mutation updateUserRoleMutation($id:Int!,$role:UserRole!){
    updateUserRole(id:$id,role:$role)
  }
`;


