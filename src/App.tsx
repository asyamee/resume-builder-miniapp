import {
  useState, useEffect, FC,
} from 'react'
import bridge, {
  PCD,
  UserInfo,
} from '@vkontakte/vk-bridge'
import {
  View, AppRoot, AdaptivityProvider, ConfigProvider,
} from '@vkontakte/vkui'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'

import { ResumeConstructor } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'

export const App: FC = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.ResumeConstructor } = useActiveVkuiLocation()
  const [fetchedUser, setUser] = useState<UserInfo | undefined>()
  const [config, setConfig] = useState<PCD>()

  useEffect(() => {
    async function fetchData() {
      bridge.send('VKWebAppInit')
      const user = await bridge.send('VKWebAppGetUserInfo')
      const info = await bridge.send('VKWebAppGetConfig')

      setConfig(info)
      setUser(user)
    }
    fetchData()
  }, [])

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <View
            activePanel={activePanel}
          >
            <ResumeConstructor id="resume-constructor" fetchedUser={fetchedUser} config={config} />
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
