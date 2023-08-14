import React from "react";
import CustomButton from "./CustomButton";

interface FavoriteDialogProps {
    favorite: Favorite;
    onClose: () => void;
}

interface Favorite {
    packageName: string;
    reason: string;
}

const FavoriteDialog: React.FC<FavoriteDialogProps> = ({ favorite, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-2">Favorite Details</h2>
                <p><strong>Package Name:</strong> {favorite.packageName}</p>
                <p><strong>Reason:</strong> {favorite.reason}</p>
                <div className="mt-4 flex justify-end">
                    <CustomButton
                        styling="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-200 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        content="Close"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavoriteDialog;
