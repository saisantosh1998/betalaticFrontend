// HomePage.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import InputComponent from "../components/InputComponent";
import RadioButtonsComponent from "../components/RadioButtonsComponent";
import TextareaComponent from "../components/TextareaComponent";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
    favorites: Favorite[];
    addToFavorites: (packageName: string, reason: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addToFavorites }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [radioOptions, setRadioOptions] = useState<string[]>([]);
    const [selectedRadioOption, setSelectedRadioOption] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
        fetchRadioOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const fetchRadioOptions = async () => {
        if (searchTerm.trim() === "") {
            setRadioOptions([]); // Clear radio options if search term is empty
            return;
        }
        try {
            const response = await axios.get(
                `https://api.npms.io/v2/search?q=${searchTerm}`
            );
            const options = response.data.results.map(
                (result: any) => result.package.name
            );
            setRadioOptions(options);
        } catch (error) {
            console.error(error);
        }
    };

    const addToFavoritesHandler = () => {
        if (selectedRadioOption) {
            addToFavorites(selectedRadioOption, textareaValue);
            setSelectedRadioOption("");
            setTextareaValue("");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Favorites</h1>
            <div className="relative">
                <CustomButton
                    styling="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none absolute right-5"
                    content="View Your Favorites"
                    onClick={() => navigate("/favorites")}
                />
            </div>
            <div>
                <InputComponent
                    label="Search NPM Packages"
                    value={searchTerm}
                    onChange={setSearchTerm}
                    styling="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <h1 className="text-l font-bold mb-2">Results:</h1>

            {radioOptions.length > 0 ? (
                <RadioButtonsComponent
                    options={radioOptions}
                    selectedOption={selectedRadioOption}
                    onOptionChange={setSelectedRadioOption}
                />
            ) : (
                <div
                    className="border border-gray-300"
                    style={{
                        minHeight: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    No data available
                </div>
            )}
            <TextareaComponent
                label="Why this is your fav?"
                value={textareaValue}
                onChange={setTextareaValue}
                styling="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            <div className="relative">
                <CustomButton
                    styling="bg-blue-500 hover:bg-blue-600 mr-0 text-white px-4 py-2 rounded focus:outline-none absolute right-5"
                    content="Add To Favorites"
                    onClick={addToFavoritesHandler}
                />
            </div>
        </div>
    );
};

export default HomePage;

interface Favorite {
    packageName: string;
    reason: string;
}
