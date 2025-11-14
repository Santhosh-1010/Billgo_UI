import React, { useState, useMemo } from "react";
import "./QuestionsTable.css";

const toReadableTitle = (key) =>
  key
    .replace(/[_.]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatValue = (key, value) => {
  if (value === null || value === undefined || value === "unknown") {
    return "-";
  }
  if (key === "ingestion_time") {
    const date = new Date(value);
    return isNaN(date) ? "-" : date.toLocaleString();
  }
  if (typeof value === "boolean") {
    return value ? "True" : "False";
  }
  return value;
};

const compareValues = (key, aValue, bValue, direction) => {
  if (aValue === null || aValue === undefined || aValue === "unknown") aValue = "";
  if (bValue === null || bValue === undefined || bValue === "unknown") bValue = "";

  const isDate = (val) => typeof val === "string" && !isNaN(Date.parse(val));
  if (isDate(aValue) && isDate(bValue)) {
    const aDate = new Date(aValue);
    const bDate = new Date(bValue);
    return direction === "asc" ? aDate - bDate : bDate - aDate;
  }

  const aNum = parseFloat(aValue);
  const bNum = parseFloat(bValue);
  if (!isNaN(aNum) && !isNaN(bNum)) {
    return direction === "asc" ? aNum - bNum : bNum - aNum;
  }

  if (typeof aValue === "boolean" && typeof bValue === "boolean") {
    return direction === "asc"
      ? aValue === bValue ? 0 : aValue ? 1 : -1
      : aValue === bValue ? 0 : aValue ? -1 : 1;
  }

  return direction === "asc"
    ? String(aValue).localeCompare(String(bValue))
    : String(bValue).localeCompare(String(aValue));
};

const QuestionsTable = ({ graphsData = [] }) => {
  const sampleRow = graphsData.find((row) => typeof row === "object" && row !== null);
  const headers = Object.keys(sampleRow || {});
  const defaultSortKey = headers[0] || null;

  const [sortConfig, setSortConfig] = useState({
    key: defaultSortKey,
    direction: "asc",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return graphsData;

    return [...graphsData].sort((a, b) =>
      compareValues(sortConfig.key, a[sortConfig.key], b[sortConfig.key], sortConfig.direction)
    );
  }, [graphsData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  if (!Array.isArray(graphsData) || graphsData.length === 0) {
    return <p className="no-data-message">No data available</p>;
  }

  return (
    <div className="questions-table-container">
      <div className="table-wrapper scrollable-container">
        <table className="questions-table">
          <thead>
            <tr>
              {headers.map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="table-header sortable-header"
                >
                  {toReadableTitle(key)}{" "}
                  {sortConfig.key === key && (
                    <span className="sort-indicator">
                      {sortConfig.direction === "asc" ? "🔼" : "🔽"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx} className="table-row">
                {headers.map((key) => (
                  <td key={key} className="table-cell">
                    {formatValue(key, row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionsTable;
