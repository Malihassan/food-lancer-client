import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { PuffLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { loadings } from "../../../store/LoadingSlice";
import classes from "./loader.module.scss";
const override = css`
  display: block;
  margin: 0 auto;
`;

export default function Loader() {
  const loading = useSelector((state) => state.loader.loading);
  return (
    <>
      {loading && (
        <div className={`${classes.fix}`}>
          <PuffLoader color="#ffa500" css={override} size={100} />
        </div>
      )}
    </>
  );
}
