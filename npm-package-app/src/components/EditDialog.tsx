import React, { useState } from "react";
import CustomButton from "./CustomButton";

interface EditDialogProps {
    favorite: Favorite;
    onSave: (newReason: string) => void;
    onClose: () => void;
}

interface Favorite {
    packageName: string;
    reason: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ favorite, onSave, onClose }) => {
    const [newReason, setNewReason] = useState(favorite.reason);

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewReason(event.target.value);
    };

    const handleSave = () => {
        onSave(newReason);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-2">Edit Reason</h2>
                <p><strong>Package Name:</strong> {favorite.packageName}</p>
                <div className="mt-4">
                    <label className="block mb-2">New Reason:</label>
                    <input
                        type="text"
                        value={newReason}
                        onChange={handleReasonChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <CustomButton
                        styling="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-200 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        content="Save"
                        onClick={handleSave}
                    />
                    <CustomButton
                        styling="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-200 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        content="Cancel"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditDialog;