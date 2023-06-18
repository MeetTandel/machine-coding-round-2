import React, { useEffect, useState } from "react";
import { useHabits } from "../context/HabitContext";
import { getRandomColors } from "../helpers/utils";
import "./Habit.css";
import SelectDropDown from "./SelectDropDown/SelectDropDown";

export const Habit = ({ handleClose, selectedHabit, type }) => {
  const {
    habits,
    repeatDropDown,
    goalsDropDown,
    timeDropDown,
    startDayDropDown,
    dispatch,
  } = useHabits();
  const [goalsDrop, setGoalDrop] = useState(goalsDropDown);

  const [habitName, setHabitName] = useState(selectedHabit?.name ?? "");
  const [error, setError] = useState(null);
  const [repeat, setRepeat] = useState(selectedHabit?.repeat ?? "");
  const [goals, setGoals] = useState(selectedHabit?.goals ?? "");
  const [time, setTime] = useState(selectedHabit?.time ?? "");
  const [startDay, setStartDay] = useState(selectedHabit?.startDay ?? "");

  useEffect(() => {
    if (
      repeat.length > 0 ||
      (type === "edit" && selectedHabit?.repeat?.length > 0)
    ) {
      setGoalDrop(
        goalsDropDown.map((item) => ({
          name: `${item.name} ${repeat}`,
          value: `${item.name} ${repeat}`,
        }))
      );
      setGoals(
        goals.includes("Daily") ||
          goals.includes("Weekly") ||
          goals.includes("Monthly")
          ? `${goals.split(" ").slice(0, -1).join(" ")} ${repeat}`
          : `${goals} ${repeat}`
      );
    }
  }, [repeat]);

  return (
    <div className="modal__habit__container">
      <h3 className="habit__title">
        {type === "create" ? "New habit" : "Edit habit"}
      </h3>

      <section className="grid">
        <div className="section__title">
          <label class="required">NAME </label>
        </div>

        <div className="section__details">
          <div className="question">
            <span>&#63;</span>
          </div>

          <input
            type="text"
            value={habitName}
            onChange={(e) => {
              setError(null);
              setHabitName(e.target.value);
            }}
          />
        </div>
        {error?.length > 0 && <p className="error">{error}</p>}
      </section>

      <section className="grid grid-col gap">
        <div className="repeat">
          <div className="section__title">
            <label>REPEAT </label>
          </div>

          <div className="dropdown__container">
            <SelectDropDown
              options={repeatDropDown}
              id="repeat"
              name="repeat"
              selected={repeat}
              setSelection={(value) => {
                setRepeat(value);
              }}
            />
          </div>
        </div>

        <div className="goal">
          <div className="section__title">
            <label>GOAL </label>
          </div>
          <div className="dropdown__container">
            <SelectDropDown
              options={goalsDrop}
              id="goals"
              name="goals"
              selected={goals}
              setSelection={(value) => {
                setGoals(value);
              }}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-col gap">
        <div className="time-of-day">
          <div className="section__title">
            <label>TIME OF DAY </label>
          </div>
          <div className="dropdown__container">
            <SelectDropDown
              options={timeDropDown}
              id="time"
              name="time"
              selected={time}
              setSelection={(value) => {
                setTime(value);
              }}
            />
          </div>
        </div>

        <div className="start-day">
          <div className="section__title">
            <label>START DAY </label>
          </div>
          <div className="dropdown__container">
            <SelectDropDown
              options={startDayDropDown}
              id="start-day"
              name="start-day"
              selected={startDay}
              setSelection={(value) => {
                setStartDay(value);
              }}
            />
          </div>
        </div>
      </section>

      <section className="buttons">
        <button
          className="discard"
          onClick={() => {
            setHabitName("");
            setRepeat("");
            setGoalDrop(goalsDropDown);
            setTime("");
            setStartDay("");
            handleClose();
          }}
        >
          {type === "create" ? "Discard" : "Cancel"}
        </button>
        <button
          className="save"
          onClick={() => {
            if (habitName.length > 0) {
              const randomColor = getRandomColors();
              dispatch({
                type: type === "create" ? "ADD_HABIT" : "EDIT_HABIT",
                payload: {
                  id: type === "create" ? habits.length + 1 : selectedHabit.id,
                  name: habitName,
                  textColor:
                    type === "create"
                      ? randomColor.textColor
                      : selectedHabit.textColor,
                  backgroundColor:
                    type === "create"
                      ? randomColor.backgroundColor
                      : selectedHabit.backgroundColor,
                  repeat: repeat,
                  goals: goals,
                  time: time,
                  startDay: startDay,
                },
              });
              handleClose();
            } else {
              setError("Please Enter Habit Name");
            }
          }}
        >
          Save
        </button>
      </section>
    </div>
  );
};
