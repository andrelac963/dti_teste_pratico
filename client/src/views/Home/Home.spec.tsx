import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from "./index.tsx";

describe("Home Component", () => {
  it("should render components", async () => {
    render(<Home />);

    expect(screen.getByText("Consulta de Pet Shops")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Quantidade de cães pequenos")).toBeInTheDocument();
    expect(screen.getByText("Quantidade de cães grandes")).toBeInTheDocument();
    expect(screen.getByText("Encontrar Melhor Pet Shop")).toBeInTheDocument();
  });

  it("should return the best petshop I", async () => {
    render(<Home />);

    const dateInput = screen.getByPlaceholderText("Data do banho");
    const quantitySmallDogsInput = screen.getByPlaceholderText("Número de cães pequenos");
    const quantityBigDogsInput = screen.getByPlaceholderText("Número de cães grandes");

    const button = screen.getByText("Encontrar Melhor Pet Shop");

    const currentDate = new Date();
    const year = currentDate.getFullYear() + 1;

    fireEvent.change(dateInput, {
      target: { value: year.toString() + "-01-01" },
    });
    fireEvent.change(quantitySmallDogsInput, {
      target: { value: "1" },
    });
    fireEvent.change(quantityBigDogsInput, {
      target: { value: "1" },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Meu Canino Feliz")).toBeInTheDocument();
      expect(screen.getByText("R$ 60")).toBeInTheDocument();
    });
  });

  it("should return the best petshop II", async () => {
    render(<Home />);

    const dateInput = screen.getByPlaceholderText("Data do banho");
    const quantitySmallDogsInput = screen.getByPlaceholderText("Número de cães pequenos");
    const quantityBigDogsInput = screen.getByPlaceholderText("Número de cães grandes");

    const button = screen.getByText("Encontrar Melhor Pet Shop");

    const currentDate = new Date();
    const year = currentDate.getFullYear() + 1;

    fireEvent.change(dateInput, {
      target: { value: year.toString() + "-01-06" },
    });
    fireEvent.change(quantitySmallDogsInput, {
      target: { value: "5" },
    });
    fireEvent.change(quantityBigDogsInput, {
      target: { value: "2" },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Vai Rex")).toBeInTheDocument();
      expect(screen.getByText("R$ 210")).toBeInTheDocument();
    });
  });
});
