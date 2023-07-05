import React, { useState } from "react";
import { format } from "date-fns";
import addWeeks from "date-fns/addWeeks";
import startOfWeek from "date-fns/startOfWeek";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import { ru } from "date-fns/locale";
import s from "./Table.module.scss";
import Tooltip from "../Tooltip/Tooltip";

const Table = ({ dates, setDates }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const today = new Date();
  const endDate = endOfWeek(today);
  const startDate = startOfWeek(addWeeks(endDate, -50));

  const columns = 51;
  const columnsData = Array(columns)
    .fill()
    .map((_, columnIndex) => {
      const columnStartDate = addWeeks(startDate, columnIndex);
      const columnEndDate = endOfWeek(columnStartDate);
      const columnDates = eachDayOfInterval({
        start: columnStartDate,
        end: columnEndDate,
      });
      return columnDates.reverse();
    });

  const formattedDates = (dateString) => {
    return format(dateString, "EEEE, MMMM d, yyyy", { locale: ru });
  };

  const handleCellClick = (date, count, event) => {
    setSelectedCell({ date, count });
    const cellRect = event.target.getBoundingClientRect();
    const tooltipWidth = 137;
    const tooltipX = cellRect.left + cellRect.width / 2 - tooltipWidth / 2;
    const tooltipY = cellRect.top - 55;
    setTooltipPosition({ x: tooltipX, y: tooltipY });
  };

  return (
    <div className={s.row}>
      {dates ? (
        columnsData.map((columnDates, columnIndex) => (
          <div className={s.col} key={columnIndex}>
            {columnDates.map((date, rowIndex) => {
              const formattedDate = format(date, "yyyy-MM-dd");
              const count = dates[formattedDate] || 0;
              const squareStyle =
                count > 29
                  ? { backgroundColor: "rgba(37, 78, 119, 1)" }
                  : count > 19
                  ? { backgroundColor: "rgba(127, 168, 201, 1)" }
                  : count > 9
                  ? { backgroundColor: "rgba(82, 123, 160, 1)" }
                  : count > 0
                  ? { backgroundColor: "rgba(172, 213, 242, 1)" }
                  : {};

              return (
                <div
                  key={`${columnIndex}-${rowIndex}`}
                  onClick={(e) => handleCellClick(date, count, e)}
                  className={s.contribution}
                  style={squareStyle}
                ></div>
              );
            })}
          </div>
        ))
      ) : (
        <h1>Идет загрузка...</h1>
      )}
      {selectedCell && (
        <Tooltip
          tooltipPosition={tooltipPosition}
          selectedCell={selectedCell}
          formattedDates={formattedDates}
        />
      )}
    </div>
  );
};

export default Table;
