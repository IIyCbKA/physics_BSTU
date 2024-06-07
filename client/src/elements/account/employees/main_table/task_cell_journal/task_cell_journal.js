import { styles } from "../styles/style_main_table";
import { TableCell } from "@mui/material";
import "../styles/style_main_table.css";

export default function TaskCellJournal(props) {
  return (
    <TableCell style={styles.defaultCell}>
      <div className="default-task-ceil">
        <div className="journal-task-info-text">{props.name}</div>
      </div>
    </TableCell>
  );
}
