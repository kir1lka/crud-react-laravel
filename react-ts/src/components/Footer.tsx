import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <footer className="  bg-white rounded-t-lg py-5 px-6  border-t-2 border-r-2 border-l-2 border-gray-300 shadow-sm border-b flex items-center justify-center ">
            <div className="flex items-center ">
                <Link
                    to="https://github.com/kir1lka"
                    className="uppercase font-extrabold text-5xl text-violet-500"
                >
                    <FaGithub />
                </Link>
            </div>
        </footer>
    );
};
