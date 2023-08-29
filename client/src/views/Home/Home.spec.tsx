import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from "./index.tsx";

describe("Home Component", () => {
  it("should render components", async () => {
    render(<Home />);
  });

  it("should return the best petshop", async () => {
    render(<Home />);

    const dateInput = screen.getByPlaceholderText("Data");
    const quantitySmallDogsInput = screen.getByPlaceholderText("Cães pequenos");
    const quantityBigDogsInput = screen.getByPlaceholderText("Cães grandes");

    const button = screen.getByText("Enviar");

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
      expect(screen.getByText("Petshop A")).toBeInTheDocument();
      expect(screen.getByText("Preço total: R$40,00")).toBeInTheDocument();
    });
  });
});
