import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { useDispatch } from "react-redux";
import { setUpdatingTask } from "../../../reducers/journal_reducer";
import MenuItemDefault from "../../../elements/pages_menu/items_pattern";

const CHANGE_TASK_ITEM_TEXT = "Изменить";
const DELETE_TASK_ITEM_TEXT = "Удалить";

export default function TaskMenu(props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    props.setAnchorEl(null);
  };

  const handleEditClick = async () => {
    handleClose();
    dispatch(setUpdatingTask(props.task));
  };

  const handleDeleteClick = () => {
    handleClose();
    props.setShowModal(true);
  };

  return (
    <Menu
      id="fade-menu"
      MenuListProps={{
        "aria-labelledby": "fade-button",
      }}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItemDefault onClick={handleEditClick} text={CHANGE_TASK_ITEM_TEXT} />
      <MenuItemDefault
        onClick={handleDeleteClick}
        text={DELETE_TASK_ITEM_TEXT}
      />
    </Menu>
  );
}
