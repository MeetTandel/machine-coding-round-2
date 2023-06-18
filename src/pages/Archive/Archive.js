import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHabits } from "../../context/HabitContext";
import "./Archive.css";
import { Habit } from "../../components/Habit";
import { NavLink } from "react-router-dom";

export const Archive = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState([]);
  const { archivedHabits, habits, dispatch } = useHabits();

  console.log("arch2", archivedHabits);
  const handleClick = (event, type, habit) => {
    setModalType(type);
    setSelectedHabit(habit);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="home__container">
      <NavLink to="/">
        <button className="archive-button">Home</button>
      </NavLink>
      <div className="habits__container">
        {archivedHabits.map((habit) => (
          <div
            className="habit"
            style={{
              color: habit.textColor,
              backgroundColor: habit.backgroundColor,
            }}
            onClick={(e) => handleClick(e, "edit", habit)}
          >
            <p>{habit.name}</p>
            {/* <div className="habit__button__container">
              <button className="edit">
                <EditIcon />
              </button>
              <button className="archive">
                <ArchiveIcon />
              </button>
              <button className="delete">
                <DeleteIcon />
              </button>
            </div> */}
          </div>
        ))}
      </div>

      <h2 className="no-data">
        {archivedHabits.length === 0 && "No Archived Habits Available"}
      </h2>

      <Popover
        style={{
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        id={id}
        data-testid="popover"
        className="modal"
        MenuProps={{
          disableScrollLock: true,
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/* {modalType === "create" && <Habit handleClose={handleClose} />} */}
        {modalType === "edit" && (
          <Habit
            handleClose={handleClose}
            type="edit"
            selectedHabit={selectedHabit}
          />
        )}
      </Popover>
    </div>
  );
};
