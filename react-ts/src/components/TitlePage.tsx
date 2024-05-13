type TitlePageProps = {
    textTitle: string;
    visibleButton?: boolean;
    textButton?: string;
};

export const TitlePage: React.FC<TitlePageProps> = ({
    textTitle,
    visibleButton = false,
    textButton = "button",
}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className=" py-4 px-6  border-b-4 border-violet-500  inline-block ">
                <h1 className="text-3xl font-black text-violet-500 ">
                    {textTitle}
                </h1>
            </div>
            {visibleButton && (
                <button className=" px-8 h-12 rounded-md font-semibold text-base bg-green-500 text-white hover:bg-green-600 hover:border-green-700 hover:text-white transition-all duration-200  border-2 border-green-600 active:bg-green-700">
                    {textButton}
                </button>
            )}
        </div>
    );
};
