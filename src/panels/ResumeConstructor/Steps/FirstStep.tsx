import {
  Div, FormItem, Group, Input,
  useAdaptivityWithJSMediaQueries,
  ViewWidth
} from '@vkontakte/vkui'
import { useFormContext } from 'react-hook-form'
import { FC } from 'react'

import { FormValues } from '../types'

export const FirstStep: FC = () => {
  const adaptivity = useAdaptivityWithJSMediaQueries()

  const {
    register, setValue, getValues, formState: { errors },
  } = useFormContext<FormValues>()

  return (
    <Group>
      <Div style={{
        padding: 0,
        display: 'grid',
        gridTemplateColumns: adaptivity.viewWidth < ViewWidth.SMALL_TABLET ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        width: '100%',
      }}
      >
        <FormItem
          top="Имя"
          style={{
            width: '100%', boxSizing: 'border-box',
          }}
          bottom={errors.name?.name?.message}
          status={errors.name?.name ? 'error' : 'default'}
        >
          <Input
            {...register('name.name', { required: true })}
            onChange={(e) => setValue('name.name', e.target.value)}
            defaultValue={getValues('name.name')}
            placeholder="Иван"
          />
        </FormItem>
        <FormItem
          top="Фамилия"
          style={{
            width: '100%', boxSizing: 'border-box',
          }}
          bottom={errors.name?.surname?.message}
          status={errors.name?.surname ? 'error' : 'default'}
        >
          <Input
            {...register('name.surname', { required: true })}
            onChange={(e) => setValue('name.surname', e.target.value)}
            defaultValue={getValues('name.surname')}
            placeholder="Иванов"
          />
        </FormItem>
        <FormItem
          top="Отчество (если есть)"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            gridColumn: adaptivity.viewWidth < ViewWidth.SMALL_TABLET ? 'span 2' : 'unset',
          }}
          bottom={errors.name?.patronymic?.message}
          status={errors.name?.patronymic ? 'error' : 'default'}
        >
          <Input
            {...register('name.patronymic')}
            onChange={(e) => setValue('name.patronymic', e.target.value)}
            defaultValue={getValues('name.patronymic')}
            placeholder="Иванович"
          />
        </FormItem>
      </Div>
      <FormItem
        top="Специальность"
        style={{
          width: '100%',
          boxSizing: 'border-box',
        }}
        bottom={errors.position?.message}
        status={errors.position ? 'error' : 'default'}
      >
        <Input
          {...register('position')}
          onChange={(e) => setValue('position', e.target.value)}
          defaultValue={getValues('position')}
          placeholder="Ведущий веб-разработчик"
        />
      </FormItem>
      <FormItem
        top="Город"
        style={{
          width: '100%',
          boxSizing: 'border-box',
        }}
        bottom={errors.city?.message}
        status={errors.city ? 'error' : 'default'}
      >
        <Input
          {...register('city')}
          onChange={(e) => setValue('city', e.target.value)}
          defaultValue={getValues('city')}
          placeholder="Москва"
        />
      </FormItem>
    </Group>
  )
}
