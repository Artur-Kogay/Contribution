import React from "react";
import s from "./Info.module.scss";
import { colors } from "../../constants/info";

const Info = () => {
  return (
    <section className={s.info}>
      <span>Меньше</span>
      <div className={s.info_colors}>
        {colors.map((item) => {
          return (
            <div
              className={s.info_colors_block}
              key={item.id}
              style={{ background: item.color }}
            ></div>
          );
        })}
      </div>
      <span>Больше</span>
    </section>
  );
};

export default Info;
