import { Menu, MenuItem } from "@chakra-ui/react";
import React from "react";
import { ContextMenu } from "./components/ContextMenu";
import DatePicker from "./components/DatePickerSheeet";
function App() {
  const [date, setDate] = React.useState(new Date());
  return (
    <>
      <ContextMenu>
        <Menu>
          <MenuItem onClick={() => alert("OK")}>New Window</MenuItem>
          <MenuItem>Open Closed Tab</MenuItem>
          <MenuItem>Open File</MenuItem>
        </Menu>
      </ContextMenu>
      adasdad
      asd
      asd
      asd
      <DatePicker
        open={true}
        handleClose={() => 0}
        value={date}
        title="Date Picker"
        minYear={200}
      />
    </>
  );
}

export default App;
