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

	const dispatch = useDispatch();
	let [color, setColor] = useState("#6E767D");
	return (
		<div className={`sweet-loading ${classes.fix}`}>
			<PuffLoader color={color} loading={loading} css={override} size={80} />
			{loading && (
				<p style={{ fontSize: 30, color: "black" }} className="text-center">
					Loading...
				</p>
			)}
		</div>
	);
}
