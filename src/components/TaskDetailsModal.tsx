'use client';

import React from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, Button, Divider
} from '@mui/material';
import {TaskDetailsModalProps} from "@/types/task";
import Box from "@mui/material/Box";
import {BeatLoader} from "react-spinners";
import {useTheme} from "@mui/system";

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ open, onClose, task, isLoading }) => {
    const theme = useTheme();
    if (!task) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            {isLoading ? (
                <Box
                    sx={{
                        minHeight: '35vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <BeatLoader color="#0760FB" size={10} />
                </Box>
            ) : (
               <>
                   <DialogTitle variant="h4" sx={{ fontWeight: 'bold' }}>{task?.title}</DialogTitle>
                   <DialogContent>
                       <Typography variant="h6" sx={{ color: theme.palette.grey[500] }}>{task?.description}</Typography>
                       <Divider/>
                       <Typography variant="body1" sx={{mt: 4}}>
                           <strong>Start:</strong> {new Date(task.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </Typography>
                       <Typography variant="body1" sx={{mt: 2}}>
                           <strong>End:</strong> {new Date(task.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </Typography>
                       <Typography variant="body1" sx={{mt: 2}}>
                           <strong>Status:</strong> {task?.is_completed ? 'Closed' : 'Open'}
                       </Typography>
                       <Typography variant="body1" sx={{mt: 2}}>
                           <strong>Created At:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}
                       </Typography>
                       <Typography variant="body1" sx={{mt: 2}}>
                           <strong>Updated At:</strong> {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'N/A'}
                       </Typography>
                   </DialogContent>
                   <DialogActions>
                       <Button onClick={onClose}>Close</Button>
                   </DialogActions>
               </>
            )}
        </Dialog>
    );
};

export default TaskDetailsModal;