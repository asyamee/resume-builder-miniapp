import { RefObject } from 'react'

import { FormValues } from '../../panels/ResumeConstructor/types'

export interface DefaultResumeProps {
  data: FormValues
  resumeRef: RefObject<HTMLDivElement>
}
