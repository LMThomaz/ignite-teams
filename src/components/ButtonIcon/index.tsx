import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'

type Props = TouchableOpacityProps & {}

export function ButtonIcon({}: Props) {
  return (
    <S.Container>
      <S.Icon name="home" />
    </S.Container>
  )
}
