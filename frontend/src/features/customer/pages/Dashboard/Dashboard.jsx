import { Layout } from "../../components/layout/Layout/Layout";
import classes from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { RoutineCard } from "../../components/ui/RoutineCard/RoutineCard";
import { AddIcon } from "../../../../app/icons/Icons";
import { IconsData } from "../../../../app/icons/IconsData";
import { useNavigate } from "react-router-dom";
import { LogExercise } from "../../components/sections/LogExercise/LogExercise";
import { LogRoutine } from "../../components/sections/LogRoutine/LogRoutine";
import { ModalWindow } from "../../../../components/layout/ModalWindow/ModalWindow";

export const Dashboard = () => {
  const [loadingRoutines, setLoadingRoutines] = useState(true);
  const [userRoutines, setUserRoutines] = useState([]);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [selectedRoutineId, setSelectedRoutineId] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  useEffect(() => {
    fetchUserRoutines();
  }, []);

  const navigate = useNavigate();

  const fetchUserRoutines = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8080/customer/routines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch routines");

      

       const data = (await response.json()).sort(
      (a, b) => a.dashboardPriority - b.dashboardPriority
    );

      setUserRoutines(data);
    } catch (error) {
      console.error("Error fetching routines:", error);
    } finally {
      setLoadingRoutines(false);
    }
  };

  const handleSelectCard = () => {
    console.log("r");
  };

  const openRoutineLog = () => {};

  return (
    <Layout>
      {showRoutineModal && (
        <ModalWindow
          onClose={() => setShowRoutineModal(false)}
          title="Log Routine"
        >
          <LogRoutine routineId={selectedRoutineId} 
            onClose={() => setShowRoutineModal(false)}
            onUpdate={() => fetchUserRoutines()}
          />
        </ModalWindow>
      )}

      {showExerciseModal && (
        <ModalWindow
          onClose={() => setShowExerciseModal(false)}
          title="Log Exercise"
        >
          <LogExercise />
        </ModalWindow>
      )}

      <div className={classes.dashboardContainer}>
        <div className={classes.dashboardLeftContainer}>
          <div className={classes.routinesContainer}>
            <h2 className={classes.containerTitle}>Today's routines</h2>
            <div className={classes.cardsContainer}>
              {loadingRoutines ? (
                <p>Loading routines...</p>
              ) : userRoutines.length === 0 ? (
                <RoutineCard
                  title="No routines yet"
                  Icon={AddIcon}
                  userProgres="0"
                  scope="0"
                  pathColor="#2b2b27"
                  trailColor="#2b2b27"
                  onClick={() => navigate("/routines")}
                />
              ) : (
                userRoutines.map((routine) => (
                  <RoutineCard
                    key={routine.id}
                    title={routine.name}
                    Icon={IconsData[routine.icon]}
                    userProgres={routine.value || 0}
                    scope={routine.scope}
                    unit={routine.units}
                    value={(routine.value / routine.scope) * 100}
                    pathColor={routine.color}
                    trailColor="#2b2b27"
                    onClick={() => {
                      setSelectedRoutineId(routine.id);
                      setShowRoutineModal(true);
                    }}
                  />
                ))
              )}
            </div>
          </div>
          <div className={classes.overviewContainer}>
            <h2 className={classes.containerTitle}>Overview</h2>
          </div>
        </div>
        <div className={classes.dashboardRightContainer}></div>
      </div>
    </Layout>
  );
};
