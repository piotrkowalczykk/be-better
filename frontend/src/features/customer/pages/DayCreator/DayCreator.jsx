import { ModalWindow } from "../../../../components/layout/ModalWindow/ModalWindow";
import { CustomBtn } from "../../../../components/ui/CustomBtn/CustomBtn";
import { SearchBar } from "../../../../components/ui/SearchBar/SearchBar";
import { Layout } from "../../components/layout/Layout/Layout";
import { CustomExercise } from "../../components/sections/CustomExercise/CustomExercise";
import { CustomInput } from "../../components/ui/CustomInput/CustomInput";
import { Exercise } from "../../components/ui/Exercise/Exercise";
import { SelectedExercise } from "../../components/ui/SelectedExercise/SelectedExercise";
import classes from "./DayCreator.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const DayCreator = () => {
  const [showModal, setShowModal] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("");
  const location = useLocation();
  const dayId = location.state?.dayId;
  const isEditMode = !!dayId;

  const [dayData, setDayData] = useState({
    name: "",
    color: "#444444",
    secondaryColor: "#444444",
    description: "",
    icon: "",
  });

  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/customer/exercises", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setExercises(data);
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dayId) {
      fetchDay(dayId);
    }
  }, [dayId]);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesName = exercise.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesMuscleGroup = exercise.muscleGroup
      .toLowerCase()
      .includes(muscleGroupFilter.toLowerCase());

    return matchesName && matchesMuscleGroup;
  });

  const fetchDay = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/customer/days/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      setDayData({
        name: data.name,
        color: data.color,
        secondaryColor: data.secondaryColor,
        description: data.description,
        icon: data.icon,
      });

      if (data.exercises) {
        setSelectedExercises(
          data.exercises.map((ex) => ({
            exerciseId: ex.exercise.id,
            name: ex.exercise.name,
            image: ex.exercise.image,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            rir: ex.rir,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch day:", err);
    }
  };

  const saveDay = async () => {
    const payload = {
      ...dayData,
      exercises: selectedExercises.map((e) => ({
        exerciseId: e.exerciseId,
        sets: e.sets,
        reps: e.reps,
        weight: e.weight,
        rir: e.rir,
      })),
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEditMode
        ? `http://localhost:8080/customer/days/${dayId}`
        : "http://localhost:8080/customer/add-day";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      alert(
        isEditMode ? "Day updated successfully" : "Day created successfully"
      );

      if (!isEditMode) {
        setDayData({
          name: "",
          color: "#444444",
          secondaryColor: "#444444",
          description: "",
          icon: "",
        });
        setSelectedExercises([]);
      }
    } catch (err) {
      console.error("Failed to save day:", err);
    }
  };

  const addExerciseToDay = (exercise) => {
    if (selectedExercises.some((e) => e.exerciseId === exercise.id)) return;

    setSelectedExercises((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        name: exercise.name,
        image: exercise.image,
        sets: 3,
        reps: 10,
        weight: 0,
        rir: 0,
      },
    ]);
  };

  const updateExercise = (id, data) => {
    setSelectedExercises((prev) =>
      prev.map((e) => (e.exerciseId === id ? { ...e, ...data } : e))
    );
  };

  const removeExercise = (id) => {
    setSelectedExercises((prev) => prev.filter((e) => e.exerciseId !== id));
  };

  return (
    <Layout>
      {showModal && (
        <ModalWindow
          onClose={() => setShowModal(false)}
          title="Create Exercise"
        >
          <CustomExercise />
        </ModalWindow>
      )}

      <div className={classes.dayCreatorContainer}>
        <div className={classes.dayCreatorLeftContainer}>
          <div className={classes.dayDataSection}>
            <div className={classes.dayDataSectionHeader}>
              <h2 className={classes.dayDataSectionTitle}>
                {isEditMode ? "Edit Day" : "Create Day"}
              </h2>
              <CustomBtn
                text="Save"
                bgColor="#209d3dff"
                color="white"
                onClick={saveDay}
              />
            </div>

            <div className={classes.dayDataSectionContainer}>
              <CustomInput
                type="text"
                label="Name"
                value={dayData.name}
                onChange={(e) =>
                  setDayData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <CustomInput
                type="color"
                label="Color"
                value={dayData.color}
                onChange={(e) =>
                  setDayData((prev) => ({ ...prev, color: e.target.value }))
                }
              />
              <CustomInput
                type="color"
                label="Secondary Color"
                value={dayData.secondaryColor}
                onChange={(e) =>
                  setDayData((prev) => ({
                    ...prev,
                    secondaryColor: e.target.value,
                  }))
                }
              />
              <CustomInput
                type="text"
                label="Description"
                value={dayData.description}
                onChange={(e) =>
                  setDayData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <CustomInput
                type="text"
                label="Icon"
                value={dayData.icon}
                onChange={(e) =>
                  setDayData((prev) => ({ ...prev, icon: e.target.value }))
                }
              />
            </div>
          </div>

          <div className={classes.dayExercises}>
            {selectedExercises.map((ex) => (
              <SelectedExercise
                key={ex.exerciseId}
                name={ex.name}
                image={ex.image}
                sets={ex.sets}
                reps={ex.reps}
                weight={ex.weight}
                rir={ex.rir}
                onChange={(data) => updateExercise(ex.exerciseId, data)}
                onRemove={() => removeExercise(ex.exerciseId)}
              />
            ))}
          </div>
        </div>

        <div className={classes.dayCreatorRightContainer}>
          <div className={classes.dayRightHeader}>
            <h2 className={classes.dayDataSectionTitle}>Library</h2>
            <button
              className={classes.dayRightBtn}
              onClick={() => setShowModal(!showModal)}
            >
              Custom Exercise
            </button>
          </div>

          <div className={classes.dayRightSection1}>
            <CustomInput label="Equipment" />

            <CustomInput
              label="Muscle group"
              value={muscleGroupFilter}
              onChange={(e) => setMuscleGroupFilter(e.target.value)}
            />

            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={classes.dayRightSection2}>
            {loading && <p>Loading exercises...</p>}

            {!loading &&
              filteredExercises.map((exercise) => (
                <Exercise
                  key={exercise.id}
                  name={exercise.name}
                  muscleGroup={exercise.muscleGroup}
                  image={exercise.image}
                  onClick={() => addExerciseToDay(exercise)}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
