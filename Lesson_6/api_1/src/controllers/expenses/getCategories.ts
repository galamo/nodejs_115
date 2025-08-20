import getConnection from "../../db";

export default async function getCategories() {
  const conn = await getConnection();
  const getCategoriesQuery = `SELECT DISTINCT(category)
            FROM northwind.expenses`;

  const [rows] = await conn.execute(getCategoriesQuery, []);
  return rows;
}
