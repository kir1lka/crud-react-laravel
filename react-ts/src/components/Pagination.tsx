import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { getUsers } from "../store/usersSlice";

interface UsersState {
    users: {
        data: User[];
    };
    meta: {
        current_page: number;
        per_page: number;
        last_page: number;
    };
    loading: boolean;
    error: string | null | undefined;
}

type PaginationProps = {
    users: UsersState;
};

export const Pagination: React.FC<PaginationProps> = ({ users }) => {
    const dispatch = useAppDispatch();

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);

    useEffect(() => {
        dispatch(getUsers(currentPage));
    }, [currentPage]);

    useEffect(() => {
        if (users.meta.per_page && users.meta.last_page) {
            const pages = [...Array(users.meta.last_page).keys()].map(
                (i) => i + 1
            );
            setPageNumbers(pages);
        }
    }, [users.meta.per_page, users.meta.last_page]);

    const handlePagination = (page: number = 1) => {
        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="flex justify-center mb-4">
                <div className=" py-3 px-3 bg-white shadow-md border-2 border-gray-300 rounded-lg ">
                    <div className=" rounded-md inline-block ">
                        <button
                            onClick={() => handlePagination(currentPage - 1)}
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
                                    className="h-12 w-12 text-base bg-violet-300 
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
                                            currentPage === page ? "white" : "",
                                    }}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => handlePagination(currentPage + 1)}
                            disabled={currentPage === users.meta.last_page}
                            className="py-2.5 px-5 text-base bg-green-500
                                rounded-lg border-2 border-green-600  text-white hover:bg-green-600 hover:border-green-700 hover:text-white font-semibold transition-all duration-100 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500"
                        >
                            Дальше
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
