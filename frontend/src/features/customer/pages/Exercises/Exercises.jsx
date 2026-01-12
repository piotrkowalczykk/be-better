import { Link, NavLink } from "react-router-dom";
import { Layout } from "../../components/layout/Layout/Layout";
import { Day } from "../../components/ui/Day/Day";
import classes from "./Exercises.module.css";
import { CustomInput } from "../../components/ui/CustomInput/CustomInput";
import { AddIcon } from "../../../../app/icons/Icons";
import { useState, useEffect } from "react";
import { CustomBtn } from "../../../../components/ui/CustomBtn/CustomBtn";
import { useNavigate } from "react-router-dom";

export const Exercises = () => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetchDays();
  }, []);

  const navigate = useNavigate();

  const handleEdit = () => {
    if (!selectedDay) return;
    navigate("/day-creator", { state: { dayId: selectedDay.id } });
  };

  const fetchDays = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/customer/days", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setDays(data);
    } catch (error) {
      console.error("Failed to fetch days:", error);
    } finally {
      setLoading(false);
    }
  };

  const weekDays = [
    { id: 1, label: "Monday" },
    { id: 2, label: "Tuesday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
    { id: 6, label: "Saturday" },
    { id: 7, label: "Sunday" },
  ];

  const getDaysForWeekday = (weekdayId) => {
    return days.filter(
      (day) => Array.isArray(day.frequency) && day.frequency.includes(weekdayId)
    );
  };

  const updateDayFrequency = async () => {
    if (!selectedDay) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/customer/days/${selectedDay.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            frequency: selectedDay.frequency || "",
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      fetchDays();
      setSelectedDay(null);
    } catch (error) {
      console.error("Failed to save day:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDay = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/customer/days/${selectedDay.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      fetchDays();
      setSelectedDay(null);
    } catch (error) {
      console.error("Failed to delete day:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={classes.exercisesContainer}>
        <div className={classes.exercisesLeftContainer}>
          <h2 className={classes.exercisesTitle}>Workout Planner</h2>
          <div className={classes.exercisesWeekPlannerContainer}>
            {weekDays.map((weekday) => (
              <div key={weekday.id} className={classes.WeekPlannerItem}>
                <h3 className={classes.WeekPlannerItemTitle}>
                  {weekday.label}
                </h3>

                {getDaysForWeekday(weekday.id).map((day) => (
                  <Day
                    key={day.id}
                    title={day.name}
                    color={day.color}
                    secondColor={day.secondaryColor}
                    icon={day.icon}
                    message={day.description}
                    visible={true}
                    onClick={() => setSelectedDay(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={classes.exercisesRightContainer}>
          <div className={classes.exercisesDaysList}>
            <div className={classes.exercisesDaysListHeader}>
              <h2 className={classes.exercisesTitle}>Days</h2>
              <NavLink to="/day-creator" className={classes.exercisesAddBtn}>
                <AddIcon />
              </NavLink>
            </div>

            <div className={classes.daysList}>
              {loading && <p>Loading days...</p>}

              {!loading &&
                days.map((day) => (
                  <Day
                    key={day.id}
                    title={day.name}
                    color={day.color}
                    secondColor={day.secondaryColor}
                    icon={day.icon}
                    message={day.description}
                    visible={true}
                    onClick={() => setSelectedDay(day)}
                  />
                ))}
            </div>
          </div>
          <div className={classes.exercisesManageDay}>
            <h2 className={classes.exercisesTitle}>Selected day</h2>
            <div className={classes.exercisesManageDayContainer}>
              {selectedDay ? (
                <>
                  <Day
                    title={selectedDay.name}
                    color={selectedDay.color}
                    secondColor={selectedDay.secondaryColor}
                    icon={selectedDay.icon}
                    message={selectedDay.description}
                    visible={true}
                  />
                  <CustomInput
                    label="Frequency"
                    value={selectedDay.frequency || ""}
                    onChange={(e) =>
                      setSelectedDay({
                        ...selectedDay,
                        frequency: e.target.value,
                      })
                    }
                  />
                  <div className={classes.manageBtns}>
                    <CustomBtn
                      text="Delete"
                      bgColor="rgb(255, 81, 0)"
                      color="white"
                      onClick={deleteDay}
                    />
                    <CustomBtn
                      text="Edit"
                      bgColor="rgb(130, 76, 255)"
                      color="white"
                      onClick={handleEdit}
                    />
                    <CustomBtn
                      text="Save"
                      bgColor="#209d3dff"
                      color="white"
                      onClick={updateDayFrequency}
                    />
                  </div>
                </>
              ) : (
                <Day
                  title="None"
                  color="var(--second-color)"
                  secondColor="var(--first-color)"
                  icon="?"
                  visible={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
