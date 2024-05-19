import { useAppDispatch, useAppSelector } from "../hooks";
import { closeModal } from "../store/modalSlice";
import { usersDelete } from "../store/usersSlice";

export const Modal: React.FC = () => {
    const dispatch = useAppDispatch();
    const id = useAppSelector((modal) => modal.modal.id);

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                ​
                <div className="inline-block align-bottom bg-white rounded-lg border-2 border-gray-300 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animated fadeInDown">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                                    Подтверждение удаления
                                </h3>
                                <div className="mt-2">
                                    <p className="text-base font-semibold text-gray-500">
                                        Вы уверены, что хотите удалить этого
                                        пользователя?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md  border-2 border-red-700 text-base font-semibold  shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 hover:border-red-800  sm:ml-3 sm:w-auto "
                            onClick={() => {
                                if (id) {
                                    dispatch(usersDelete(id));
                                    dispatch(closeModal());
                                }
                            }}
                        >
                            Удалить
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border-2 text-base font-semibold border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto "
                            onClick={() => dispatch(closeModal())}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
