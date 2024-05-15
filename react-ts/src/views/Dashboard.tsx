import { TitlePage } from "../components/TitlePage";

export const Dashboard: React.FC = () => {
    return (
        <div className="animated fadeInDown">
            <TitlePage textTitle="Панель" />
            <div className="bg-white rounded-lg py-3 px-4 border-2 border-gray-300 shadow-sm mb-4 h-96 flex items-center justify-center">
                <h2 className="font-semibold text-2xl text-gray-400">Панель</h2>
            </div>
        </div>
    );
};
