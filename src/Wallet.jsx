import React, { useState, useEffect } from "react";
import { walletData as initialWalletData } from "./JsonData";
import styles from "./style";
import AddWalletData from "./AddWalletData";
import { invoiceImg, Link } from "./assets";

const Wallet = () => {
  const [smallScreen, setSmallScreen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const savedData = sessionStorage.getItem("walletData");
    if (savedData) {
      setTransactionData(JSON.parse(savedData));
    } else {
      setTransactionData(initialWalletData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("walletData", JSON.stringify(transactionData));
  }, [transactionData]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const addCourse = (newCourse) => {
    setTransactionData([newCourse, ...transactionData]);
    closeDialog();
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex md:mt-[3rem] mt-1 flex-col gap-4">
      <div className="flex md:flex-row flex-row justify-between py-4 md:px-0 px-5">
        <span className="text-white md:w-[210px] h-[27px] font-inter font-[600] text-[22px] md:leading-[27px] md:items-center items-start">
          Transaction History
        </span>
        <button
          onClick={openDialog}
          className="md:w-[100px] w-[70px] md:h-[40px] h-[30px] rounded-[10px] text-white font-[600] font-inter md:text-[12px] text-[14px] border-solid border-[1px] border-white md:mr-4 mr-2"
        >
          +Add
        </button>
        {isDialogOpen && (
          <AddWalletData addCourse={addCourse} closeDialog={closeDialog} />
        )}
      </div>
      {smallScreen ? (
        <div className="flex flex-wrap justify-center items-center bg-gradient max-h py-6">
          {transactionData.map((row, index) => (
            <div
              key={index}
              className="flex flex-col justify-between h-[248px] bg-[#18181B] bg-opacity-[50%] rounded-[30px] md:m-4 m-[10px] p-4 w-[90%] max-w-sm"
            >
            <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[18px] leading-[12px] text-lightWhite">
                {`T${row.transId}`}
              </span>
              <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                <span className="text-dimWhite">DATE:</span> {row.date}, 8:28:00 AM
              </span>
              <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                <span className="text-dimWhite">PLAN NAME:</span> {row.planName}
              </span>
              <span className="flex items-center justify-between sm:w-[305px] h-[34px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                <span className="text-dimWhite">USER NUMBER:</span>{" "}
                {row.userNum}
              </span>
              <span
                className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite cursor-pointer"
              >
                <span className="text-dimWhite">TELEGRAM:</span>{" "}
                <img
                  src={Link}
                  alt="INVOICE"
                  className="w-[18px] h-[18px]"
                />
              </span>
              <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                <span className="text-dimWhite">KYC:</span> Y
              </span>
              <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                <span className="text-dimWhite">AMOUNT:</span> {row.amount}
              </span>
              <div className="flex flex-row justify-between">
                <p className="w-[173px] h-[26px] font-[600] text-[14px] leading-[25px] text-lightWhite">
                  INVOICE:
                </p>
                <img src={invoiceImg} className="w-[20px] h-[20px]" />
              </div>
            </div>
          ))}
          <button className="mt-6 md:w-[147px] md:h-[40px] md:flex items-center justify-center flex w-[110px] h-[30px] rounded-[6px] bg-lightWhite md:text-[14px] text-[10px] font-[500] md:leading-[16px] leading-[12px]">
            Show More
          </button>
        </div>
      ) : (
        <table className="xl:w-[1520px] md:w-[1130px] h-[230px] bg-[#29303F] rounded-[30px]">
          <thead className="text-dimWhite bg-[#1E1E22]">
            <tr>
              <th className="text-center py-4">Transaction ID</th>
              <th className="text-center py-4">Date</th>
              <th className="text-center py-4">Plan Name</th>
              <th className="text-center py-4">User Number</th>
              <th className="text-start px-4 py-4">Telegram</th>
              <th className="text-center py-4">KYC</th>
              <th className="text-center py-4">Amount</th>
              <th className="text-start px-4 py-4">Invoice</th>
            </tr>
          </thead>
          <tbody className="text-lightWhite">
            {transactionData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-transparent" : "bg-[#1E1E22]"}
              >
                <td className="text-center font-[500] text-[16px] leading-[18px] py-2">
                {`T${row.transId}`}
                </td>
                <td className="text-center font-[500] text-[16px] leading-[18px] py-2">
                  {row.date}, 8:28:00 AM
                </td>
                <td className="text-center font-[500] text-[16px] leading-[18px] py-2">
                  {row.planName}
                </td>
                <td className="text-center font-[500] text-[16px] leading-[18px] py-2">
                  {row.userNum}
                </td>
                <td className="text-center font-[500] leading-[18px] px-12 py-2 cursor-pointer">
                  <img src={Link} alt="Copy" className="w-[20px] h-[20px]" />
                </td>
                <td className="text-center font-[500] text-[16px] leading-[18px] py-2">
                  Y
                </td>
                <td className="text-center font-[500] text-[16px] leading-[18px] py-2">
                  {row.amount}
                </td>
                <td className="text-center font-[500] leading-[18px] px-8 py-2 cursor-pointer">
                  <img
                    src={invoiceImg}
                    alt="INVOICE"
                    className="w-[20px] h-[20px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Wallet;
