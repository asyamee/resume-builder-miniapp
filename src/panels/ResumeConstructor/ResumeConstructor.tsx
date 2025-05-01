import {
  FC, useEffect, useMemo, useState
} from 'react'
import {
  Panel,
  PanelHeader,
  FormItem,
  NavIdProps,
  Div,
  ViewWidth,
  useAdaptivityWithJSMediaQueries,
  PanelHeaderButton,
  Progress,
  ModalRoot,
  FixedLayout,
} from '@vkontakte/vkui'
import { UserInfo, PCD } from '@vkontakte/vk-bridge'
import {
  FormProvider, useForm,
} from 'react-hook-form'
import { Icon28Menu } from '@vkontakte/icons'
import { yupResolver } from '@hookform/resolvers/yup'

import { ResumeGenerator } from '../../components/ResumeGenerator/ResumeGenerator'
import { yupValidation } from './validation'
import { FormValues } from './types'
import { stepsMeaning } from '../../constants'
import { FirstStep } from './Steps/FirstStep'
import { SecondStep } from './Steps/SecondStep'
import { ThirdStep } from './Steps/ThirdStep'
import { FourthStep } from './Steps/FourthStep'
import { AutofillModal } from '../../components/Modals/AutofillModal'
import { checkEmptyFields } from '../../utils/checkEmptyObject'
import { FifthStep } from './Steps/FifthStep'
import { Controls } from './Controls'

export interface ResumeConstructorProps extends NavIdProps {
  fetchedUser?: UserInfo
  config?: PCD
}

export const ResumeConstructor: FC<ResumeConstructorProps> = ({ id, fetchedUser, config }) => {
  const adaptivity = useAdaptivityWithJSMediaQueries()

  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [step, setStep] = useState<number>(0)

  const userData = useMemo(() => ({
    name: {
      name: fetchedUser?.first_name,
      surname: fetchedUser?.last_name,
    },
    city: fetchedUser?.city.title,
  }), [fetchedUser])

  const methods = useForm<FormValues>({
    defaultValues: {
      name: {
        name: '',
        surname: '',
        patronymic: '',
      },
      position: '',
      city: '',
      contacts: [],
      education: [],
      workplaces: [],
      skills: {
        additionalSkills: [],
        mainSkills: [],
      },
    },
    resolver: useMemo(() => (
      data,
      context,
      options
    ) => yupResolver(yupValidation)(
      data,
      { ...context, currentStep: step },
      // @ts-expect-error: Unreachable code error
      options
    ), [step]),
    mode: 'all',
  })

  const { trigger, getValues, reset } = methods

  const steps = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <FourthStep />,
    <FifthStep />,
    <ResumeGenerator config={config} data={getValues()} />,
  ]

  const handleNextStep = async () => {
    const isStepValid = await trigger()

    if (isStepValid) {
      setStep((prev) => prev + 1)
    }
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleReset = () => {
    setStep(0)
    reset()
  }

  useEffect(() => {
    if (checkEmptyFields(userData).some((value) => value === true)) {
      setActiveModal('AutofillModal')
    }
  }, [userData])

  return (
    <Panel
      id={id}
    >
      <PanelHeader
        before={<PanelHeaderButton><Icon28Menu /></PanelHeaderButton>}
      >
        Конструктор резюме
      </PanelHeader>
      <FormProvider {...methods}>
        <form>
          <Div
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }}
            key={step}
          >
            <Div
              style={{
                width: '100%',
                maxWidth: adaptivity.viewWidth > ViewWidth.SMALL_TABLET ? '920px' : 'unset',
                marginBottom: 48,
              }}
            >
              <FormItem top={`Шаг ${step + 1}: ${stepsMeaning[step]}`} style={{ width: '100%', boxSizing: 'border-box' }}>
                <Progress value={(100 / 5) * step} />
              </FormItem>
              {
                steps[step]
              }
              {adaptivity.viewWidth >= ViewWidth.SMALL_TABLET && (
              <Controls
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
                handleFinalStep={handleReset}
                step={step}
                maxSteps={steps.length - 1}
              />
              )}
            </Div>
          </Div>
          {adaptivity.viewWidth < ViewWidth.SMALL_TABLET && (
            <FixedLayout filled vertical="bottom">
              <Controls
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
                handleFinalStep={handleReset}
                step={step}
                maxSteps={steps.length - 1}
              />
            </FixedLayout>
          )}
          <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
            <AutofillModal onClose={() => setActiveModal(null)} {...userData} />
          </ModalRoot>
        </form>
      </FormProvider>
    </Panel>
  )
}
