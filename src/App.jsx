import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";

function App() {
  const [cost, setCost] = useState("");
  const [intrest, setIntrest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  console.log(tenure);

  const claculateEmi = (downpayment) => {
    if (!cost) return;
    const loanAmt = cost - downpayment;
    const rateOfIntrest = intrest / 100;
    const numOfYears = tenure / 12;
    const EMI =
      (loanAmt * rateOfIntrest * (1 + rateOfIntrest) ** numOfYears) /
      ((1 + rateOfIntrest) ** numOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  };

  const claculateDp = (emi) => {
    if (!cost) return;
    const downpaymentprecentage = 100 - (emi / claculateEmi(0)) * 100;
    return Number((downpaymentprecentage / 100) * cost).toFixed(0);
  };

  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const emi = claculateEmi(dp);
    setEmi(emi);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    //calculate downPayment and Update it
    const dp = claculateDp(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalLoanAmount = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = claculateEmi(downPayment);
    setEmi(emi);
  }, [tenure]);

  return (
    <>
      <div className="w-[90%] px-[15px] flex flex-col gap-[20px] font-sans">
        <span className="font-bold text-xl mt-5"> EMI CALCULATOR</span>
        <span className="font-bold text-l mt-0"> Total Cost of Asset</span>
        <input
          className="border-2 border-black rounded-md p-2"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="total cost of assest"
        />
        <span className="font-bold text-l mt-0"> Intrest Rate (in %)</span>
        <input
          className="border-2 border-black rounded-md p-2"
          type="number"
          value={intrest}
          onChange={(e) => setIntrest(e.target.value)}
          placeholder="Intrest Rate (in %)"
        />
        <span className="font-bold text-l mt-0"> Processing Fee (in %)</span>
        <input
          className="border-2 border-black rounded-md p-2"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder="Processing Fee (in %)"
        />
        <span className="font-bold text-l mt-0"> Down Payment</span>
        <span className="underline">
          Total Down Payment - {totalDownPayment()}
        </span>
        <div>
          <input
            type="range"
            min={0}
            max={cost}
            className="w-[100%]"
            value={downPayment}
            onChange={(e) => updateEMI(e)}
          />
          <div className="flex justify-between">
            {" "}
            <label>0%</label>
            <b>{downPayment}</b>
            <label>100%</label>
          </div>
        </div>
        <span className="font-bold text-l mt-0"> Loan Per Month</span>
        <span className="underline">
          Total Loan Ammount - {totalLoanAmount()}
        </span>
        <div>
          <input
            type="range"
            min={claculateEmi(cost)}
            max={claculateEmi(0)}
            className="w-[100%]"
            value={emi}
            onChange={updateDownPayment}
          />
          <div className="flex justify-between">
            {" "}
            <label>{claculateEmi(cost)}</label>
            <b>{emi}</b>
            <label>{claculateEmi(0)}</label>
          </div>
        </div>
        <span className="font-bold text-l mt-0"> Tenure</span>
        <div className="flex justify-between gap-[10px]">
          {tenureData.map((value, index) => (
            <button
              className={`w-[15%] h-[50%] border-none rounded-[100%] bg-[rgb(226,226,226)] text-center cursor-pointer ${
                value === tenure ? "bg-red-600 text-white" : ""
              }`}
            >
              <button onClick={() => setTenure(value)}>{value}</button>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
