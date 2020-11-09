import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {getUserSkins, getAllSkins, getFilteredSkins} from "../../apiCalls.js";
import {App} from "./App";
jest.mock("../../apiCalls.js");

describe("BrowsePage", () => {
  it("Renders the homepage by default", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it("User should be able to get to the results page and see their skins", async () => {
    getUserSkins.mockResolvedValue(new Array(200).fill().map((_, i) => (i)))
    getAllSkins.mockResolvedValue(new Array(400).fill().map((_, i) => (i)))
    getFilteredSkins.mockResolvedValue([
      {
        "name": "Bifrost",
        "type": "Weapon",
      },
      {
        "name": "Invisible Boots",
        "type": "Armor",
      },
      {
        "name": "Ad-Infinium",
        "type": "Back",
      }
    ])
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    userEvent.click(screen.getByTestId("Armor-test"));
    userEvent.click(screen.getByTestId("Weapons-test"));
    userEvent.click(screen.getByTestId("Back-test"));
    userEvent.click(screen.getByRole('button', {name: 'Find skins!'}));
    await waitFor(() => expect(screen.getByText(/Skins you need to unlock!/i)).toBeInTheDocument())
    expect(screen.getByAltText(/Bifrost/i)).toBeInTheDocument()
    expect(screen.getByAltText(/Invisible Boots/i)).toBeInTheDocument()
    expect(screen.getByAltText(/Ad-Infinium/i)).toBeInTheDocument()
  });

  it("User should only see the categories they select", async () => {
    getUserSkins.mockResolvedValue(new Array(200).fill().map((_, i) => (i)))
    getAllSkins.mockResolvedValue(new Array(400).fill().map((_, i) => (i)))
    getFilteredSkins.mockResolvedValue([
      {
        "name": "Bifrost",
        "type": "Weapon",
      },
      {
        "name": "Invisible Boots",
        "type": "Armor",
      },
      {
        "name": "Ad-Infinium",
        "type": "Back",
      }
    ])
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    userEvent.click(screen.getByTestId("Armor-test"));
    userEvent.click(screen.getByTestId("Weapons-test"));
    userEvent.click(screen.getByRole('button', {name: 'Find skins!'}));
    await waitFor(() => expect(screen.getByText(/Skins you need to unlock!/i)).toBeInTheDocument())
    expect(screen.getByAltText(/Bifrost/i)).toBeInTheDocument()
  });

  it("Use Should be able to click on a preview image and be taken to a new screen", async () => {
    getUserSkins.mockResolvedValue(new Array(200).fill().map((_, i) => (i)))
    getAllSkins.mockResolvedValue(new Array(400).fill().map((_, i) => (i)))
    getFilteredSkins.mockResolvedValue([
      {
        "name": "Bifrost",
        "type": "Weapon",
      },
      {
        "name": "Invisible Boots",
        "type": "Armor",
      },
      {
        "name": "Ad-Infinium",
        "type": "Back",
      }
    ])
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    userEvent.click(screen.getByTestId("Armor-test"));
    userEvent.click(screen.getByTestId("Weapons-test"));
    userEvent.click(screen.getByRole('button', {name: 'Find skins!'}));
    await waitFor(() => expect(screen.getByText(/Skins you need to unlock!/i)).toBeInTheDocument())
    userEvent.click(screen.getByAltText(/Bifrost/i))
    expect(screen.getByText(/Bifrost/i)).toBeInTheDocument()
    expect(screen.getByText(/More Info/i)).toBeInTheDocument()
  });
});
