import * as S from './styles'

type Props = {
  title: string
  subtitle: string
}

export function Highlight({ subtitle, title }: Props) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Container>
  )
}
