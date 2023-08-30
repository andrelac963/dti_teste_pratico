import { BestPetShopResponseType } from "../../../services/requests/getBestPetShop";
import {
  Overlay,
  ModalContent,
  Text,
  Button,
  Title,
  ResultContainer,
  TextBold,
  TextContainer,
} from "./styles";

interface ResultModalProps {
  bestPetShop: BestPetShopResponseType;
  setResultModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ResultModal({
  bestPetShop,
  setResultModalVisibility,
}: ResultModalProps) {
  return (
    <Overlay>
      <ModalContent>
        <Title>Parabéns! Você encontrou o seu Pet Shop ideal.</Title>
        <ResultContainer>
          <TextContainer>
            <TextBold>Nome:</TextBold>
            <Text>{bestPetShop.name}</Text>
          </TextContainer>
          <TextContainer>
            <TextBold>Preço total:</TextBold>
            <Text>R$ {bestPetShop.totalPrice}</Text>
          </TextContainer>
        </ResultContainer>
        <Button onClick={() => setResultModalVisibility(false)}>Fechar</Button>
      </ModalContent>
    </Overlay>
  );
}
