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
                    ? " text-2xl text-violet-500 inline-block py-1 px-2 border-b-4 rounded-sm border-violet-500 transition-all duration-200"
                    : "text-2xl text-gray-400 inline-block py-1 px-2 border-b-4 rounded-sm border-transparent transition-all duration-200";
            }}
        >
            {text}
        </NavLink>
    );
};
