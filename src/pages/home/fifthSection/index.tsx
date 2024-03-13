import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const FifthSection = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    if (openSection === index) {
      setOpenSection(null);
    } else {
      setOpenSection(index);
    }
  };

  const faqs = [
    {
      question: 'What is Liquid NFT?',
      answer:
        'Liquid NFT is a semi-fungibility standard for NFTs, built by Aptos Labs and leveraging Aptos Move Objects. It empowers liquidity for NFTs with fungible tokens, similar to how ERC-404 starts the semi-fungibility standard on Ethereum.',
    },
    {
      question: 'Why is Liquid NFT better?',
      answer: 'Liquid NFT is built by harnessing the power of Aptos Move Objects. Instead of coding the relation between the fungible token and the NFT into the smart contract on ERC-404, Liquid NFT achieves semi-fungibility on the language level. Unique to the Aptos Move language, Aptos Objects allow for a composable relation between the fungible token and the non-fungible token. Each token (fungible or non-fungible) is an object that can be embedded inside one another. So when user claims an NFT with fungible token or liquifies an NFT on Liquid NFT, the fungible token is embedded and taken out of the NFT respectively. This is ONLY POSSIBLE ON APTOS.',
    },
    {
      question: 'What is Renegades?',
      answer: 'Renegades is the 1st Liquid NFT collection on Aptos leveraging the Liquid NFT standard and supported by the Aptos team and community. It is a collection of 5,000 Renegades coupled with the $RENA token, representing a 1:1 relationship for claiming and liquifying.',
    },
    {
      question: 'Anything else?',
      answer: 'We are bullish on Liquid NFTs, Composable NFTs, and all other native innovations only possible on Aptos.',
    },
  ];

  return (
    <div className="w-full h-fit z-20 relative">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col mt-[120px] sm:mt-[190px] md:w-[901px] items-center">
          <p className="text-[32px] sm:text-[42px] w-[95%] text-center leading-9 font-bold z-20 relative flex justify-center">
            Frequently asked questions
          </p>
        </div>
        <div className="w-[95%] lg:w-[1100px] flex flex-col mt-[56px] border-y border-[#666]">
          {faqs.map((faq, index) => (
            <div key={index} className='px-6 border-b border-[#666]'>
              <button
                className="flex justify-between items-center w-full py-6 font-semibold"
                onClick={() => toggleSection(index)}
              >
                <p className='text-[22px] sm:text-[26px]'>{faq.question}</p>
                {openSection === index ?
                  <Icon icon={'uil:multiply'} fontSize={28} color='#FFF' />
                  :
                  <Icon icon={'ph:plus'} fontSize={28} color='#FFF' />
                }
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${openSection === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
              >
                <p className="text-[17px] sm:text-[18px] pb-6 font-semibold text-gray-light">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
