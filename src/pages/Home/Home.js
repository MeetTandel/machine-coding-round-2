import { Popover } from "@material-ui/core";
import React, { useState } from "react";
import { Habit } from "../../components/Habit";
import { useHabits } from "../../context/HabitContext";
import "./Home.css";


export const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState([]);
  const { habits, dispatch } = useHabits();

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

  console.log("hab", habits)

  return (
    <div className="home__container">
      <div className="habits__container">
        <div
          className="habit create-habit"
          onClick={(e) => handleClick(e, "create")}
        >
          Create My Own
        </div>
        {habits.map((habit) => (
          <div
            className="habit"
            style={{
              color: habit.textColor,
              backgroundColor: habit.backgroundColor,
            }}
            onClick={(e) => handleClick(e, "edit", habit)}
          >
            {habit.name}
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
        {modalType === "create" && <Habit handleClose={handleClose} />}
        {modalType === "edit" && <Habit handleClose={handleClose} />}
      </Popover>
    </div>
  );
};
