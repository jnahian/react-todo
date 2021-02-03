import React, {useEffect} from 'react';

const About = () => {

  useEffect(() => {
    document.title = "Todo List - About Us";
  }, [])

  return (
    <div>
      <h4>About Us</h4>

      <ul>
        <li>App Version: 0.0.1</li>
        <li>License: MIT</li>
      </ul>
    </div>
  );
};

export default About;
