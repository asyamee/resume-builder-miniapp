import { FC } from 'react'

import { MultiDataField } from '../../../components/MultiDataField/MultiDataField'

export const SecondStep: FC = () => (
  <MultiDataField
    selectData={
      [
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Телефон',
          value: 'telephone',
        },
        {
          label: 'Telegram',
          value: 'telegram',
        },
      ]
    }
    addButtonText="Добавить контакт"
    selectLabelText="Выберите тип контакта"
    inputPlaceholder="Введите контакт"
    fieldName="contacts"
  />
)
