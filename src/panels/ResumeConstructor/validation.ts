import * as yup from 'yup'

import { FormValues } from './types'

export const yupValidation = yup.object<FormValues>({
  name: yup.object({
    name: yup.string().required('Поле обязательно'),
    surname: yup.string().required('Поле обязательно'),
    patronymic: yup.string().optional(),
  }),
  position: yup.string().optional(),
  city: yup.string().optional(),
  contacts: yup.array().of(
    yup.object({
      type: yup.string().required(),
      value: yup.string().when('$currentStep', {
        is: 1,
        then: (schema) => schema.required('Поле обязательно'),
        otherwise: (schema) => schema.optional(),
      }),
    })
  ).when('$currentStep', {
    is: 1,
    then: (schema) => schema.test(
      'at-least-one-contact',
      'Добавьте хотя бы один контакт',
      (contacts) => contacts && contacts.length > 0

    ),
    otherwise: (schema) => schema.optional(),
  }),
  education: yup.array().of(
    yup.object({
      name: yup.string().when('$currentStep', {
        is: 2,
        then: (schema) => schema.required('Поле обязательно'),
        otherwise: (schema) => schema.optional(),
      }),
      city: yup.string().optional(),
      startYear: yup.string().when('$currentStep', {
        is: 2,
        then: (schema) => schema.test(
          'year-length',
          'Неверное значение',
          (value) => {
            if (value && value.length === 4) {
              return true
            }

            return false
          }
        ).test(
          'year-min',
          `Минимальный год: ${new Date().getFullYear() - 100}`,
          (value) => {
            if (Number(value) >= new Date().getFullYear() - 100) {
              return true
            }

            return false
          }
        ),
        otherwise: (schema) => schema.optional(),
      }),
      endYear: yup.string().when('$currentStep', {
        is: 2,
        then: (schema) => schema.test(
          'year-length',
          'Неверное значение',
          (value) => {
            if (value && value.length === 4) {
              return true
            }

            return false
          }
        ).test(
          'year-min',
          '',
          (value, context) => {
            if (Number(value) >= new Date().getFullYear() - 100
            && Number(value) >= context.parent.startYear) {
              return true
            }

            return context.createError({
              message: `Минимальный год: ${context.parent.startYear}`,
            })
          }
        ),
        otherwise: (schema) => schema.optional(),
      }),
      speciality: yup.string().optional(),
    })
  ),
  workplaces: yup.array().of(
    yup.object({
      company: yup.string().when('$currentStep', {
        is: 3,
        then: (schema) => schema.required('Поле обязательно'),
        otherwise: (schema) => schema.optional(),
      }),
      position: yup.string().optional(),
      responsibilities: yup.string().when('$currentStep', {
        is: 3,
        then: (schema) => schema.required('Поле обязательно'),
        otherwise: (schema) => schema.optional(),
      }),
      startDate: yup.string().when('$currentStep', {
        is: 3,
        then: (schema) => schema.required('Поле обязательно'),
        otherwise: (schema) => schema.optional(),
      }),
      endDate: yup.string().optional(),
    })
  ).optional(),
})
