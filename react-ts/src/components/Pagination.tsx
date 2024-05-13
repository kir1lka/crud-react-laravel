type PaginationProps = {
    errors: ErrorState;
};

export const Pagination: React.FC<PaginationProps> = ({ errors }) => {
    return (
        <>
            {users.loading ? (
                <></>
            ) : (
                <div className="flex justify-center mb-4">
                    <div className=" py-3 px-3 bg-white shadow-md border-2 border-gray-300 rounded-lg ">
                        <div className=" rounded-md inline-block ">
                            <button
                                onClick={() =>
                                    handlePagination(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="py-2.5 px-5 text-base bg-green-500
                            rounded-lg border-2 mr-2 border-green-600  text-white hover:bg-green-600 hover:border-green-700 hover:text-white font-semibold transition-all duration-100 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500"
                            >
                                Назад
                            </button>
                            {pageNumbers.map((page, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handlePagination(page)}
                                        className="py-2.5 px-5 text-base bg-violet-300 
                                        rounded-lg border-2 mr-2 border-violet-400 text-white hover:bg-violet-600 hover:border-violet-700 hover:text-white font-semibold transition-all duration-100 "
                                        style={{
                                            background:
                                                currentPage === page
                                                    ? "#8b5cf6"
                                                    : "",
                                            borderColor:
                                                currentPage === page
                                                    ? "#7c3aed"
                                                    : "",
                                            color:
                                                currentPage === page
                                                    ? "white"
                                                    : "",
                                        }}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() =>
                                    handlePagination(currentPage + 1)
                                }
                                disabled={
                                    currentPage === users.meta.last_page - 1
                                }
                                className="py-2.5 px-5 text-base bg-green-500
                                rounded-lg border-2 border-green-600  text-white hover:bg-green-600 hover:border-green-700 hover:text-white font-semibold transition-all duration-100 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500"
                            >
                                Дальше
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
