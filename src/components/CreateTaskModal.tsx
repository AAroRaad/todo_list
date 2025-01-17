'use client'

import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { createTask } from '@/features/tasks/taskSlice';
import {
    Box,
    TextField,
    Button,
    Stack, Dialog, DialogTitle, DialogActions,
} from '@mui/material';
import {toast} from "react-toastify";
import {CreateTaskModalProps, CreateTaskRequest, CreateTaskResponse} from "@/types/task";
import { useForm, Controller } from 'react-hook-form';

function CreateTaskModal({ open, onClose, date }: CreateTaskModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, reset,watch, formState: { errors } } = useForm<CreateTaskRequest>();

  const selectedDate = date.toISOString().split('T')[0];

  const startDate = watch('start_date');

  const onSubmit = (data: CreateTaskRequest) => {
    const startDateTime = new Date(data.start_date).getTime();
    const endDateTime = new Date(data.end_date).getTime();

    if (endDateTime <= startDateTime) {
      toast.error("End date and time must be later than the start date and time.");
      return;
    }

    const taskData = {
      title: data.title,
      description: data.description,
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
    };

    dispatch(createTask(taskData))
        .unwrap()
        .then((response: CreateTaskResponse) => {
          toast.success(response.message);
          onClose();
          reset();
        })
        .catch((error: { message: string }) => {
          toast.error(error.message);
        });
  };


  return (
    <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
    >
      <Box  sx={{
          p:4
      }}>
          <DialogTitle variant="h6" sx={{ mb: 2, width: '100%', p: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  Create New Task
                  <DialogActions sx={{ p: 0 }}>
                      <Button onClick={onClose}>Close</Button>
                  </DialogActions>
              </Box>
          </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{required: 'Title is required'}}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Title"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{required: 'Description is required'}}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                )}
            />
            <Controller
                name="start_date"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Start date is required',
                }}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Start Date"
                        type="datetime-local"
                        InputLabelProps={{shrink: true}}
                        inputProps={{min: `${selectedDate}T00:00`, max: `${selectedDate}T23:59`}}
                        fullWidth
                        error={!!errors.start_date}
                        helperText={errors.end_date?.message}
                    />
                )}
            />
            <Controller
                name="end_date"
                control={control}
                defaultValue=""
                rules={{
                  required: 'End date is required',
                  validate: (value) => {
                    const startDateTime = new Date(startDate).getTime();
                    const endDateTime = new Date(value).getTime();
                    return endDateTime > startDateTime || 'End date must be later than the start date';
                  },
                }}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="End Date"
                        type="datetime-local"
                        InputLabelProps={{shrink: true}}
                        inputProps={{min: `${selectedDate}T00:00`, max: `${selectedDate}T23:59`}}
                        fullWidth
                        error={!!errors.end_date}
                        helperText={errors.end_date?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained">
              Create Task
            </Button>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}

export default CreateTaskModal;