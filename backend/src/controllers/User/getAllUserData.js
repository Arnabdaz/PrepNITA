import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const getAllUserData = async (_, payload) => {
  try {
    console.log('Get All User Data with filter : ', JSON.stringify(payload))
    const users = await prisma.user.findMany({
      where: {
        userInformation: { ...payload.user },
      },
      include: {
        authentication: true,
        userInformation: true,
      },
    })
    console.log(users)
    return users
  } catch (error) {
    console.log('Error while getting all user data : ', error)
    throw new GraphQLError('Error while getting all user data!!', {
      extensions: {
        code: 'GET_ALL_USER_DATA_FAILED',
      },
    })
  }
}
