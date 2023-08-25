import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
  configure,
  within,
  waitFor,
} from "@testing-library/react";
import React from "react";
import App from "../App";
import { getClickedCell, getSelectedCount , getRowByIndex} from "./test-helpers";

describe("App with mocked handler", () => {

  // Mock the handleRowClicked prop
  const handleRowClicked = jest.fn();

  beforeEach(async () => {
    render(<App handleRowClicked={handleRowClicked}/>);
    // Ensure that the grid data has loaded before running tests
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."), {
      timeout: 5000,
    });
  });

  it("multiple rows selected via clicking year cell with mock", async () => {
    // for this test we need to use the column id as the test id attribute
    configure({ testIdAttribute: "col-id" });

    // Get first 3 rows
    const expectedYears = ["2008", "2004", "2012"];

    const validateRow = async (index) => {
      const row = getRowByIndex(index);
      within(row).getByTestId("year").click();
      const clickedCell = await getClickedCell();
      expect(clickedCell).toBe(expectedYears[index]);
      expect(await getSelectedCount()).toBe("1");
    };

    await validateRow(0);
    await validateRow(1);
    await validateRow(2);

    expect(handleRowClicked).toHaveBeenCalledTimes(3);
  });
});
