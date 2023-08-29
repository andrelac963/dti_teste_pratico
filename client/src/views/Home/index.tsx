import { useState, useEffect } from "react";

import { Alert } from "../../utils/components/Alert";
import { Loading } from "../../utils/components/Loading";

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
  Text,
} from "./styles";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [dataRequest, setDataRequest] = useState<BestPetShopRequestType>({
    Date: "",
    SmallDogs: 0,
    BigDogs: 0,
  });

  const [BestPetShop, setBestPetShop] = useState<BestPetShopResponseType>();

  useEffect(() => {}, [BestPetShop]);

  async function handleGetBestPetShop(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dataRequest.Date || !dataRequest.SmallDogs || !dataRequest.BigDogs) {
      setAlertMessage("Preencha todos os campos!");
      setAlertVisibility(true);
      return;
    }

    const selectedDate = new Date(dataRequest.Date + " 00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setAlertMessage("A data deve ser maior ou igual a data atual!");
      setAlertVisibility(true);
      return;
    }

    try {
      setIsLoading(true);

      const response = await getBestPetShop(dataRequest);

      setBestPetShop(response);

      console.log(BestPetShop);

      setDataRequest({
        Date: "",
        SmallDogs: 0,
        BigDogs: 0,
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
          <Title>Novo Banho</Title>
          <Form onSubmit={handleGetBestPetShop}>
            <InputContainer>
              <Label>Data</Label>
              <Input
                value={dataRequest.Date}
                onChange={(e: any) =>
                  setDataRequest((prev) => ({ ...prev, Date: e.target.value }))
                }
                placeholder="Data do banho"
                type="date"
                aria-label="Data do banho"
              />
            </InputContainer>
            <InputContainer>
              <Label>Quantidade de cachorros pequenos</Label>
              <Input
                value={dataRequest.SmallDogs}
                onChange={(e: any) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue) && inputValue >= 0) {
                    setDataRequest((prev) => ({
                      ...prev,
                      SmallDogs: inputValue,
                    }));
                  }
                }}
                placeholder="Número de cachorros pequenos"
                type="number"
                max-length="10"
                aria-label="Número de cachorros pequenos"
              />
            </InputContainer>

            <InputContainer>
              <Label>Quantidade de cachorros grandes</Label>
              <Input
                value={dataRequest.BigDogs}
                onChange={(e: any) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue) && inputValue >= 0) {
                    setDataRequest((prev) => ({
                      ...prev,
                      BigDogs: inputValue,
                    }));
                  }
                }}
                placeholder="Número de cachorros grandes"
                type="number"
                max-length="10"
                aria-label="Número de cachorros grandes"
              />
            </InputContainer>

            <Button type="submit">Criar</Button>
          </Form>
        </Content>
        <Content>
          <Title>Resultado</Title>
          {BestPetShop && (
            <>
              <Text> {BestPetShop.Name} </Text>
              <Text> {BestPetShop.Distance} </Text>
              <Text> {BestPetShop.TotalPrice} </Text>
            </>
          )}
        </Content>
      </Container>
      {isLoading && <Loading />}
      {alertVisibility && (
        <Alert message={alertMessage} setAlertVisibility={setAlertVisibility} />
      )}
    </>
  );
}
