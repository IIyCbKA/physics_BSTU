import { styles } from "../styles/style_main_table";
import { TableCell } from "@mui/material";
import "../styles/style_main_table.css";

export default function StudentCellJournal(props) {
  return (
    <TableCell style={styles.stickyCell}>
      <div
        className={`student-sticky-cell ${
          props.tableIsScrollLeft ? " sticky-cell-box-shadow" : ""
        }`}
      >
        <div className="student-info-text">
          {`${props.surname} ${props.name} ${props.patronymic}`}
        </div>
      </div>
    </TableCell>
  );
}
