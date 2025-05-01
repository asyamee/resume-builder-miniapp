import {
  useState, useEffect, FC,
} from 'react'
import bridge, {
  PCD,
  UserInfo,
} from '@vkontakte/vk-bridge'
import {
  View, AdaptivityProvider,
} from '@vkontakte/vkui'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'

import { ResumeConstructor } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'

export const App: FC = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.ResumeConstructor } = useActiveVkuiLocation()
  const [fetchedUser, setUser] = useState<UserInfo | undefined>()
  const [config, setConfig] = useState<PCD>()

  useEffect(() => {
    const fetchData = async () => {
      const user = await bridge.send('VKWebAppGetUserInfo')
      const info = await bridge.send('VKWebAppGetConfig')

      setConfig(info)
      setUser(user)
    }

    fetchData()
  }, [])

  return (
    <AdaptivityProvider>
      <View
        activePanel={activePanel}
      >
        <ResumeConstructor id="resume-constructor" fetchedUser={fetchedUser} config={config} />
      </View>
    </AdaptivityProvider>
  )
}
