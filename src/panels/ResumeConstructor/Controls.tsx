import { Button, ButtonGroup, FormItem } from '@vkontakte/vkui'
import { FC } from 'react'

export interface ControldsProps {
  handlePrevStep: () => void,
  handleNextStep: () => void,
  step: number,
}

export const Controls: FC<ControldsProps> = ({ handlePrevStep, handleNextStep, step }) => (
  <ButtonGroup stretched mode="horizontal" align="center">
    {step > 0 && (
      <FormItem style={{ width: '100%', boxSizing: 'border-box' }}>
        <Button stretched size="l" onClick={handlePrevStep}>
          Назад
        </Button>
      </FormItem>
    )}

    {step === 5 ? (
      <FormItem style={{ width: '100%', boxSizing: 'border-box' }}>
        <Button stretched size="l" onClick={handleNextStep}>
          Завершить
        </Button>
      </FormItem>
    ) : (
      <FormItem style={{ width: '100%', boxSizing: 'border-box' }}>
        <Button stretched size="l" onClick={handleNextStep}>
          Дальше
        </Button>
      </FormItem>
    )}
  </ButtonGroup>
)
