export const typeDefs = `#graphql
    type User {
        id                      : Int
        userInformation         : UserInformation
        authentication          : Authentication
    }

    enum UserRole {
        USER
        ADMIN
        SUPERADMIN
        MANAGER
    }

    enum Gender {
        MALE
        FEMALE
        TRANSGENDER
        PREFER_NOT_TO_SAY
    }
      
    enum Department {
        COMPUTER_SCIENCE_AND_ENGINEERING
        ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING
        ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING
        ELECTRICAL_ENGINEERING
        MECHANICAL_ENGINEERING
        CHEMICAL_ENGINEERING
        CIVIL_ENGINEERING
        PRODUCTION_ENGINEERING
        BIO_TECH_AND_BIO_ENGINEERING
    }

    type Authentication {
        id                      : Int 
        userId                  : Int
        otpForEmail             : String
        otpEmailExpiry          : DateTime
        otpForPasswordChange    : String
        otpPasswordChangeExpiry : DateTime
        isVerified              : Boolean
        isBoarded               : Boolean
    }

    type UserInformation {
        id                      : Int
        username                : String
        name                    : String
        email                   : String
        mobileNum               : String
        role                    : UserRole
        profilePic              : String
        gender                  : Gender
        collegeId               : String
        graduationYear          : Int
        cgpa                    : Float
        college                 : String
        department              : Department
        course                  : Course
        state                   : String
        hosteler                : Boolean
        leetcodeProfile         : String
        codeforcesProfile       : String
        linkedinProfile         : String
        githubProfile           : String
    }
      
    enum Course {
        BTech
        PhD
        MCA
        MTech
    }    

    type UserWithJWT {
        token: String
        user: User
    }

    input UserInput {
        username                : String!
        name                    : String!
        mobileNum               : String!
        profilePic              : String
        gender                  : Gender!
        collegeId               : String!
        graduationYear          : Int!
        cgpa                    : Float!
        college                 : String!
        department              : Department!
        course                  : Course!
        state                   : String!
        hosteler                : Boolean!
        leetcodeProfile         : String
        codeforcesProfile       : String
        linkedinProfile         : String
        githubProfile           : String
    }

    input UserInputOptional {
        username                : String
        name                    : String
        mobileNum               : String
        profilePic              : String
        gender                  : Gender
        collegeId               : String
        graduationYear          : Int
        cgpa                    : Float
        college                 : String
        department              : Department
        course                  : Course
        state                   : String
        hosteler                : Boolean
        leetcodeProfile         : String
        codeforcesProfile       : String
        linkedinProfile         : String
        githubProfile           : String
    }

`
