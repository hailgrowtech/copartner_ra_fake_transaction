import React, { useState } from "react";
import { closeIcon, deleteIcon, dropdown } from "./assets";
import { toast } from "react-toastify";

const AddWalletData = ({ closeDialog, addCourse }) => {
  const [courseName, setCourseName] = useState("");
  const [amount, setAmount] = useState("");
  const [userNum, setUserNum] = useState(generateMobileNumber());
  const [planName, setPlanName] = useState("");
  const [des, setDes] = useState("");
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [startDate, setStartDate] = useState("");

  const handleError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  function generateMobileNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

  const handleSubmit = () => {
    if (!amount || !userNum || !planName || !startDate) {
      handleError("Please fill all fields");
      return;
    }

    const newCourse = {
      transId: Date.now(), // Unique transaction ID
      date: new Date(startDate).toLocaleString(), // Save both date and time
      planName,
      userNum,
      amount,
    };

    // Add data to transactionData
    addCourse(newCourse);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-[40%]">
        <div className="bg-[#2E374B] rounded-lg md:w-[1084px] w-[378px] md:h-auto h-[80%] overflow-y-auto p-8 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="md:h-[52px] font-inter font-[700] md:text-[30px] text-[18px] md:leading-[51px] text-new md:ml-0 ml-[-0.8rem]">
              Add Transaction
            </h2>
            <button onClick={closeDialog} className="md:mr-0 mr-[-1.4rem]">
              <img
                src={closeIcon}
                alt="Close_Icon"
                className="md:w-[35px] w-[40px] md:h-[35px] h-[40px]"
              />
            </button>
          </div>

          <div className="flex flex-col gap-4 md:w-[1006px]">
            <div className="flex md:flex-row flex-col md:gap-12 gap-4 md:ml-0 ml-[-16px]">
              <div className="relative">
                <label
                  className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[90px] w-[80px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                >
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  id="default-input"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="md:w-[482px] w-[345px] px-4 py-2 rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                />
              </div>
              <div className="relative">
                <div className="mb-0">
                  <label
                    className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[70px] w-[68px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    id="default-input"
                    className="md:w-[482px] w-[345px] px-4 py-2 rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                  />
                </div>
              </div>
            </div>

            <div className="flex md:flex-row flex-col md:gap-12 gap-4 md:ml-0 ml-[-16px]">
              <div className="relative">
                <div className="mb-0">
                  <label
                    className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[100px] w-[100px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                  >
                    User Number
                  </label>
                  <input
                    type="number"
                    value={userNum}
                    readOnly
                    id="default-input"
                    className="md:w-[482px] w-[345px] px-4 py-2 rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="mb-0">
                  <label
                    className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[90px] w-[68px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                  >
                    Plan Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={planName}
                      readOnly
                      onClick={() => setIsPlanOpen(!isPlanOpen)}
                      className="md:w-[482px] w-[345px] px-4 py-2 rounded-md text-white border border-[#40495C] bg-[#282F3E] cursor-pointer"
                    />
                    <img
                      src={dropdown}
                      alt="DropDown"
                      className="absolute inset-y-0 md:right-3 right-[-6px] w-[14px] h-[14px] top-[50%] transform -translate-y-1/2"
                    />
                    {isPlanOpen && (
                      <div className="absolute z-10 mt-2 md:w-[482px] w-[345px] rounded-md bg-white shadow-lg">
                        <ul className="py-1">
                          <li
                            onClick={() => {
                              setPlanName("Monthly");
                              setIsPlanOpen(false);
                            }}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Monthly
                          </li>
                          <li
                            onClick={() => {
                              setPlanName("Quarterly");
                              setIsPlanOpen(false);
                            }}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Quarterly
                          </li>
                          <li
                            onClick={() => {
                              setPlanName("Half-Yearly");
                              setIsPlanOpen(false);
                            }}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Half-Yearly
                          </li>
                          <li
                            onClick={() => {
                              setPlanName("Yearly");
                              setIsPlanOpen(false);
                            }}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Yearly
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-2 justify-end py-8">
            <button
              onClick={handleSubmit}
              className="px-2 w-full py-2 bg-blue-500 text-white md:text-[14px] text-[14px] rounded-lg hover:bg-blue-600"
            >
              Confirm
            </button>
            <button
              onClick={closeDialog}
              className="px-2 w-full py-2 bg-gray-300 md:text-[14px] text-[14px] text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWalletData;
