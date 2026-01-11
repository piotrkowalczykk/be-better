import { CustomBtn } from "../../../../../components/ui/CustomBtn/CustomBtn";
import { ImageUploader } from "../../../../../components/ui/ImageUploader/ImageUploader";
import { CustomInput } from "../../ui/CustomInput/CustomInput";
import classes from "./CustomExercise.module.css";
import { useState } from "react";

export const CustomExercise = () => {
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("muscleGroup", muscleGroup);

    if (image) {
      formData.append("image", image);
    }

    try {
    const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/customer/add-exercise", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to save exercise");
      }

      const data = await res.json();
      clearData();
      console.log("Saved:", data);

    } catch (err) {
      console.error(err);
    }
  };

  const clearData = () => {
    setImage(null);
    setName("");
    setMuscleGroup("");
  }

  return (
    <div className={classes.customExercisesContainer}>
      <ImageUploader image={image} onFileSelect={setImage} />

      <CustomInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <CustomInput
        label="Muscle Group"
        value={muscleGroup}
        onChange={(e) => setMuscleGroup(e.target.value)}
      />

      <CustomBtn
        text="Save"
        color="white"
        bgColor="#209d3dff"
        onClick={handleSubmit}
      />
    </div>
  );
};
