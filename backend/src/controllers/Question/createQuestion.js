import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'

export const createQuestion = async (_, payload, context) => {
  try {
    console.log('CREATING QUESTION : ', payload)
    if (context.isUser) {
      const question = await prisma.question.create({
        data: {
          description: payload.Question.description,
          answer: payload.Question.answer,
          createdBy: context.userId,
          tags: payload.Question.tags,
          links: { create: payload.Question.links },
        },
      })
      console.log('QUESTION CREATED : ', question)
      return question
    }
    console.log('QUESTION CREATION FAILED!!')
    throw new GraphQLError(
      'You are not an authorised user to create a question!!',
      {
        extensions: {
          code: 'NOT_AUTHORISED_FOR_QUESTION_CREATION',
        },
      }
    )
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_QUESTION'
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while creating question!!', {
        extensions: {
          code: 'CREATE_QUESTION_FAILED',
        },
      })
    }
  }
}
