import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Habit } from "../../components/Habit";
import { useHabits } from "../../context/HabitContext";
import "./Home.css";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState([]);
  const { archivedHabits, habits, dispatch } = useHabits();

  const handleClick = (event, type, habit) => {
    setModalType(type);
    setSelectedHabit(habit ?? []);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="home__container">
      <NavLink to="/archive">
        <button className="archive-button">Archived</button>
      </NavLink>
      <div className="habits__container">
        <div
          className="habit create-habit"
          onClick={(e) => handleClick(e, "create")}
        >
          Create My Own
        </div>
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="habit"
            style={{
              color: habit.textColor,
              backgroundColor: habit.backgroundColor,
            }}
            onClick={(e) => handleClick(e, "edit", habit)}
          >
            <p>{habit.name}</p>
            <div className="habit__button__container">
              <button
                className="edit"
                onClick={(e) => handleClick(e, "edit", habit)}
              >
                <EditIcon style={{ color: habit.textColor }} />
              </button>
              <button
                className="archive"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "ARCHIVE_HABIT",
                    payload: habit,
                  });
                }}
              >
                <ArchiveIcon style={{ color: habit.textColor }} />
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "DELETE_HABIT",
                    payload: habit.id,
                  });
                }}
              >
                <DeleteIcon style={{ color: habit.textColor }} />
              </button>
            </div>
          </div>
        ))}
      </div>

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
        {modalType === "create" && (
          <Habit handleClose={handleClose} type="create" />
        )}
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
