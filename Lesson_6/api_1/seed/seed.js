const mysql = require("mysql2/promise");

async function seedExpenses({
  host,
  user,
  password,
  database = "northwind",
  port = 3306,
}) {
  const conn = await mysql.createConnection({
    host,
    user,
    password,
    database,
    port,
  });
  try {
    // Make sure the table exists (matches your schema)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS \`northwind\`.\`expenses\` (
        id INT NOT NULL AUTO_INCREMENT,
        amount DECIMAL(10,2) NOT NULL,
        date DATETIME NOT NULL,
        category VARCHAR(45) NOT NULL,
        description VARCHAR(45) NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ASC)
      )
    `);

    const categories = [
      "Travel",
      "Meals",
      "Office",
      "Software",
      "Utilities",
      "Training",
      "Marketing",
      "Equipment",
      "Shipping",
      "Other",
    ];

    const pad = (n) => String(n).padStart(2, "0");
    const toMySqlDateTime = (d) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const randomDateInLast3Months = () => {
      const start = threeMonthsAgo.getTime();
      const end = now.getTime();
      const ts = start + Math.floor(Math.random() * (end - start + 1));
      return new Date(ts);
    };

    const randomAmount = () => Number((10 + Math.random() * 490).toFixed(2)); // 10.00–500.00

    // Build 100 rows
    const rows = Array.from({ length: 100 }, (_, i) => {
      const d = randomDateInLast3Months();
      return [
        randomAmount(),
        toMySqlDateTime(d),
        categories[Math.floor(Math.random() * categories.length)],
        `Auto seed #${i + 1}`.slice(0, 45),
      ];
    });

    // Prepare one bulk INSERT with placeholders
    const placeholders = rows.map(() => "(?, ?, ?, ?)").join(", ");
    const flatParams = rows.flat();

    await conn.beginTransaction();
    const [result] = await conn.execute(
      `INSERT INTO expenses (amount, date, category, description) VALUES ${placeholders}`,
      flatParams
    );
    await conn.commit();

    console.log(`Inserted ${result.affectedRows} expenses.`);
    return { inserted: result.affectedRows };
  } catch (err) {
    try {
      await conn.rollback();
    } catch {}
    console.error("Failed to seed expenses:", err.message);
    throw err;
  } finally {
    await conn.end();
  }
}

seedExpenses({
  host: "localhost",
  user: "root",
  password: "root",
  database: "northwind",
  port: 3306,
});
