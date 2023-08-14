// FavoritesPage.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FavoriteDialog from "./FavoriteDialog";
import EditDialog from "./EditDialog";
import ConfirmationModal from "./ConfirmationModal";

interface FavoritesPageProps {
    favorites: Favorite[];
    removeFromFavorites: (packageName: string) => void;
    editFavorites: (favorite: Favorite) => void;
}

interface Favorite {
    packageName: string;
    reason: string;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
    favorites,
    removeFromFavorites,
    editFavorites
}) => {
    const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);
    const [editFavorite, setEditFavorite] = useState<Favorite | null>(null);
    const [deleteFavorite, setDeleteFavorite] = useState<Favorite | null>(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    const openDialog = (favorite: Favorite) => {
        setSelectedFavorite(favorite);
    };

    const openEditDialog = (favorite: Favorite) => {
        setEditFavorite(favorite);
    };

    const closeDialog = () => {
        setSelectedFavorite(null);
        setEditFavorite(null);
    };

    const handleEditSave = (newReason: string) => {
        if (editFavorite) {
            const newFavorite = { ...editFavorite, reason: newReason }
            editFavorites(newFavorite);
            setEditFavorite(null);
        }
    };
    const openDeleteConfirmation = (favorite: Favorite) => {
        setDeleteFavorite(favorite);
        setDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setDeleteFavorite(null);
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (deleteFavorite) {
            removeFromFavorites(deleteFavorite.packageName);
            closeDeleteConfirmation();
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome To Favorite NPM Packages</h1>

            {favorites.length === 0 ? (
                <div className="flex items-center justify-center ">
                <div className="border border-2 p-6 rounded-lg w-3/5 min-h-[500px] flex flex-col justify-center">
                  <div className="mb-4">
                    <p className="text-center">You don't have nay favs yet. Please add</p>
                  </div>
                  <div className="flex justify-center">
                    <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Add Fav
                    </Link>
                  </div>
                </div>
              </div>              
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Add Fav
                        </Link>
                    </div>
                    <div className="no-scrollbar max-h-[600px] overflow-y-auto">
                        <table className="w-[80%] border-collapse border-black border-[1.5px] m-auto">
                            <thead>
                                <tr className="bg-black-800">
                                    <th className="p-2 border">Package Name</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favorites.map((favorite, index) => (
                                    <tr key={index} className="border-b border">
                                        <td className="p-2 border">{favorite.packageName}</td>
                                        <td className="p-2 border">
                                            <CustomButton
                                                styling="px-4 py-2 rounded focus:outline-none"
                                                content={<FontAwesomeIcon icon={faEye} onClick={() => openDialog(favorite)} />}
                                            />
                                            <CustomButton
                                                styling="px-4 py-2 rounded focus:outline-none"
                                                content={<FontAwesomeIcon icon={faEdit} />}
                                                onClick={() => openEditDialog(favorite)}
                                            />
                                            <CustomButton
                                                styling="px-4 py-2 rounded focus:outline-none"
                                                content={<FontAwesomeIcon icon={faTrashAlt} />}
                                                onClick={() => openDeleteConfirmation(favorite)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Dialog */}
                    {selectedFavorite && (
                        <FavoriteDialog favorite={selectedFavorite} onClose={closeDialog} />
                    )}
                    {/* Edit Dialog */}
                    {editFavorite && (
                        <EditDialog favorite={editFavorite} onSave={(newReason) => handleEditSave(newReason)} onClose={closeDialog} />
                    )}
                    {/* Delete Confirmation Modal */}
                    <ConfirmationModal
                        isOpen={deleteConfirmationOpen}
                        onClose={closeDeleteConfirmation}
                        onConfirm={handleDeleteConfirm}
                    >
                        Are you sure you want to remove this favorite?
                    </ConfirmationModal>
                </>
            )}
        </div>
    );
};

export default FavoritesPage;
