import img from "../../assets/Logo.png";
import img2 from "../../assets/logo2.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const JustPrint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { person } = location.state || {};

  const printpdf = () => {
    window.print();
    navigate("/assemblynah/searchprint");
  };

  return (
    <div
      id="print"
      className="p-6 bg-white text-black font-sans print:p-0 print:shadow-none"
    >
      {/* Header Logos */}
      <div className="flex justify-between items-center mb-6">
        <img src={img} className="w-36 object-contain" alt="Logo 1" />
        <img src={img2} className="w-36 object-contain" alt="Logo 2" />
      </div>

      {/* ID Section */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={printpdf}
          className="print:hidden px-6 py-2 font-semibold text-white bg-yellow-500 rounded hover:bg-amber-400 transition-colors"
          data-html2canvas-ignore
        >
          Print
        </button>
        <div className="text-right">
          <p className="text-sm">
            ID NO :{" "}
            <span className="underline font-medium">
              {person?.shareholderid}
            </span>
            <br />
            ኅዳር 5 ቀን 2017 ዓ.ም.
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-center font-bold text-2xl mb-8 leading-tight">
        እ.ኤ.አ. የ2023/2024 በጀት ዓመት የትርፍ ድርሻን (Dividend) ድልድል ማሳወቂያ
      </h1>

      {/* Shareholder Info */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-base">
          <span>የባለአክሲዮኑ ስም፡</span>
          <span className="flex-1 border-b-2 border-black text-center font-medium">
            {person?.nameamh} / {person?.nameeng}
          </span>
        </div>
      </div>

      {/* Financial Table */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="grid grid-cols-2 gap-4 text-base">
          <span className="font-semibold">ሀ. የተፈረመ አክሲዮን:</span>
          <span className="border-b-2 border-black text-center">
            {Intl.NumberFormat("en-US").format(person?.totalcapital)}
          </span>

          <span className="font-semibold">ለ. የተከፈለ አክሲዮን:</span>
          <span className="border-b-2 border-black text-center">
            {Intl.NumberFormat("en-US").format(person?.paidcapital)}
          </span>

          <span className="font-semibold">ሐ. ያልተከፈለ ቀሪ ገንዘብ:</span>
          <span className="border-b-2 border-black text-center">
            {Intl.NumberFormat("en-US").format(
              person?.totalcapital - person?.paidcapital
            )}
          </span>

          <span className="font-semibold">መ. የትርፍ ድርሻ (ከታክስ በፊት):</span>
          <span className="border-b-2 border-black text-center">
            {Intl.NumberFormat("en-US").format(person?.devidend)}
          </span>
        </div>
      </div>

      {/* Notes Section */}
      <div className="text-sm space-y-4 max-w-4xl mx-auto mb-8">
        <h2 className="font-bold text-base mb-2">ማሳሰቢያ፣</h2>
        <p>
          1ኛ/ <span className="ml-2"></span>የትርፍ ድርሻ ክፍፍሉ ተግባራዊ የሚሆነው...
        </p>
        <p>
          2ኛ/ <span className="ml-2"></span>በ14ኛው የባለአክሲዮኖች አስቸኳይ...
        </p>
        <p>
          3ኛ/ <span className="ml-2"></span>የባንክ ሥራ አዋጅን ለማሻሻል...
        </p>
      </div>

      {/* Footer with Circle ID */}
      <div className="flex justify-end">
        <div className="flex items-center justify-center w-14 h-14 border-2 border-black rounded-full">
          <p className="text-lg font-medium">{person?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default JustPrint;
