import React from "react";
import s from './Tooltip.module.scss'

const Tooltip = ({tooltipPosition, selectedCell, formattedDates}) => {
  return (
    <div
      className={s.tooltip}
      style={{
        top: tooltipPosition.y,
        left: tooltipPosition.x,
      }}
    >
      <h4>{selectedCell.count} Contributions</h4>
      <h6>{formattedDates(selectedCell.date)}</h6>
    </div>
  );
};

export default Tooltip;
