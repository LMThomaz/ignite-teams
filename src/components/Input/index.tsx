import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import * as S from './styles'

export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme()

  return <S.Container placeholderTextColor={COLORS.GRAY_300} {...rest} />
}
