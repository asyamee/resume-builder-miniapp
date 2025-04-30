import { FC, ReactNode } from 'react'
import { Card, Text } from '@vkontakte/vkui'
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase'

export enum AttentionCardEnum {
  ERROR = 'error',
  INFO = 'info',
}

const colorScheme = {
  ERROR: baseTheme.colorStrokeNegative.normal,
  INFO: baseTheme.colorAccentBlue.normal,
}

interface AttentionCardProps {
  message?: string;
  icon?: ReactNode
  type?: keyof typeof AttentionCardEnum
}

export const AttentionCard: FC<AttentionCardProps> = ({ icon, message, type = 'ERROR' }) => (
  <Card
    mode="outline-tint"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      border: `1px solid ${colorScheme[type]}`,
      boxShadow: `0px 0px 10px 0px ${colorScheme[type]}33 inset`,
      background: `${colorScheme[type]}1A`,
      padding: '10px',
    }}
  >
    <div style={{ width: 'fit-content' }}>{icon}</div>
    <Text>
      {message}
    </Text>
  </Card>
)
