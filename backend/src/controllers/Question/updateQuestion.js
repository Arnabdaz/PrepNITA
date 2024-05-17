import { GraphQLError } from 'graphql'
import { prisma } from '../../../prisma/index.js'
import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'

export const updateQuestion = async (_, payload, context) => {
  try {
    console.log(`UPDATING QUESTION WITH ID : ${payload.QuestionId}`)

    const question = await getQuestionByIdHelper(payload.QuestionId)

    if (question.postedBy === context.userId) {
      const question = await prisma.question.update({
        where: { id: payload.QuestionId },
        data: {
          description: payload.Question.description,
          answer: payload.Question.answer,
          tags: { set: payload.Question.tags }, // Update tags
          links: {
            // Delete existing links and create new ones
            deleteMany: {}, // Delete all existing links
            create: payload.Question.links,
          },
        },
      })
      console.log(`UPDATED QUESTION WITH ID : ${payload.QuestionId}`)
      return question
    }

    console.log(`FAILED UPDATING QUESTION WITH ID : ${payload.QuestionId}`)

    throw new GraphQLError('You can update only your questions!!', {
      extensions: {
        code: 'NOT_AUTHORISED_FOR_UPDATING_QUESTION',
      },
    })
  } catch (error) {
    if (
      error.extensions &&
      error.extensions.code === 'NOT_AUTHORISED_FOR_UPDATING_QUESTION'
    ) {
      throw error
    } else {
      throw new GraphQLError('Error while updating question!!', {
        extensions: {
          code: 'UPDATE_QUESTION_FAILED',
        },
      })
    }
  }
}
