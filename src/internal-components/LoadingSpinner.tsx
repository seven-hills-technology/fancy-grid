import React, {CSSProperties} from "react";

const topDivStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "table",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 10000
};

const secondDivStyle: CSSProperties = {
    display: "table-cell",
    verticalAlign: "middle"
};

const thirdDivStyle: CSSProperties = {
    width: "75px",
    height: "75px",
    margin: "auto"
};

const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%"
};

export const LoadingSpinner: React.FunctionComponent<{}> = () => (
    <div style={topDivStyle}>
        <div style={secondDivStyle}>
            <div style={thirdDivStyle}>
                <div style={imgStyle} className="loading"><i className="fas fa-spinner fa-spin" style={{fontSize: '50px'}}></i></div>
            </div>
        </div>
    </div>
);