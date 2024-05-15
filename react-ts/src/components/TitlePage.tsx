import { Link } from "react-router-dom";

type TitlePageProps = {
    textTitle: string;
    visibleButton?: boolean;
    children?: React.ReactNode;
    textButton?: React.ReactNode;
    toLinkButton?: string;
};

export const TitlePage: React.FC<TitlePageProps> = ({
    children,
    textTitle,
    visibleButton = false,
    textButton = "",
    toLinkButton = "",
}) => {
    return (
        <div className="flex justify-between items-center mb-2">
            <div className=" py-4 inline-block ">
                <h1 className="text-3xl font-black text-black ">{textTitle}</h1>
            </div>
            {visibleButton && (
                <Link to={toLinkButton}>
                    <button className=" px-4 h-12 rounded-md font-semibold text-base bg-green-500 text-white hover:bg-green-600 hover:border-green-700 hover:text-white transition-all duration-200  border-2 border-green-600 active:bg-green-700">
                        <div className="flex items-center">
                            {textButton}
                            {children}
                        </div>
                    </button>
                </Link>
            )}
        </div>
    );
};
