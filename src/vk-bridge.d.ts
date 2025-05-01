import { ParentConfigData } from '@vkontakte/vk-bridge'

declare module '@vkontakte/vk-bridge' {
  type PCD = ParentConfigData & {
    app?: string
  }
}
