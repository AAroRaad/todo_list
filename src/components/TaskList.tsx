"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateTaskModal from "./CreateTaskModal";
import { formattedDate } from "@/utils/helper";
import AllTasks from "@/components/AllTasks";
import { TaskListProps } from "@/types/task";

export default function TaskList({ title, date }: TaskListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "900",
              color: "black",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "200",
              color: "gray",
            }}
          >
            {formattedDate(date)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(7, 96, 251, 0.1)",
            color: "#0760FB",
            fontWeight: "600",
            textTransform: "none",
            px: 2,
            py: 0.75,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
          onClick={handleOpenModal}
        >
          + New Task
        </Button>
        <CreateTaskModal
          date={date}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </Box>
      <AllTasks date={date} />
    </>
  );
}
