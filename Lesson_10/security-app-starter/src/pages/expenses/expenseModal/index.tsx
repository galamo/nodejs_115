//@ts-nocheck
import React, { useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    MenuItem
} from '@mui/material';
import axios from 'axios';
import { createExpense } from '@/services/expenses.api';
import dayjs, { Dayjs } from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};


export function BasicDateTimePicker({ onChange }: { onChange: any }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Basic date time picker" onChange={onChange} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default function AddExpenseModal({ open, handleClose, onSuccess }: { open: boolean, handleClose?: any, onSuccess?: any }) {
    const [formData, setFormData] = useState({
        amount: 0,
        category: '',
        date: '',
        description: ''
    });

    const [dateTime, setDateTime] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await createExpense({
                amount: Number(formData.amount),
                category: formData.category,
                date: dateTime,
                description: formData.description
            })

            handleClose();
            onSuccess()
        } catch (err) {
            setError('Failed to submit expense.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" gutterBottom>Add New Expense</Typography>

                <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 0, step: "0.01" }}
                />

                <TextField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <BasicDateTimePicker onChange={(e: any) => {
                    const currentDate = e.$d
                    const adaptedDateTime = format(currentDate, "yyyy-MM-dd hh:mm:ss")
                    setDateTime(adaptedDateTime)

                }} />
                {/* <TextField
                    label="Date"
                    name="date"
                    type="datetime"
                    value={formData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                /> */}

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {error && <Typography color="error" variant="body2">{error}</Typography>}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleClose} disabled={loading} sx={{ mr: 1 }}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
