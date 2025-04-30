import { FC } from 'react'
import {
  ChipsInput, Flex, FormItem, useAdaptivityWithJSMediaQueries, ViewWidth
} from '@vkontakte/vkui'
import { Controller, useFormContext } from 'react-hook-form'

import { FormValues } from '../../panels/ResumeConstructor/types'

export const SkillsChips: FC = () => {
  const { control } = useFormContext<FormValues>()
  const adaptivity = useAdaptivityWithJSMediaQueries()

  return (
    <Flex noWrap direction={adaptivity.viewWidth < ViewWidth.SMALL_TABLET ? 'column' : 'row'}>
      <FormItem
        top="Основные навыки"
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <Controller
          control={control}
          name="skills.mainSkills"
          render={({ field }) => (
            <ChipsInput
              {...field}
              style={{ height: '100px' }}
              placeholder="Для вставки навыка нажмите Enter"
            />
          )}
        />
      </FormItem>
      <FormItem
        top="Дополнительные навыки"
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <Controller
          control={control}
          name="skills.additionalSkills"
          render={({ field }) => (
            <ChipsInput
              {...field}
              style={{ height: '100px' }}
              placeholder="Для вставки навыка нажмите Enter"
            />
          )}
        />
      </FormItem>
    </Flex>
  )
}
