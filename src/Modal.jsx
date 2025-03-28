import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProfileAPI } from "./Queries";
import { toast } from "react-hot-toast";

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  height: 200px;
  background-color: red;
`;

const StyledInput = styled.input`
  padding: 12px;
  width:100%
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;
function Modal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: addProfileAPI,
    onSuccess: () => {
      toast.success("Successfully Added new profile");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (err) => {
      toast.error("Failed to add profile", err.message);
    },
  });

  const handleFormSubmit = (data) => {
    addMutate(data);
  };
  return createPortal(
    <div>
      <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="name">
          Name:{" "}
          <StyledInput
            type={"text"}
            id="name"
            {...register("name", { required: "name is required" })}
          />
        </label>

        <label htmlFor="age">
          Age:{" "}
          <StyledInput
            type={"text"}
            id="age"
            {...register("age", { required: "age is required" })}
          />
        </label>

        <label htmlFor="height">
          Height:{" "}
          <StyledInput
            type={"text"}
            id="height"
            {...register("height", { required: "height is required" })}
          />
        </label>

        <label htmlFor="weight">
          Weight:{" "}
          <StyledInput
            type={"text"}
            id="weight"
            {...register("weight", { required: "weight is required" })}
          />
        </label>

        <label htmlFor="gender">
          Gender:{" "}
          <StyledInput
            type={"text"}
            id="gender"
            {...register("gender", { required: "gender is required" })}
          />
        </label>

        <label htmlFor="imageUrl">
          ImageUrl:{" "}
          <StyledInput
            type={"file"}
            accept="image/*"
            id="imageUrl"
            {...register("imageUrl", { required: "imageUrl is required" })}
          />
        </label>

        <label htmlFor="isPaid">
          isPaid:{" "}
          <input
            type={"checkbox"}
            id="isPaid"
            {...register("isPaid", { required: "isPaid is required" })}
          />
        </label>
        <button type="submit" disabled={isAdding}>
          create profile
        </button>
      </StyledForm>
    </div>,
    document.body
  );
}

export default Modal;
