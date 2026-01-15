import { Layout } from "../../components/layout/Layout/Layout";
import { RoutineCard } from "../../components/ui/RoutineCard/RoutineCard";
import classes from "./Routines.module.css";
import {
  WaterIcon,
  BedIcon,
  StepsIcon,
  MeditationIcon,
  ResetIcon,
  DeleteIcon,
  AddIcon,
  ArrorLeft,
  ArrorRight,
  HelpIcon,
} from "../../../../app/icons/Icons";
import { CustomInput } from "../../components/ui/CustomInput/CustomInput";
import { useState, useEffect } from "react";
import { IconPicker } from "../../../../components/ui/IconPicker/IconPicker";
import { IconsData } from "../../../../app/icons/IconsData";

export const Routines = () => {
  const [loadingRoutines, setLoadingRoutines] = useState(true);
  const [userRoutines, setUserRoutines] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    fetchUserRoutines();
  }, []);

  const PRESET_ROUTINES = [
    {
      name: "Meditation",
      icon: "MeditationIcon",
      scope: "15",
      units: "min",
      color: "#00ff44",
    },
    {
      name: "Water",
      icon: "WaterIcon",
      scope: "2",
      units: "L",
      color: "#00bfff",
    },
    {
      name: "Sleep",
      icon: "BedIcon",
      scope: "8",
      units: "h",
      color: "#ffff00",
    },
    {
      name: "Steps",
      icon: "StepsIcon",
      scope: "10000",
      units: "m",
      color: "#ff0000",
    },
  ];

  const [currentPresetIdx, setCurrentPresetIdx] = useState(0);

  const nextPreset = () => {
    setCurrentPresetIdx((prev) => (prev + 1) % PRESET_ROUTINES.length);
  };

  const prevPreset = () => {
    setCurrentPresetIdx(
      (prev) => (prev - 1 + PRESET_ROUTINES.length) % PRESET_ROUTINES.length
    );
  };

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    scope: "",
    units: "",
    frequency: "",
    color: "#444444",
    dashboardPriority: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCard = (routine) => {
    console.log(routine);
    setFormData({
      id: routine.id || null,
      name: routine.name,
      scope: routine.scope,
      units: routine.units,
      frequency: routine.frequency || "",
      color: routine.color,
      dashboardPriority: routine.dashboardPriority || 1,
    });
    console.log(routine.icon);
    setIcon(routine.icon || "");
  };

  const clearForm = () => {
    setFormData({
      id: null,
      name: "",
      scope: "",
      units: "",
      frequency: "",
      color: "#444444",
      dashboardPriority: "",
    });
    setIcon(null);
  };

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

  const saveRoutine = async () => {
    const token = localStorage.getItem("token");

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://127.0.0.1:8080/customer/routines/${formData.id}`
      : "http://127.0.0.1:8080/customer/add-routine";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          scope: formData.scope,
          units: formData.units,
          frequency: Array.isArray(formData.frequency) 
          ? formData.frequency.join(",") 
          : formData.frequency,
          color: formData.color,
          dashboardPriority: formData.dashboardPriority,
          icon: icon,
        }),
      });

      if (response.ok) {
        alert(formData.id ? "Routine updated!" : "Routine saved!");
        clearForm();
        fetchUserRoutines();
      } else {
        const errorData = await response.json();
        const messages = Object.values(errorData.errors).join("\n");
        alert(messages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoutine = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8080/customer/routines/${formData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.ok){
        alert("Routine deleted!");
        clearForm();
        fetchUserRoutines();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className={classes.routinesContainer}>
        <div className={classes.routinesTopContainer}>
          <h2 className={classes.routinesCardTitle}>My routines</h2>
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
              />
            ) : (
              userRoutines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  title={routine.name}
                  Icon={IconsData[routine.icon]}
                  userProgres={0}
                  scope={routine.scope}
                  unit={routine.units}
                  value={0}
                  pathColor={routine.color}
                  trailColor="#2b2b27"
                  onClick={() => handleSelectCard(routine)}
                />
              ))
            )}
          </div>
        </div>
        <div className={classes.routinesBottomContainer}>
          <div className={classes.routinesManageContainer}>
            <h2 className={classes.routinesCardTitle}>Create / edit routine</h2>
            <div className={classes.routinesInnerManageContainer}>
              <div className={classes.routinesInnerManageContainer1}>
                <CustomInput
                  label="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <CustomInput
                  label="Scope"
                  name="scope"
                  type="number"
                  value={formData.scope}
                  onChange={handleInputChange}
                />
                <CustomInput
                  label="Units"
                  name="units"
                  type="text"
                  value={formData.units}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.routinesInnerManageContainer1}>
                <CustomInput
                  label="Frequency"
                  name="frequency"
                  type="text"
                  value={formData.frequency}
                  onChange={handleInputChange}
                />
                <CustomInput
                  label="Color"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleInputChange}
                />
                <CustomInput
                  label="Dashboard priority"
                  name="dashboardPriority"
                  type="number"
                  value={formData.dashboardPriority}
                  onChange={handleInputChange}
                />
              </div>
              <div className={classes.routinesInnerManageContainer1}>
                <IconPicker value={icon} onChange={setIcon} />
                <div className={classes.helpWrapper}>
                  <button
                    className={classes.routinesHelpBtn}
                    onClick={() => setShowHelp((prev) => !prev)}
                  >
                    <HelpIcon />
                  </button>
                  {showHelp && <div className={classes.helpTooltip}>Enter day numbers separated by commas (e.g., 1,3,5 for Monday, Wednesday, and Friday.</div>}
                </div>
                <div className={classes.routinesManageBtnContainer}>
                  <button
                    className={classes.routinesManageBtn}
                    onClick={clearForm}
                  >
                    <ResetIcon /> CLEAR
                  </button>
                  <button className={classes.routinesManageBtn} onClick={deleteRoutine}>
                    <DeleteIcon /> DELETE
                  </button>
                  <button className={classes.routinesManageBtn} onClick={saveRoutine}>
                    <AddIcon /> SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.routinesSelectContainer}>
            <h2 className={classes.routinesCardTitle}>Use our routines</h2>
            <div className={classes.cardSelectContainer}>
              <RoutineCard
                title={PRESET_ROUTINES[currentPresetIdx].name}
                Icon={IconsData[PRESET_ROUTINES[currentPresetIdx].icon]}
                userProgres="0"
                scope={PRESET_ROUTINES[currentPresetIdx].scope}
                unit={PRESET_ROUTINES[currentPresetIdx].units}
                value="0"
                pathColor={PRESET_ROUTINES[currentPresetIdx].color}
                trailColor="#2b2b27"
                onClick={() => handleSelectCard(PRESET_ROUTINES[currentPresetIdx])}
              />
              <div className={classes.cardSelectBtns}>
                <button className={classes.cardBtn} onClick={prevPreset}>
                  <ArrorLeft />
                </button>
                <button className={classes.cardBtn} onClick={nextPreset}>
                  <ArrorRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
