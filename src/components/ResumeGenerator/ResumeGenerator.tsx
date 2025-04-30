import { FC, useRef } from 'react'
import html2pdf from 'html2pdf.js'
import {
  Button,
  Div,
} from '@vkontakte/vkui'
import { PCD } from '@vkontakte/vk-bridge'
import { Icon20ReportOutline } from '@vkontakte/icons'

import { Vanilla } from '../ResumeTemplates/Vanilla/Vanilla'
import { AutoScale } from '../AutoScale/AutoScale'
import { FormValues } from '../../panels/ResumeConstructor/types'
import { AttentionCard } from '../AttentionCard/AttentionCard'

interface ResumeProps {
  data: FormValues;
  config?: PCD
}

export const ResumeGenerator: FC<ResumeProps> = ({ data, config }) => {
  const resumeRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const clone = resumeRef.current.cloneNode(true) as HTMLElement
      const buttons = clone.querySelectorAll('.no-print')

      buttons.forEach((btn) => btn.remove())

      if (config?.app !== 'VKCLIENT') {
        html2pdf()
          .from(clone)
          .set({
            filename: 'resume.pdf',
            pagebreak: { mode: ['css', 'legacy'] },
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          })
          .save()
      } else {
        const worker = html2pdf().set({
          filename: 'resume.pdf',
          pagebreak: { mode: ['css', 'legacy'] },
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        }).from(clone)

        const blob: Blob = await worker.outputPdf('blob')
        const blobUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')

        link.href = blobUrl
        link.download = 'resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  return (
    <Div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px',
    }}
    >
      <AutoScale>
        <Vanilla data={data} resumeRef={resumeRef} />
      </AutoScale>
      {config?.app !== 'VKCLIENT'
        ? <Button size="l" appearance="positive" onClick={downloadPDF}>Скачать PDF</Button>
        : <AttentionCard icon={<Icon20ReportOutline />} message="Приложение пока не позволяет скачать файл в мобильном приложении VK." />}
    </Div>
  )
}
