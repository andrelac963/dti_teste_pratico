import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from "./index.tsx";

describe("Home Component", () => {
  it("should render components", async () => {
    render(<Home />);
  });
});
