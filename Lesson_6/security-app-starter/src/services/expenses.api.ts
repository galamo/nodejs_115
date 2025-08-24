import axios from "axios"
import { mainAxios } from "./main-axios"


export async function getExpensesByDates({ from, to }: { from: string, to: string }): Promise<Array<any>> {
    const result = await mainAxios.get(`/expenses/dates`, {
        params: {
            from,
            to,
        }
    })
    return result.data as Array<any>
}
