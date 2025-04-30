import {
  Button,
  ButtonGroup,
  InfoRow, ModalCard, ModalCardProps, SimpleCell,
  Spacing,
} from '@vkontakte/vkui'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../../panels/ResumeConstructor/types'

export interface AutofillModalProps extends ModalCardProps {
  name?: {
    name?: string,
    surname?: string,
  },
  city?: string,
}

export const AutofillModal: FC<AutofillModalProps> = ({
  name, city, ...rest
}) => {
  const { setValue } = useFormContext<FormValues>()

  const handleAutofill = () => {
    setValue('name.name', name?.name || '')
    setValue('name.surname', name?.surname || '')
    setValue('city', city || '')
    rest?.onClose?.('click-close-button')
  }

  return (
    <ModalCard
      id="AutofillModal"
      style={{ width: '100%', height: 'fit-content' }}
      {...rest}
    >
      Использовать эти данные для автозаполнения?
      { name?.name && (
      <SimpleCell style={{ padding: 0 }}>
        <InfoRow header="Имя">{name?.name}</InfoRow>
      </SimpleCell>
      ) }
      {name?.surname && (
      <SimpleCell style={{ padding: 0 }}>
        <InfoRow header="Фамилия">{name?.surname}</InfoRow>
      </SimpleCell>
      )}
      { city && (
      <SimpleCell style={{ padding: 0 }}>
        <InfoRow header="Город">{city}</InfoRow>
      </SimpleCell>
      )}
      <Spacing size="xl" />
      <ButtonGroup>
        <Button stretched onClick={handleAutofill}>Да</Button>
        <Button
          stretched
          onClick={
            () => rest?.onClose?.('click-close-button')
          }
        >
          Нет
        </Button>
      </ButtonGroup>
    </ModalCard>
  )
}
