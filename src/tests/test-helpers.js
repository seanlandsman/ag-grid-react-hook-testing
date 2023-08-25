import { waitFor, screen } from "@testing-library/react";

// Test helper for the demo app selection count property
export async function getSelectedCount() {
  // Wait for the selected count to be updated
  const selectedCount = await waitFor(
    async () => await screen.findByLabelText("Selected Rows:")
  );
  return selectedCount.textContent;
}

// Test helper for the demo app selected cell property
export async function getClickedCell() {
  // Wait for the clicked cell to be updated
  const selectedCellContents = await waitFor(
    async () => await screen.findByLabelText("Selected Cell Value:")
  );
  return selectedCellContents.textContent;
}

// Test helper to access AG Grid table rows by index
// Warning: rows can be displayed in different order to the DOM order see https://www.ag-grid.com/javascript-data-grid/accessibility/#ensure-dom-element-order
// Would not recommend setting ensureDomOrder=true as this will impact performance unless it is required for accessibility
export function getRowByIndex(index) {
  const rows = screen
    .getAllByRole("row")
    // role row is also used for the header row so we need to filter those out
    .filter((row) => row.getAttribute("row-index") !== null);
  return rows[index];
}
