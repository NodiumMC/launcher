import { FC, useMemo } from 'react'
import styled from 'styled-components'
import {
  useI18N,
  useLauncherConfig,
  usePopup,
  usePreloader,
} from '../../hooks/useService'
import { Screen } from '../Screen'
import { Text } from '../../components/micro/Text'
import { LangMeta, SupportedLang } from '../../app/i18n/langs'
import { Dropdown, DropdownItem } from '../../components/micro/Dropdown'
import { Observer } from '../../store/ObserverComponent'
import { Button } from '../../components/micro/Button'
import { downloadJava } from '../../app/java/download'
import { map } from '../../utils/map'
import { R } from '../../app/bridge/R'
import { join } from '@tauri-apps/api/path'
import { GameDir } from '../../app/filesystem/utils'
import { DefaultPopup } from '../../components/macro/popup/DefaultPopup'

const InstallScreen = styled(Screen)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
`

const LangSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`

export const Install: FC = Observer(() => {
  const preloader = usePreloader()
  const i18n = useI18N()
  const langitems = useMemo(
    () =>
      Object.entries(LangMeta).map(
        ([id, { label, icon }]) => ({ id, label, icon } as DropdownItem),
      ),
    [i18n.lang],
  )
  const popup = usePopup()
  const config = useLauncherConfig()
  return !config.installed ? (
    <InstallScreen>
      <Text ns as={'h1'} center>
        {i18n.$('install.welcome')}
      </Text>
      <LangSelector>
        <Text ns shade>
          {i18n.$('install.select_lang')}
        </Text>
        <Dropdown
          items={langitems}
          value={langitems.find(v => v.id === i18n.lang)}
          onChange={s => (i18n.lang = s.id as SupportedLang)}
        />
      </LangSelector>
      <Button
        primary
        onClick={() => {
          const install = async () => {
            preloader.add(i18n.$('install.downloading_java'), async () => {
              preloader.progressActive = true
              preloader.progress = 0
              preloader.pre = 0
              try {
                await new Promise<void>((rs, rj) => {
                  downloadJava().subscribe({
                    error: rj,
                    complete: rs,
                    next: progress =>
                      (preloader.pre = map(
                        progress.transferred,
                        0,
                        progress.total,
                        0,
                        100,
                      )),
                  })
                })
                await new Promise<void>(async (rs, rj) => {
                  R.unzip(
                    await join(await GameDir(), 'jdk.zip'),
                    await GameDir(),
                  ).subscribe({
                    error: rj,
                    complete: rs,
                    next: progress =>
                      (preloader.progress = map(
                        progress.progress,
                        0,
                        progress.total,
                        0,
                        100,
                      )),
                  })
                })
                config.installed = true
              } catch (e: unknown) {
                popup.spawn(
                  <DefaultPopup
                    level={'error'}
                    title={i18n.$('error.titles.oops')}
                    description={`${i18n.$(
                      'error.descriptions.java_install_failed',
                    )}`}
                    actions={[
                      {
                        label: i18n.$('appearance.popup.skip'),
                        action: close => close(),
                      },
                      {
                        label: i18n.$('appearance.popup.retry'),
                        isPrimary: true,
                        action: close => {
                          close()
                          install()
                        },
                      },
                    ]}
                  />,
                )
              } finally {
                preloader.progressActive = false
              }
            })
          }
          install()
        }}
      >
        {i18n.$('install.continue')}
      </Button>
    </InstallScreen>
  ) : (
    <></>
  )
})
