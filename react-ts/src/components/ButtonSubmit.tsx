type ButtonSubmitProps = {
    loading: boolean;
    text: string;
};

export const ButtonSubmit: React.FC<ButtonSubmitProps> = ({
    loading,
    text,
}) => {
    return (
        <button className="h-14 w-full rounded-md font-semibold text-base bg-violet-500 text-white hover:bg-violet-600 hover:text-white transition-all duration-200 mb-4 border-2 border-violet-600 active:bg-violet-800">
            {loading ? (
                <div className="py-1 px-2 flex items-center justify-center  w-full h-full">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            ) : (
                text
            )}
        </button>
    );
};
