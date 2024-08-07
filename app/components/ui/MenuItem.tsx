'use client'
import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";

type MenuItemProps = {
    items: {
        title: string;
        submenu?: Array<any>; // Eğer `submenu` öğelerinin içeriğini biliyorsanız, `any` yerine uygun bir tür kullanın
    };
    depthLevel: number;
};

const MenuItem = ({ items, depthLevel }: MenuItemProps) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const handler = (event:any) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (

        <li
            className="menu-items"
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >

            {items.submenu ? (
                <>

                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {items.title}{" "}
                        {depthLevel > 0 ? (
                            <span>&raquo;</span>
                        ) : (
                            <span className="arrow" />
                        )}
                    </button>

                    <Dropdown
                        depthLevel={depthLevel}
                        submenus={items.submenu}
                        dropdown={dropdown}
                    />
                </>
            ) : (
                <a href="/courses">{items.title}</a>
            )}
        </li>
    );
};

export default MenuItem;
