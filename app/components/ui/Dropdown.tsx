import MenuItem from "./MenuItem";

type DropdownProps = {
    submenus: Array<any>; // Eğer `submenus`un içeriğini biliyorsanız, `any` yerine uygun bir tür kullanın
    dropdown: boolean;
    depthLevel: number;
};

const Dropdown = ({ submenus, dropdown, depthLevel }: DropdownProps) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <MenuItem
                    items={submenu}
                    key={index}
                    depthLevel={depthLevel}
                />
            ))}
        </ul>
    );
};

export default Dropdown;
