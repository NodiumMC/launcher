import { FC, useState } from 'react'
import styled from 'styled-components'
import { Screen } from 'components/utils/Screen'
import { Button } from 'components/atoms/Button'
import { Text } from 'components/atoms/Text'
import { Checkbox } from 'components/atoms/Checkbox'
import { Input } from 'components/atoms/Input'
import { ColoredTag } from 'components/atoms/ColoredTag'
import { linearGradient } from 'polished'
import { Select } from 'components/molecules/Select'
import { ObjectRenderer } from 'components/organisms/ObjectRenderer'
import { CommandPrompt } from 'debug/commander/CommandPrompt'
import { SquareGroupToggle } from 'components/molecules/SquareGroupToggle'
import { ProviderIcon } from 'core/providers'
import { SquareGroupSwitcher } from 'components/molecules/SquareGroupSwitcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogInput } from 'components/molecules/DialogInput'

const Page = styled(Screen)`
  padding: 0 50px 50px 50px;
  overflow-y: scroll;
`

const Split = styled(Text).attrs(() => ({
  shade: 'medium',
  size: 15,
  block: true,
  interaction: true,
}))`
  padding: 20px 0;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 12px;
    width: 100%;
    height: 1px;
    display: block;
    background-color: ${({ theme }) => theme.master.shade()};
  }
`

const Container = styled.div<{ v?: boolean; gap?: number }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ v }) => (v ? 'column' : 'row')};
  flex-wrap: wrap;
  gap: ${({ theme, gap }) => theme.size(gap ?? 10)};
`

export const Components: FC = () => {
  const [squaretoggler, setSquareToggler] = useState(['vanilla'])
  const [squareswitcher, setSquareSwicther] = useState('vanilla')
  const [squareswitcher2, setSquareSwicther2] = useState('info')
  const [opend1, setOpend1] = useState('')
  const [opend2, setOpend2] = useState('')

  return (
    <Page>
      <Split>Кнопки</Split>
      <Container>
        <Button>Это кнопка</Button>
        <Button variant={'primary'}>Крутая кнопка</Button>
        <Button destructive>Страшная кнопка</Button>
        <Button variant={'secondary'}>Не нажимай</Button>
        <Button fetching>Загрузка</Button>
        <Button disabled>В отключке</Button>
        <Button>
          <FontAwesomeIcon icon={'thumbs-up'} /> Кнопка с emoji
        </Button>
      </Container>
      <Split>Chechотка</Split>
      <Container>
        <Checkbox />
        <Checkbox value />
        <Checkbox value disabled />
      </Container>
      <Split>ПереключалОчки</Split>
      <Container>
        <SquareGroupToggle
          options={[
            { id: 'vanilla', label: ProviderIcon.vanilla },
            { id: 'fabric', label: ProviderIcon.fabric },
            { id: 'forge', label: ProviderIcon.forge },
            { id: 'quilt', label: ProviderIcon.quilt },
          ]}
          value={squaretoggler}
          onChange={setSquareToggler}
        />
        <SquareGroupToggle
          disabled
          options={[
            { id: 'vanilla', label: ProviderIcon.vanilla },
            { id: 'fabric', label: ProviderIcon.fabric },
            { id: 'forge', label: ProviderIcon.forge },
            { id: 'quilt', label: ProviderIcon.quilt },
          ]}
          value={squaretoggler}
          onChange={setSquareToggler}
        />
        <SquareGroupSwitcher
          options={[
            { id: 'vanilla', label: ProviderIcon.vanilla },
            { id: 'fabric', label: ProviderIcon.fabric },
            { id: 'forge', label: ProviderIcon.forge },
            { id: 'quilt', label: ProviderIcon.quilt },
          ]}
          disoptions={['forge', 'quilt']}
          value={squareswitcher}
          onChange={setSquareSwicther}
        />
        <SquareGroupSwitcher
          options={[
            { id: 'err', label: <FontAwesomeIcon icon={'circle-xmark'} /> },
            { id: 'warn', label: <FontAwesomeIcon icon={'triangle-exclamation'} /> },
            { id: 'info', label: <FontAwesomeIcon icon={'circle-info'} /> },
          ]}
          disoptions={['warn']}
          value={squareswitcher2}
          onChange={setSquareSwicther2}
        />
      </Container>
      <Split>Инпутсы</Split>
      <Container v>
        <Input />
        <Input placeholder={'Напиши чёнить'} />
        <Input disabled placeholder={'Говорят, что если написать сюда желание, то оно сбудется'} />
        <Input invalid placeholder={'invalid'} />
        <Input valid placeholder={'valid'} />
        <DialogInput directory icon={<FontAwesomeIcon icon={'folder'} />} value={opend1} onChange={setOpend1} />
        <DialogInput
          filters={[{ name: 'Исполняемый файл', extensions: ['exe', 'sh'] }]}
          icon={<FontAwesomeIcon icon={'file'} />}
          value={opend2}
          onChange={setOpend2}
        />
        <DialogInput disabled icon={<FontAwesomeIcon icon={'folder'} />} value={opend1} onChange={setOpend1} />
      </Container>
      <Split>Тэгусы</Split>
      <Container>
        <ColoredTag>Ты</ColoredTag>
        <ColoredTag>Кста</ColoredTag>
        <ColoredTag>Крутой</ColoredTag>
        <ColoredTag>Чел</ColoredTag>
        <ColoredTag color={'#96e6ff'}>Ещё</ColoredTag>
        <ColoredTag color={'#fc9dff'}>Могу</ColoredTag>
        <ColoredTag color={'#ffafc5'}>Быть</ColoredTag>
        <ColoredTag color={'#fffa99'}>Цветным</ColoredTag>
        <ColoredTag color={'#3a2100'}>И тёмненьким :]</ColoredTag>
        <ColoredTag>v 0.1.0</ColoredTag>
        <ColoredTag icon={'code-branch'}>master</ColoredTag>
      </Container>
      <Split>Текстульки</Split>
      <Container v gap={0}>
        <Text>Я думаю это просто текст</Text>
        <Text shade={'low'}>Сделаем его чуть темнее</Text>
        <Text shade={'medium'}>ещё</Text>
        <Text shade={'high'}>... и ещё</Text>
        <Text weight={'bold'}>Жииииииииир</Text>
        <Text weight={'black'} size={20}>
          БОЛЬШЕ ЖИРА
        </Text>
        <Text weight={'light'}>Тоненький текст</Text>
        <Text
          gradient={linearGradient({
            colorStops: ['#2e58ff', '#d122ff'],
            toDirection: '90deg',
          })}
        >
          Хз, гдеэто пригодится
        </Text>
        <Text interaction>Этот текст хочеться трогать</Text>
      </Container>
      <Split>Выбрать путь</Split>
      <Container>
        <Select
          options={[
            {
              value: 'next',
              label: 'Направо',
            },
            {
              value: 'deny',
              label: 'Или налево',
            },
          ]}
        />
      </Container>
      <Split>Всяко разное</Split>
      <Container v>
        <ObjectRenderer
          target={{
            string: 'str',
            number: 15,
            bool: true,
            nil: null,
            undef: undefined,
            arr: [
              1,
              2,
              3,
              4,
              5,
              {
                others: [],
              },
            ],
          }}
        />
        <ObjectRenderer target={[{}, {}, {}, {}]} />
        <CommandPrompt />
      </Container>
    </Page>
  )
}
