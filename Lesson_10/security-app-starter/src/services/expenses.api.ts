import axios from "axios";
import { mainAxios } from "./main-axios";

export async function getExpensesByDates({
    from,
    to,
}: {
    from: string;
    to: string;
}): Promise<Array<any>> {
    const result = await mainAxios.get(`/expenses/dates`, {
        params: {
            from,
            to,
        },
    });
    return (result.data as any).data as Array<any>;
}

export async function createExpense(expense: { amount: number, category: string, date: string, description: string }): Promise<Array<any>> {
    // const newExpense = {
    //     amount: 123456,
    //     category: "____UI_TEST",
    //     date: "2025-06-06 04:02:19",
    //     description: "____UI_TEST",
    // };
    const result = await mainAxios.post(`/expenses/expenses`, expense);
    return (result.data as any).data as Array<any>;
}



