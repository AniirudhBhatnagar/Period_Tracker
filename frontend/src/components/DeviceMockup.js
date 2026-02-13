import React from 'react';

const DeviceMockup = () => {
    return (
        <section className="device-mockup">
            <div className="device-mockup__pattern"></div>
            <div className="device-mockup__container">
                <div className="device-mockup__phone">
                    <div className="device-mockup__phone-frame">
                        <div className="device-mockup__notch"></div>
                        <div className="device-mockup__screen">
                            <div className="device-mockup__ui-screenshot">
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #FFF9FA 0%, #FAD5DC 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#4A5568',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    padding: '20px'
                                }}>
                                    MyRhythm<br />Mobile Dashboard
                                </div>
                            </div>
                            <div className="device-mockup__reflection"></div>
                        </div>
                    </div>
                </div>
                
                <div className="device-mockup__tooltip">
                    Log symptoms in two taps
                </div>
            </div>
        </section>
    );
};

export default DeviceMockup; 