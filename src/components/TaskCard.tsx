'use client';

import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import {TaskCardProps} from "@/types/task";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@mui/material";
import {useTheme} from "@mui/system";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import TaskDetailsModal from "@/components/TaskDetailsModal";
import {isToday, isTomorrow} from "@/utils/helper";

const TaskCardComponent: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete, onShow }) => {
    const theme = useTheme();
    const { selectedTask, error, showTaskLoading } = useSelector((state: RootState) => state.tasks);
    const [isCompleted, setIsCompleted] = useState(task.is_completed);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleToggleComplete = () => {
        const newCompletedStatus = !isCompleted;
        setIsCompleted(newCompletedStatus);
        if (task._id) {
            onToggleComplete(task._id, newCompletedStatus);
        } else {
            console.error('Task ID is undefined');
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (task._id) {
            onDelete(task._id);
        } else {
            console.error('Task ID is undefined');
        }
        setIsDeleteDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };

    useEffect(() => {
        if (selectedTask && selectedTask._id === task._id) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [selectedTask, task._id]);

    const handleOpenModal = () => {
        if (task._id) {
            onShow(task._id);
            setIsModalOpen(true);
        }
    };

    const taskStartDate = new Date(task.start_date);
    const dayLabel = isToday(taskStartDate)
        ? 'Today'
        : isTomorrow(taskStartDate)
            ? 'Tomorrow'
            : taskStartDate.toLocaleDateString();

    return (
      <>
          <Box sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: 6,
              backgroundColor: 'white',
              }}
          >
              <Box sx={{ ml: 2, width: '100%', }}>
                  <Box  sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                  }}>
                      <Box onClick={handleOpenModal} sx={{cursor: 'pointer'}} >
                          <Typography variant="h6" sx={{
                              textDecoration: isCompleted ? 'line-through' : 'none',
                          }}>{task.title}</Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
                              {task.description}
                          </Typography>
                      </Box>
                      <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <DeleteIcon
                              onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick();
                              }}
                              sx={{cursor: 'pointer'}}
                              color='error'
                          />
                          <Checkbox
                              checked={isCompleted}
                              onChange={(e) => {
                                  e.stopPropagation();
                                  handleToggleComplete();
                              }}
                              color="primary"
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CheckCircleIcon />}
                          />
                      </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                  }}>
                      <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>{dayLabel}</Typography>
                      <Typography variant="subtitle2" sx={{ color: 'lightgray' }}>
                          {new Date(task.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(task.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                  </Box>
              </Box>
          </Box>
          <TaskDetailsModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              task={selectedTask || null}
              isLoading={showTaskLoading}
              error={error}
          />
          <Dialog
              open={isDeleteDialogOpen}
              onClose={handleCancelDelete}
          >
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                  <Typography>Are you sure you want to delete this task?</Typography>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCancelDelete} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={handleConfirmDelete} color="error">
                      Delete
                  </Button>
              </DialogActions>
          </Dialog>
      </>
    );
};

TaskCardComponent.displayName = 'TaskCard';

export const TaskCard = React.memo(TaskCardComponent);