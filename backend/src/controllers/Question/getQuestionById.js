import { getQuestionByIdHelper } from './getQuestionByIdHelper.js'

export const getQuestionById = async (_, payload, __) => {
  console.log('GETTING QUESTION BY ID : ', payload.QuestionId)
  const question = await getQuestionByIdHelper(payload.QuestionId)
  console.log(`GOT QUESTION WITH ID : ${payload.QuestionId} = ${question}`)
  return question
}
