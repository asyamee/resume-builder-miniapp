import { FC, useState } from 'react'
import {
  Group, FormItem, Input, Button, Div, Spacing,
  CustomSelect,
} from '@vkontakte/vkui'
import {
  Icon16Add, Icon20DeleteOutline,
  Icon20ReportOutline
} from '@vkontakte/icons'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { FormValues } from '../../panels/ResumeConstructor/types'
import { AttentionCard } from '../AttentionCard/AttentionCard'

export type Data = {
  type: string;
  value: string;
}

type KeysWithArrayData<T> = {
  [K in keyof T]: T[K] extends Array<Data> ? K : never;
}[keyof T];

export interface MultiDataFieldProps {
  selectData: SelectData[]
  addButtonText: string
  selectLabelText: string
  inputPlaceholder: string
  fieldName: Exclude<KeysWithArrayData<FormValues>, undefined>
}

export type SelectData = {
  value: string,
  label: string,
}

export const MultiDataField: FC<MultiDataFieldProps> = ({
  selectData: selectDataProp, addButtonText, selectLabelText, fieldName, inputPlaceholder,
}) => {
  const [selectData, setSelectData] = useState<SelectData['value']>(selectDataProp?.[0].value)

  const { control, formState: { errors } } = useFormContext<FormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  })

  return (
    <Group>
      {
        errors[fieldName]?.message
        && (
        <Div>
          <AttentionCard
            icon={<Icon20ReportOutline />}
            message={errors[fieldName]?.message}
          />
        </Div>
        )
      }
      <FormItem top={selectLabelText}>
        <CustomSelect
          selectType="default"
          onChange={(_, data) => setSelectData(data as string)}
          options={selectDataProp}
          emptyText="Не выбрано"
          defaultValue={selectDataProp[0].value}
          placeholder="Не выбрано"
        />
      </FormItem>
      <Div>
        <Button
          stretched
          size="m"
          mode="secondary"
          onClick={() => append({ type: selectData, value: '' })}
          before={<Icon16Add />}
        >
          {addButtonText}
        </Button>
      </Div>
      <Spacing size="m" />
      {fields.map((field, index) => (
        <FormItem
          key={field.id}
          top={
            selectDataProp.find((prop) => prop.value === field.type)?.label
          }
          status={errors?.[fieldName]?.[index]?.value ? 'error' : 'default'}
          bottom={errors?.[fieldName]?.[index]?.value?.message}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Controller
              control={control}
              name={`${fieldName}.${index}.value`}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={inputPlaceholder}
                />
              )}
            />

            <Button
              mode="tertiary"
              size="l"
              onClick={() => remove(index)}
              before={<Icon20DeleteOutline />}
            />
          </div>
        </FormItem>
      ))}
    </Group>
  )
}
