import { Button, ButtonGroup, FormItem } from '@vkontakte/vkui'
import { FC } from 'react'

export interface ControldsProps {
  handlePrevStep: () => void,
  handleNextStep: () => void,
  handleFinalStep: () => void,
  step: number,
  maxSteps: number,
}

export const Controls: FC<ControldsProps> = ({
  handlePrevStep, handleNextStep, handleFinalStep, step, maxSteps,
}) => (
  <ButtonGroup stretched mode="horizontal" align="center">
    {step > 0 && (
      <FormItem style={{ width: '100%', boxSizing: 'border-box' }}>
        <Button stretched size="l" onClick={handlePrevStep}>
          Назад
        </Button>
      </FormItem>
    )}

    {step === maxSteps ? (
      <FormItem style={{ width: '100%', boxSizing: 'border-box' }}>
        <Button stretched size="l" onClick={maxSteps ? handleFinalStep : handleNextStep}>
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
