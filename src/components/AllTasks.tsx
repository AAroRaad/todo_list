"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/features/store";
import {
  deleteTask,
  fetchTasks,
  showTask,
  updateTaskCompletion,
} from "@/features/tasks/taskSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TaskCard } from "@/components/TaskCard";
import { BeatLoader } from "react-spinners";
import { clearSelectedTask } from "@/features/tasks/taskSlice";
import { AllTasksProps } from "@/types/task";

export default function AllTasks({ date }: AllTasksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, fetchTasksLoading, error } = useSelector(
    (state: RootState) => state.tasks,
  );
  const [tabValue, setTabValue] = useState(0);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTasks()).finally(() => {
      setLocalLoading(false);
    });
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    dispatch(clearSelectedTask());
  };

  const handleToggleComplete = (id: string, isCompleted: boolean) => {
    dispatch(updateTaskCompletion({ id, isCompleted }));
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      await dispatch(fetchTasks());
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleShowTask = async (id: string) => {
    try {
      await dispatch(showTask(id)).unwrap();
    } catch (error) {
      console.error("Failed to fetch task details:", error);
    }
  };

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const filteredTasksByDate = tasks.filter((task) => {
    const taskStartDate = new Date(task.start_date);
    return taskStartDate >= startOfDay && taskStartDate <= endOfDay;
  });

  const filteredTasks = filteredTasksByDate.filter((task) => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return !task.is_completed;
    if (tabValue === 2) return task.is_completed;
    return true;
  });

  if (fetchTasksLoading || localLoading)
    return (
      <Box
        sx={{
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader color="#0760FB" size={10} />
      </Box>
    );
  if (error)
    return (
      <Box
        sx={{
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  const reversedTasks = [...filteredTasks].reverse();
  const openTasksCount = filteredTasksByDate.filter(
    (task) => !task.is_completed,
  ).length;
  const closedTasksCount = filteredTasksByDate.filter(
    (task) => task.is_completed,
  ).length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            flexGrow: 1,
            "& .MuiTabs-indicator": {
              backgroundColor: "#0760FB",
            },
            "& .MuiTab-root": {
              fontWeight: "bold",
              textTransform: "none",
            },
          }}
        >
          <Tab label={`All (${filteredTasksByDate.length})`} />
          <Tab label={`Open (${openTasksCount})`} />
          <Tab label={`Closed (${closedTasksCount})`} />
        </Tabs>
      </Box>

      {reversedTasks.length === 0 ? (
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mt: 2 }}
          color="error"
        >
          No task
        </Typography>
      ) : (
        reversedTasks.map((task) => {
          if (!task._id) {
            return null;
          }
          return (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onShow={handleShowTask}
            />
          );
        })
      )}
    </Box>
  );
}
