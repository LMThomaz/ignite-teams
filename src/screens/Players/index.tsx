import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { PlayerCard } from '@components/PlayerCard'
import { useRoute } from '@react-navigation/native'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { AppError } from '@utils/AppError'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import * as S from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
      return
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
        return
      }
      console.log(error)
      Alert.alert('Nova pessoa', 'Não foi possível adicionar')
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
        return
      }
      console.log(error)

      Alert.alert(
        'Nova pessoa',
        'Não foi possível carregas as pessoas do time selecionado',
      )
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <S.NumbersOfPlayers>{players.length}</S.NumbersOfPlayers>
      </S.HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingBottom: 100,
          },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover turma" type="SECONDARY" />
    </S.Container>
  )
}
