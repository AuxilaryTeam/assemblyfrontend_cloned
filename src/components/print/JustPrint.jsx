import React from 'react'
import img from './Logo.png'
import img2 from './logo2.jpg'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const JustPrint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { person } = location.state || {};  //


    const printpdf = () => {
    window.print()
    navigate('/assemblynah/searchprint');
  };
  return (
    <div id='print'  className=' '>
    <div >
        <div className='' >
              <div className='flex  justify-between'>
                  <img src={img} className="object-contain w-40"  alt="" />
                  <img  src={img2}className="object-contain w-40 " alt=''/>
              </div>
            <div className='flex'>
              <div className=' w-full '>
                  <div className=" w-full  my-3 flex">
                  <button className=' print:hidden px-5 py-1  text-white hover:text-black bg-custom-yellow rounded hover:bg-amber-500'
                  onClick={ printpdf} data-html2canvas-ignore
                  >print</button>
                    <p className='ml-auto'>ID NO : &nbsp;&nbsp;&nbsp; <span className="underline">{person.shareholderid}</span><br />ኅዳር 5 ቀን 2017 ዓ.ም.</p>
                 
                  </div>
            
                      <h1 className='font-bold text-xl my-3 mx-auto' >እ.ኤ.አ. የ2023/2024 በጀት ዓመት የትርፍ ድርሻን (Dividend) ድልድል ማሳወቂያ</h1>
                     
                      <div className="flex text-base  items-center">
                            <span className="  ">የባለአክሲዮኑ ስም፡</span>
                            <span className="flex-1 border-b-2 border-black text-center">
                            {person.nameamh}/{person.nameeng}
                            </span>
                      </div>


<div className='  text-left '>
        
                       
                      <div className=' w-3/4 text-base items-center  pb-4  m-auto'>
                      <div className="flex  py-2 items-center">
                            <span className="  flex-1"></span>
                            <span className="flex-1 py-2 text-center">
                            በብር
                            </span>
                          </div>
                          <div className="flex py-2 items-center">
                            <span className="  flex-1">ሀ. የተፈረመ አክሲዮን:</span>
                            <span className="flex-1 border-b-2 border-black text-center">
                            {Intl.NumberFormat('en-US').format(person.totalcapital)}
                            </span>
                          </div>
                          <div className="flex py-2 items-center">
                            <span className="  flex-1">ለ. የተከፈለ አክሲዮን:</span>
                            <span className="flex-1 border-b-2 border-black text-center">
                              {Intl.NumberFormat('en-US').format(person.paidcapital)}
                            </span>
                          </div>
                          <div className="flex py-2 items-center">
                            <span className="  flex-1">ሐ. ያልተከፈለ ቀሪ ገንዘብ:</span>
                            <span className="flex-1 border-b-2 border-black text-center">
                              {Intl.NumberFormat('en-US').format(person.totalcapital - person.paidcapital)}
                            </span>
                          </div>
                          <div className="flex py-2 items-center">
                            <span className="  flex-1">መ. የትርፍ ድርሻ (ከታክስ በፊት):</span>
                            <span className="flex-1 border-b-2 border-black text-center">
                              {Intl.NumberFormat('en-US').format(person.devidend)}
                            </span>
                          </div>
                      </div>
        

                      </div>


                      <div className=' text-left text-sm'>
                        
                      <h1 className='font-bold '>ማሳሰቢያ፣</h1> <br />
                    

<p className="mb-4">1ኛ/ 	<span className="ml-2"></span>የትርፍ ድርሻ ክፍፍሉ ተግባራዊ የሚሆነው የባንኩ ጠቅላላ ጉባዔ ከተከናወነ እና በትርፍ ክፍፍሉ ላይ ውሳኔ ከተሰጠ በኋላ እንደሆነ በትህትና እናሳውቃለን፡፡
</p>
<p className="mb-4">2ኛ/  <span className="ml-2"></span>	በ14ኛው የባለአክሲዮኖች አስቸኳይ ጠቅላላ ጉባዔ ውሳኔ መሠረት ባለአክሲዮኑ አዲስ አክሲዮን ለመግዛት የፈረሟቸውና ዋጋቸው በሙሉ ካልተከፈለ፤ ለባለአክስዮኑ የሚደርሰው ትርፍ ድርሻ/ዲቪደንድ/ ዋጋቸው ላልተከፈሉ ቀሪ የተፈረሙ አክሲዮኖች ክፍያ የሚውል ይሆናል፡፡  </p>
<p className="mb-4">
3ኛ/ <span className="ml-2"></span> የባንክ ሥራ አዋጅን ለማሻሻል በወጣው አዋጅ ቁጥር 1159/2019 መሠረት ማንኛውም ባለአክሲዮን የትርፍ ድርሻው የሚከፈለው ወይም ላለበት ላልተከፈለ ቀሪ የአክሲዮን ክፍያ እንዲውል የሚደረገው ባለአክሲዮኑ ኢትዮጵያዊ ዜግነት ወይም ትውልደ ኢትዮጵያዊ መሆናቸውን የሚገልጽ የታደሰ መታወቂያ (የቀበሌ መታወቂያ፤ መንጃ ፈቃድ፤ ፓስፓርት ወይም ሌላ መረጃ)፣ ድርጅቶች ከሆኑ የድርጅቱ ባለአክሲዮኖች በሙሉ ኢትዮጵያዊ ዜግነት ወይም ትውልደ ኢትዮጵያውያን መሆናቸውን የሚያረጋግጥ የመመሥረቻ ጽሑፍ ወይም ሌላ ተቀባይነት ያለው ማስረጃ ዋናውን ከኮፒ ጋር በመያዝ በባንኩ ዋናው መ/ቤት አክስዮን እና ኢንቨስትመንት ክፍል በአካል በመቅረብ የተዘጋጀውን ፎርም ሞልቶ ሲፈርም መሆኑን በትህትና እናሳውቃለን፡፡
</p>
                      </div>
              </div>



         
            </div>
        </div>


        <div className='flex justify-end p-1'>
              <div class="flex items-center justify-center w-12 h-12 border-2 border-black rounded-full">
                   <p class="text-lg">{person.id}</p>
                </div>
              </div>
    </div>
</div>
  )
}

export default JustPrint
