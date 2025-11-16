import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import path from "path";

interface Alert {
  alertId: string;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
}

// Connect to local Elasticsearch
const client = new Client({ node: "http://localhost:9200" });

// Path to JSON file
const filePath = path.join(__dirname, "alert.json");

async function run(): Promise<void> {
  try {
    // Read JSON file
    const data = fs.readFileSync(filePath, "utf-8");
    const document: Alert = JSON.parse(data);

    // Index document into Elasticsearch
    const response = await client.index({
      index: "alerts",
      document,
    });

    // Refresh the index to make the document searchable immediately
    await client.indices.refresh({ index: "alerts" });

    console.log("Document indexed successfully:", response);
  } catch (error) {
    console.error("Error indexing document:", error);
  }
}

run();
