import { useState } from 'react';

export function Donate() {
  const [amount, setAmount] = useState('25');

  const handleAmountClick = (value: string) => {
    setAmount(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setAmount(val);
  };

  const handleDonateClick = () => {
    alert(`Thank you! Donating $${amount || '0'} to Beacon NH.\nSecure payment coming soon. 🙏`);
  };

  return (
    <section className="donate" id="donate">
      <div className="donate-inner">
        <div className="donate-img">
          <img src="/pexels-safari-consoler-3290243-19297742.jpg" alt="Helping" />
          <div className="donate-img-overlay"></div>
        </div>
        <div className="donate-form">
          <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Support Beacon NH</span></div>
          <h2 className="s-title">Every Dollar<br/><em>Lights The Way</em></h2>
          <p className="d-note">501(c)(3) nonprofit · Tax-deductible · 100% supports Manchester NH families</p>
          <div className="d-amts">
            {['10', '25', '50', '100'].map(val => (
              <div 
                key={val}
                className={`damt ${amount === val ? 'on' : ''}`} 
                onClick={() => handleAmountClick(val)}
              >
                ${val}
              </div>
            ))}
          </div>
          <div className="d-wrap">
            <input 
              type="text" 
              value={amount} 
              onChange={handleInputChange} 
              placeholder="Other amount" 
            />
          </div>
          <button className="d-submit" onClick={handleDonateClick}>
            Donate ${amount || '0'} To Beacon NH →
          </button>
          <div className="d-impact">
            <div className="di"><div className="di-n">$10</div><div className="di-l">One week of English lessons</div></div>
            <div className="di"><div className="di-n">$25</div><div className="di-l">Legal interpretation session</div></div>
            <div className="di"><div className="di-n">$50</div><div className="di-l">Family food for one week</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
