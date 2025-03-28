import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProfileAPI, getProfileAPI } from "./Queries";
import { styled } from "styled-components";
import { toast } from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";
const RowContainer = styled.ul`
  background: yellow;
  padding: 10px;
  list-style: none;
`;

const RowList = styled.li`
  background-color: #000000;
  padding: 10px;
  margin-bottom: 4px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  color: white;
`;

const RowSpan = styled.p`
  width: 20px;
`;

const Button = styled.button`
  background: white;
  padding: 10px;
  border: none;
  margin: 5px;
  cursor: pointer;
`;

function ProfileList() {
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: profileData = [], isPending: isGetting } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteProfileAPI,
    onSuccess: () => {
      toast.success("Successfully Deleted new profile");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (err) => {
      toast.error("Failed to delete profile", err.message);
    },
  });

  if (isGetting) return <p style={{ textAlign: "center" }}>Loading...</p>;
  return (
    <div>
      <RowContainer>
        <RowList>
          <RowSpan>Profile</RowSpan>
          <RowSpan>Name</RowSpan>
          <RowSpan>Age</RowSpan>
          <RowSpan>Height</RowSpan>
          <RowSpan>Weight</RowSpan>
          <RowSpan>Gender</RowSpan>
          <RowSpan>isPaid</RowSpan>
          <RowSpan></RowSpan>
          <RowSpan></RowSpan>
        </RowList>
        {profileData.map((each) => {
          return (
            <RowList key={each.id}>
              <img
                src={each.imageUrl}
                alt={each.name}
                width={"40px"}
                height={"30px"}
              />
              <RowSpan>{each.name}</RowSpan>
              <RowSpan>{each.age}</RowSpan>
              <RowSpan>{each.height}</RowSpan>
              <RowSpan>{each.weight}</RowSpan>
              <RowSpan>{each.gender}</RowSpan>
              <RowSpan>{each.isPaid ? "yes" : "no"}</RowSpan>
              <button
                onClick={() => deleteMutate(each.id)}
                disabled={isDeleting}
              >
                <MdOutlineDeleteOutline />
              </button>
            </RowList>
          );
        })}
      </RowContainer>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>Create</Button>

      {isOpenModal && <Modal />}
    </div>
  );
}

export default ProfileList;
