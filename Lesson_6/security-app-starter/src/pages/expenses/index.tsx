import { getUserDetailsApi } from "../../services/user.api";
import { getExpensesByDates } from "../../services/expenses.api";
import { useEffect, useState } from "react";
import { RolesWrapper } from "@/components/RolesWrapper";
import DataTable from "./dataTable";

function formatDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}
export type UserDetailsResponse = {
  email: string;
  id: number;
  role: "admin" | "viewer" | "configurator";
};
export default function Expenses() {
  const [from, setFrom] = useState(
    formatDateInput(new Date(new Date().setMonth(new Date().getMonth() - 2)))
  );
  const [to, setTo] = useState(formatDateInput(new Date()));
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await getExpensesByDates({
        from: "2025-05-25 09:08:04",
        to: "2025-08-22 12:39:23",
      });
      const sortedData = res.sort(
        // @ts-ignore
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExpenses(sortedData);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function getUserDetails() {
    try {
      const res: UserDetailsResponse = await getUserDetailsApi();
      setRole(res.role);
    } catch (e: any) {
    } finally {
    }
  }

  useEffect(() => {
    load();
    // getUserDetails();
  }, []);

  return (
    <section className="card">
      <div className="card-header">
        <h2>Expenses</h2>
        {/* support multiple roles per component  */}
        <RolesWrapper roles={["admin"]}>
          <button className="btn"> Create New Expense</button>
        </RolesWrapper>
      </div>
      <div>
        <DataTable rows={expenses} />
      </div>
    </section>
  );
}
