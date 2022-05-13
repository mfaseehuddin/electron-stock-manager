import React, { Children, useState } from "react";
import "./Menubar.css";

export default function Menubar({ children }) {
    const arrayChildren = Children.toArray(children);
    const [activeMenu, setActiveMenu] = useState(0);
    return (
        <div className="Menubar">
            <div className="Sidebar">
                <h2>Stock Manager</h2>
                {arrayChildren.map((child, index) => (
                    <p
                        key={index}
                        onClick={() => {
                            setActiveMenu(index);
                        }}
                        style={{
                            height: "50px",
                            width: "100%",
                            backgroundColor:
                                index === activeMenu ? "orange" : "yellow",
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            padding: "5px",
                        }}
                    >
                        {child.props.className}
                    </p>
                ))}
            </div>
            <div className="Page">{arrayChildren[activeMenu]}</div>
        </div>
    );
}
