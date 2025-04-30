import { FC } from 'react'
import { useFieldArray, Controller, useFormContext } from 'react-hook-form'
import {
  FormItem, Input, Button, Group, Flex,
  Div
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Icon20InfoCircleOutline } from '@vkontakte/icons'

import { FormValues } from '../../panels/ResumeConstructor/types'
import { AttentionCard } from '../AttentionCard/AttentionCard'

export const ExperienceField: FC = () => {
  const { control, formState: { errors } } = useFormContext<FormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workplaces',
  })

  return (
    <Group>
      <Div>
        <Button
          stretched
          mode="secondary"
          size="l"
          onClick={() => append({
            company: '', position: '', responsibilities: '', startDate: '', endDate: '',
          })}
        >
          Добавить место работы
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
            style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: 16, marginBottom: 16 }}
          >
            <FormItem
              top="Место работы"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.workplaces?.[index]?.company ? 'error' : 'default'}
              bottom={errors?.workplaces?.[index]?.company?.message}
            >
              <Controller
                control={control}
                name={`workplaces.${index}.company`}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="ВК"
                  />
                )}
              />
            </FormItem>

            <FormItem
              top="Должность"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.workplaces?.[index]?.position ? 'error' : 'default'}
              bottom={errors?.workplaces?.[index]?.position?.message}
            >
              <Controller
                control={control}
                name={`workplaces.${index}.position`}
                render={({ field }) => <Input {...field} placeholder="Ведущий веб-разработчик" />}
              />
            </FormItem>

            <FormItem
              top="Обязанности"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.workplaces?.[index]?.responsibilities ? 'error' : 'default'}
              bottom={errors?.workplaces?.[index]?.responsibilities?.message}
            >
              <Controller
                control={control}
                name={`workplaces.${index}.responsibilities`}
                render={({ field }) => <Input {...field} placeholder="Разрабатывал, рефакторил и..." />}
              />
            </FormItem>

            <FormItem
              top="Дата начала"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.workplaces?.[index]?.startDate ? 'error' : 'default'}
              bottom={errors?.workplaces?.[index]?.startDate?.message}
            >
              <Controller
                control={control}
                name={`workplaces.${index}.startDate`}
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                  />
                )}
              />
            </FormItem>

            <FormItem
              top="Дата окончания"
              style={{ width: '100%', boxSizing: 'border-box' }}
              status={errors?.workplaces?.[index]?.endDate ? 'error' : 'default'}
              bottom={errors?.workplaces?.[index]?.endDate?.message}
            >
              <Controller
                control={control}
                name={`workplaces.${index}.endDate`}
                render={({ field }) => (
                  <>
                    <Input
                      type="date"
                      style={{ marginBottom: '12px' }}
                      {...field}
                    />
                    <AttentionCard
                      type="INFO"
                      icon={<Icon20InfoCircleOutline />}
                      message="Если в настоящее время работаете в этой компании, оставьте дату окончания пустой"
                    />
                  </>
                )}
              />
            </FormItem>

            <Button
              mode="secondary"
              appearance="negative"
              size="s"
              onClick={() => remove(index)}
            >
              Удалить место работы
            </Button>
          </Flex>
        </div>
      ))}
    </Group>
  )
}
