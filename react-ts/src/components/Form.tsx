type FormProps = {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
    return (
        <div className="flex h-screen justify-center items-center  animated fadeInDown">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border-2 border-gray-200 mt-2 w-1/3">
                <form action="" onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
};
