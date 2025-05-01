import vkBridge, { EGetLaunchParamsResponsePlatforms, parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge'
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react'
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui'
import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import '@vkontakte/vkui/dist/vkui.css'

import { transformVKBridgeAdaptivity } from './utils'
import { router } from './routes'
import { App } from './App'

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined
  const vkBridgeInsets = useInsets() || undefined
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity())
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search)

  return (
    <ConfigProvider
      hasCustomPanelHeaderAfter
      colorScheme={vkBridgeAppearance}
      platform={vk_platform === EGetLaunchParamsResponsePlatforms.DESKTOP_WEB ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
