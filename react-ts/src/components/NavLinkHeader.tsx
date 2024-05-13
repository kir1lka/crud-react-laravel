type NavLinkHeaderProps = {
    text: string;
    toLink: string;
};

import { NavLink } from "react-router-dom";

export const NavLinkHeader: React.FC<NavLinkHeaderProps> = ({
    text,
    toLink,
}) => {
    return (
        <NavLink
            to={toLink}
            className={({ isActive }) => {
                return isActive
                    ? " text-lg text-violet-500 inline-block py-1 px-2 border-b-2 border-violet-500 transition-all duration-200"
                    : "text-lg text-gray-400 inline-block py-1 px-2 border-b-2 border-transparent transition-all duration-200";
            }}
        >
            {text}
        </NavLink>
    );
};
