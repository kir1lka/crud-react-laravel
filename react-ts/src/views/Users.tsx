import { Link } from "react-router-dom";
import { TitlePage } from "../components/TitlePage";
import { useAppSelector } from "../hooks";
import { Pagination } from "../components/Pagination";
import { IoPersonAddSharp } from "react-icons/io5";

export const Users: React.FC = () => {
    const users = useAppSelector((state) => state.users);

    return (
        <div className="animated fadeInDown">
            <TitlePage textTitle="Пользователи" visibleButton={true}>
                <IoPersonAddSharp className="text-2xl" />
            </TitlePage>

            {/* table */}
            <div className=" rounded-lg border-2 border-gray-300  bg-white  shadow-md p-6 mb-4 ">
                <table className="w-full border-spacing-0 border-collapse ">
                    <thead className="">
                        <tr className="text-left bg-gray-300 text-base">
                            <th className="p-2 rounded-l-lg ">ID</th>
                            <th>Имя</th>
                            <th>Почта</th>
                            <th>Дата создания</th>
                            <th className="p-2 rounded-r-lg">Действия</th>
                        </tr>
                    </thead>

                    {users.loading && (
                        <tbody className="p-2 whitespace-nowrap border-b-2">
                            <tr className="p-2 whitespace-nowrap border-b-2">
                                <td className="p-2 whitespace-nowrap border-b-2 ">
                                    Загрузка...
                                </td>
                            </tr>
                        </tbody>
                    )}

                    {!users.loading && (
                        <tbody className="p-2 whitespace-nowrap border-b-2">
                            {users.users.data.map((user, index) => (
                                <tr
                                    key={index}
                                    className="p-2  whitespace-nowrap border-b-2 text-base"
                                >
                                    <td className="py-2 pl-1 whitespace-nowrap border-b-2 text-base">
                                        {user.id}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2 text-base">
                                        {user.name}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2 text-base">
                                        {user.email}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2 text-base">
                                        {user.created_at}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2 text-base">
                                        <Link
                                            // to={"/users/" + user.id}
                                            to={"/users"}
                                            className="py-3 px-4  rounded-md font-semibold bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white transition-all duration-200 border-2 border-yellow-600 hover:border-yellow-700"
                                        >
                                            Редактировать
                                        </Link>
                                        &nbsp;
                                        <button
                                            // onClick={() => onClickDelete(user)}
                                            className="py-3 px-4  rounded-md font-semibold bg-red-600 text-white border-2 border-red-700 hover:bg-red-700 hover:text-white transition-all duration-200 hover:border-red-800"
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <Pagination users={users} />
        </div>
    );
};
