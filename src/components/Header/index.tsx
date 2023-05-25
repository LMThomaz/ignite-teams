import LogoImg from '@assets/logo.png'
import * as S from './styles'

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={LogoImg} />
    </S.Container>
  )
}
