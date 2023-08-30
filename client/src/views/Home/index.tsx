import { useState } from "react";

import { Alert } from "../../utils/components/Alert";
import { Loading } from "../../utils/components/Loading";
import { ResultModal } from "../../utils/components/ResultModal";

import { getBestPetShop } from "../../services/requests/getBestPetShop";
import { BestPetShopRequestType } from "../../services/requests/getBestPetShop";
import { BestPetShopResponseType } from "../../services/requests/getBestPetShop";

import {
  Container,
  Content,
  Title,
  Form,
  InputContainer,
  Label,
  Input,
  Button,
} from "./styles";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [resultModalVisibility, setResultModalVisibility] = useState(false);

  const [dataRequest, setDataRequest] = useState<BestPetShopRequestType>({
    date: "",
    smallDogs: 0,
    bigDogs: 0,
  });

  const [bestPetShop, setBestPetShop] = useState<BestPetShopResponseType>();

  async function handleGetBestPetShop(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validação se todos os campos foram preenchidos
    if (!dataRequest.date) {
      setAlertMessage("Preencha todos os campos!");
      setAlertVisibility(true);
      return;
    }

    // Validação se a data é maior ou igual a data atual
    const selectedDate = new Date(dataRequest.date + " 00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setAlertMessage("A data deve ser maior ou igual a data atual!");
      setAlertVisibility(true);
      return;
    }

    // Requisição para a API
    try {
      setIsLoading(true);

      setBestPetShop(await getBestPetShop(dataRequest));

      setResultModalVisibility(true);

      setDataRequest({
        date: "",
        smallDogs: 0,
        bigDogs: 0,
      });
    } catch (err: any) {
      setAlertMessage(err.message);
      setAlertVisibility(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container>
        <Content>
          <Title>Consulta de Pet Shops</Title>
          <Form onSubmit={handleGetBestPetShop}>
            <InputContainer>
              <Label>Data</Label>
              <Input
                value={dataRequest.date}
                onChange={(e: any) =>
                  setDataRequest((prev) => ({ ...prev, date: e.target.value }))
                }
                placeholder="Data do banho"
                type="date"
                max-length="10"
                aria-label="Data do banho"
              />
            </InputContainer>
            <InputContainer>
              <Label>Quantidade de cães pequenos</Label>
              <Input
                value={dataRequest.smallDogs}
                onChange={(e: any) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue) && inputValue >= 0) {
                    setDataRequest((prev) => ({
                      ...prev,
                      smallDogs: inputValue,
                    }));
                  }
                }}
                placeholder="Número de cães pequenos"
                type="number"
                max-length="10"
                aria-label="Número de cães pequenos"
              />
            </InputContainer>

            <InputContainer>
              <Label>Quantidade de cães grandes</Label>
              <Input
                value={dataRequest.bigDogs}
                onChange={(e: any) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue) && inputValue >= 0) {
                    setDataRequest((prev) => ({
                      ...prev,
                      bigDogs: inputValue,
                    }));
                  }
                }}
                placeholder="Número de cães grandes"
                type="number"
                max-length="10"
                aria-label="Número de cães grandes"
              />
            </InputContainer>

            <Button type="submit">Encontrar Melhor Pet Shop</Button>
          </Form>
        </Content>
      </Container>
      {isLoading && <Loading />}
      {alertVisibility && (
        <Alert message={alertMessage} setAlertVisibility={setAlertVisibility} />
      )}
      {resultModalVisibility && (
        <ResultModal
          bestPetShop={bestPetShop!}
          setResultModalVisibility={setResultModalVisibility}
        />
      )}
    </>
  );
}
