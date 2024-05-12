type ErrorListProps = {
    errors: ErrorState;
};

export const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
    return (
        <>
            {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-red-500 text-white rounded-lg mb-4">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
        </>
    );
};
