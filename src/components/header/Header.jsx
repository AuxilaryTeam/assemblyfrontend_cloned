import { useState } from "react";
import { Link } from "react-router-dom";
import img from "./Logo.png"; // Replace with the correct path

const Header = () => {
    const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [isDisplayDropdownOpen, setDisplayDropdownOpen] = useState(false);
    const [isReportDropdownOpen, setReportDropdownOpen] = useState(false);
    const [isAttendanceSubmenuOpen, setAttendanceSubmenuOpen] = useState(false);

    const toggleSearchDropdown = () => {
        setSearchDropdownOpen(!isSearchDropdownOpen);
        setDisplayDropdownOpen(false);
        setReportDropdownOpen(false);
    };

    const toggleDisplayDropdown = () => {
        setDisplayDropdownOpen(!isDisplayDropdownOpen);
        setSearchDropdownOpen(false);
        setReportDropdownOpen(false);
    };

    const toggleReportDropdown = () => {
        setReportDropdownOpen(!isReportDropdownOpen);
        setSearchDropdownOpen(false);
        setDisplayDropdownOpen(false);
    };

    const toggleAttendanceSubmenu = () => {
        setAttendanceSubmenuOpen(!isAttendanceSubmenuOpen);
    };

    const closeAllDropdowns = () => {
        setSearchDropdownOpen(false);
        setDisplayDropdownOpen(false);
        setReportDropdownOpen(false);
        setAttendanceSubmenuOpen(false);
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-400 text-white">
            {/* Logo */}
            <div className="flex items-center">
                <img src={img} alt="Logo" className="h-10" />
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
             
                {/* Dropdown for Search */}
                <div className="relative">
                    <button
                        onClick={toggleSearchDropdown}
                        className="flex items-center hover:underline"
                    >
                        Attendance
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {isSearchDropdownOpen && (
                        <div
                            className="absolute bg-gray-500 text-white mt-1 rounded shadow-lg z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link
                                to="assemblynah/search"
                                className="block px-4 py-2 hover:bg-gray-600"
                                onClick={closeAllDropdowns}
                            >
                                Checkin
                            </Link>
                            <Link
                                to="assemblynah/searchprint"
                                className="block px-4 py-2 hover:bg-gray-600"
                                onClick={closeAllDropdowns}
                            >
                               Print
                            </Link>
                        </div>
                    )}
                </div>

                {/* Dropdown for Display */}
                {/* <div className="relative">
                    <button
                        onClick={toggleDisplayDropdown}
                        className="flex items-center hover:underline"
                    >
                        Display
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {isDisplayDropdownOpen && (
                        <div
                            className="absolute bg-gray-500 text-white mt-1 rounded shadow-lg z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link
                                to="assemblynah/display"
                                className="block px-4 py-2 hover:bg-gray-600"
                                onClick={closeAllDropdowns}
                            >
                                Display
                            </Link>
                            <Link
                                to="assemblynah/displayprint"
                                className="block px-4 py-2 hover:bg-gray-600"
                                onClick={closeAllDropdowns}
                            >
                                Display Print
                            </Link>
                        </div>
                    )}
                </div> */}

                {/* Dropdown for Report */}
                <div className="relative">
                    <button
                        onClick={toggleReportDropdown}
                        className="flex items-center hover:underline"
                    >
                        Report
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {isReportDropdownOpen && (
                        <div
                            className="absolute bg-gray-500 text-white mt-1 rounded shadow-lg z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={toggleAttendanceSubmenu}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center hover:underline"
                            >
                        
                                Attendance
                                <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                            </button>
                            {isAttendanceSubmenuOpen && (
                                <div className="ml-4 bg-gray-600 rounded shadow-lg">
                                    <Link
                                        to="assemblynah/displayprint"
                                        className="block px-4 py-2 hover:bg-gray-700"
                                        onClick={closeAllDropdowns}
                                    >
                                        Summary
                                    </Link>
                                    <Link
                                        to="assemblynah/report"
                                        className="block px-4 py-2 hover:bg-gray-700"
                                        onClick={closeAllDropdowns}
                                    >
                                        Detail
                                    </Link>
                                </div>
                            )}
                            <Link
                                to="assemblynah/report/voting"
                                className="block px-4 py-2 hover:bg-gray-600 flex items-center hover:underline"
                                onClick={closeAllDropdowns}
                            >
                                Voting
                                <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
