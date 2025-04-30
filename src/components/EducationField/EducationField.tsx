import { FC } from 'react'
import { useFieldArray, Controller, useFormContext } from 'react-hook-form'
import {
  FormItem, Input, Button, Group,
  Flex,
  Div,
  Spacing,
} from '@vkontakte/vkui'
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase'

import { FormValues } from '../../panels/ResumeConstructor/types'

export const EducationField: FC = () => {
  const { control, formState: { errors } } = useFormContext<FormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  })

  return (
    <Group>
      <Div>
        <Button
          stretched
          mode="secondary"
          size="l"
          onClick={() => append({
            name: '', speciality: '', city: '', startYear: '', endYear: '',
          })}
        >
          Добавить образование
        </Button>
      </Div>
      {fields.map((field, index) => (
        <div
          key={field.id}
        >
          <Flex
            direction="column"
            justify="center"
            align="center"
            style={{ paddingBottom: 16 }}
          >
            <FormItem
              top="Название учебного заведения"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.education?.[index]?.name ? 'error' : 'default'}
              bottom={errors?.education?.[index]?.name?.message}
            >
              <Controller
                control={control}
                name={`education.${index}.name`}
                render={({ field }) => <Input {...field} placeholder="НИТУ МИСИС" />}
              />
            </FormItem>

            <FormItem
              top="Специальность"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.education?.[index]?.speciality ? 'error' : 'default'}
              bottom={errors?.education?.[index]?.speciality?.message}
            >
              <Controller
                control={control}
                name={`education.${index}.speciality`}
                render={({ field }) => <Input {...field} placeholder="Прикладная информатика" />}
              />
            </FormItem>

            <FormItem
              top="Город"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.education?.[index]?.city ? 'error' : 'default'}
              bottom={errors?.education?.[index]?.city?.message}
            >
              <Controller
                control={control}
                name={`education.${index}.city`}
                render={({ field }) => <Input {...field} placeholder="Москва" />}
              />
            </FormItem>

            <FormItem
              top="Дата начала"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.education?.[index]?.startYear ? 'error' : 'default'}
              bottom={errors?.education?.[index]?.startYear?.message}
            >
              <Controller
                control={control}
                name={`education.${index}.startYear`}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={new Date().getFullYear().toString()}
                  />
                )}
              />
            </FormItem>

            <FormItem
              top="Дата окончания"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.education?.[index]?.endYear ? 'error' : 'default'}
              bottom={errors?.education?.[index]?.endYear?.message}
            >
              <Controller
                control={control}
                name={`education.${index}.endYear`}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={(new Date().getFullYear() + 4).toString()}
                  />
                )}
              />
            </FormItem>

            <Button
              mode="secondary"
              appearance="negative"
              size="s"
              onClick={() => remove(index)}
            >
              Удалить место обучения
            </Button>
          </Flex>
          {fields.length !== index + 1 && <Spacing style={{ borderBottom: `2px solid ${baseTheme.colorAccentGray.normal}`, padding: 0, margin: '20px 0' }} />}
        </div>
      ))}
    </Group>
  )
}
